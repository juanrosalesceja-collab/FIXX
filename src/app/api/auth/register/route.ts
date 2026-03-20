import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, fullName, name, tallerName } = body;
    const finalName = fullName || name;

    // --- 1. Input Validation ---
    if (!email || !password || !finalName) {
      return NextResponse.json(
        { error: "Todos los campos (nombre, email y contraseña) son obligatorios." },
        { status: 400 }
      );
    }

    // --- 2. Check if user already exists ---
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (checkError) throw checkError;
    if (existingUser) {
      return NextResponse.json(
        { error: "El correo ya está registrado." },
        { status: 400 }
      );
    }

    // --- 3. Hash password (using bcryptjs) ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- 4. Insert into profiles ---
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert([{ name: finalName, email, password_hash: hashedPassword }])
      .select()
      .single();

    if (profileError) throw profileError;
    const userId = profile.id;

    // --- 5. Create Workshop (if provided) ---
    if (tallerName) {
      await supabase
        .from("workshops")
        .insert([{ user_id: userId, workshop_name: tallerName }]);
    }

    // --- 6. Create Subscription (7-day trial) ---
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    const { error: subError } = await supabase
      .from("subscriptions")
      .insert([
        {
          user_id: userId,
          trial_start_at: new Date().toISOString(),
          trial_end_at: trialEndDate.toISOString(),
          status: "trialing",
        },
      ]);
    
    if (subError) throw subError;

    // --- 7. Audit log ---
    await supabase
      .from("audit_logs")
      .insert([{ user_id: userId, action: "register" }]);

    // --- 8. Generate JWT session ---
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { message: "Usuario registrado exitosamente", userId },
      { status: 201 }
    );

    // Set auth cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    
    // Check if configuration is missing
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json(
        { error: "Error: NEXT_PUBLIC_SUPABASE_URL no definida." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Error del servidor: ${error.message || "Error desconocido"}` },
      { status: 500 }
    );
  }
}

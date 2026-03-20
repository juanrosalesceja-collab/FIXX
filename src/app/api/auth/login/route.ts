import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // --- 1. Input Validation ---
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    // --- 2. Find User ---
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("id, password_hash")
      .eq("email", email)
      .maybeSingle();

    if (userError) throw userError;
    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    // --- 3. Verify Password ---
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    // --- 4. Generate JWT session ---
    const token = jwt.sign(
      { userId: user.id, email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { message: "Inicio de sesión exitoso.", userId: user.id },
      { status: 200 }
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
    console.error("Login error:", error);
    
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

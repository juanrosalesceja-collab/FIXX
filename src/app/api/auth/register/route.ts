import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Support both 'fullName' (from our form) and 'name' (from user's example)
    const { email, password, fullName, name, tallerName } = body;
    const finalName = fullName || name;

    // --- Input validation ---
    if (!email || !password || !finalName) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    // --- 1. Check if user already exists ---
    const existingUser = await query("SELECT id FROM profiles WHERE email = $1", [email]);
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      return NextResponse.json(
        { error: "Este email ya está registrado." },
        { status: 409 }
      );
    }

    // --- 2. Hash password ---
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // --- 3. Create profile ---
    // We insert into profiles and get the new ID.
    // user_id is left NULL initially as we are bypassing Supabase Auth.
    const profileResult = await query(
      "INSERT INTO profiles (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
      [finalName, email, passwordHash]
    );
    const userId = profileResult.rows[0].id;

    // --- 4. Create workshop (optional) ---
    if (tallerName) {
      await query(
        "INSERT INTO workshops (user_id, workshop_name) VALUES ($1, $2)",
        [userId, tallerName]
      );
    }

    // --- 5. Create trial subscription (7 days) ---
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    await query(
      "INSERT INTO subscriptions (user_id, trial_start_at, trial_end_at, status) VALUES ($1, NOW(), $2, $3)",
      [userId, trialEndDate.toISOString(), "trialing"]
    );

    // --- 6. Audit log ---
    await query(
      "INSERT INTO audit_logs (user_id, action, metadata) VALUES ($1, $2, $3)",
      [userId, "register", JSON.stringify({ email })]
    );

    // --- 7. Generate JWT ---
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { message: "Usuario registrado exitosamente", userId },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

import { query } from "@/lib/db";
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
    const existingUser = await query("SELECT id FROM profiles WHERE email = $1", [email]);
    if (existingUser.rowCount && existingUser.rowCount > 0) {
      return NextResponse.json(
        { error: "El correo ya está registrado." },
        { status: 400 }
      );
    }

    // --- 3. Hash password (using bcryptjs) ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- 4. Insert into profiles ---
    // Note: user_id is optional to avoid Foreign Key failures if Supabase Auth isn't used.
    const profileResult = await query(
      "INSERT INTO profiles (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
      [finalName, email, hashedPassword]
    );
    const userId = profileResult.rows[0].id;

    // --- 5. Create Workshop (if provided) ---
    if (tallerName) {
      await query(
        "INSERT INTO workshops (user_id, workshop_name) VALUES ($1, $2)",
        [userId, tallerName]
      );
    }

    // --- 6. Create Subscription (7-day trial) ---
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    await query(
      "INSERT INTO subscriptions (user_id, trial_start_at, trial_end_at, status) VALUES ($1, NOW(), $2, $3)",
      [userId, trialEndDate.toISOString(), "trialing"]
    );

    // --- 7. Audit log ---
    await query(
      "INSERT INTO audit_logs (user_id, action) VALUES ($1, $2)",
      [userId, "register"]
    );

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
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

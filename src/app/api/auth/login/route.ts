import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // --- Input validation ---
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    // --- 1. Find user ---
    const result = await query(
      "SELECT id, password_hash FROM profiles WHERE email = $1",
      [email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // --- 2. Verify password ---
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    // --- 3. Generate JWT ---
    const token = jwt.sign(
      { userId: user.id, email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      { message: "Inicio de sesión exitoso.", userId: user.id },
      { status: 200 }
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
  } catch (error: any) {
    console.error("Login error:", error);
    
    // Check if the connection string is missing
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Error de configuración: DATABASE_URL no está definida en el servidor." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Error del servidor: ${error.message || "Error desconocido"}` },
      { status: 500 }
    );
  }
}

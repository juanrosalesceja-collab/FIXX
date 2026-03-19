import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, fullName, tallerName } = body;

    // --- Input validation ---
    if (!email || !password || !fullName || !tallerName) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El email no es válido." },
        { status: 400 }
      );
    }

    if (fullName.length > 100 || tallerName.length > 100) {
      return NextResponse.json(
        { error: "Los nombres no pueden exceder 100 caracteres." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // --- 1. Create user in Supabase Auth ---
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          taller_name: tallerName,
        },
      },
    });

    if (authError) {
      // Don't reveal too much about the error
      if (authError.message.includes("already registered")) {
        return NextResponse.json(
          { error: "Este email ya está registrado." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "No se pudo crear la cuenta. Intenta de nuevo." },
        { status: 500 }
      );
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Error al crear el usuario." },
        { status: 500 }
      );
    }

    // --- 2. Create profile ---
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        email,
        full_name: fullName,
        role: "owner",
      });

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
    }

    // --- 3. Create workshop ---
    const { data: workshopData, error: workshopError } = await supabase
      .from("workshops")
      .insert({
        name: tallerName,
        owner_user_id: userId,
      })
      .select("id")
      .single();

    if (workshopError) {
      console.error("Workshop creation error:", workshopError.message);
    }

    // --- 4. Create trial subscription ---
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const { error: subError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: userId,
        workshop_id: workshopData?.id || null,
        plan_name: "trial",
        status: "trialing",
        trial_starts_at: now.toISOString(),
        trial_ends_at: trialEnd.toISOString(),
      });

    if (subError) {
      console.error("Subscription creation error:", subError.message);
    }

    // --- 5. Audit log ---
    await supabase.from("audit_logs").insert({
      user_id: userId,
      action: "register",
      metadata: { email, taller: tallerName },
    });

    return NextResponse.json(
      { message: "Cuenta creada exitosamente.", userId },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

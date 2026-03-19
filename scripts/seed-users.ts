/**
 * FIXX — Seed 10 demo users
 *
 * Run with: npx tsx scripts/seed-users.ts
 *
 * Requirements:
 *   - npm install tsx (dev dependency)
 *   - .env.local must have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   - Database tables must exist (run supabase-schema.sql first)
 *
 * Output: scripts/output/test-users.csv
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load env from .env.local
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) {
      process.env[key.trim()] = vals.join("=").trim();
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Missing SUPABASE_URL or ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DEMO_USERS = [
  { name: "Carlos Méndez", taller: "Taller Méndez", email: "carlos@fixx-demo.com" },
  { name: "María García", taller: "AutoService García", email: "maria@fixx-demo.com" },
  { name: "Roberto López", taller: "Mecánica López", email: "roberto@fixx-demo.com" },
  { name: "Ana Torres", taller: "Taller Torres", email: "ana@fixx-demo.com" },
  { name: "Luis Hernández", taller: "Servicio Hernández", email: "luis@fixx-demo.com" },
  { name: "Patricia Ruiz", taller: "AutoTaller Ruiz", email: "patricia@fixx-demo.com" },
  { name: "Fernando Díaz", taller: "Mecánica Express Díaz", email: "fernando@fixx-demo.com" },
  { name: "Gabriela Morales", taller: "Taller GM", email: "gabriela@fixx-demo.com" },
  { name: "Javier Castillo", taller: "AutoFix Castillo", email: "javier@fixx-demo.com" },
  { name: "Sofía Ramírez", taller: "Servicio Ramírez", email: "sofia@fixx-demo.com" },
];

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  let pw = "";
  for (let i = 0; i < 12; i++) {
    pw += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pw;
}

async function seedUsers() {
  console.log("🔄 Creating 10 demo users...\n");

  const now = new Date();
  const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const results: string[] = [];

  results.push("nombre,email,password,trial_starts_at,trial_ends_at,status");

  for (const user of DEMO_USERS) {
    const password = generatePassword();

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user.email,
      password,
      options: {
        data: {
          full_name: user.name,
          taller_name: user.taller,
        },
      },
    });

    if (authError) {
      console.error(`  ❌ ${user.email}: ${authError.message}`);
      results.push(`${user.name},${user.email},ERROR,,,`);
      continue;
    }

    const userId = authData.user?.id;
    if (!userId) {
      console.error(`  ❌ ${user.email}: No user ID returned`);
      continue;
    }

    // Create profile
    await supabase.from("profiles").insert({
      id: userId,
      email: user.email,
      full_name: user.name,
      role: "owner",
    });

    // Create workshop
    const { data: workshopData } = await supabase
      .from("workshops")
      .insert({
        name: user.taller,
        owner_user_id: userId,
      })
      .select("id")
      .single();

    // Create trial subscription
    await supabase.from("subscriptions").insert({
      user_id: userId,
      workshop_id: workshopData?.id || null,
      plan_name: "trial",
      status: "trialing",
      trial_starts_at: now.toISOString(),
      trial_ends_at: trialEnd.toISOString(),
    });

    console.log(`  ✅ ${user.name} (${user.email})`);
    results.push(
      `${user.name},${user.email},${password},${now.toISOString()},${trialEnd.toISOString()},trialing`
    );
  }

  // Write CSV
  const outputDir = path.resolve(__dirname, "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const csvPath = path.join(outputDir, "test-users.csv");
  fs.writeFileSync(csvPath, results.join("\n"), "utf-8");

  console.log(`\n📄 Credenciales guardadas en: ${csvPath}`);
  console.log("✅ Seed completado.\n");
}

seedUsers().catch(console.error);

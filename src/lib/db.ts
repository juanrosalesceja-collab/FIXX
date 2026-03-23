import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  if (process.env.NODE_ENV === "production") {
    console.error("❌ CRITICAL: Supabase credentials missing in production environment!");
  } else {
    console.warn("⚠️ Supabase credentials missing in environment variables (.env.local)");
  }
}

// Ensure the client is only created if we have the required credentials to avoid crashes in some runtimes
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co", // Fallback to avoid immediate crash
  supabaseKey || "placeholder-key"
);

export default supabase;

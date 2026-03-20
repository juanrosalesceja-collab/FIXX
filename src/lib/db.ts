import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials missing in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper for raw queries if needed, but we'll use the client
export default supabase;

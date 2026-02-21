import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a mock client for build time when env vars aren't set
let supabaseAdmin: SupabaseClient;

if (supabaseUrl && supabaseServiceKey && supabaseUrl.startsWith("http")) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
} else {
  // Create a placeholder that throws helpful errors at runtime
  supabaseAdmin = {
    from: () => {
      throw new Error(
        "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables."
      );
    },
  } as unknown as SupabaseClient;
}

export { supabaseAdmin };

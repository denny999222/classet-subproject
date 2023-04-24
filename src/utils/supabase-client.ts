import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

// TYPES
import { Database } from "@/models/types_db";

export const supabase_client = createBrowserSupabaseClient<Database>({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_KEY || "",
});

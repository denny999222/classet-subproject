import { createClient } from "@supabase/supabase-js";

export const supabase_public = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_KEY || ""
);

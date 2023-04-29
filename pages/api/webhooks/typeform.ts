import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const createServerClient = (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL || "",
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_KEY || "",
    }
  );
  return supabase;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  console.log(req.query);
  console.log(req.headers);
  res.status(200).json({ message: "ok tstinggg" });
}

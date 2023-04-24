import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

// type Data being returned from the API can either be:
// 1. an error message of type string
// It doesn't return any data since we are just updating the database
interface Data {
  error?: string;
}

const createServerClient = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
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
  res: NextApiResponse<Data>
) {
  const { question_id, answer } = req.body;
  const supabase = createServerClient(req, res);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: "not_authenticated",
    });
  }
  const { data, error } = await supabase
    .from("user_answers")
    .upsert(
      { user_id: session.user.id, question_id, answer },
      { onConflict: "question_id, user_id" }
    );
  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({});
}

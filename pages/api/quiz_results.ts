import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { CareerScore } from "@/src/models/types";

// type Data being returned from the API can either be:
// 1. an error message of type string
// It doesn't return any data since we are just updating the database
interface Data {
  top_careers?: CareerScore[];
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
  const supabase = createServerClient(req, res);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: "not_authenticated",
    });
  }

  const { data: user_answers, error: err1 } = await supabase
    .from("user_answers")
    .select("*")
    .eq("user_id", session.user.id);

  if (err1) {
    console.error(err1);
    return res.status(500).json({ error: err1.message });
  } else if (user_answers && user_answers.length < 50) {
    return res.status(422).json({
      error: "not_enough_answers",
    });
  }

  const { data: top_careers, error: err2 } = await supabase.rpc(
    "get_top_careers",
    { user_id: session.user.id }
  );

  if (err2) {
    console.error(err2);
    return res.status(500).json({ error: err2.message });
  }

  res.status(200).json({ top_careers });
}

import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { Question_Type } from "@/models/types_db";

// type Data being returned from the API can either be:
// 1. an array of questions
// 2. an error message of type string
type Error_Type = { error: string };
interface Data {
  questions?: Question_Type[];
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
  const { page: p, size: s } = req.query;
  let page = parseInt(p as string);
  let size = parseInt(s as string);
  const offset = (page - 1) * size;
  const supabase = createServerClient(req, res);
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .range(offset, offset + size - 1);
  if (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
  const questions = data as Question_Type[];

  res.status(200).json({ questions });
}

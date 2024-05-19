import { z } from "zod";

const resultSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  content: z.string(),
  raw_content: z.string().nullable(),
  score: z.union([z.string(), z.number()]),
});

export const responseSchema = z.object({
  answer: z.string().nullable(),
  query: z.string(),
  response_time: z.number(), 
  follow_up_questions: z.array(z.string()).nullable(),
  images: z.array(z.string().url()).nullable(),
  results: z.array(resultSchema),
});

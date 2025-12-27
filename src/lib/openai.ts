import OpenAI from "openai";
import { env } from "../config/env.ts";

export const openai = new OpenAI({
  apiKey: env.openaiKey,
});

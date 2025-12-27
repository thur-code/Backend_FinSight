import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  ENABLE_CHAT: z.coerce.boolean().default(false),
  JWT_SECRET: z.string().min(32),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.issues);
  throw new Error("Invalid environment variables");
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  openaiKey: parsed.data.OPENAI_API_KEY,
  enableChat: parsed.data.ENABLE_CHAT,
  jwtSecret: parsed.data.JWT_SECRET,
};

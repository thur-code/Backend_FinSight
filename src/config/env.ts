export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL,
  openaiKey: process.env.OPENAI_API_KEY,
  enableChat: process.env.ENABLE_CHAT === "true"
};
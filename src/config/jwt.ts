import { env } from "./env.ts";

export const jwtSecret = new TextEncoder().encode(env.jwtSecret);
export const jwtExpiresIn = "7d";

import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import { jwtSecret } from "../config/jwt.ts";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const { payload } = await jwtVerify<{ sub: string }>(token, jwtSecret);

    if (!payload.sub) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user_id = payload.sub;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

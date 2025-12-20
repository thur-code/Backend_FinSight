import express from "express";
import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./router.ts";
import { env } from "./config/env.ts";
import { AppError } from "./errors/AppError.ts";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      message: "Internal server error",
    });
  }
);

app.listen(env.port, () => {
  console.log(`Servidor Online na porta: ${env.port}`);
});

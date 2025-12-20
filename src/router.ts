import { Router } from "express";
import { CreateUserController } from "./controller/users/CreateUserController.ts";

export const router = Router();

// User Routes
router.post("/users", new CreateUserController().handle);

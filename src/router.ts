import { Router } from "express";
import { CreateUserController } from "./controller/users/CreateUserController.ts";
import { AuthUserController } from "./controller/users/AuthUserController.ts";
import { DetailUserController } from "./controller/users/DetailUserController.ts";
import { isAuthenticated } from "./middlewares/isAuthenticated.ts";
import { UpdateUserController } from "./controller/users/UpdateUserController.ts";
import { DeleteUserController } from "./controller/users/DeleteUserController.ts";

export const router = Router();

// User Routes
router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.patch("/users", isAuthenticated, new UpdateUserController().handle);
router.delete("/users", isAuthenticated, new DeleteUserController().handle);

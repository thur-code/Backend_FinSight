import { Router } from "express";
import { CreateUserController } from "./controller/users/CreateUserController.ts";
import { AuthUserController } from "./controller/users/AuthUserController.ts";
import { DetailUserController } from "./controller/users/DetailUserController.ts";
import { isAuthenticated } from "./middlewares/isAuthenticated.ts";
import { UpdateUserController } from "./controller/users/UpdateUserController.ts";
import { DeleteUserController } from "./controller/users/DeleteUserController.ts";
import { CreateTransactionController } from "./controller/transactions/CreateTransactionController.ts";
import { ListTransactionsController } from "./controller/transactions/ListTransactionsController.ts";
import { SummaryController } from "./controller/transactions/SummaryController.ts";
import { DeleteTransactionController } from "./controller/transactions/DeleteTransactionController.ts";
import { UpdateTransactionController } from "./controller/transactions/UpdateTransactionController.ts";
import { InsightsController } from "./controller/ai/InsightsController.ts";

export const router = Router();

// User Routes
router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.patch("/users", isAuthenticated, new UpdateUserController().handle);
router.delete("/users", isAuthenticated, new DeleteUserController().handle);

// Transaction Users
router.post(
  "/transaction",
  isAuthenticated,
  new CreateTransactionController().handle
);

router.get(
  "/transactions",
  isAuthenticated,
  new ListTransactionsController().handle
);

router.get("/summary", isAuthenticated, new SummaryController().handle);

router.delete(
  "/transaction/:id",
  isAuthenticated,
  new DeleteTransactionController().handle
);

router.patch(
  "/transaction/:id",
  isAuthenticated,
  new UpdateTransactionController().handle
);

// Inteligência artificial
router.get("/insights", isAuthenticated, new InsightsController().handle);

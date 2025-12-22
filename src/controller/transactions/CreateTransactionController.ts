import type { Request, Response } from "express";
import { CreateTransactionService } from "../../services/transactions/CreateTransactionService.ts";
import { CreateTransactionSchema } from "../../schemas/CreateTransaction.schema.ts";

export class CreateTransactionController {
  handle = async (req: Request, res: Response) => {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userData = CreateTransactionSchema.safeParse({
      user_id: req.user_id,
      ...req.body,
    });

    if (!userData.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: userData.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      });
    }

    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute(
      {
        description: userData.data.description,
        amount: userData.data.amount,
        type: userData.data.type,
        category: userData.data.category,
      },
      req.user_id
    );

    return res.json(transaction);
  };
}

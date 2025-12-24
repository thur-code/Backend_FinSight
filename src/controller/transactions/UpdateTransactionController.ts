import type { Request, Response } from "express";
import { UpdateTransactionSchema } from "../../schemas/UpdateTransaction.schema.ts";
import { UpdateTransactionService } from "../../services/transactions/UpdateTransactionService.ts";

export class UpdateTransactionController {
  handle = async (req: Request, res: Response) => {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const transaction_id = req.params.id;

    const transactionData = UpdateTransactionSchema.safeParse({
      ...req.body,
      user_id: req.user_id,
      transaction_id,
    });

    if (!transactionData.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: transactionData.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      });
    }

    const updateTransactionService = new UpdateTransactionService();

    await updateTransactionService.execute({
      user_id: transactionData.data.user_id,
      transaction_id: transactionData.data.transaction_id,

      description: transactionData.data.description,
      amount: transactionData.data.amount,
      type: transactionData.data.type,
      category: transactionData.data.category,
    });

    return res.status(204).send();
  };
}

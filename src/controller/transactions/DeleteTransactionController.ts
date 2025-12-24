import type { Request, Response } from "express";
import { DeleteTransactionService } from "../../services/transactions/DeleteTransactionService.ts";

export class DeleteTransactionController {
  handle = async (req: Request, res: Response) => {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const transaction_id = req.params.id;

    const deleteTransactionService = new DeleteTransactionService();
    await deleteTransactionService.execute({
      user_id: req.user_id,
      transaction_id: transaction_id,
    });

    return res.status(204).send();
  };
}

import type { Request, Response } from "express";
import { ListTransactionsService } from "../../services/transactions/ListTransactionsService.ts";
import { ListTransactionsSchema } from "../../schemas/ListTransactions.schema.ts";

export class ListTransactionsController {
  handle = async (req: Request, res: Response) => {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const filters = ListTransactionsSchema.safeParse(req.query);

    if (!filters.success) {
      return res.status(400).json({
        error: "Invalid query params",
        details: filters.error.issues,
      });
    }

    const listTransactionsService = new ListTransactionsService();

    const transactions = await listTransactionsService.execute(
      req.user_id,
      filters.data
    );

    return res.json(transactions);
  };
}

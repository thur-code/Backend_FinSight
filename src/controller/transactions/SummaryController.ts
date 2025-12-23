import type { Request, Response } from "express";
import { SummaryService } from "../../services/transactions/SummaryService.ts";

export class SummaryController {
  handle = async (req: Request, res: Response) => {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const summaryService = new SummaryService();

    const summary = await summaryService.execute(req.user_id);

    return res.json(summary);
  };
}

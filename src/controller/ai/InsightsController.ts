import { Request, Response } from "express";
import { GenerateInsightsService } from "../../services/ai/GenerateInsightsService.ts";

export class InsightsController {
  async handle(req: Request, res: Response) {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const service = new GenerateInsightsService();
    const data = await service.execute(req.user_id);

    return res.json(data);
  }
}

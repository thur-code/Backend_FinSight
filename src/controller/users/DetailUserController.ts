import type { Request, Response } from "express";
import { DetailUserService } from "../../services/users/DetailUserService.ts";

export class DetailUserController {
  async handle(req: Request, res: Response) {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute({
      user_id: req.user_id,
    });

    return res.json(user);
  }
}

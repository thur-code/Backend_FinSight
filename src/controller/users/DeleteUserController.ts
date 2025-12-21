import type { Request, Response } from "express";
import { DeleteUserService } from "../../services/users/DeleteUserService.ts";

export class DeleteUserController {
  handle = async (req: Request, res: Response) => {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute({ user_id: req.user_id });

    return res.status(204).send();
  }
}

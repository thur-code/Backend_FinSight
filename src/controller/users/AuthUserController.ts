import type { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService.ts";
import { AuthUserSchema } from "../../schemas/AuthUser.schema.ts";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const userData = AuthUserSchema.parse(req.body);

    const authUserService = new AuthUserService();

    const login = await authUserService.execute(userData);

    return res.json(login);
  }
}

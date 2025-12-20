import type { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService.ts";
import { createUserSchema } from "../../schemas/createUser.schema.ts";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const userData = createUserSchema.safeParse(req.body);

    if (!userData.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: userData.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      });
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute(userData.data);

    return res.status(201).json(user);
  }
}

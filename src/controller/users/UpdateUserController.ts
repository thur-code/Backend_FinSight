import type { Request, Response } from "express";
import { UpdateUserSchema } from "../../schemas/UpdateUser.schema.ts";
import { UpdateUserService } from "../../services/users/UpdateUserService.ts";

export class UpdateUserController {
  handle = async (req: Request, res: Response) => {
    if (!req.user_id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userData = UpdateUserSchema.safeParse({
      ...req.body,
      user_id: req.user_id,
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

    const updateUserService = new UpdateUserService();

    await updateUserService.execute({
      user_id: userData.data.user_id,
      first_name: userData.data.first_name,
      last_name: userData.data.last_name,
      email: userData.data.email,
      password: userData.data.password,
      newPassword: userData.data.newPassword,
    });

    return res.json({ message: "Update completed successfully" });
  };
}

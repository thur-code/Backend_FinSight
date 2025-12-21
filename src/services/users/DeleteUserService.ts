import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";

interface UserRequest {
  user_id: string;
}

export class DeleteUserService {
  execute= async ({ user_id }: UserRequest) => {
    try {
      await prisma.user.delete({
        where: { id: user_id },
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new AppError("User not found", 404);
      }
      throw error;
    }
  }
}

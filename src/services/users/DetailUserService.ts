import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";

interface UserRequest {
  user_id: string;
}

export class DetailUserService {
  execute = async ({ user_id }: UserRequest) => {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: { id: true, first_name: true, last_name: true, email: true },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  };
}

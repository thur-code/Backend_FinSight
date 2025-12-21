import { hashPassword, verifyPassword } from "../../config/password.ts";
import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";
import { UpdateUserDTO } from "../../schemas/UpdateUser.schema.ts";

export class UpdateUserService {
  execute = async (data: UpdateUserDTO) => {
    const user = await prisma.user.findUnique({ where: { id: data.user_id } });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (data.email) {
      const emailAlreadyExists = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id: data.user_id },
        },
      });

      if (emailAlreadyExists) {
        throw new AppError("Email address is already registered.", 409);
      }
    }

    if (data.newPassword && !data.password) {
      throw new AppError("Current password is required", 401);
    }

    if (data.password && data.newPassword) {
      const ok = await verifyPassword(user.password, data.password);

      if (!ok) {
        throw new AppError("Invalid credentials", 401);
      }
    }

    let ok;
    if (data.password) {
      ok = await verifyPassword(user.password, data.password);
    }

    if (!ok && data.newPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const updateData: any = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    };

    if (data.newPassword) {
      updateData.password = await hashPassword(data.newPassword);
    }

    const userUpdated = await prisma.user.update({
      where: { id: data.user_id },
      data: updateData,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    return userUpdated;
  };
}

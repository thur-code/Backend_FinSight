import { hashPassword } from "../../config/password.ts";
import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";
import { CreateUserDTO } from "../../schemas/createUser.schema.ts";

export class CreateUserService {
  execute = async (data: CreateUserDTO) => {
    const formattedEmail = data.email.toLowerCase();

    const emailAlreadyExists = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (emailAlreadyExists) {
      throw new AppError("Email address is already registered.", 409);
    }

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: formattedEmail,
        password: hashed,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        created_at: true,
      },
    });

    return user;
  };
}

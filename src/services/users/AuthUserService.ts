import { SignJWT } from "jose";
import { verifyPassword } from "../../config/password.ts";
import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";
import { AuthUserDTO } from "../../schemas/AuthUser.schema.ts";
import { jwtSecret, jwtExpiresIn } from "../../config/jwt.ts";

export class AuthUserService {
  execute = async (data: AuthUserDTO) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const ok = await verifyPassword(user.password, data.password);

    if (!ok) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = await new SignJWT({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user.id)
      .setIssuedAt()
      .setExpirationTime(jwtExpiresIn)
      .sign(jwtSecret);

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
    };
  };
}

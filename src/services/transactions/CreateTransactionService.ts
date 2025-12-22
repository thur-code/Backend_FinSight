import { Prisma } from "../../../generated/prisma/client.ts";
import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";
import { CreateTransactionDTO } from "../../schemas/CreateTransaction.schema.ts";

export class CreateTransactionService {
  execute = async (data: CreateTransactionDTO, user_id: string) => {
    try {
      return await prisma.transaction.create({
        data: {
          user_id: user_id,
          description: data.description,
          amount: data.amount,
          type: data.type,
          category: data.category,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        throw new AppError("User not found", 404);
      }

      throw error;
    }
  };
}

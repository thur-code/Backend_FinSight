import { prisma } from "../../config/prisma.ts";
import { CreateTransactionDTO } from "../../schemas/CreateTransaction.schema.ts";

export class CreateTransactionService {
  execute = async (data: CreateTransactionDTO, user_id: string) => {
    return await prisma.transaction.create({
      data: {
        user_id,
        description: data.description,
        amount: data.amount,
        type: data.type,
        category: data.category,
      },
    });
  };
}

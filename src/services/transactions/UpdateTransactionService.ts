import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";
import { UpdateTransactionDTO } from "../../schemas/UpdateTransaction.schema.ts";

export class UpdateTransactionService {
  execute = async (data: UpdateTransactionDTO) => {
    const result = await prisma.transaction.updateMany({
      where: { id: data.transaction_id, user_id: data.user_id },
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        category: data.category,
      },
    });

    if (result.count === 0) {
      throw new AppError("Transaction not found", 404);
    }

    return result;
  };
}

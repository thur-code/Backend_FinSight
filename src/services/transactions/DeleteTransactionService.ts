import { Prisma } from "../../../generated/prisma/client.ts";
import { prisma } from "../../config/prisma.ts";
import { AppError } from "../../errors/AppError.ts";

interface TransactionRequest {
  user_id: string;
  transaction_id: string;
}

export class DeleteTransactionService {
  execute = async ({ user_id, transaction_id }: TransactionRequest) => {
    const result = await prisma.transaction.deleteMany({
      where: { id: transaction_id, user_id },
    });

    if (result.count === 0) {
      throw new AppError("Transaction not found", 404);
    }
  };
}

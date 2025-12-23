import { prisma } from "../../config/prisma.ts";
import { ListTrnsactionDTO } from "../../schemas/ListTransactions.schema.ts";

export class ListTransactionsService {
  execute = async (user_id: string, filters: ListTrnsactionDTO) => {
    const { page, limit, start, end } = filters;

    return prisma.transaction.findMany({
      where: {
        user_id,
        ...(filters.amount !== undefined && {
          amount: { gte: filters.amount },
        }),

        ...(filters.type && { type: filters.type }),

        ...(filters.category && { category: filters.category }),

        ...(start || end
          ? {
              created_at: {
                ...(start && { gte: start }),
                ...(end && { lte: end }),
              },
            }
          : {}),
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  };
}

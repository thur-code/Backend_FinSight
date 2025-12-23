import { prisma } from "../../config/prisma.ts";

function sumResults(user_id: string, type: "INCOME" | "EXPENSE") {
  return prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { user_id, type },
  });
}

export class SummaryService {
  execute = async (user_id: string) => {
    const [income, expense] = await Promise.all([
      sumResults(user_id, "INCOME"),
      sumResults(user_id, "EXPENSE"),
    ]);

    const totalIncome = income._sum.amount?.toNumber() ?? 0;
    const totalExpense = expense._sum.amount?.toNumber() ?? 0;

    const balance = totalIncome - totalExpense;

    return {
      income: totalIncome,
      expense: totalExpense,
      balance,
    };
  };
}

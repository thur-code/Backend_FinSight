import { prisma } from "../../config/prisma.ts";
import { openai } from "../../lib/openai.ts";
import { buildInsightsPrompt } from "../../lib/buildInsightsPrompt.ts";
import { InsightsResponseSchema } from "../../schemas/InsightsResponse.schema.ts";

export class GenerateInsightsService {
  async execute(user_id: string) {
    const transactions = await prisma.transaction.findMany({
      where: { user_id },
      orderBy: { created_at: "desc" },
      take: 30,
    });

    const income = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((acc, t) => acc + t.amount.toNumber(), 0);

    const expense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => acc + t.amount.toNumber(), 0);

    const balance = income - expense;

    const prompt = buildInsightsPrompt({
      income,
      expense,
      balance,
      transactions: transactions.map((t) => ({
        amount: t.amount.toNumber(),
        type: t.type,
        category: t.category,
      })),
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-5.2",
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0].message.content;

    const parsed = JSON.parse(raw ?? "{}");
    return InsightsResponseSchema.parse(parsed);
  }
}

import * as z from "zod";

export const ListTransactionsSchema = z.object({
  amount: z.coerce.number().optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  category: z.string().optional(),

  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),

  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ListTrnsactionDTO = z.infer<typeof ListTransactionsSchema>;

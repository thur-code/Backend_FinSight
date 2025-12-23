import * as z from "zod";

export const CreateTransactionSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().positive("The value must be greater than zero"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string()
});

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;

import * as z from "zod";

export const UpdateTransactionSchema = z
  .object({
    user_id: z.string(),
    transaction_id: z.string(),

    description: z.string().min(1).optional(),
    amount: z.coerce.number().positive().optional(),
    type: z.enum(["INCOME", "EXPENSE"]).optional(),
    category: z.string().optional(),
  })
  .refine(
    (data) => data.description || data.amount || data.type || data.category,
    {
      message: "At least one field must be provided to update",
    }
  );

export type UpdateTransactionDTO = z.infer<typeof UpdateTransactionSchema>;

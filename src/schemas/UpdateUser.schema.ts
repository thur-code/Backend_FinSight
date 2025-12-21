import * as z from "zod";

export const updateUserSchema = z
  .object({
    user_id: z.string(),

    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
  })
  .refine(
    (data) =>
      data.first_name ||
      data.last_name ||
      data.email ||
      data.password ||
      data.newPassword,
    {
      message: "At least one field must be provided to update",
    }
  );

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;

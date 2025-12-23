import * as z from "zod";

export const CreateUserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

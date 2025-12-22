import * as z from "zod";

export const AuthUserSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(6),
});

export type AuthUserDTO = z.infer<typeof AuthUserSchema>;

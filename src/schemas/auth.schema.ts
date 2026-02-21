import { z } from 'zod';

export type AuthSchema = z.infer<typeof authSchema>;

export const authSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(255),
});

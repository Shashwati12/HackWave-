import z from 'zod'

export const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  gender: z.enum(["male", "female", "other"]),
  role: z.string(),
  date_of_birth: z.string(),
});

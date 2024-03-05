import { object, string, z } from "zod";

const PasswordSchema = string().min(8).max(16);

export const SignInSchema = object({
  email: string().email(),
  password: PasswordSchema,
});

export type SignInFormData = z.infer<typeof SignInSchema>;

export const SignUpSchema = object({
  email: string().email(),
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
  firstName: string().min(2).max(16),
  lastName: string().min(2).max(16),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

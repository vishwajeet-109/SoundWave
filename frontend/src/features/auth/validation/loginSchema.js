import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Enter a valid email"),

  password: z
    .min(6, "Password must be at least 6 characters"),
});import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
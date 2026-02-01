import { z } from "zod";

/**
 * Register schema
 */
export const registerValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can contain only lowercase letters, numbers, and underscores"
    ),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

/**
 * Login schema
 */
export const loginValidator = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
});

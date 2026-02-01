import { z } from "zod";

/**
 * Create post schema
 */
export const createPostValidator = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),

  content: z
    .string()
    .trim()
    .min(1, "Content is required"),

  status: z
    .enum(["draft", "published"])
    .optional()
});

/**
 * Update post schema
 * At least one field must be provided
 */
export const updatePostValidator = z
  .object({
    title: z
      .string()
      .trim()
      .min(1)
      .optional(),

    content: z
      .string()
      .trim()
      .min(1)
      .optional(),

    status: z
      .enum(["draft", "published"])
      .optional()
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be updated"
    }
  );

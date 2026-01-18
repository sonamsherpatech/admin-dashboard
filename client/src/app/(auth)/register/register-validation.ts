import { z } from "zod";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "*username must be at least 3 characters")
      .max(20, "*username cannot exceed 20 characters"),
    email: z
      .string()
      .nonempty("*email cannot be empty")
      .email("*invalid email format"),
    password: z
      .string()
      .min(8, "*password cannot be less than 8 characters")
      .regex(/[a-zA-Z]/, "*password must contain at least one letter")
      .regex(/[0-9]/, "*password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "*password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "*passwords do not match",
  });

export default registerSchema;

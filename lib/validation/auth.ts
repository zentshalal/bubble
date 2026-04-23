import * as z from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username too long")
      .regex(
        /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/,
        "Username must contain character from A to Z and 0 to 9, aswell as - and _",
      )
      .trim()
      .toLowerCase(),
    email: z.string().email("Please enter a valid email").trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character")
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const logInSchema = z.object({
  email: z.string().email("Please enter a valid email").trim(),
  password: z.string().trim().min(1, "Please enter your password"),
});

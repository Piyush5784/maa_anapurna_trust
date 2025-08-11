import z from "zod";

export const ContactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val), {
      message: "Please enter a valid phone number",
    }),
  subject: z.enum(
    [
      "GENERAL",
      "SERVICES",
      "VOLUNTEER",
      "DONATION",
      "PARTNERSHIP",
      "SUPPORT",
      "OTHER",
    ],
    {
      message: "Please select a valid subject",
    }
  ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .trim(),
});

"use server";

import { prisma } from "@/db/prisma";
import { ContactFormSchema } from "@/form-schemas/contact-us-form";
import { Contact } from "@/generated/prisma";
import { success, z } from "zod";

// Define Zod schema for contact form validation

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export interface ActionResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  formData: FormData
): Promise<ActionResult> {
  try {
    // Extract form data
    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Validate with Zod
    const result = ContactFormSchema.safeParse(rawData);

    if (!result.success) {
      // Convert Zod errors to our error format
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = [];
        }
        errors[fieldName].push(issue.message);
      });

      return {
        success: false,
        message: "Please check the form for errors.",
        errors,
      };
    }

    return await saveContactData(result.data);
  } catch (error) {
    console.error("Contact form submission error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// New function that accepts typed data directly for React Hook Form
export async function submitContactData(
  data: ContactFormData
): Promise<ActionResult> {
  try {
    // Validate with Zod (this should always pass, but good to be safe)
    const result = ContactFormSchema.safeParse(data);

    if (!result.success) {
      // Convert Zod errors to our error format
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = [];
        }
        errors[fieldName].push(issue.message);
      });

      return {
        success: false,
        message: "Please check the form for errors.",
        errors,
      };
    }

    return await saveContactData(result.data);
  } catch (error) {
    console.error("Contact form submission error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// Helper function to save contact data
async function saveContactData(
  validatedData: ContactFormData
): Promise<ActionResult> {
  try {
    await prisma.contact.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject,
        message: validatedData.message,
        source: "website",
      },
    });

    return {
      success: true,
      message:
        "Thank you for your message! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Database save error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function getAllMessage(): Promise<ActionResult<Contact[]>> {
  try {
    const messages: Contact[] = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      message: "Messages successfully fetched",
      data: messages,
    };
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return {
      success: false,
      message: "Failed to get all the messages",
    };
  }
}

export async function getContactStats(): Promise<
  ActionResult<{
    totalMessages: number;
    thisWeek: number;
    today: number;
    messagesBySubject: { subject: string; count: number }[];
  }>
> {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const [totalMessages, thisWeekMessages, todayMessages, messagesBySubject] =
      await Promise.all([
        prisma.contact.count(),
        prisma.contact.count({
          where: {
            createdAt: {
              gte: startOfWeek,
            },
          },
        }),
        prisma.contact.count({
          where: {
            createdAt: {
              gte: startOfDay,
            },
          },
        }),
        prisma.contact.groupBy({
          by: ["subject"],
          _count: {
            id: true,
          },
        }),
      ]);

    const formattedMessagesBySubject = messagesBySubject.map((item) => ({
      subject: item.subject,
      count: item._count.id,
    }));

    return {
      success: true,
      message: "Stats successfully fetched",
      data: {
        totalMessages,
        thisWeek: thisWeekMessages,
        today: todayMessages,
        messagesBySubject: formattedMessagesBySubject,
      },
    };
  } catch (error) {
    console.error("Failed to fetch contact stats:", error);
    return {
      success: false,
      message: "Failed to get contact statistics",
    };
  }
}

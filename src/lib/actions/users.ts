"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUsers(): Promise<UserData[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return users.map((user: any) => ({
      ...user,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getUserStats() {
  try {
    const totalUsers = await prisma.user.count();

    const activeUsers = await prisma.user.count({
      where: {
        emailVerified: {
          not: null,
        },
      },
    });

    // Users created in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // For now, let's count verified users as "admins" - you can adjust this logic
    const adminUsers = await prisma.user.count({
      where: {
        emailVerified: {
          not: null,
        },
      },
    });

    return {
      totalUsers,
      activeUsers,
      newUsers,
      adminUsers,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      adminUsers: 0,
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/Manage/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function updateUser(
  userId: string,
  data: { name?: string; email?: string }
) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/Manage/users");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

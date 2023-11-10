import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/prisma";
import { User } from "@/app/lib/definitions";

export async function getUser(email: string) {
  noStore();

  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function addUser(user: User) {
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user.");
  }
}

export async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function getCounters() {
  try {
    const users = await prisma.user.groupBy({
      by: ["role"],
      _count: { id: true },
    });
    const attendances = await prisma.attendance.count();
    return { users, attendances };
  } catch (error) {
    console.error("Failed to fetch counters:", error);
    throw new Error("Failed to fetch counters.");
  }
}

export async function getAttendances() {
  try {
    return await prisma.attendance.findMany({
      select: {
        id: true,
        date: true,
        assisted: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch attendances:", error);
    throw new Error("Failed to fetch attendances.");
  }
}

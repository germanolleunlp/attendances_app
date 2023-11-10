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

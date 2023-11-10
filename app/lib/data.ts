import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/prisma";

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

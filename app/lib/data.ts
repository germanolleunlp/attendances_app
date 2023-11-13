import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/prisma";
import { Attendance, User } from "@/app/lib/definitions";
import { ROLES } from "@/app/lib/constants";

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

export async function getAllStudents() {
  try {
    return await prisma.user.findMany({
      where: {
        role: ROLES.STUDENT,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw new Error("Failed to fetch students.");
  }
}

export async function getCountersBy({
  role,
  email = "",
}: {
  role?: string | null;
  email?: string;
}) {
  try {
    const users = await prisma.user.groupBy({
      by: ["role"],
      where: {
        ...(role === ROLES.TEACHER ? {} : { email }),
      },
      _count: { id: true },
    });
    const attendances = await prisma.attendance.findMany({
      where: {
        ...(role === ROLES.TEACHER ? {} : { user: { email } }),
      },
    });
    return { users, attendances };
  } catch (error) {
    console.error("Failed to fetch counters:", error);
    throw new Error("Failed to fetch counters.");
  }
}

export async function getAttendancesBy({
  role,
  email = "",
}: {
  role?: string | null;
  email?: string;
}) {
  try {
    return await prisma.attendance.findMany({
      where: {
        ...(role === ROLES.TEACHER ? {} : { user: { email } }),
      },
      select: {
        id: true,
        date: true,
        assisted: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
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

export async function addAttendance({ date, ...attendance }: Attendance) {
  try {
    return await prisma.attendance.create({
      data: {
        ...attendance,
        date: new Date(date),
      },
    });
  } catch (error) {
    console.error("Failed to create attendance:", error);
    throw new Error("Failed to create attendance.");
  }
}

export async function deleteAttendances(ids: string[]) {
  try {
    return await prisma.attendance.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  } catch (error) {
    console.error("Failed to delete attendances:", error);
    throw new Error("Failed to delete attendances.");
  }
}

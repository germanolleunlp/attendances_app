"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { CREDENTIALS_SIGN_IN, ROLES } from "@/app/lib/constants";
import { ATTENDANCES_PATH, LOGIN_PATH } from "@/app/lib/routes";
import { addAttendance, addUser, getUser } from "@/app/lib/data";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum([ROLES.STUDENT, ROLES.TEACHER, ROLES.TUTOR]),
});

const AttendanceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.string(),
  assisted: z.boolean().default(false),
});

// This is temporary until @types/react-dom is updated
export type UserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes(CREDENTIALS_SIGN_IN)) {
      return CREDENTIALS_SIGN_IN;
    }
    throw error;
  }
}

const CreateUser = UserSchema.omit({ id: true });
export async function createUser(prevState: UserState, formData: FormData) {
  const userForm = Object.fromEntries(formData.entries());
  const userFields = CreateUser.safeParse(userForm);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!userFields.success) {
    return {
      errors: userFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password, role } = userFields.data;

  try {
    const user = await getUser(email);
    if (user) return { message: "Database Error: User already exists." };
    const encryptedPassword = await bcrypt.hash(password, 10);
    await addUser({
      name,
      email,
      password: encryptedPassword,
      role,
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Invoice.",
    };
  }

  redirect(LOGIN_PATH);
}

// This is temporary until @types/react-dom is updated
export type AttendanceState = {
  errors?: {
    userId?: string[];
    date?: string[];
    assisted?: string[];
  };
  message?: string | null;
};

const CreateAttendance = AttendanceSchema.omit({ id: true });
export async function createAttendance(
  prevState: AttendanceState,
  formData: FormData,
) {
  const attendanceForm = Object.fromEntries(formData.entries());
  const attendanceFields = CreateAttendance.safeParse(attendanceForm);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!attendanceFields.success) {
    return {
      errors: attendanceFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Attendance.",
    };
  }

  // Prepare data for insertion into the database
  const { userId, date, assisted = false } = attendanceFields.data;

  try {
    await addAttendance({
      userId,
      date,
      assisted,
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Attendance.",
    };
  }

  revalidatePath(ATTENDANCES_PATH);
  redirect(ATTENDANCES_PATH);
}

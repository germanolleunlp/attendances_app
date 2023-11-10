"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { CREDENTIALS_SIGN_IN, ROLES } from "@/app/lib/constants";
import { LOGIN_PATH } from "@/app/lib/routes";
import { addUser, getUser } from "@/app/lib/data";
import bcrypt from "bcrypt";

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
  role: z.enum([ROLES.STUDENT, ROLES.TEACHER, ROLES.TUTOR]),
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

"use client";

import { Button } from "./button";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/app/lib/actions";
import RoleSelect from "@/app/ui/role-select";
import FormError from "@/app/ui/form-error";

export default function RegisterForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form
      action={dispatch}
      className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
    >
      <h2 className="text-white text-lg font-medium title-font mb-5">
        Sign Up
      </h2>
      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-400">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <FormError field="name" errors={state?.errors?.name} />
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          autoComplete={"email"}
        />
        <FormError field="email" errors={state?.errors?.email} />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          autoComplete={"current-password"}
        />
        <FormError field="email" errors={state?.errors?.password} />
      </div>
      <div className="relative mb-4">
        <RoleSelect />
        <FormError field="email" errors={state?.errors?.role} />
      </div>
      <RegisterButton />
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} disabled={pending}>
      Register
    </Button>
  );
}

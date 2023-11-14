"use client";

import {ArrowLeftIcon, ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "./button";
import {useFormState, useFormStatus} from "react-dom";
import {authenticate} from "@/app/lib/actions";
import {CREDENTIALS_SIGN_IN} from "@/app/lib/constants";
import Link from "next/link";
import {HOME_PATH} from "@/app/lib/routes";

export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);

  return (
    <form
      action={action}
      className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0"
    >
      <h2 className="text-white text-lg font-medium title-font mb-5">
        Please log in to continue.
      </h2>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
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
        />
      </div>
      <LoginButton />
      {code === CREDENTIALS_SIGN_IN && (
        <div className="flex h-8 items-end space-x-1">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p aria-live="polite" className="text-sm text-red-500">
            Invalid credentials
          </p>
        </div>
      )}
      <Link
        href={HOME_PATH}
        className="w-fit mt-3 text-indigo-400 inline-flex items-center gap-2">
        <ArrowLeftIcon className="h-4 w-4 text-indigo-400" />
        Back to home
      </Link>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} disabled={pending}>
      Log in
    </Button>
  );
}

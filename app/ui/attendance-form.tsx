"use client";

import { Button } from "@/app/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createAttendance } from "@/app/lib/actions";
import FormError from "@/app/ui/form-error";
import { User } from "@/app/lib/definitions";
import StudentSelect from "@/app/ui/student-select";
import { parseDate } from "@/app/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const today = parseDate(new Date());

export default function AttendanceForm({
  students,
}: {
  students: Omit<User, "password">[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAttendance, initialState);

  return (
    <form
      action={dispatch}
      className="bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 mx-auto"
    >
      <h2 className="text-white text-lg font-medium title-font mb-5">
        New attendance
      </h2>
      <div className="relative mb-4">
        <StudentSelect students={students} />
        <FormError field="userId" errors={state?.errors?.userId} />
      </div>
      <div className="relative mb-4">
        <label htmlFor="date" className="leading-7 text-sm text-gray-400">
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          min={today}
          defaultValue={today}
        />
        <FormError field="email" errors={state?.errors?.date} />
      </div>
      <div className="relative mb-4">
        <label className="relative inline-flex items-center mb-5 cursor-pointer">
          <input
            id="assisted"
            type="checkbox"
            name="assisted"
            className="sr-only peer"
          />
          <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all border-gray-600 peer-checked:bg-indigo-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-300">
            Assisted
          </span>
        </label>
        <FormError field="email" errors={state?.errors?.assisted} />
      </div>
      <AddButton />
      {state && state.message && (
        <div className="flex h-8 items-end space-x-1">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p aria-live="polite" className="text-sm text-red-500">
            {state.message}
          </p>
        </div>
      )}
    </form>
  );
}

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} disabled={pending}>
      Add
    </Button>
  );
}

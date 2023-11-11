import { User } from "@/app/lib/definitions";

export default function StudentSelect({
  students,
}: {
  students: Omit<User, "password">[];
}) {
  return (
    <div className="flex items-center">
      <div className="relative">
        <select
          id="userId"
          name="userId"
          className="rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-indigo-500 text-white pl-3 pr-10"
        >
          {students.map(({ id, name, email }) => (
            <option key={id} className="bg-gray-800 appearance-none" value={id}>
              {name} ({email})
            </option>
          ))}
        </select>
        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </div>
    </div>
  );
}

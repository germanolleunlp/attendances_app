import { ROLES } from "@/app/lib/constants";

export default function RoleSelect() {
  return (
    <div className="flex items-center">
      <span className="mr-3">Role</span>
      <div className="relative">
        <select
          id="role"
          name="role"
          className="rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 bg-transparent appearance-none py-2 focus:outline-none focus:border-indigo-500 text-white pl-3 pr-10"
        >
          {Object.values(ROLES).map((role) => (
            <option key={role} className="bg-gray-800 appearance-none">
              {role}
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

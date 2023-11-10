import { UserIcon } from "@heroicons/react/24/outline";
import { User } from "@/app/lib/definitions";

export default function User({ name, email, role }: Partial<User>) {
  return (
    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
      <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg gap-3">
        <div className="p-2 inline-block rounded-full border-2 border-gray-600 bg-gray-800">
          <UserIcon className="text-indigo-400 w-12 h-12" />
        </div>
        <div className="flex-grow">
          <h2 className="text-white title-font font-medium">{name}</h2>
          <span className="inline-block h-1 w-10 rounded bg-indigo-500"></span>
          <p className="text-gray-600">
            {email}
            <span className="text-xs font-medium ms-2 px-2.5 py-0.5 rounded-full bg-indigo-900 text-indigo-300">
              {role}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

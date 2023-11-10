import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { SignOutButton } from "@/app/ui/sign-out-button";
import { signOut } from "@/auth";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col p-4 bg-indigo-950">
      <Link
        className="mb-2 flex h-20 items-start justify-start rounded-md py-4 md:h-40"
        href="/"
      >
        <AcademicCapIcon className="text-white h-12 w-12" />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <SignOutButton />
        </form>
      </div>
    </div>
  );
}

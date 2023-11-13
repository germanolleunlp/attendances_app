"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ATTENDANCES_PATH,
  DASHBOARD_PATH,
  STUDENTS_PATH,
} from "@/app/lib/routes";
import { useSession } from "next-auth/react";
import { ROLES } from "@/app/lib/constants";

const links = [
  { name: "Home", href: DASHBOARD_PATH, icon: HomeIcon },
  {
    name: "Users",
    href: STUDENTS_PATH,
    icon: UserGroupIcon,
    roles: [ROLES.TEACHER],
  },
  {
    name: "Attendances",
    href: ATTENDANCES_PATH,
    icon: CalendarDaysIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <>
      {links
        .filter((link) => {
          if (!session?.data?.user) return false;
          if (!link.roles) return true;
          return link.roles.includes(session?.data?.user.role);
        })
        .map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-indigo-100 hover:text-indigo-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-indigo-100 text-indigo-600": pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
    </>
  );
}

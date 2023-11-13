import Card from "@/app/ui/card";
import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { getCountersBy } from "@/app/lib/data";
import { ROLES } from "@/app/lib/constants";
import { Suspense } from "react";
import CardSkeleton from "@/app/ui/card-skeleton";
import { auth } from "@/auth";

const ROLES_MAP = {
  [ROLES.STUDENT]: "Students",
  [ROLES.TEACHER]: "Teachers",
  [ROLES.TUTOR]: "Tutors",
};

const Cards = async () => {
  const session = await auth();
  const isTeacher = session?.user?.role === ROLES.TEACHER;
  const params = {
    role: session?.user.role,
    email: session?.user.email || "",
  };

  const { users, attendances } = await getCountersBy(params);

  return (
    <>
      {users
        .filter(() => isTeacher)
        .map(({ _count: { id: total }, role }) => (
          <Card
            key={role}
            icon={UserGroupIcon}
            title={`${total}`}
            description={ROLES_MAP[role] || "Others"}
          />
        ))}
      <Card
        icon={CalendarDaysIcon}
        title={`${attendances.length}`}
        description="Attendances"
      />
    </>
  );
};

export default function DashboardPage() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Dashboard
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center text-center">
          <Suspense fallback={<CardSkeleton />}>
            <Cards />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

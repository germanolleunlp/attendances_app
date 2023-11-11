import User from "@/app/ui/user";
import { getAllUsers } from "@/app/lib/data";
import UserSkeleton from "@/app/ui/user-skeleton";
import { Suspense } from "react";

const Users = async () => {
  const users = await getAllUsers();

  return users.map((user) => (
    <User key={user.id} name={user.name} email={user.email} role={user.role} />
  ));
};

export default function UsersPage() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Users
          </h1>
        </div>
        <div className="flex flex-wrap -m-2">
          <Suspense fallback={<UserSkeleton />}>
            <Users />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

import User from "@/app/ui/user";
import { getAllUsers } from "@/app/lib/data";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Users
          </h1>
        </div>
        <div className="flex flex-wrap -m-2">
          {users.map((user) => (
            <User
              key={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

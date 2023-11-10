import Link from "next/link";
import { LOGIN_PATH } from "@/app/lib/routes";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import RegisterForm from "@/app/ui/register-form";

export default function Page() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">
            Welcome to Attendances.
          </h1>
          <p className="leading-relaxed mt-4 mb-6">
            The easiest way to track your students attendance.
          </p>
          <Link
            href={LOGIN_PATH}
            className="inline-flex items-center gap-5 self-start text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}

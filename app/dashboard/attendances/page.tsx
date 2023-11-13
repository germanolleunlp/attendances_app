import { getAllStudents, getAttendancesBy } from "@/app/lib/data";
import AttendanceForm from "@/app/ui/attendance-form";
import AttendancesTable from "@/app/ui/attendances-table";
import { auth } from "@/auth";
import { ROLES } from "@/app/lib/constants";

export default async function AttendancesPage() {
  const session = await auth();
  const isTeacher = session?.user?.role === ROLES.TEACHER;
  const params = {
    role: session?.user.role,
    email: session?.user.email || "",
  };

  const attendances = await getAttendancesBy(params);
  const students = await getAllStudents();

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
            Attendances
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          {isTeacher && <AttendanceForm students={students} />}
          <div className="h-8" />
          <AttendancesTable attendances={attendances} readOnly={!isTeacher} />
        </div>
      </div>
    </section>
  );
}

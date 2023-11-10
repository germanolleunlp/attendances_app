import { getAttendances } from "@/app/lib/data";

export default async function AttendancesPage() {
  const attendances = await getAttendances();

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
            Attendances
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                  id
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                  Date
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                  User
                </th>
                <th className="w-10 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tr rounded-br"></th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr key={attendance.id}>
                  <td className="px-4 py-3">{attendance.id}</td>
                  <td className="px-4 py-3">
                    {attendance.date?.toDateString()}
                  </td>
                  <td className="px-4 py-3">{attendance.user?.name}</td>
                  <td className="w-10 text-center">
                    <input name="plan" type="radio" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

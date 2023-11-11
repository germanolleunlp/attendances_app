"use client";

import { parseDate } from "@/app/lib/utils";
import { Attendance as BaseAttendance, User } from "@/app/lib/definitions";
import { ChangeEvent, useState } from "react";
import { Button } from "@/app/ui/button";

type Attendance = Omit<BaseAttendance, "date"> & {
  user: Omit<User, "password" | "role">;
  date: Date;
};

export default function AttendancesTable({
  attendances,
}: {
  attendances: Attendance[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState<Record<string, boolean>>({});

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      checked,
      dataset: { attendanceId },
    } = event.target;

    if (!attendanceId) return;
    setRows((prev) => ({ ...prev, [attendanceId]: checked }));
  };

  const handleResponse = (response: Response) => {
    if (!response.ok) return;
    setCurrent((prev) => ({ ...prev, ...rows }));
  };

  const handleClick = () => {
    setLoading(true);
    fetch("/api/attendances", {
      method: "DELETE",
      body: JSON.stringify(
        Object.keys(rows).filter((attendanceId) => rows[attendanceId]),
      ),
    })
      .then(handleResponse)
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col gap-3">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
              User
            </th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
              Date
            </th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
              Assisted
            </th>
            <th className="w-10 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tr rounded-br"></th>
          </tr>
        </thead>
        <tbody>
          {attendances
            .filter((attendance) => {
              if (!attendance.id) return false;
              return !current[attendance.id];
            })
            .map((attendance) => (
              <tr key={attendance.id}>
                <td className="px-4 py-3">{attendance.user?.name}</td>
                <td className="px-4 py-3">{parseDate(attendance.date)}</td>
                <td className="px-4 py-3">
                  {attendance.assisted ? "Yes" : "No"}
                </td>
                <td className="w-10 text-center">
                  <input
                    id={attendance.id}
                    data-attendance-id={attendance.id}
                    type="checkbox"
                    onChange={handleOnChange}
                    className="w-4 h-4 text-indigo-600 rounded ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Button
        aria-disabled={loading}
        disabled={loading}
        className="text-sm self-end"
        onClick={handleClick}
      >
        Delete
      </Button>
    </div>
  );
}

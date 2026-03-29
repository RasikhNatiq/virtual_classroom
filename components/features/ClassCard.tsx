import Link from "next/link";

import type { Classroom } from "@/types";
import { calculateAttendancePercentage } from "@/utils/helpers";

type ClassCardProps = {
  classroom: Classroom;
  myUserId?: string;
};

export function ClassCard({ classroom, myUserId }: ClassCardProps) {
  const totalRecords = classroom.attendance.length;
  const myPresentCount = myUserId
    ? classroom.attendance.filter((record) => record.present.includes(myUserId)).length
    : 0;
  const percentage = calculateAttendancePercentage(totalRecords, myPresentCount);

  return (
    <article className="class-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-700">{classroom.subject}</p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{classroom.name}</h3>
        </div>
        <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
          Code: {classroom.code}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Students</p>
          <p className="text-lg font-bold text-slate-900">{classroom.students.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Sessions</p>
          <p className="text-lg font-bold text-slate-900">{totalRecords}</p>
        </div>
      </div>

      {myUserId ? (
        <div className="mt-3 rounded-2xl bg-cyan-50 p-3">
          <p className="text-xs text-cyan-700">Your attendance</p>
          <p className="text-lg font-bold text-cyan-900">{percentage}%</p>
        </div>
      ) : null}

      <Link
        className="mt-5 inline-flex rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        href={`/class/${classroom.id}`}
      >
        Open class
      </Link>
    </article>
  );
}
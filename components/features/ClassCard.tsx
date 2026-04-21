import Link from "next/link";

import type { Classroom } from "@/types";
import { todayDateISO } from "@/utils/helpers";

type ClassCardProps = {
  classroom: Classroom;
};

export function ClassCard({ classroom }: ClassCardProps) {
  const today = todayDateISO();
  const totalSessions = classroom.attendance.length;
  const todayCount = classroom.attendance.find((r) => r.date === today)?.attendees.length ?? 0;

  return (
    <article className="class-card rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-700">{classroom.subject}</p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{classroom.name}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{classroom.professor}</p>
        </div>
        <span className="rounded-xl bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-600">
          {classroom.code}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-emerald-50 p-3">
          <p className="text-xs text-emerald-700">Present today</p>
          <p className="text-lg font-bold text-emerald-900">{todayCount}</p>
        </div>
        <div className="rounded-2xl bg-sky-50 p-3">
          <p className="text-xs text-sky-700">Sessions</p>
          <p className="text-lg font-bold text-sky-900">{totalSessions}</p>
        </div>
      </div>

      <Link
        className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition-all hover:-translate-y-0.5 hover:from-cyan-500 hover:to-sky-500 hover:shadow-xl"
        href={`/class/${classroom.id}`}
      >
        Open class
      </Link>
    </article>
  );
}

"use client";

import { useEffect } from "react";
import gsap from "gsap";

import type { Classroom } from "@/types";
import { todayDateISO } from "@/utils/helpers";

type AttendanceTableProps = {
  classroom: Classroom;
};

export function AttendanceTable({ classroom }: AttendanceTableProps) {
  const today = todayDateISO();
  const sortedRecords = [...classroom.attendance].sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    gsap.fromTo(
      ".attendance-row",
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power2.out" },
    );
  }, [classroom.id, classroom.attendance.length]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Attendance History</h3>

      {sortedRecords.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
          No attendance records yet. Be the first to mark present!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Attendees</th>
                <th className="px-3 py-2 text-right">Count</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((record) => (
                <tr className="attendance-row border-b border-slate-100" key={record.date}>
                  <td className="px-3 py-3 font-medium text-slate-800">
                    {record.date}
                    {record.date === today ? (
                      <span className="ml-2 rounded-lg bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-700">
                        Today
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-600">
                    <div className="flex flex-wrap gap-1">
                      {record.attendees.map((name) => (
                        <span
                          className="rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                          key={name}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right text-sm font-bold text-slate-800">
                    {record.attendees.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

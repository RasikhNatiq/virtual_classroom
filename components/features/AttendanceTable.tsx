"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

import type { Classroom, User } from "@/types";
import { todayDateISO } from "@/utils/helpers";
import { Button } from "@/components/ui/Button";

type AttendanceTableProps = {
  classroom: Classroom;
  users: User[];
  canEdit: boolean;
  onSave?: (presentStudentIds: string[]) => void;
};

export function AttendanceTable({ classroom, users, canEdit, onSave }: AttendanceTableProps) {
  const today = todayDateISO();
  const existing = classroom.attendance.find((record) => record.date === today);
  const [selected, setSelected] = useState<string[]>(existing?.present ?? []);

  const studentUsers = users.filter((user) => classroom.students.includes(user.id));

  useEffect(() => {
    gsap.fromTo(
      ".attendance-row",
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" },
    );
  }, [classroom.id, classroom.students.length]);

  const toggle = (studentId: string) => {
    setSelected((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Today&apos;s Attendance</h3>
          <p className="text-sm text-slate-500">{today}</p>
        </div>
        {canEdit && onSave ? (
          <Button onClick={() => onSave(selected)} type="button" variant="primary">
            Save attendance
          </Button>
        ) : null}
      </div>

      {studentUsers.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">
          No students have joined this class yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2">Student</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentUsers.map((student) => {
                const present = selected.includes(student.id);
                return (
                  <tr className="attendance-row border-b border-slate-100" key={student.id}>
                    <td className="px-3 py-3 font-medium text-slate-800">{student.name}</td>
                    <td className="px-3 py-3 text-sm text-slate-600">{student.email}</td>
                    <td className="px-3 py-3">
                      {canEdit ? (
                        <button
                          className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                            present
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                          onClick={() => toggle(student.id)}
                          type="button"
                        >
                          {present ? "Present" : "Absent"}
                        </button>
                      ) : (
                        <span
                          className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                            present
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {present ? "Present" : "Absent"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
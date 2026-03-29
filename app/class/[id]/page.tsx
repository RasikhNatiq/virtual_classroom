"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/features/ProtectedRoute";
import { AttendanceTable } from "@/components/features/AttendanceTable";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/use-auth";
import { useClassrooms } from "@/hooks/use-classrooms";
import { useToast } from "@/hooks/use-toast";
import { calculateAttendancePercentage, todayDateISO } from "@/utils/helpers";

export default function ClassDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, users } = useAuth();
  const { getClassById, markAttendanceByTeacher, markSelfPresent } = useClassrooms();
  const { showToast } = useToast();

  const classroom = getClassById(id);

  const canEditAttendance = classroom ? currentUser?.id === classroom.teacherId : false;
  const isStudentInClass = classroom ? classroom.students.includes(currentUser?.id ?? "") : false;

  const myAttendanceStats = useMemo(() => {
    if (!classroom || !currentUser || currentUser.role !== "student") {
      return null;
    }

    const totalSessions = classroom.attendance.length;
    const presentSessions = classroom.attendance.filter((record) =>
      record.present.includes(currentUser.id),
    ).length;

    return {
      totalSessions,
      presentSessions,
      percentage: calculateAttendancePercentage(totalSessions, presentSessions),
    };
  }, [classroom, currentUser]);

  if (!classroom) {
    return (
      <ProtectedRoute>
        <AppShell>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">Class not found</h1>
            <p className="mt-2 text-sm text-slate-600">This class may have been removed or the link is invalid.</p>
            <Link
              className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              href="/dashboard"
            >
              Back to dashboard
            </Link>
          </div>
        </AppShell>
      </ProtectedRoute>
    );
  }

  const handleTeacherSaveAttendance = (presentStudentIds: string[]) => {
    const date = todayDateISO();
    markAttendanceByTeacher({ classId: classroom.id, date, presentStudentIds });
    showToast({ title: "Attendance saved", tone: "success" });
  };

  const handleMarkSelf = () => {
    if (!currentUser) {
      return;
    }

    const result = markSelfPresent({ classId: classroom.id, studentId: currentUser.id });
    showToast({ title: result.ok ? "Attendance marked" : "Could not mark attendance", message: result.message, tone: result.ok ? "success" : "error" });
  };

  const exportCsv = () => {
    const header = ["date", "present_count", "absent_count"];
    const rows = classroom.attendance.map((record) => [
      record.date,
      String(record.present.length),
      String(record.absent.length),
    ]);

    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${classroom.name.replace(/\s+/g, "_")}_attendance.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ProtectedRoute>
      <AppShell>
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-700">{classroom.subject}</p>
                <h1 className="mt-1 text-2xl font-bold text-slate-900">{classroom.name}</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Class code: <span className="font-semibold text-slate-800">{classroom.code}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {canEditAttendance ? (
                  <Button onClick={exportCsv} variant="secondary">
                    Export CSV
                  </Button>
                ) : null}
                {currentUser?.role === "student" && isStudentInClass ? (
                  <Button onClick={handleMarkSelf} variant="primary">
                    Mark me present
                  </Button>
                ) : null}
              </div>
            </div>
          </section>

          {currentUser?.role === "student" && myAttendanceStats ? (
            <section className="grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Attendance percentage</p>
                <p className="mt-1 text-3xl font-bold text-cyan-700">{myAttendanceStats.percentage}%</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Present days</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{myAttendanceStats.presentSessions}</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Total sessions</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{myAttendanceStats.totalSessions}</p>
              </article>
            </section>
          ) : null}

          <AttendanceTable
            canEdit={canEditAttendance}
            classroom={classroom}
            key={`${classroom.id}-${todayDateISO()}`}
            onSave={canEditAttendance ? handleTeacherSaveAttendance : undefined}
            users={users}
          />

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Attendance history</h2>
            {classroom.attendance.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No attendance records yet.</p>
            ) : (
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Present</th>
                      <th className="px-3 py-2">Absent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classroom.attendance
                      .slice()
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map((record) => (
                        <tr className="border-b border-slate-100" key={record.date}>
                          <td className="px-3 py-3 text-sm font-medium text-slate-800">{record.date}</td>
                          <td className="px-3 py-3 text-sm text-emerald-700">{record.present.length}</td>
                          <td className="px-3 py-3 text-sm text-rose-700">{record.absent.length}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
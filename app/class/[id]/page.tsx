"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { AttendanceTable } from "@/components/features/AttendanceTable";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useClassrooms } from "@/hooks/use-classrooms";
import { useToast } from "@/hooks/use-toast";
import { todayDateISO } from "@/utils/helpers";

export default function ClassDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getClassById, markSelfPresent } = useClassrooms();
  const { showToast } = useToast();

  const [visitorName, setVisitorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const classroom = getClassById(id);

  if (!classroom) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Class not found</h1>
          <p className="mt-2 text-sm text-slate-600">This class does not exist or the link is invalid.</p>
          <Link
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            href="/"
          >
            Back to all classes
          </Link>
        </div>
      </div>
    );
  }

  const today = todayDateISO();
  const todayRecord = classroom.attendance.find((r) => r.date === today);
  const todayAttendees = todayRecord?.attendees ?? [];

  const handleMarkPresent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const result = markSelfPresent({ classId: classroom.id, name: visitorName });
    showToast({
      title: result.ok ? "Attendance marked!" : "Could not mark attendance",
      message: result.message,
      tone: result.ok ? "success" : "error",
    });

    if (result.ok) {
      setVisitorName("");
    }

    setIsSubmitting(false);
  };

  const exportCsv = () => {
    const header = ["date", "attendees"];
    const rows = classroom.attendance.map((record) => [
      record.date,
      `"${record.attendees.join("; ")}"`,
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_45%),radial-gradient(circle_at_90%_15%,_rgba(251,146,60,0.14),_transparent_40%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            href="/classes"
          >
            ← All classes
          </Link>
          <Button onClick={exportCsv} variant="secondary">
            Export CSV
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        {/* Class info */}
        <section className="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">{classroom.subject}</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{classroom.name}</h1>
          <p className="mt-0.5 text-sm text-slate-500">{classroom.professor}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-mono font-bold text-slate-700">
              {classroom.code}
            </span>
            <span className="rounded-xl bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              {todayAttendees.length} present today
            </span>
            <span className="rounded-xl bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
              {classroom.attendance.length} total sessions
            </span>
          </div>
        </section>

        {/* Mark attendance */}
        <section className="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-bold text-slate-900">Mark Your Attendance</h2>
          <p className="mt-1 text-sm text-slate-600">Enter your full name to mark yourself present for today&apos;s session.</p>

          <form className="mt-4 flex flex-wrap gap-3" onSubmit={handleMarkPresent}>
            <div className="flex-1 min-w-48">
              <Input
                id="visitor-name"
                label=""
                onChange={(event) => setVisitorName(event.target.value)}
                placeholder="Your full name"
                required
                value={visitorName}
              />
            </div>
            <div className="flex items-end">
              <Button isLoading={isSubmitting} type="submit">
                Mark present
              </Button>
            </div>
          </form>

          {todayAttendees.length > 0 ? (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Present today ({todayAttendees.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {todayAttendees.map((name) => (
                  <span
                    className="rounded-xl bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800"
                    key={name}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* Attendance history */}
        <AttendanceTable classroom={classroom} />
      </main>
    </div>
  );
}

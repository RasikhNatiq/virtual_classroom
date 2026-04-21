"use client";

import Link from "next/link";

import { useClassrooms } from "@/hooks/use-classrooms";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { todayDateISO } from "@/utils/helpers";


export default function ClassesPage() {
  const { classes } = useClassrooms();
  const today = todayDateISO();

  useGsapReveal(".class-card", [classes.length], { y: 16, duration: 0.45, stagger: 0.05 });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_45%),radial-gradient(circle_at_90%_15%,_rgba(251,146,60,0.14),_transparent_40%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-70">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Attendance Cloud</p>
              <p className="text-sm font-bold">Virtual Classroom Attendance</p>
            </div>
          </Link>
          <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            {today}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">All Classrooms</p>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Explore &amp; Attend Classes</h1>
            <p className="mt-2 text-sm text-slate-600">
              Select any class below, enter your name, and mark yourself present for today&apos;s session.
            </p>
          </div>
          <Link
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            href="/"
          >
            ← Back
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {classes.map((classroom) => {
            const todayRecord = classroom.attendance.find((r) => r.date === today);
            const todayCount = todayRecord?.attendees.length ?? 0;
            const totalSessions = classroom.attendance.length;

            return (
              <article
                className="class-card group rounded-3xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur transition-all hover:shadow-xl hover:-translate-y-1"
                key={classroom.id}
              >
                <div className="mb-4 h-2 w-24 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600" />

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">{classroom.subject}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{classroom.name}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{classroom.professor}</p>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-mono font-bold text-slate-700">
                    {classroom.code}
                  </span>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-emerald-50 p-3">
                    <p className="text-xs text-emerald-700">Present today</p>
                    <p className="mt-0.5 text-xl font-bold text-emerald-900">{todayCount}</p>
                  </div>
                  <div className="rounded-2xl bg-sky-50 p-3">
                    <p className="text-xs text-sky-700">Total sessions</p>
                    <p className="mt-0.5 text-xl font-bold text-sky-900">{totalSessions}</p>
                  </div>
                </div>

                <Link
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-600/20 transition-all hover:-translate-y-0.5 hover:from-cyan-500 hover:to-sky-500 hover:shadow-2xl"
                  href={`/class/${classroom.id}`}
                >
                  Enter classroom →
                </Link>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

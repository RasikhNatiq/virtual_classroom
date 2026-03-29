"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const featureCards = [
  {
    title: "Teacher Workspace",
    description:
      "Create classes in seconds, distribute class codes instantly, and manage attendance from one clean dashboard.",
    accent: "from-cyan-500 to-sky-600",
  },
  {
    title: "Student Experience",
    description:
      "Join classes with a code, mark attendance with one tap, and track your personal attendance history over time.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    title: "Attendance Insights",
    description:
      "Review daily attendance records, identify absences quickly, and export reports whenever you need them.",
    accent: "from-orange-500 to-amber-600",
  },
];

const steps = [
  {
    step: "01",
    title: "Create account",
    text: "Choose Teacher or Student role and create your profile in under a minute.",
  },
  {
    step: "02",
    title: "Create or join class",
    text: "Teachers create classes and share a generated class code. Students join with that code.",
  },
  {
    step: "03",
    title: "Track attendance daily",
    text: "Mark attendance and monitor attendance performance with clear history and reports.",
  },
];

const testimonials = [
  {
    name: "Ananya Rao",
    role: "Math Teacher",
    quote:
      "I replaced spreadsheets completely. The class code flow and attendance table are exactly what I needed.",
  },
  {
    name: "Daniel Kim",
    role: "Student",
    quote:
      "Joining class is simple and I can always check my attendance percentage before exams.",
  },
];

export default function Home() {
  const { currentUser } = useAuth();

  useGsapReveal(".landing-reveal", [], { y: 20, duration: 0.55, stagger: 0.08 });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_45%),radial-gradient(circle_at_90%_15%,_rgba(251,146,60,0.14),_transparent_40%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Attendance Cloud</p>
            <p className="text-sm font-bold">Virtual Classroom Attendance</p>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              href="/signup"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
          <div className="landing-reveal">
            <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-800">
              SaaS-ready Attendance Platform
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Run classroom attendance with speed, clarity, and zero spreadsheet chaos.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
              A modern attendance workspace for teachers and students. Create classes, join with class codes, and track every session confidently.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                className="rounded-2xl bg-gradient-to-r from-cyan-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-600/20 hover:from-cyan-500 hover:to-sky-500"
                href="/signup"
              >
                Get started free
              </Link>
              <Link
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                href={currentUser ? "/dashboard" : "/login"}
              >
                {currentUser ? "Open dashboard" : "I already have an account"}
              </Link>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60">
                <p className="text-2xl font-extrabold">99.9%</p>
                <p className="text-xs text-slate-500">Attendance logging reliability</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60">
                <p className="text-2xl font-extrabold">1-tap</p>
                <p className="text-xs text-slate-500">Student self check-in</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60">
                <p className="text-2xl font-extrabold">Live</p>
                <p className="text-xs text-slate-500">Role-based dashboard</p>
              </div>
            </div>
          </div>

          <aside className="landing-reveal rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-semibold text-slate-500">Today at a glance</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-wider text-cyan-700">Classroom</p>
                <p className="mt-1 text-lg font-bold">Physics - Grade 10</p>
                <p className="mt-1 text-sm text-slate-500">Code: AB12CD</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-700">Present</p>
                  <p className="mt-1 text-2xl font-extrabold text-emerald-900">28</p>
                </div>
                <div className="rounded-2xl bg-rose-50 p-4">
                  <p className="text-xs text-rose-700">Absent</p>
                  <p className="mt-1 text-2xl font-extrabold text-rose-900">4</p>
                </div>
              </div>
              <div className="rounded-2xl bg-slate-900 p-4 text-white">
                <p className="text-xs uppercase tracking-wider text-cyan-200">Export-ready</p>
                <p className="mt-1 text-sm text-slate-200">Attendance reports downloadable as CSV for records and audits.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <div className="landing-reveal mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Features</p>
            <h2 className="mt-2 text-3xl font-extrabold">Everything you need to run attendance operations</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featureCards.map((feature) => (
              <article
                className="landing-reveal rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1"
                key={feature.title}
              >
                <div className={`mb-4 h-2 w-24 rounded-full bg-gradient-to-r ${feature.accent}`} />
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <div className="landing-reveal rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">How it works</p>
            <h2 className="mt-2 text-3xl font-extrabold">Start in minutes, scale across classrooms</h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((item) => (
                <article className="landing-reveal rounded-2xl bg-slate-50 p-4" key={item.step}>
                  <p className="text-sm font-bold text-cyan-700">{item.step}</p>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <div className="landing-reveal mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Loved by users</p>
            <h2 className="mt-2 text-3xl font-extrabold">Trusted by teachers and students</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article className="landing-reveal rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" key={testimonial.name}>
                <p className="text-base italic text-slate-700">&quot;{testimonial.quote}&quot;</p>
                <p className="mt-4 text-sm font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6">
          <div className="landing-reveal rounded-[2rem] bg-slate-900 px-6 py-10 text-white shadow-2xl sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Launch today</p>
                <h2 className="mt-2 text-3xl font-extrabold">Bring structure to every attendance session.</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
                  href="/signup"
                >
                  Create account
                </Link>
                <Link
                  className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  href="/login"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="font-bold text-slate-800">Virtual Classroom Attendance</p>
            <p className="text-xs">Built for modern digital classrooms.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link className="hover:text-slate-900" href="/login">
              Login
            </Link>
            <Link className="hover:text-slate-900" href="/signup">
              Sign up
            </Link>
            <Link className="hover:text-slate-900" href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

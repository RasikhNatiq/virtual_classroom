"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/features/ProtectedRoute";
import { ClassCard } from "@/components/features/ClassCard";
import { EmptyState } from "@/components/features/EmptyState";
import { useAuth } from "@/hooks/use-auth";
import { useClassrooms } from "@/hooks/use-classrooms";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export default function DashboardPage() {
  const { currentUser, isReady: authReady } = useAuth();
  const { getClassesForStudent, getClassesForTeacher, isReady: classesReady } = useClassrooms();

  const classes = currentUser
    ? currentUser.role === "teacher"
      ? getClassesForTeacher(currentUser.id)
      : getClassesForStudent(currentUser.id)
    : [];

  useGsapReveal(".class-card", [classes.length, currentUser?.role]);

  return (
    <ProtectedRoute>
      <AppShell>
        {!authReady || !classesReady ? (
          <div className="grid min-h-[40vh] place-items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-r-transparent" />
          </div>
        ) : (
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-cyan-700">Overview</p>
                  <h1 className="mt-1 text-2xl font-bold text-slate-900">
                    Welcome, {currentUser?.name?.split(" ")[0]}
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    {currentUser?.role === "teacher"
                      ? "Create classes, track participation, and review attendance reports."
                      : "Join classes, mark your daily attendance, and monitor your consistency."}
                  </p>
                </div>

                <div className="flex gap-2">
                  {currentUser?.role === "teacher" ? (
                    <Link
                      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                      href="/create-class"
                    >
                      Create class
                    </Link>
                  ) : (
                    <Link
                      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                      href="/join-class"
                    >
                      Join class
                    </Link>
                  )}
                </div>
              </div>
            </section>

            <section>
              {classes.length === 0 ? (
                <EmptyState
                  ctaHref={currentUser?.role === "teacher" ? "/create-class" : "/join-class"}
                  ctaLabel={currentUser?.role === "teacher" ? "Create your first class" : "Join your first class"}
                  description={
                    currentUser?.role === "teacher"
                      ? "No classes yet. Create your first classroom and start tracking attendance."
                      : "You have not joined any classes yet. Use a class code shared by your teacher."
                  }
                  title="No classrooms found"
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {classes.map((classroom) => (
                    <ClassCard
                      classroom={classroom}
                      key={classroom.id}
                      myUserId={currentUser?.role === "student" ? currentUser.id : undefined}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </AppShell>
    </ProtectedRoute>
  );
}
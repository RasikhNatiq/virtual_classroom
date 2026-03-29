"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/features/ProtectedRoute";
import { RoleGuard } from "@/components/features/RoleGuard";
import { ClassCard } from "@/components/features/ClassCard";
import { EmptyState } from "@/components/features/EmptyState";
import { useAuth } from "@/hooks/use-auth";
import { useClassrooms } from "@/hooks/use-classrooms";

export default function TeacherPage() {
  const { currentUser } = useAuth();
  const { getClassesForTeacher } = useClassrooms();

  const classes = currentUser ? getClassesForTeacher(currentUser.id) : [];
  const totalStudents = classes.reduce((sum, classroom) => sum + classroom.students.length, 0);

  return (
    <ProtectedRoute>
      <RoleGuard role="teacher">
        <AppShell>
          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Classes</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{classes.length}</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Enrollments</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{totalStudents}</p>
              </article>
              <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Attendance sessions</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {classes.reduce((sum, classroom) => sum + classroom.attendance.length, 0)}
                </p>
              </article>
            </section>

            {classes.length === 0 ? (
              <EmptyState
                ctaHref="/create-class"
                ctaLabel="Create class"
                description="Start by creating a classroom and sharing the class code with your students."
                title="No classes yet"
              />
            ) : (
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {classes.map((classroom) => (
                  <ClassCard classroom={classroom} key={classroom.id} />
                ))}
              </section>
            )}
          </div>
        </AppShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}
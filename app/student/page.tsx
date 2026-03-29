"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/features/ProtectedRoute";
import { RoleGuard } from "@/components/features/RoleGuard";
import { ClassCard } from "@/components/features/ClassCard";
import { EmptyState } from "@/components/features/EmptyState";
import { useAuth } from "@/hooks/use-auth";
import { useClassrooms } from "@/hooks/use-classrooms";

export default function StudentPage() {
  const { currentUser } = useAuth();
  const { getClassesForStudent } = useClassrooms();

  const classes = currentUser ? getClassesForStudent(currentUser.id) : [];

  return (
    <ProtectedRoute>
      <RoleGuard role="student">
        <AppShell>
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-slate-900">Student Hub</h1>
              <p className="mt-2 text-sm text-slate-600">
                Join classes, mark attendance, and keep your attendance percentage high.
              </p>
            </section>

            {classes.length === 0 ? (
              <EmptyState
                ctaHref="/join-class"
                ctaLabel="Join class"
                description="You are not enrolled in any classes yet. Enter a class code to begin."
                title="No enrolled classes"
              />
            ) : (
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {classes.map((classroom) => (
                  <ClassCard classroom={classroom} key={classroom.id} myUserId={currentUser?.id} />
                ))}
              </section>
            )}
          </div>
        </AppShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}
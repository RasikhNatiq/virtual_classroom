"use client";

import { useState } from "react";
import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/features/ProtectedRoute";
import { RoleGuard } from "@/components/features/RoleGuard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/use-auth";
import { useClassrooms } from "@/hooks/use-classrooms";
import { useToast } from "@/hooks/use-toast";

export default function JoinClassPage() {
  const { currentUser } = useAuth();
  const { joinClassByCode } = useClassrooms();
  const { showToast } = useToast();

  const [code, setCode] = useState("");

  const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser) {
      return;
    }

    const result = joinClassByCode({ code, studentId: currentUser.id });
    if (!result.ok) {
      showToast({ title: "Unable to join", message: result.message, tone: "error" });
      return;
    }

    showToast({ title: "Joined class", message: result.message, tone: "success" });
    setCode("");
  };

  return (
    <ProtectedRoute>
      <RoleGuard role="student">
        <AppShell>
          <div className="mx-auto max-w-2xl space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Join Class</h1>
              <p className="mt-1 text-sm text-slate-600">Enter the class code shared by your teacher.</p>
            </div>

            <form className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleJoin}>
              <Input
                id="class-code"
                label="Class code"
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                placeholder="AB12CD"
                required
                value={code}
              />

              <div className="mt-5 flex flex-wrap gap-2">
                <Button type="submit">Join class</Button>
                <Link
                  className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  href="/student"
                >
                  Back to student hub
                </Link>
              </div>
            </form>
          </div>
        </AppShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/features/ProtectedRoute";
import { RoleGuard } from "@/components/features/RoleGuard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/hooks/use-auth";
import { useClassrooms } from "@/hooks/use-classrooms";
import { useToast } from "@/hooks/use-toast";

export default function CreateClassPage() {
  const { currentUser } = useAuth();
  const { createClass } = useClassrooms();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdCode, setCreatedCode] = useState("");

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser) {
      return;
    }

    if (name.trim().length < 2 || subject.trim().length < 2) {
      showToast({ title: "Invalid input", message: "Class name and subject are required.", tone: "error" });
      return;
    }

    const created = createClass({ name, subject, teacherId: currentUser.id });
    setCreatedCode(created.code);
    setIsModalOpen(true);
    setName("");
    setSubject("");
    showToast({ title: "Class created", tone: "success" });
  };

  return (
    <ProtectedRoute>
      <RoleGuard role="teacher">
        <AppShell>
          <div className="mx-auto max-w-2xl space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Create Class</h1>
              <p className="mt-1 text-sm text-slate-600">Set up a classroom and share the generated code with students.</p>
            </div>

            <form className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleCreate}>
              <div className="space-y-4">
                <Input
                  id="class-name"
                  label="Class name"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Grade 10 - Section A"
                  required
                  value={name}
                />
                <Input
                  id="class-subject"
                  label="Subject"
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Physics"
                  required
                  value={subject}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button type="submit">Create class</Button>
                <Link
                  className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  href="/teacher"
                >
                  Back to teacher hub
                </Link>
              </div>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Class created successfully">
              <p className="text-sm text-slate-600">Share this class code with your students to let them join.</p>
              <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-center text-2xl font-bold tracking-widest text-white">
                {createdCode}
              </div>
              <div className="mt-5">
                <Button className="w-full" onClick={() => setIsModalOpen(false)} type="button" variant="secondary">
                  Close
                </Button>
              </div>
            </Modal>
          </div>
        </AppShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}
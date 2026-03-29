"use client";

import { AuthProvider } from "@/store/auth-context";
import { ClassroomProvider } from "@/store/classroom-context";
import { ToastProvider } from "@/store/toast-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ClassroomProvider>{children}</ClassroomProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
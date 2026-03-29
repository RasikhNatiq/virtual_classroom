"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/types";

type RoleGuardProps = {
  role: UserRole;
  children: React.ReactNode;
};

export function RoleGuard({ role, children }: RoleGuardProps) {
  const router = useRouter();
  const { currentUser, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    if (currentUser.role !== role) {
      router.replace("/dashboard");
    }
  }, [currentUser, isReady, role, router]);

  if (!isReady || !currentUser || currentUser.role !== role) {
    return (
      <div className="grid min-h-[40vh] place-items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-r-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
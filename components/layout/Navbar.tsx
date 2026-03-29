"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";

type NavbarProps = {
  onOpenMenu: () => void;
};

export function Navbar({ onOpenMenu }: NavbarProps) {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast({ title: "Signed out", tone: "success" });
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open sidebar"
            className="inline-flex rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-sm font-semibold text-slate-700 lg:hidden"
            onClick={onOpenMenu}
            type="button"
          >
            Menu
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-700">Attendance Cloud</p>
            <p className="text-sm font-semibold text-slate-900">Virtual Classroom Attendance</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">{currentUser?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{currentUser?.role}</p>
          </div>
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
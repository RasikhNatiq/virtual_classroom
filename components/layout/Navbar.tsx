"use client";

import Link from "next/link";

type NavbarProps = {
  onOpenMenu: () => void;
};

export function Navbar({ onOpenMenu }: NavbarProps) {
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

        <Link
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          href="/"
        >
          All classes
        </Link>
      </div>
    </header>
  );
}
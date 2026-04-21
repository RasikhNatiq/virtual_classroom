"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Animate only on route changes, not on every render caused by local form input state.
  useGsapReveal(".shell-content", [pathname], { y: 10, duration: 0.35, stagger: 0.03 });

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,#ecfeff,transparent_60%),radial-gradient(circle_at_bottom_right,#eff6ff,transparent_55%)]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar onOpenMenu={() => setIsSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
          <div className="shell-content">{children}</div>
        </main>
      </div>
    </div>
  );
}
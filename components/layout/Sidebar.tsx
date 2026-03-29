"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import { useAuth } from "@/hooks/use-auth";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LinkItem = {
  href: string;
  label: string;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const commonLinks: LinkItem[] = [{ href: "/dashboard", label: "Dashboard" }];
  const teacherLinks: LinkItem[] = [
    { href: "/teacher", label: "Teacher Hub" },
    { href: "/create-class", label: "Create Class" },
  ];
  const studentLinks: LinkItem[] = [
    { href: "/student", label: "Student Hub" },
    { href: "/join-class", label: "Join Class" },
  ];

  const links = [
    ...commonLinks,
    ...(currentUser?.role === "teacher" ? teacherLinks : studentLinks),
  ];

  useEffect(() => {
    if (!panelRef.current) {
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      gsap.set(panelRef.current, { x: 0 });
      return;
    }

    gsap.to(panelRef.current, {
      x: isOpen ? 0 : -320,
      duration: 0.32,
      ease: "power2.out",
    });
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-slate-900/30 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className="fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200 bg-white/95 p-4 backdrop-blur lg:sticky lg:top-0 lg:z-10 lg:translate-x-0"
      >
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 p-4 text-white">
          <p className="text-xs uppercase tracking-wider text-cyan-100">Role</p>
          <p className="text-lg font-bold capitalize">{currentUser?.role ?? "Guest"}</p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                className={`block rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
                href={link.href}
                key={link.href}
                onClick={onClose}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
"use client";

import { AuthForm } from "@/components/features/AuthForm";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export default function LoginPage() {
  useGsapReveal(".auth-card", [], { y: 20, duration: 0.5, stagger: 0.06 });

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_#e0f2fe,_transparent_55%),linear-gradient(to_bottom,_#f8fafc,_#eef2ff)] px-4 py-10">
      <div className="auth-card w-full max-w-5xl rounded-[2rem] border border-white/70 bg-white/30 p-4 backdrop-blur-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <section className="rounded-3xl bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">SaaS Classroom Suite</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">Track attendance without spreadsheets.</h2>
            <p className="mt-3 text-sm text-slate-300">
              Manage live classes, mark attendance in real time, and keep historical records in a single interface.
            </p>
          </section>
          <AuthForm mode="login" />
        </div>
      </div>
    </div>
  );
}
"use client";

import { AuthForm } from "@/components/features/AuthForm";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export default function SignupPage() {
  useGsapReveal(".auth-card", [], { y: 20, duration: 0.5, stagger: 0.06 });

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_#ccfbf1,_transparent_55%),linear-gradient(to_bottom,_#f8fafc,_#f0fdfa)] px-4 py-10">
      <div className="auth-card w-full max-w-5xl rounded-[2rem] border border-white/70 bg-white/30 p-4 backdrop-blur-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <section className="rounded-3xl bg-slate-900 p-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Launch Your Classroom</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight">Start teaching or learning instantly.</h2>
            <p className="mt-3 text-sm text-slate-300">
              Create your account, join classes with secure codes, and build reliable attendance records from day one.
            </p>
          </section>
          <AuthForm mode="signup" />
        </div>
      </div>
    </div>
  );
}
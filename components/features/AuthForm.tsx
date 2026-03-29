"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import type { UserRole } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type AuthFormMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthFormMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const validation = useMemo(() => {
    if (isSignup && name.trim().length < 2) {
      return "Name should be at least 2 characters.";
    }
    if (!email.includes("@")) {
      return "Please provide a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  }, [email, isSignup, name, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validation) {
      showToast({ title: "Validation error", message: validation, tone: "error" });
      return;
    }

    setIsSubmitting(true);

    const result = await (isSignup
      ? signup({ name, email, password, role })
      : login({ email, password }));

    if (!result.ok) {
      showToast({ title: "Could not continue", message: result.message, tone: "error" });
      setIsSubmitting(false);
      return;
    }

    showToast({ title: isSignup ? "Account created" : "Login successful", tone: "success" });
    router.replace("/dashboard");
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-6 shadow-2xl backdrop-blur">
      <div className="mb-6">
        <p className="text-sm font-medium text-cyan-700">Virtual Classroom Attendance</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {isSignup
            ? "Set up your teacher or student profile in seconds."
            : "Log in to manage classes and attendance."}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {isSignup ? (
          <Input
            id="name"
            label="Full name"
            onChange={(event) => setName(event.target.value)}
            placeholder="John Doe"
            required
            value={name}
          />
        ) : null}

        <Input
          id="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />

        <Input
          id="password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="******"
          required
          type="password"
          value={password}
        />

        {isSignup ? (
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Role</p>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
              <button
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  role === "student" ? "bg-white text-slate-900 shadow" : "text-slate-600"
                }`}
                onClick={() => setRole("student")}
                type="button"
              >
                Student
              </button>
              <button
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  role === "teacher" ? "bg-white text-slate-900 shadow" : "text-slate-600"
                }`}
                onClick={() => setRole("teacher")}
                type="button"
              >
                Teacher
              </button>
            </div>
          </div>
        ) : null}

        <Button className="w-full" isLoading={isSubmitting} type="submit">
          {isSignup ? "Create account" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {isSignup ? "Already have an account?" : "New here?"} {" "}
        <Link className="font-semibold text-cyan-700 hover:text-cyan-600" href={isSignup ? "/login" : "/signup"}>
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
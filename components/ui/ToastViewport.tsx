"use client";

import { useEffect } from "react";
import gsap from "gsap";

import { useToast } from "@/hooks/use-toast";

const toneClassMap = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
} as const;

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    gsap.fromTo(
      ".toast-item",
      { autoAlpha: 0, x: 18 },
      { autoAlpha: 1, x: 0, duration: 0.24, stagger: 0.05, ease: "power2.out" },
    );
  }, [toasts]);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-xs flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item pointer-events-auto rounded-2xl border p-3 shadow-lg ${toneClassMap[toast.tone]}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.message ? <p className="mt-1 text-xs opacity-85">{toast.message}</p> : null}
            </div>
            <button
              className="rounded-md px-1 text-xs font-bold opacity-70 hover:opacity-100"
              onClick={() => dismissToast(toast.id)}
              type="button"
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
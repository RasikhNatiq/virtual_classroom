"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { Toast, ToastTone } from "@/types";
import { createId } from "@/utils/helpers";

type ToastContextValue = {
  toasts: Toast[];
  showToast: (input: { title: string; message?: string; tone?: ToastTone }) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, tone = "info" }: { title: string; message?: string; tone?: ToastTone }) => {
      const id = createId("toast");
      setToasts((prev) => [...prev, { id, title, message, tone }]);

      window.setTimeout(() => {
        dismissToast(id);
      }, 3200);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast, toasts],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider");
  }
  return context;
}
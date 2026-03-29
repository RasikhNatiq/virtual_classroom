"use client";

import { useToastContext } from "@/store/toast-context";

export function useToast() {
  return useToastContext();
}
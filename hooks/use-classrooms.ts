"use client";

import { useClassroomContext } from "@/store/classroom-context";

export function useClassrooms() {
  return useClassroomContext();
}
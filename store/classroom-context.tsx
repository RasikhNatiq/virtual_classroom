"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { PREDEFINED_CLASSES, STORAGE_KEYS } from "@/lib/constants";
import type { AttendanceRecord, Classroom } from "@/types";
import { todayDateISO } from "@/utils/helpers";
import { getData, setData } from "@/utils/storage";

type AttendanceStore = Record<string, AttendanceRecord[]>;

type ClassroomContextValue = {
  classes: Classroom[];
  isReady: boolean;
  markSelfPresent: (input: { classId: string; name: string }) => { ok: boolean; message: string };
  getClassById: (id: string) => Classroom | undefined;
};

const ClassroomContext = createContext<ClassroomContextValue | null>(null);

function buildClasses(store: AttendanceStore): Classroom[] {
  return PREDEFINED_CLASSES.map((base) => ({
    ...base,
    attendance: store[base.id] ?? [],
  }));
}

export function ClassroomProvider({ children }: { children: React.ReactNode }) {
  const [attendanceStore, setAttendanceStore] = useState<AttendanceStore>(() =>
    getData<AttendanceStore>(STORAGE_KEYS.attendance, {}),
  );
  const [isReady] = useState(true);

  const classes = useMemo(() => buildClasses(attendanceStore), [attendanceStore]);

  const persist = useCallback((next: AttendanceStore) => {
    setAttendanceStore(next);
    setData(STORAGE_KEYS.attendance, next);
  }, []);

  const markSelfPresent = useCallback(
    ({ classId, name }: { classId: string; name: string }) => {
      const trimmedName = name.trim();
      if (!trimmedName) {
        return { ok: false, message: "Please enter your name." };
      }

      const today = todayDateISO();
      const existingRecords = attendanceStore[classId] ?? [];
      const todayRecord = existingRecords.find((r) => r.date === today);

      if (todayRecord?.attendees.some((n) => n.toLowerCase() === trimmedName.toLowerCase())) {
        return { ok: false, message: "You have already marked your attendance for today." };
      }

      const updatedRecord: AttendanceRecord = {
        date: today,
        attendees: [...(todayRecord?.attendees ?? []), trimmedName],
      };

      const updatedRecords = todayRecord
        ? existingRecords.map((r) => (r.date === today ? updatedRecord : r))
        : [...existingRecords, updatedRecord];

      persist({ ...attendanceStore, [classId]: updatedRecords });
      return { ok: true, message: `Attendance marked for ${trimmedName}.` };
    },
    [attendanceStore, persist],
  );

  const getClassById = useCallback(
    (id: string) => classes.find((item) => item.id === id),
    [classes],
  );

  const value = useMemo(
    () => ({ classes, isReady, markSelfPresent, getClassById }),
    [classes, getClassById, isReady, markSelfPresent],
  );

  return <ClassroomContext.Provider value={value}>{children}</ClassroomContext.Provider>;
}

export function useClassroomContext(): ClassroomContextValue {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error("useClassroomContext must be used within ClassroomProvider");
  }
  return context;
}

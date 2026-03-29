"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import type { AttendanceRecord, Classroom } from "@/types";
import { createClassCode, createId, todayDateISO } from "@/utils/helpers";
import { getData, setData } from "@/utils/storage";

type ClassroomContextValue = {
  classes: Classroom[];
  isReady: boolean;
  createClass: (input: { name: string; subject: string; teacherId: string }) => Classroom;
  joinClassByCode: (input: { code: string; studentId: string }) => { ok: boolean; message: string };
  markAttendanceByTeacher: (input: { classId: string; date: string; presentStudentIds: string[] }) => void;
  markSelfPresent: (input: { classId: string; studentId: string }) => { ok: boolean; message: string };
  getClassById: (id: string) => Classroom | undefined;
  getClassesForTeacher: (teacherId: string) => Classroom[];
  getClassesForStudent: (studentId: string) => Classroom[];
};

const ClassroomContext = createContext<ClassroomContextValue | null>(null);

function upsertAttendance(records: AttendanceRecord[], nextRecord: AttendanceRecord): AttendanceRecord[] {
  const existingIndex = records.findIndex((record) => record.date === nextRecord.date);
  if (existingIndex === -1) {
    return [...records, nextRecord];
  }

  const copy = [...records];
  copy[existingIndex] = nextRecord;
  return copy;
}

export function ClassroomProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<Classroom[]>(() => getData<Classroom[]>(STORAGE_KEYS.classes, []));
  const [isReady] = useState(true);

  const persist = useCallback((next: Classroom[]) => {
    setClasses(next);
    setData(STORAGE_KEYS.classes, next);
  }, []);

  const createClass = useCallback(
    ({ name, subject, teacherId }: { name: string; subject: string; teacherId: string }) => {
      let code = createClassCode();
      while (classes.some((item) => item.code === code)) {
        code = createClassCode();
      }

      const classroom: Classroom = {
        id: createId("class"),
        name: name.trim(),
        subject: subject.trim(),
        teacherId,
        code,
        students: [],
        attendance: [],
      };

      persist([...classes, classroom]);
      return classroom;
    },
    [classes, persist],
  );

  const joinClassByCode = useCallback(
    ({ code, studentId }: { code: string; studentId: string }) => {
      const normalizedCode = code.trim().toUpperCase();
      const target = classes.find((item) => item.code === normalizedCode);

      if (!target) {
        return { ok: false, message: "Class code not found." };
      }

      if (target.students.includes(studentId)) {
        return { ok: false, message: "You are already enrolled in this class." };
      }

      const next = classes.map((item) => {
        if (item.id !== target.id) {
          return item;
        }
        return {
          ...item,
          students: [...item.students, studentId],
        };
      });

      persist(next);
      return { ok: true, message: `Joined ${target.name}.` };
    },
    [classes, persist],
  );

  const markAttendanceByTeacher = useCallback(
    ({ classId, date, presentStudentIds }: { classId: string; date: string; presentStudentIds: string[] }) => {
      const next = classes.map((item) => {
        if (item.id !== classId) {
          return item;
        }

        const present = item.students.filter((studentId) => presentStudentIds.includes(studentId));
        const absent = item.students.filter((studentId) => !present.includes(studentId));
        const attendance = upsertAttendance(item.attendance, { date, present, absent });

        return {
          ...item,
          attendance,
        };
      });

      persist(next);
    },
    [classes, persist],
  );

  const markSelfPresent = useCallback(
    ({ classId, studentId }: { classId: string; studentId: string }) => {
      const target = classes.find((item) => item.id === classId);
      if (!target) {
        return { ok: false, message: "Class not found." };
      }

      if (!target.students.includes(studentId)) {
        return { ok: false, message: "You are not enrolled in this class." };
      }

      const today = todayDateISO();
      const existing = target.attendance.find((record) => record.date === today);
      if (existing?.present.includes(studentId)) {
        return { ok: false, message: "Attendance already marked for today." };
      }

      const next = classes.map((item) => {
        if (item.id !== classId) {
          return item;
        }

        const currentRecord: AttendanceRecord =
          item.attendance.find((record) => record.date === today) ?? {
            date: today,
            present: [],
            absent: item.students,
          };

        const present = Array.from(new Set([...currentRecord.present, studentId]));
        const absent = item.students.filter((id) => !present.includes(id));

        return {
          ...item,
          attendance: upsertAttendance(item.attendance, { date: today, present, absent }),
        };
      });

      persist(next);
      return { ok: true, message: "Attendance marked for today." };
    },
    [classes, persist],
  );

  const getClassById = useCallback(
    (id: string) => classes.find((item) => item.id === id),
    [classes],
  );

  const getClassesForTeacher = useCallback(
    (teacherId: string) => classes.filter((item) => item.teacherId === teacherId),
    [classes],
  );

  const getClassesForStudent = useCallback(
    (studentId: string) => classes.filter((item) => item.students.includes(studentId)),
    [classes],
  );

  const value = useMemo(
    () => ({
      classes,
      isReady,
      createClass,
      joinClassByCode,
      markAttendanceByTeacher,
      markSelfPresent,
      getClassById,
      getClassesForTeacher,
      getClassesForStudent,
    }),
    [classes, createClass, getClassById, getClassesForStudent, getClassesForTeacher, isReady, joinClassByCode, markAttendanceByTeacher, markSelfPresent],
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
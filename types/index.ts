export type UserRole = "teacher" | "student";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type AttendanceRecord = {
  date: string;
  present: string[];
  absent: string[];
};

export type Classroom = {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  code: string;
  students: string[];
  attendance: AttendanceRecord[];
};

export type ToastTone = "success" | "error" | "info";

export type Toast = {
  id: string;
  title: string;
  message?: string;
  tone: ToastTone;
};
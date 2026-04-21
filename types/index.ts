// Kept for backward compatibility with auth-context
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
  attendees: string[]; // names of attendees who marked present
};

export type Classroom = {
  id: string;
  name: string;
  subject: string;
  code: string;
  professor: string;
  attendance: AttendanceRecord[];
};

export type ToastTone = "success" | "error" | "info";

export type Toast = {
  id: string;
  title: string;
  message?: string;
  tone: ToastTone;
};

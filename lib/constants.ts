import type { Classroom } from "@/types";

export const STORAGE_KEYS = {
  users: "vca_users",
  currentUser: "vca_current_user",
  classes: "vca_classes",
  attendance: "vca_v2_attendance",
} as const;

export const PREDEFINED_CLASSES: Omit<Classroom, "attendance">[] = [
  { id: "class_cs101", name: "Introduction to Computer Science", subject: "Computer Science", code: "CS101A", professor: "Prof. Alan Turing" },
  { id: "class_math201", name: "Calculus II", subject: "Mathematics", code: "MTH201X", professor: "Prof. Emmy Noether" },
  { id: "class_phy301", name: "Quantum Physics", subject: "Physics", code: "PHY301Q", professor: "Prof. Richard Feynman" },
  { id: "class_eng101", name: "English Literature", subject: "English", code: "ENG101L", professor: "Prof. Virginia Woolf" },
  { id: "class_chem201", name: "Organic Chemistry", subject: "Chemistry", code: "CHM201O", professor: "Prof. Marie Curie" },
  { id: "class_bio101", name: "Cell Biology", subject: "Biology", code: "BIO101C", professor: "Prof. Rosalind Franklin" },
  { id: "class_hist301", name: "World History", subject: "History", code: "HST301W", professor: "Prof. Howard Zinn" },
  { id: "class_psych201", name: "Cognitive Psychology", subject: "Psychology", code: "PSY201C", professor: "Prof. Carl Jung" },
  { id: "class_econ101", name: "Macroeconomics", subject: "Economics", code: "ECN101M", professor: "Prof. John Keynes" },
  { id: "class_cs301", name: "Data Structures & Algorithms", subject: "Computer Science", code: "CS301D", professor: "Prof. Donald Knuth" },
  { id: "class_math301", name: "Linear Algebra", subject: "Mathematics", code: "MTH301L", professor: "Prof. Leonhard Euler" },
  { id: "class_phy101", name: "Classical Mechanics", subject: "Physics", code: "PHY101C", professor: "Prof. Isaac Newton" },
  { id: "class_art201", name: "Modern Art History", subject: "Art", code: "ART201M", professor: "Prof. Frida Kahlo" },
  { id: "class_stat101", name: "Statistics & Probability", subject: "Statistics", code: "STA101P", professor: "Prof. Florence Nightingale" },
  { id: "class_cs201", name: "Web Development", subject: "Computer Science", code: "CS201W", professor: "Prof. Tim Berners-Lee" },
];

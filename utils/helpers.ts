export function createId(prefix: string): string {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${randomPart}`;
}

export function createClassCode(length = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < length; i += 1) {
    const index = Math.floor(Math.random() * chars.length);
    code += chars[index];
  }

  return code;
}

export function todayDateISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function calculateAttendancePercentage(total: number, present: number): number {
  if (total === 0) {
    return 0;
  }
  return Math.round((present / total) * 100);
}
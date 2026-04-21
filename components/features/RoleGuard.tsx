import type { UserRole } from "@/types";

type RoleGuardProps = {
  role: UserRole;
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RoleGuard({ role, children }: RoleGuardProps) {
  return <>{children}</>;
}
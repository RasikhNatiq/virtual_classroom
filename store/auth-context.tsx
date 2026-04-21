"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import type { User, UserRole } from "@/types";
import { createId } from "@/utils/helpers";
import { getData, setData } from "@/utils/storage";

type AuthContextValue = {
  users: User[];
  currentUser: User | null;
  isReady: boolean;
  isAuthenticated: boolean;
  quickStart: (input: { name: string; role: UserRole }) => void;
  signup: (input: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<{ ok: boolean; message: string }>;
  login: (input: { email: string; password: string }) => Promise<{ ok: boolean; message: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => getData<User[]>(STORAGE_KEYS.users, []));
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getData<User | null>(STORAGE_KEYS.currentUser, null),
  );
  const [isReady] = useState(true);

  const quickStart = useCallback(
    ({ name, role }: { name: string; role: UserRole }) => {
      const trimmedName = name.trim();
      const newUser: User = {
        id: createId("user"),
        name: trimmedName,
        email: "",
        password: "",
        role,
      };
      const nextUsers = [...users, newUser];
      setUsers(nextUsers);
      setCurrentUser(newUser);
      setData(STORAGE_KEYS.users, nextUsers);
      setData(STORAGE_KEYS.currentUser, newUser);
    },
    [users],
  );

  const signup = useCallback(
    async ({ name, email, password, role }: { name: string; email: string; password: string; role: UserRole }) => {
      const normalizedEmail = email.trim().toLowerCase();
      const exists = users.some((user) => user.email.toLowerCase() === normalizedEmail);

      if (exists) {
        return { ok: false, message: "Email already registered. Please log in." };
      }

      const newUser: User = {
        id: createId("user"),
        name: name.trim(),
        email: normalizedEmail,
        password,
        role,
      };

      const nextUsers = [...users, newUser];
      setUsers(nextUsers);
      setCurrentUser(newUser);

      setData(STORAGE_KEYS.users, nextUsers);
      setData(STORAGE_KEYS.currentUser, newUser);

      return { ok: true, message: "Account created successfully." };
    },
    [users],
  );

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const normalizedEmail = email.trim().toLowerCase();
      const match = users.find((user) => user.email.toLowerCase() === normalizedEmail && user.password === password);

      if (!match) {
        return { ok: false, message: "Invalid email or password." };
      }

      setCurrentUser(match);
      setData(STORAGE_KEYS.currentUser, match);

      return { ok: true, message: "Welcome back." };
    },
    [users],
  );

  const logout = useCallback(async () => {
    setCurrentUser(null);
    setData(STORAGE_KEYS.currentUser, null);
  }, []);

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isReady,
      isAuthenticated: Boolean(currentUser),
      quickStart,
      signup,
      login,
      logout,
    }),
    [currentUser, isReady, login, logout, quickStart, signup, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
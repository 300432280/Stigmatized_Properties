import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { audit, findUserById, mutateStore } from "./store";
import type { User, UserRole } from "./types";
import { uid } from "./ids";

const cookieName = "pc_session";

export async function getCurrentUser(): Promise<User | undefined> {
  const jar = await cookies();
  const userId = jar.get(cookieName)?.value;
  return findUserById(userId);
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(roles: UserRole[]) {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect("/map");
  return user;
}

export async function loginUser(user: User) {
  const jar = await cookies();
  jar.set(cookieName, user.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  await audit("login", "user", user.id, user.id);
}

export async function logoutUser() {
  const user = await getCurrentUser();
  const jar = await cookies();
  jar.delete(cookieName);
  if (user) await audit("logout", "user", user.id, user.id);
}

export async function createUser(email: string, password: string, role: UserRole = "free") {
  return mutateStore((store) => {
    const existing = store.users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
    if (existing) throw new Error("Email already exists");
    const user: User = {
      id: uid("user"),
      email,
      password,
      role,
      reportCredits: 0,
      acceptedTermsAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    store.users.unshift(user);
    return user;
  });
}

export function canBrowseExact(user?: User) {
  return Boolean(user && ["subscriber", "admin", "researcher"].includes(user.role));
}

export function canAdmin(user?: User) {
  return Boolean(user && user.role === "admin");
}

export function canResearch(user?: User) {
  return Boolean(user && ["admin", "researcher"].includes(user.role));
}

export function canBuyReport(user?: User) {
  return Boolean(user && ["free", "paid", "subscriber", "admin"].includes(user.role));
}

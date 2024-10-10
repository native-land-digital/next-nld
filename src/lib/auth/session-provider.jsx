"use client";
import { SessionProvider } from "next-auth/react";

export function HeaderSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

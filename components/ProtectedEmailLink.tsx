"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type ProtectedEmailLinkProps = {
  /** Comma-separated character codes. The address is assembled in the browser. */
  codes: string;
  className?: string;
  children?: ReactNode;
};

function subscribe() {
  return () => {};
}

function decodeEmail(codes: string): string {
  if (!codes) return "";

  let email = "";
  for (const part of codes.split(",")) {
    const code = Number(part);
    if (!Number.isInteger(code) || code < 32 || code > 126) return "";
    email += String.fromCharCode(code);
  }

  return email.includes("@") ? email : "";
}

export function ProtectedEmailLink({
  codes,
  className,
  children,
}: ProtectedEmailLinkProps) {
  const email = useSyncExternalStore(
    subscribe,
    () => decodeEmail(codes),
    () => "",
  );

  if (!email) {
    return children ? <span className={className}>{children}</span> : null;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {children ?? email}
    </a>
  );
}

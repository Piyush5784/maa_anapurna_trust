"use client";

import { useSession } from "next-auth/react";
import { useRole } from "@/lib/auth";
import { ReactNode } from "react";

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
  showFallback?: boolean;
}

export default function AdminOnly({
  children,
  fallback = null,
  showFallback = false,
}: AdminOnlyProps) {
  const { data: session, status } = useSession();
  const { isAdmin } = useRole();

  // Show nothing while loading
  if (status === "loading") {
    return null;
  }

  // If user is not authenticated or not admin
  if (!session || !isAdmin(session.user.role)) {
    return showFallback ? fallback : null;
  }

  // User is admin, show the content
  return <>{children}</>;
}

// Hook for checking admin status
export function useIsAdmin() {
  const { data: session, status } = useSession();
  const { isAdmin } = useRole();

  return {
    isAdmin: session ? isAdmin(session.user.role) : false,
    isLoading: status === "loading",
    isAuthenticated: !!session,
  };
}

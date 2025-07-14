"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthLoading } from "./auth-loading";
import { useUser } from "@clerk/nextjs";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  role?: string;
}

export function ProtectedRoute({ children, fallback, role }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <AuthLoading />;
  }

  if (!isSignedIn) {
    return fallback || <AuthLoading />;
  }

  if (role && user) {
    // Suporte para custom claim 'role' no Clerk
    const userRole = user.publicMetadata?.role || user.unsafeMetadata?.role;
    if (userRole !== role) {
      return fallback || <AuthLoading />;
    }
  }

  return <>{children}</>;
} 
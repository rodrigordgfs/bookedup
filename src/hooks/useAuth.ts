"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  return {
    isLoaded,
    isSignedIn,
    user,
    isLoading: !isLoaded,
  };
}

export function useRequireAuth() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return { isLoading: true, user: null, isSignedIn: false };
  }

  if (!isSignedIn) {
    return { isLoading: false, user: null, isSignedIn: false };
  }

  return {
    isLoading: false,
    user,
    isSignedIn: true,
  };
} 
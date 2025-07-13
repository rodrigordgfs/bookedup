"use client";

import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export function GlobalLoading() {
  const { isLoaded } = useAuth();

  if (isLoaded) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-foreground" />
        <p className="text-sm text-muted-foreground">Carregando aplicação...</p>
      </div>
    </div>
  );
} 
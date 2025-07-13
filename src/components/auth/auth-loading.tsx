import { Loader2 } from "lucide-react";

export function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-foreground" />
        <p className="text-muted-foreground">Verificando autenticação...</p>
      </div>
    </div>
  );
} 
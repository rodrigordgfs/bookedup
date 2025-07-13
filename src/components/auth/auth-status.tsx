"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export function AuthStatus() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>Status de Autenticação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Verificando...</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span>Status de Autenticação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="destructive">Não Autenticado</Badge>
          <p className="text-sm text-muted-foreground mt-2">
            Você precisa estar logado para acessar esta página.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span>Status de Autenticação</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant="default" className="bg-green-100 text-green-800">
              Autenticado
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm text-muted-foreground">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Verificado:</span>
            <Badge variant={user.primaryEmailAddress?.verification?.status === "verified" ? "default" : "secondary"}>
              {user.primaryEmailAddress?.verification?.status === "verified" ? "Sim" : "Não"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
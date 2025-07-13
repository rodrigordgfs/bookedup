import type { User } from "@clerk/nextjs/server";

export type ClerkUser = User;

export interface AuthContext {
  userId: string | null;
  user: ClerkUser | null;
  isAuthenticated: boolean;
}

export const CLERK_CONFIG = {
  // URLs de redirecionamento
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  fallbackRedirectUrl: "/dashboard",
  // Configurações de aparência
  appearance: {
    elements: {
      rootBox: "mx-auto",
      card: "shadow-none border border-border bg-card",
      headerTitle: "text-foreground",
      headerSubtitle: "text-muted-foreground",
      formButtonPrimary: "bg-foreground text-background hover:bg-foreground/90",
      formFieldInput: "bg-background border-border text-foreground",
      formFieldLabel: "text-foreground",
      footerActionLink: "text-foreground hover:text-foreground/80",
    },
  },
  // Configurações de segurança
  security: {
    // Tempo de expiração da sessão (em segundos)
    sessionExpirationTime: 60 * 60 * 24 * 7, // 7 dias
    // Configurações de senha
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialCharacters: true,
    },
  },
} as const;

// Função para verificar se o usuário tem permissões específicas
export function hasPermission(user: ClerkUser | null, permission: string): boolean {
  if (!user) return false;
  // Implementar lógica de permissões baseada nos metadados do usuário
  const userPermissions = user.publicMetadata?.permissions as string[] || [];
  return userPermissions.includes(permission);
}

// Função para verificar se o usuário tem um papel específico
export function hasRole(user: ClerkUser | null, role: string): boolean {
  if (!user) return false;
  // Implementar lógica de roles baseada nos metadados do usuário
  const userRoles = user.publicMetadata?.roles as string[] || [];
  return userRoles.includes(role);
}

// Função para obter o papel principal do usuário
export function getUserRole(user: ClerkUser | null): string | null {
  if (!user) return null;
  const userRoles = user.publicMetadata?.roles as string[] || [];
  return userRoles[0] || null;
} 
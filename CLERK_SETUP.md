# Configuração do Clerk - Sistema de Autenticação

Este projeto foi configurado para usar o Clerk como sistema de autenticação. O Clerk oferece uma solução completa de autenticação com recursos como login, registro, recuperação de senha, autenticação social e muito mais.

## Configuração Inicial

### 1. Criar conta no Clerk

1. Acesse [clerk.com](https://clerk.com)
2. Crie uma conta gratuita
3. Crie um novo aplicativo
4. Configure as URLs de redirecionamento

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `env.example` para `.env.local` e configure as variáveis:

```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas chaves do Clerk:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_sua_chave_aqui
CLERK_SECRET_KEY=sk_test_sua_chave_secreta_aqui

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Configurar URLs no Dashboard do Clerk

No dashboard do Clerk, configure as seguintes URLs:

**URLs de Redirecionamento:**
- `http://localhost:3000/sign-in`
- `http://localhost:3000/sign-up`
- `http://localhost:3000/dashboard`

**URLs Permitidas:**
- `http://localhost:3000`

## Componentes Criados

### 1. ProtectedRoute
Componente que protege rotas que requerem autenticação:

```tsx
import { ProtectedRoute } from "@/components/auth/protected-route";

<ProtectedRoute>
  <SeuComponente />
</ProtectedRoute>
```

### 2. UserMenu
Menu dropdown do usuário com opções de logout:

```tsx
import { UserMenu } from "@/components/auth/user-menu";

<UserMenu />
```

### 3. UserInfo
Componente para mostrar informações do usuário:

```tsx
import { UserInfo } from "@/components/auth/user-info";

<UserInfo />
```

## Hooks Personalizados

### useAuthGuard
Hook para proteger páginas que requerem autenticação:

```tsx
import { useAuthGuard } from "@/hooks/useAuth";

function MinhaPagina() {
  const { isLoaded, isSignedIn, user, isLoading } = useAuthGuard();
  
  if (isLoading) return <div>Carregando...</div>;
  if (!isSignedIn) return null;
  
  return <div>Conteúdo protegido</div>;
}
```

### useRequireAuth
Hook mais rigoroso que redireciona automaticamente:

```tsx
import { useRequireAuth } from "@/hooks/useAuth";

function MinhaPagina() {
  const { isLoading, user, isSignedIn } = useRequireAuth();
  
  if (isLoading) return <div>Carregando...</div>;
  
  return <div>Conteúdo protegido</div>;
}
```

## Utilitários do Servidor

### Funções de Autenticação
```tsx
import { getAuth, getCurrentUser, requireAuth, requireUser } from "@/lib/clerk";

// Verificar se usuário está autenticado
const { userId } = await getAuth();

// Obter dados do usuário atual
const user = await getCurrentUser();

// Requer autenticação (redireciona se não autenticado)
const { userId } = await requireAuth();

// Requer usuário completo (redireciona se não autenticado)
const user = await requireUser();
```

## Páginas de Autenticação

### Sign In
- Rota: `/sign-in`
- Componente personalizado com tema da aplicação
- Modal ou página completa

### Sign Up
- Rota: `/sign-up`
- Componente personalizado com tema da aplicação
- Modal ou página completa

## Middleware

O middleware do Clerk está configurado para:
- Proteger rotas do dashboard (`/dashboard/*`)
- Permitir acesso público à página inicial (`/`)
- Permitir acesso público à página de agendamento (`/booking`)
- Gerenciar webhooks do Clerk

## Recursos de Segurança

### 1. Proteção de Rotas
- Middleware automático
- Componentes de proteção
- Hooks de autenticação

### 2. Sessões Seguras
- Tokens JWT gerenciados pelo Clerk
- Sessões persistentes
- Logout automático

### 3. Validação de Usuário
- Verificação de email
- Autenticação social (Google, GitHub, etc.)
- Recuperação de senha

## Personalização

### Temas
Os componentes do Clerk foram personalizados para usar o tema da aplicação:

```tsx
<SignIn 
  appearance={{
    elements: {
      rootBox: "mx-auto",
      card: "shadow-none border border-border bg-card",
      headerTitle: "text-foreground",
      formButtonPrimary: "bg-foreground text-background hover:bg-foreground/90",
      formFieldInput: "bg-background border-border text-foreground",
    },
  }}
/>
```

### URLs de Redirecionamento
Configure as URLs de redirecionamento no dashboard do Clerk:
- Após login: `/dashboard`
- Após registro: `/dashboard`
- Página de login: `/sign-in`
- Página de registro: `/sign-up`

## Próximos Passos

1. Configure suas chaves do Clerk no arquivo `.env.local`
2. Teste o fluxo de autenticação
3. Personalize os componentes conforme necessário
4. Configure webhooks se necessário
5. Adicione autenticação social se desejado

## Troubleshooting

### Erro de Chaves
Se você receber erros de chaves inválidas:
1. Verifique se as chaves estão corretas no `.env.local`
2. Reinicie o servidor de desenvolvimento
3. Verifique se as URLs estão configuradas no dashboard do Clerk

### Problemas de Redirecionamento
Se o redirecionamento não funcionar:
1. Verifique as URLs configuradas no dashboard do Clerk
2. Confirme se as variáveis de ambiente estão corretas
3. Verifique se o middleware está configurado corretamente 
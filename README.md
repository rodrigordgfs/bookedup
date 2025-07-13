# BookedUp - Sistema de Agendamento Online

Uma plataforma completa de agendamento online para profissionais e empresas, construída com Next.js 15, TypeScript, Tailwind CSS e Clerk para autenticação.

## 🚀 Funcionalidades

- **Autenticação Segura**: Sistema de autenticação completo com Clerk
- **Dashboard Responsivo**: Interface moderna e intuitiva
- **Agendamento Online**: Sistema de reservas em tempo real
- **Gestão de Clientes**: Cadastro e histórico de clientes
- **Relatórios Avançados**: Análises e métricas detalhadas
- **Tema Escuro/Claro**: Suporte completo a temas
- **Responsivo**: Funciona perfeitamente em todos os dispositivos

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Clerk** - Sistema de autenticação
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Recharts** - Gráficos e visualizações
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/bookedup.git
cd bookedup
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env.local
```

4. Configure o Clerk:
   - Crie uma conta em [clerk.com](https://clerk.com)
   - Crie um novo aplicativo
   - Copie as chaves para o arquivo `.env.local`

5. Execute o projeto:
```bash
npm run dev
```

## 🔐 Configuração do Clerk

### 1. Criar Conta no Clerk
- Acesse [clerk.com](https://clerk.com)
- Crie uma conta gratuita
- Crie um novo aplicativo

### 2. Configurar Variáveis de Ambiente
Edite o arquivo `.env.local`:

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
No dashboard do Clerk, configure:

**URLs de Redirecionamento:**
- `http://localhost:3000/sign-in`
- `http://localhost:3000/sign-up`
- `http://localhost:3000/dashboard`

**URLs Permitidas:**
- `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── dashboard/         # Páginas do dashboard
│   ├── sign-in/          # Página de login
│   ├── sign-up/          # Página de registro
│   └── booking/          # Página de agendamento
├── components/            # Componentes React
│   ├── auth/             # Componentes de autenticação
│   ├── ui/               # Componentes de interface
│   └── theme-toggle.tsx  # Toggle de tema
├── hooks/                # Hooks personalizados
├── lib/                  # Utilitários e configurações
└── styles/               # Estilos globais
```

## 🔧 Componentes de Autenticação

### ProtectedRoute
Protege rotas que requerem autenticação:

```tsx
import { ProtectedRoute } from "@/components/auth/protected-route";

<ProtectedRoute>
  <SeuComponente />
</ProtectedRoute>
```

### UserMenu
Menu dropdown do usuário:

```tsx
import { UserMenu } from "@/components/auth/user-menu";

<UserMenu />
```

### Hooks de Autenticação
```tsx
import { useAuthGuard, useRequireAuth } from "@/hooks/useAuth";

// Hook básico
const { isLoaded, isSignedIn, user } = useAuthGuard();

// Hook rigoroso (redireciona automaticamente)
const { isLoading, user } = useRequireAuth();
```

## 🎨 Temas

O projeto suporta temas claro e escuro:

- **Tema Claro**: Interface limpa e profissional
- **Tema Escuro**: Reduz fadiga visual
- **Sistema**: Segue preferência do sistema operacional

## 📊 Relatórios

O sistema inclui relatórios avançados:

- **Visão Geral**: Métricas principais
- **Financeiro**: Receitas e despesas
- **Clientes**: Análise de clientes
- **Serviços**: Performance dos serviços
- **Performance**: Métricas de produtividade

## 🔒 Segurança

- **Autenticação JWT**: Tokens seguros gerenciados pelo Clerk
- **Proteção de Rotas**: Middleware automático
- **Validação de Dados**: Schemas Zod
- **HTTPS**: Recomendado para produção
- **Rate Limiting**: Proteção contra ataques

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Plataformas
- **Netlify**: Suporte completo
- **Railway**: Deploy simples
- **Docker**: Containerização disponível

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Documentação**: [CLERK_SETUP.md](CLERK_SETUP.md)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/bookedup/issues)
- **Email**: suporte@bookedup.com

## 🎯 Roadmap

- [ ] Autenticação social (Google, GitHub)
- [ ] Notificações push
- [ ] API REST completa
- [ ] Aplicativo mobile
- [ ] Integração com pagamentos
- [ ] Sistema de avaliações
- [ ] Chat em tempo real

---

Desenvolvido com ❤️ usando Next.js e Clerk

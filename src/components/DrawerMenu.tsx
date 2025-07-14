import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, Calendar, Users, Menu, BarChart3, Archive } from 'lucide-react';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar as MiniCalendar } from '@/components/ui/calendar';

type DrawerMenuProps = {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
    role?: string;
  };
  customMenu?: React.ReactNode;
};

export function DrawerMenu({ user: userProp, customMenu }: DrawerMenuProps) {
  const { user, isLoaded } = useUser();
  const displayUser = isLoaded && user ? {
    name: user.fullName || 'Usuário',
    email: user.primaryEmailAddress?.emailAddress || 'email@exemplo.com',
    avatarUrl: user.imageUrl,
    role: userProp?.role || 'Cliente',
  } : userProp || {};

  // Menu padrão do cliente
  const defaultClientMenu = (
    <nav className="flex flex-col gap-1 py-4 px-2">
      <Link href="/booking" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
        <Calendar className="w-5 h-5" />
        Novo Agendamento
      </Link>
      <SignOutButton>
        <Button variant="ghost" className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-muted transition-colors cursor-pointer mt-2 justify-start w-full">
          <LogOut className="w-5 h-5" />
          Sair
        </Button>
      </SignOutButton>
    </nav>
  );

  // Busca o papel do usuário no metadata do Clerk
  let userRole: string | undefined = userProp?.role;
  if (isLoaded && user) {
    const metaRole = user.publicMetadata?.role || user.unsafeMetadata?.role;
    userRole = typeof metaRole === 'string' ? metaRole : userRole;
  }
  // Se for admin, mostra menu completo. Se não, mostra menu do cliente
  const isAdmin = (userRole || '').toLowerCase() === 'admin';
  const isClient = !isAdmin;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Menu className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
        <div className="bg-card px-6 py-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {displayUser.avatarUrl ? (
                <Image
                  src={displayUser.avatarUrl}
                  alt={displayUser.name ?? 'Avatar do usuário'}
                  className="w-full h-full object-cover"
                  width={56}
                  height={56}
                />
              ) : (
                <User className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">{displayUser.name || 'Usuário'}</div>
              <div className="text-sm text-muted-foreground">{displayUser.email || 'email@exemplo.com'}</div>
              <div className="text-xs text-muted-foreground mt-1">{displayUser.role || 'Cliente'}</div>
            </div>
          </div>
        </div>
        {isClient
          ? (customMenu || defaultClientMenu)
          : (
            <nav className="flex flex-col gap-1 py-4 px-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <Calendar className="w-5 h-5" />
                Dashboard
              </Link>
              <Link href="/dashboard/calendar" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <Calendar className="w-5 h-5" />
                Calendário
              </Link>
              <Link href="/dashboard/appointments" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <Calendar className="w-5 h-5" />
                Agendamentos
              </Link>
              <Link href="/dashboard/clients" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <Users className="w-5 h-5" />
                Clientes
              </Link>
              <Link href="/dashboard/services" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <Archive className="w-5 h-5" />
                Serviços
              </Link>
              <Link href="/dashboard/staff" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <Users className="w-5 h-5" />
                Funcionários
              </Link>
              <Link href="/dashboard/reports" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <BarChart3 className="w-5 h-5" />
                Relatórios
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                <Settings className="w-5 h-5" />
                Configurações
              </Link>
              <SignOutButton>
                <Button variant="ghost" className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-muted transition-colors cursor-pointer mt-2 justify-start w-full">
                  <LogOut className="w-5 h-5" />
                  Sair
                </Button>
              </SignOutButton>
            </nav>
          )}
      </SheetContent>
    </Sheet>
  );
} 
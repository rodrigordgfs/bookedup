import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, Calendar, Users, Scissors, Menu, BarChart3 } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

type DrawerMenuProps = {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
    role?: string;
  };
};

export function DrawerMenu({ user }: DrawerMenuProps) {
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
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl as string}
                  alt={user.name ?? 'Avatar do usuário'}
                  className="w-full h-full object-cover"
                  width={56}
                  height={56}
                />
              ) : (
                <User className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <div className="font-bold text-lg text-foreground">{user?.name || 'Usuário'}</div>
              <div className="text-sm text-muted-foreground">{user?.email || 'email@exemplo.com'}</div>
              <div className="text-xs text-muted-foreground mt-1">{user?.role || 'Cliente'}</div>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 py-4 px-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <Calendar className="w-5 h-5" />
            Dashboard
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
            <Scissors className="w-5 h-5" />
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
      </SheetContent>
    </Sheet>
  );
} 
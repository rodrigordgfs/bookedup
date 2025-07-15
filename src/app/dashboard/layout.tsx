"use client";
import { Toolbar } from '@/components/Toolbar';
import ClientAccess from './ClientAccess';
import { usePathname } from 'next/navigation';

const subtitleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/clients": "Gerenciar Clientes",
  "/dashboard/services": "Serviços",
  "/dashboard/appointments": "Agendamentos",
  "/dashboard/calendar": "Calendário",
  "/dashboard/staff": "Funcionários",
  "/dashboard/reports": "Relatórios",
  "/dashboard/settings": "Configurações",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const subtitle = subtitleMap[pathname] || "Dashboard";

  return (
    <ClientAccess>
      <div className="flex h-screen bg-background flex-col">
        <Toolbar
          title="BookedUp"
          subtitle={subtitle}
          showDrawer
          showNotifications
          showThemeToggle
          showUserMenu={false}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </ClientAccess>
  );
} 
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Calendar, User, Archive, Settings } from 'lucide-react';

export function DashboardQuickActions({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 w-full bg-muted rounded-md animate-pulse" />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <Button 
        className="w-full justify-start bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 cursor-pointer"
        onClick={() => {
          localStorage.setItem('openNewAppointmentModal', 'true');
        }}
      >
        <Link href="/dashboard/appointments" className="flex items-center w-full">
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start cursor-pointer">
        <Link href="/dashboard/calendar" className="flex items-center w-full">
          <Calendar className="w-4 h-4 mr-2" />
          Ver Calendário
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start cursor-pointer">
        <Link href="/dashboard/clients" className="flex items-center w-full">
          <User className="w-4 h-4 mr-2" />
          Gerenciar Clientes
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start cursor-pointer">
        <Link href="/dashboard/services" className="flex items-center w-full">
          <Archive className="w-4 h-4 mr-2" />
          Gerenciar Serviços
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start cursor-pointer">
        <Link href="/dashboard/staff" className="flex items-center w-full">
          <User className="w-4 h-4 mr-2" />
          Gerenciar Funcionários
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start cursor-pointer">
        <Link href="/dashboard/settings" className="flex items-center w-full">
          <Settings className="w-4 h-4 mr-2" />
          Configurações
        </Link>
      </Button>
    </div>
  );
} 

export default DashboardQuickActions; 
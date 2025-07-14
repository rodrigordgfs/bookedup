"use client";

import { useUser } from "@clerk/nextjs";
import { AuthLoading } from "@/components/auth/auth-loading";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle, User } from "lucide-react";
import { useEffect } from "react";
import { Toolbar } from "@/components/Toolbar";
import { Badge } from '@/components/ui/badge';

function ClientHome() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // MOCK: agendamentos do cliente
  const appointments = [
    {
      id: 1,
      service: 'Consultoria',
      date: '2024-06-20',
      time: '09:00',
      status: 'confirmed',
      professional: 'Maria Silva',
    },
    {
      id: 2,
      service: 'Sessão Completa',
      date: '2024-06-25',
      time: '14:30',
      status: 'pending',
      professional: 'João Barbeiro',
    },
    {
      id: 3,
      service: 'Avaliação',
      date: '2024-05-10',
      time: '11:00',
      status: 'completed',
      professional: 'Pedro Costa',
    },
  ];

  const upcoming = appointments.filter(a => new Date(a.date) >= new Date());
  const last = appointments.filter(a => new Date(a.date) < new Date());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bookingSuccess = window.location.search.includes('booking=success');
      if (bookingSuccess) {
        setTimeout(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 2000);
      }
    }
  }, []);

  if (!isLoaded) return <AuthLoading />;
  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'Cliente';
  const bookingSuccess = typeof window !== 'undefined' && window.location.search.includes('booking=success');

  function getStatusColor(status: string) {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Toolbar
        title="Área do Cliente"
        subtitle={firstName}
        icon={<User className="w-5 h-5 text-white" />}
        showDrawer
        showNotifications={false}
        showThemeToggle
        showUserMenu={false}
        user={{ name: firstName, role: 'Cliente' }}
      />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4 py-8">
        <div className="bg-card rounded-xl shadow-md p-8 flex flex-col items-center w-full max-w-md mb-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Olá, {firstName}!</h1>
          <p className="text-muted-foreground mb-6 text-center">
            Bem-vindo ao seu painel de cliente. Aqui você pode criar novos agendamentos e acompanhar suas informações.
          </p>
          {bookingSuccess && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded bg-green-100 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Agendamento realizado com sucesso!
            </div>
          )}
          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 mb-4"
            onClick={() => router.push('/booking')}
          >
            <Calendar className="w-5 h-5" />
            Novo Agendamento
          </Button>
          <div className="w-full mt-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-foreground">Seus agendamentos</span>
              <span className="text-sm text-muted-foreground">Total: {appointments.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-muted rounded-lg p-3 flex flex-col items-center">
                <span className="text-lg font-bold text-foreground">{upcoming.length}</span>
                <span className="text-xs text-muted-foreground">Próximos</span>
              </div>
              <div className="bg-muted rounded-lg p-3 flex flex-col items-center">
                <span className="text-lg font-bold text-foreground">{last.length}</span>
                <span className="text-xs text-muted-foreground">Finalizados</span>
              </div>
            </div>
            <div className="mb-2 text-sm font-medium text-muted-foreground">Próximos agendamentos:</div>
            {upcoming.length === 0 ? (
              <div className="text-muted-foreground text-sm">Nenhum agendamento futuro.</div>
            ) : (
              <div className="space-y-2">
                {upcoming.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium text-sm text-foreground">{apt.service}</div>
                      <div className="text-xs text-muted-foreground">{apt.date} às {apt.time}</div>
                      <div className="text-xs text-muted-foreground">Profissional: {apt.professional}</div>
                    </div>
                    <Badge className={getStatusColor(apt.status)}>{apt.status === 'confirmed' ? 'Confirmado' : apt.status === 'pending' ? 'Pendente' : apt.status === 'completed' ? 'Concluído' : 'Cancelado'}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientAccess({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <AuthLoading />;
  const role = user?.publicMetadata?.role || user?.unsafeMetadata?.role;
  if (role !== "admin") {
    return <ClientHome />;
  }
  return <ProtectedRoute role="admin">{children}</ProtectedRoute>;
} 
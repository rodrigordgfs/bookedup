'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { appointments, clients, notifications } from '@/mocks/data';
import { DashboardQuickActions } from '@/components/dashboard/DashboardQuickActions';
import { DashboardMiniCalendar } from '@/components/dashboard/DashboardMiniCalendar';
import { DashboardRecentActivity } from '@/components/dashboard/DashboardRecentActivity';
import DashboardStatsCards from '@/components/dashboard/DashboardStatsCards';
import DashboardAppointmentsList from '@/components/dashboard/DashboardAppointmentsList';

export default function DashboardPage() {
  const { user } = useUser();
  const [selectedDate] = useState(new Date());
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    service: '',
    dateRange: '',
    professional: ''
  });
  const [loading, setLoading] = useState(false); // Adicionado estado de loading

  // Simula o loading ao montar a página
  useEffect(() => {
    if (user?.id) {
      console.log('userId:', user.id);
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [user]);

  // Estatísticas do dia
  const todayDate = new Date();
  const todayStr = todayDate.toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(a => a.date === todayStr);
  const todayStats = {
    appointments: todayAppointments.length,
    revenue: todayAppointments.reduce((acc, a) => acc + a.price, 0),
    completed: todayAppointments.filter(a => a.status === 'completed').length,
    pending: todayAppointments.filter(a => a.status === 'pending').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  // Atividades recentes: baseadas nas notificações mockadas
  const notificationTypeColor = {
    appointment_confirmed: 'bg-green-500',
    appointment_cancelled: 'bg-red-500',
    appointment_reminder: 'bg-blue-500',
    new_client: 'bg-purple-500',
    new_appointment: 'bg-orange-500',
    system: 'bg-gray-500'
  };
  const recentActivities = notifications.slice(0, 5).map((n) => {
    const date = new Date(n.timestamp);
    return {
      id: n.id,
      type: n.type,
      clientName: clients.find(c => c.id === n.data?.clientId)?.name || 'Cliente',
      timestamp: isNaN(date.getTime()) ? new Date() : date,
      color: notificationTypeColor[n.type] || 'bg-gray-500'
    };
  });

  const getActivityMessage = (type: string, clientName: string) => {
    switch (type) {
      case 'appointment_confirmed':
        return `${clientName} confirmou agendamento`;
      case 'new_client':
        return `${clientName} se cadastrou`;
      case 'appointment_rescheduled':
        return `${clientName} reagendou`;
      case 'appointment_cancelled':
        return `${clientName} cancelou agendamento`;
      case 'payment_received':
        return `Pagamento recebido de ${clientName}`;
      case 'service_completed':
        return `Serviço concluído para ${clientName}`;
      case 'reminder_sent':
        return `Lembrete enviado para ${clientName}`;
      default:
        return `Atividade de ${clientName}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-muted-foreground">
            Aqui está o resumo dos seus agendamentos para hoje
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStatsCards loading={loading} todayStats={todayStats} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <DashboardAppointmentsList
              loading={loading}
              todayAppointments={todayAppointments.map(a => ({ ...a, id: String(a.id) }))}
              filters={filters}
              setFilters={setFilters}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <DashboardQuickActions loading={loading} />
            {/* Mini Calendar */}
            <DashboardMiniCalendar loading={loading} selectedDate={selectedDate} />
            {/* Recent Activity */}
            <DashboardRecentActivity
              loading={loading}
              recentActivities={recentActivities}
              getActivityMessage={getActivityMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
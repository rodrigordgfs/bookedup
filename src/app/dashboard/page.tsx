'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Settings, LogOut, Plus, Filter, Archive } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { formatToReal } from '@/lib/utils';
import { Toolbar } from '@/components/Toolbar';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardPage() {
  const [selectedDate] = useState(new Date());
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    service: '',
    dateRange: '',
    professional: ''
  });

  const upcomingAppointments = [
    {
      id: 1,
      client: 'João Silva',
      service: 'Corte + Barba',
      time: '09:00',
      duration: '30 min',
      status: 'confirmed',
      price: 45
    },
    {
      id: 2,
      client: 'Maria Santos',
      service: 'Tratamento Capilar',
      time: '10:30',
      duration: '60 min',
      status: 'pending',
      price: 80
    },
    {
      id: 3,
      client: 'Pedro Oliveira',
      service: 'Corte Masculino',
      time: '14:00',
      duration: '25 min',
      status: 'confirmed',
      price: 35
    },
    {
      id: 4,
      client: 'Roberto Costa',
      service: 'Barba',
      time: '16:00',
      duration: '20 min',
      status: 'confirmed',
      price: 25
    }
  ];

  const todayStats = {
    appointments: 8,
    revenue: 385,
    completed: 4,
    pending: 2
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

  const recentActivities = [
    {
      id: 1,
      type: 'appointment_confirmed',
      clientName: 'João Silva',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutos atrás
      color: 'bg-green-500'
    },
    {
      id: 2,
      type: 'new_client',
      clientName: 'Maria Santos',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
      color: 'bg-blue-500'
    },
    {
      id: 3,
      type: 'appointment_rescheduled',
      clientName: 'Pedro Oliveira',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hora atrás
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      type: 'appointment_cancelled',
      clientName: 'Ana Costa',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      color: 'bg-red-500'
    },
    {
      id: 5,
      type: 'payment_received',
      clientName: 'Carlos Ferreira',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 horas atrás
      color: 'bg-green-600'
    }
  ];

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
      <Toolbar
        title="BookedUp"
        subtitle="Dashboard"
        icon={<User className="w-5 h-5 text-white" />}
        showDrawer
        showNotifications
        showThemeToggle
        showUserMenu={false}
        rightActions={
          <>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <SignOutButton>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 cursor-pointer">
                <LogOut className="w-5 h-5" />
              </Button>
            </SignOutButton>
          </>
        }
      />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="px-6 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agendamentos Hoje</p>
                  <p className="text-2xl font-bold text-foreground">{todayStats.appointments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="px-6 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Faturamento Hoje</p>
                  <p className="text-2xl font-bold text-foreground">{formatToReal(todayStats.revenue)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-green-600 dark:text-green-400 font-bold">R$</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="px-6 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                  <p className="text-2xl font-bold text-foreground">{todayStats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="px-6 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-foreground">{todayStats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Agendamentos de Hoje
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                          <Filter className="w-4 h-4 mr-2" />
                          Filtrar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Filtros de Agendamentos</DialogTitle>
                          <DialogDescription>
                            Configure os filtros para visualizar agendamentos específicos.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Todos os status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="confirmed">Confirmado</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="cancelled">Cancelado</SelectItem>
                                <SelectItem value="completed">Concluído</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="service">Serviço</Label>
                            <Select value={filters.service} onValueChange={(value) => setFilters({ ...filters, service: value })}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Todos os serviços" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="haircut">Corte Masculino</SelectItem>
                                <SelectItem value="beard">Barba</SelectItem>
                                <SelectItem value="haircut-beard">Corte + Barba</SelectItem>
                                <SelectItem value="treatment">Tratamento Capilar</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="professional">Profissional</Label>
                            <Select value={filters.professional} onValueChange={(value) => setFilters({ ...filters, professional: value })}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Todos os profissionais" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="joao">João Silva</SelectItem>
                                <SelectItem value="maria">Maria Santos</SelectItem>
                                <SelectItem value="pedro">Pedro Costa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dateRange">Período</Label>
                            <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o período" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="today">Hoje</SelectItem>
                                <SelectItem value="week">Esta semana</SelectItem>
                                <SelectItem value="month">Este mês</SelectItem>
                                <SelectItem value="custom">Período personalizado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setFilters({ status: '', service: '', dateRange: '', professional: '' })}>
                              Limpar
                            </Button>
                            <Button onClick={() => setFilterOpen(false)}>
                              Aplicar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">{appointment.client}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="font-medium text-sm">{appointment.time}</p>
                          <p className="text-xs text-muted-foreground">{appointment.duration}</p>
                        </div>
                        <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                          {getStatusText(appointment.status)}
                        </Badge>
                        <p className="font-medium text-sm sm:text-base">{formatToReal(appointment.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
              </CardContent>
            </Card>

            {/* Mini Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Calendário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {selectedDate.getDate()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {selectedDate.toLocaleDateString('pt-BR', { 
                      weekday: 'long',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <Button variant="outline" className="w-full cursor-pointer" asChild>
                    <Link href="/dashboard/calendar">
                      Ver Calendário Completo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {getActivityMessage(activity.type, activity.clientName)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.timestamp, { 
                            addSuffix: true, 
                            locale: ptBR 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
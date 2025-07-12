'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme-toggle';
import { Calendar, Clock, User, Settings, LogOut, Plus, Filter, Scissors } from 'lucide-react';
import Link from 'next/link';
import { DrawerMenu } from '@/components/DrawerMenu';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import { formatToReal } from '@/lib/utils';

export default function DashboardPage() {
  const [selectedDate] = useState(new Date());
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    service: '',
    dateRange: '',
    professional: ''
  });

  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    avatarUrl: '', // coloque uma url se quiser testar com foto
    role: 'Administrador',
  };

  const upcomingAppointments = [
    {
      id: 1,
      client: 'João Silva',
      service: 'Corte + Barba',
      time: '09:00',
      duration: '45 min',
      status: 'confirmed',
      price: 'R$ 55'
    },
    {
      id: 2,
      client: 'Pedro Santos',
      service: 'Corte Masculino',
      time: '10:30',
      duration: '30 min',
      status: 'pending',
      price: 'R$ 35'
    },
    {
      id: 3,
      client: 'Carlos Lima',
      service: 'Tratamento Capilar',
      time: '14:00',
      duration: '40 min',
      status: 'confirmed',
      price: 'R$ 45'
    },
    {
      id: 4,
      client: 'Roberto Costa',
      service: 'Barba',
      time: '16:00',
      duration: '20 min',
      status: 'confirmed',
      price: 'R$ 25'
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



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {/* Botão DrawerMenu (hamburguer) */}
              <DrawerMenu user={user} />
              <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">BookedUp</h1>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationsDropdown />
              <ThemeToggle />
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 cursor-pointer">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Agendamentos de Hoje
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filtrar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Filtros de Agendamentos</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
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
                            <Select value={filters.service} onValueChange={(value) => setFilters({...filters, service: value})}>
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
                            <Select value={filters.professional} onValueChange={(value) => setFilters({...filters, professional: value})}>
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
                            <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o período" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="today">Hoje</SelectItem>
                                <SelectItem value="week">Esta semana</SelectItem>
                                <SelectItem value="month">Este mês</SelectItem>
                                <SelectItem value="custom">Personalizado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setFilters({status: '', service: '', dateRange: '', professional: ''})}>
                            Limpar
                          </Button>
                          <Button onClick={() => setFilterOpen(false)}>
                            Aplicar Filtros
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{appointment.client}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {appointment.time} • {appointment.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground mb-2">{formatToReal(parseInt(appointment.price.replace('R$ ', '')))}</p>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Calendar */}
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
                    <Scissors className="w-4 h-4 mr-2" />
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
                  <Button variant="outline" className="w-full cursor-pointer">
                    Ver Calendário Completo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <p className="text-foreground">João Silva confirmou agendamento</p>
                      <p className="text-muted-foreground">há 2 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="text-sm">
                      <p className="text-foreground">Novo cliente cadastrado</p>
                      <p className="text-muted-foreground">há 15 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="text-sm">
                      <p className="text-foreground">Agendamento reagendado</p>
                      <p className="text-muted-foreground">há 1 hora</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
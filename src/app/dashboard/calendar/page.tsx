'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { DrawerMenu } from '@/components/DrawerMenu';
import { formatToReal } from '@/lib/utils';
import {
  User,
  Bell,
  Settings,
  LogOut,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    avatarUrl: '',
    role: 'Administrador',
  };

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      date: '2024-01-15',
      time: '09:00',
      client: 'João Silva',
      service: 'Corte + Barba',
      status: 'confirmed',
      professional: 'João Barbeiro'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '10:30',
      client: 'Pedro Santos',
      service: 'Corte Masculino',
      status: 'pending',
      professional: 'Maria Silva'
    },
    {
      id: 3,
      date: '2024-01-16',
      time: '14:00',
      client: 'Carlos Lima',
      service: 'Tratamento Capilar',
      status: 'confirmed',
      professional: 'João Barbeiro'
    },
    {
      id: 4,
      date: '2024-01-17',
      time: '16:00',
      client: 'Roberto Costa',
      service: 'Barba',
      status: 'confirmed',
      professional: 'Pedro Costa'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAppointmentsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <DrawerMenu user={user} />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">StyleBook</h1>
                  <p className="text-sm text-muted-foreground">Calendário</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <ThemeToggle />
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Hoje
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Agendamento
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {dayNames.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((day) => {
                    const dayAppointments = getAppointmentsForDate(day);
                    const isToday = day && day.toDateString() === new Date().toDateString();
                    const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();

                    // Use a unique key: date string or 'empty-{index}' for nulls
                    const key = day ? day.toISOString().split('T')[0] : `empty-${Math.random()}`;

                    if (day) {
                      return (
                        <button
                          key={key}
                          type="button"
                          className={`min-h-[120px] w-full text-left p-2 border border-border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary ${
                            isSelected ? 'bg-primary/10 border-primary' : ''
                          } ${isToday ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
                          onClick={() => setSelectedDate(day)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setSelectedDate(day);
                            }
                          }}
                          tabIndex={0}
                          aria-label={`Selecionar dia ${day.toLocaleDateString('pt-BR')}`}
                        >
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'text-blue-600 dark:text-blue-400' : ''
                          }`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayAppointments.slice(0, 3).map((apt) => (
                              <div
                                key={apt.id}
                                className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                              >
                                {apt.time} - {apt.client}
                              </div>
                            ))}
                            {dayAppointments.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{dayAppointments.length - 3} mais
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    } else {
                      return (
                        <div
                          key={key}
                          className="min-h-[120px] p-2 border border-transparent rounded-lg"
                          aria-hidden="true"
                        />
                      );
                    }
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getAppointmentsForDate(selectedDate).length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nenhum agendamento para este dia</p>
                  ) : (
                    getAppointmentsForDate(selectedDate).map((apt) => (
                      <div key={apt.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{apt.time}</span>
                          <Badge className={getStatusColor(apt.status)}>
                            {apt.status === 'confirmed' ? 'Confirmado' : 
                             apt.status === 'pending' ? 'Pendente' : 'Cancelado'}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{apt.client}</p>
                        <p className="text-sm text-muted-foreground">{apt.service}</p>
                        <p className="text-xs text-muted-foreground mt-1">{apt.professional}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas do Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total de Agendamentos</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Confirmados</span>
                    <span className="font-medium text-green-600">98</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pendentes</span>
                    <span className="font-medium text-yellow-600">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cancelados</span>
                    <span className="font-medium text-red-600">14</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Faturamento</span>
                      <span className="font-bold">{formatToReal(4850)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm">Confirmado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Pendente</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm">Cancelado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm">Hoje</span>
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
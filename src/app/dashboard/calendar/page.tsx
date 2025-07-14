'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatToReal } from '@/lib/utils';
import {
  User, Settings,
  LogOut,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Toolbar } from '@/components/Toolbar';
import { useRouter } from 'next/navigation';
import { appointments as mockAppointments } from '@/mocks/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  // Usar dados mockados
  const appointments = mockAppointments;

  // Estatísticas do mês de acordo com a data selecionada
  const yyyy = selectedDate.getFullYear();
  const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const monthStr = `${yyyy}-${mm}`;
  const monthAppointments = appointments.filter(a => a.date.startsWith(monthStr));
  const monthStats = {
    total: monthAppointments.length,
    confirmed: monthAppointments.filter(a => a.status === 'confirmed').length,
    pending: monthAppointments.filter(a => a.status === 'pending').length,
    cancelled: monthAppointments.filter(a => a.status === 'cancelled').length,
    revenue: monthAppointments.filter(a => a.status === 'confirmed' || a.status === 'completed').reduce((acc, a) => acc + a.price, 0)
  };

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

  // Paginação dos agendamentos do dia
  const [dayPage, setDayPage] = useState(1);
  const itemsPerDayPage = 3;
  const dayAppointments = getAppointmentsForDate(selectedDate);
  const totalDayPages = Math.ceil(dayAppointments.length / itemsPerDayPage);
  const paginatedDayAppointments = dayAppointments.slice((dayPage - 1) * itemsPerDayPage, dayPage * itemsPerDayPage);

  // Resetar página ao trocar de dia
  useEffect(() => { setDayPage(1); }, [selectedDate]);

  // 4. State para controlar o modal
  const [dayModalDate, setDayModalDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Toolbar
        title="BookedUp"
        subtitle="Calendário"
        icon={<User className="w-5 h-5 text-white" />}
        showDrawer
        showNotifications
        showThemeToggle
        showUserMenu={false}
        rightActions={
          <>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 cursor-pointer">
              <LogOut className="w-5 h-5" />
            </Button>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="px-2 py-2 sm:px-6 sm:py-4">
                {/* MOBILE: Dia a dia */}
                <div className="block sm:hidden">
                  <div className="w-full flex justify-center mb-2">
                    <CardTitle className="text-xl font-bold text-center">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2 w-full">
                      <Button variant="outline" size="sm" onClick={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() - 1);
                        setSelectedDate(d);
                        if (d.getMonth() !== currentDate.getMonth() || d.getFullYear() !== currentDate.getFullYear()) {
                          setCurrentDate(new Date(d));
                        }
                      }} className="cursor-pointer flex-shrink-0">
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="flex-1 text-center text-lg font-bold">
                        {(() => {
                          const str = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
                          return str.charAt(0).toUpperCase() + str.slice(1);
                        })()}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() + 1);
                        setSelectedDate(d);
                        if (d.getMonth() !== currentDate.getMonth() || d.getFullYear() !== currentDate.getFullYear()) {
                          setCurrentDate(new Date(d));
                        }
                      }} className="cursor-pointer flex-shrink-0">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 cursor-pointer mt-2 mb-4"
                      disabled={selectedDate && (() => { const today = new Date(); today.setHours(0,0,0,0); const sel = new Date(selectedDate); sel.setHours(0,0,0,0); return sel < today; })()}
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('openNewAppointmentModal', 'true');
                          localStorage.setItem('selectedDateForAppointment', selectedDate.toISOString().split('T')[0]);
                        }
                        router.push('/dashboard/appointments');
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Agendamento
                    </Button>
                  </div>
                </div>
                {/* DESKTOP: Mês completo */}
                <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
                  <div className="flex-1 flex items-center">
                    <CardTitle className="text-2xl font-bold">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                  </div>
                  <div className="flex-1 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      newDate.setDate(1);
                      setCurrentDate(newDate);
                      setSelectedDate(new Date(newDate));
                    }} className="cursor-pointer flex-shrink-0">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 cursor-pointer text-white dark:text-slate-800"
                      onClick={() => {
                        const today = new Date();
                        setCurrentDate(today);
                        setSelectedDate(today);
                      }}
                    >
                      Hoje
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      newDate.setDate(1);
                      setCurrentDate(newDate);
                      setSelectedDate(new Date(newDate));
                    }} className="cursor-pointer flex-shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                {/* MOBILE: Lista de agendamentos do dia */}
                <div className="block sm:hidden">
                  <div className="space-y-2 mb-4">
                    {dayAppointments.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center">Nenhum agendamento para este dia</p>
                    ) : (
                      dayAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('openAppointmentDetailId', String(apt.id));
                              router.push('/dashboard/appointments');
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{apt.time}</span>
                            <Badge className={getStatusColor(apt.status)}>
                              {apt.status === 'confirmed' ? 'Confirmado' : 
                               apt.status === 'pending' ? 'Pendente' : 'Cancelado'}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{typeof apt.client === 'object' ? apt.client.name : apt.client}</p>
                          <p className="text-sm text-muted-foreground">{apt.service}</p>
                          <p className="text-xs text-muted-foreground mt-1">{apt.professional}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* DESKTOP: Grid do mês */}
                <div className="hidden sm:block">
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
                      const key = day ? day.toISOString().split('T')[0] : `empty-${Math.random()}`;
                      if (day) {
                        return (
                          <button
                            key={key}
                            type="button"
                            className={`min-h-[120px] w-full text-left p-2 border border-border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary ${
                              isSelected ? 'bg-primary/10 border-primary' : ''
                            } ${isToday ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
                            onClick={() => {
                              setSelectedDate(day);
                              if (window.innerWidth >= 640) { // sm breakpoint
                                setDayModalDate(day);
                              }
                            }}
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
                                  {apt.time} - {typeof apt.client === 'object' ? apt.client.name : apt.client}
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:space-y-6 mt-4 lg:mt-0">
            {/* Selected Date Info - apenas a data, primeira letra maiúscula */}
            {/* REMOVIDO: Bloco lateral da data selecionada */}

            {/* Modal de agendamentos do dia */}
            {typeof window !== 'undefined' && window.innerWidth >= 640 && (
              <Dialog open={!!dayModalDate} onOpenChange={open => { if (!open) setDayModalDate(null); }}>
                <DialogContent className="max-w-2xl w-full mx-auto rounded-xl border bg-background shadow-lg p-0 flex flex-col max-h-[calc(100vh-2rem)]">
                  <DialogHeader className="p-6 pb-2">
                    <DialogTitle>Agendamentos de {(() => {
                      if (!dayModalDate) return '';
                      const str = dayModalDate.toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      });
                      return str.charAt(0).toUpperCase() + str.slice(1);
                    })()}</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {getAppointmentsForDate(dayModalDate).length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center">Nenhum agendamento para este dia</p>
                    ) : (
                      getAppointmentsForDate(dayModalDate).map((apt) => (
                        <div
                          key={apt.id}
                          className="p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('openAppointmentDetailId', String(apt.id));
                              router.push('/dashboard/appointments');
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{apt.time}</span>
                            <Badge className={getStatusColor(apt.status)}>
                              {apt.status === 'confirmed' ? 'Confirmado' : 
                               apt.status === 'pending' ? 'Pendente' : 'Cancelado'}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{typeof apt.client === 'object' ? apt.client.name : apt.client}</p>
                          <p className="text-sm text-muted-foreground">{apt.service}</p>
                          <p className="text-xs text-muted-foreground mt-1">{apt.professional}</p>
                        </div>
                      ))
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas do Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total de Agendamentos</span>
                    <span className="font-medium">{monthStats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Confirmados</span>
                    <span className="font-medium text-green-600">{monthStats.confirmed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pendentes</span>
                    <span className="font-medium text-yellow-600">{monthStats.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cancelados</span>
                    <span className="font-medium text-red-600">{monthStats.cancelled}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Faturamento</span>
                      <span className="font-bold">{formatToReal(monthStats.revenue)}</span>
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
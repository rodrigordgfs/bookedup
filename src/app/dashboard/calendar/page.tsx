'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { appointments as mockAppointments } from '@/mocks/data';
import CalendarMonthGrid from '@/components/calendar/CalendarMonthGrid';
import CalendarDayList from '@/components/calendar/CalendarDayList';
import CalendarDayModal from '@/components/calendar/CalendarDayModal';
import CalendarMonthStats from '@/components/calendar/CalendarMonthStats';
import CalendarLegend from '@/components/calendar/CalendarLegend';
import CalendarHeader from '@/components/calendar/CalendarHeader';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false); // Estado de loading
  const router = useRouter();

  // Simula o loading ao montar a página
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

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

  // Resetar página ao trocar de dia
  useEffect(() => {
    // setDayPage(1); // Removido: totalDayPages
  }, [selectedDate]);

  // 4. State para controlar o modal
  const [dayModalDate, setDayModalDate] = useState<Date | null>(null);

  const dayAppointments = getAppointmentsForDate(selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CalendarHeader
                currentDate={currentDate}
                selectedDate={selectedDate}
                setCurrentDate={setCurrentDate}
                setSelectedDate={setSelectedDate}
                monthNames={monthNames}
                onNewAppointment={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('openNewAppointmentModal', 'true');
                    localStorage.setItem('selectedDateForAppointment', selectedDate.toISOString().split('T')[0]);
                  }
                  router.push('/dashboard/appointments');
                }}
              />
              <CardContent className="p-2 sm:p-6">
                {/* MOBILE: Lista de agendamentos do dia */}
                <CalendarDayList
                  loading={loading}
                  dayAppointments={dayAppointments}
                  selectedDate={selectedDate}
                  getStatusColor={getStatusColor}
                />
                {/* DESKTOP: Grid do mês */}
                <CalendarMonthGrid
                  loading={loading}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  setDayModalDate={setDayModalDate}
                  getDaysInMonth={getDaysInMonth}
                  getAppointmentsForDate={getAppointmentsForDate}
                  dayNames={dayNames}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:space-y-6 mt-4 lg:mt-0">
            {/* Modal de agendamentos do dia (desktop) */}
            <CalendarDayModal
              open={!!dayModalDate}
              onOpenChange={open => { if (!open) setDayModalDate(null); }}
              dayModalDate={dayModalDate}
              getAppointmentsForDate={getAppointmentsForDate}
              getStatusColor={getStatusColor}
            />
            {/* Quick Stats */}
            <CalendarMonthStats loading={loading} monthStats={monthStats} />
            {/* Legend */}
            <CalendarLegend loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
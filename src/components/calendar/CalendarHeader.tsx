import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CalendarHeaderProps {
  currentDate: Date;
  selectedDate: Date;
  setCurrentDate: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  monthNames: string[];
  onNewAppointment: () => void;
}

export default function CalendarHeader({
  currentDate,
  selectedDate,
  setCurrentDate,
  setSelectedDate,
  monthNames,
  onNewAppointment,
}: CalendarHeaderProps) {
  const router = useRouter();
  return (
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
            onClick={onNewAppointment}
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
  );
} 
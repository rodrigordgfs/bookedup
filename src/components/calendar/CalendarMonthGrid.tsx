import { Skeleton } from '@/components/ui/skeleton';

interface CalendarMonthGridProps {
  loading: boolean;
  currentDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setDayModalDate: (date: Date) => void;
  getDaysInMonth: (date: Date) => (Date | null)[];
  getAppointmentsForDate: (date: Date | null) => any[];
  dayNames: string[];
}

export default function CalendarMonthGrid({
  loading,
  currentDate,
  selectedDate,
  setSelectedDate,
  setDayModalDate,
  getDaysInMonth,
  getAppointmentsForDate,
  dayNames,
}: CalendarMonthGridProps) {
  return (
    <div className="hidden sm:block">
      {loading ? (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="min-h-[120px] w-full mb-1" />
          ))}
        </div>
      ) : (
        <>
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
                      if (window.innerWidth >= 640) {
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
        </>
      )}
    </div>
  );
} 
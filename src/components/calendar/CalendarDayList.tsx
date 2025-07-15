import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface CalendarDayListProps {
  loading: boolean;
  dayAppointments: any[];
  selectedDate: Date;
  getStatusColor: (status: string) => string;
}

export default function CalendarDayList({ loading, dayAppointments, selectedDate, getStatusColor }: CalendarDayListProps) {
  const router = useRouter();
  return (
    <div className="block sm:hidden">
      <div className="space-y-2 mb-4">
        {loading ? (
          <>
            <Skeleton className="h-16 w-full mb-2" />
            <Skeleton className="h-16 w-full mb-2" />
            <Skeleton className="h-16 w-full mb-2" />
          </>
        ) : (
          dayAppointments.length === 0 ? (
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
          )
        )}
      </div>
    </div>
  );
} 
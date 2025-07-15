import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Appointment } from '@/mocks/data';

interface CalendarDayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayModalDate: Date | null;
  getAppointmentsForDate: (date: Date | null) => Appointment[];
  getStatusColor: (status: string) => string;
}

export default function CalendarDayModal({ open, onOpenChange, dayModalDate, getAppointmentsForDate, getStatusColor }: CalendarDayModalProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
} 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Clock, User } from 'lucide-react';
import { formatToReal } from '@/lib/utils';
import React from 'react';

interface Appointment {
  id: number;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  service: string;
  professional: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: string;
  notes?: string;
}

interface ClientHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAppointment: Appointment | null;
  appointments: Appointment[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
}

export default function ClientHistoryDialog({
  open,
  onOpenChange,
  selectedAppointment,
  appointments,
  getStatusColor,
  getStatusIcon,
  getStatusText,
}: ClientHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[700px] sm:mx-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Histórico do Cliente</span>
          </DialogTitle>
          <DialogDescription>
            Visualize o histórico completo de agendamentos do cliente.
          </DialogDescription>
        </DialogHeader>
        {selectedAppointment && (
          <div className="space-y-4 sm:space-y-6">
            {/* Informações do Cliente */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Informações do Cliente</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-sm font-medium">{selectedAppointment.client.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{selectedAppointment.client.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <p className="text-sm">{selectedAppointment.client.phone}</p>
                </div>
              </div>
            </div>
            {/* Estatísticas */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">12</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Total de Visitas</div>
                </div>
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">8</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Concluídos</div>
                </div>
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-600">2</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Pendentes</div>
                </div>
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl font-bold text-red-600">2</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Cancelados</div>
                </div>
              </div>
            </div>
            {/* Histórico de Agendamentos */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Histórico de Agendamentos</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {appointments
                  .filter(apt => apt.client.email === selectedAppointment.client.email)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((appointment) => (
                    <div key={appointment.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {new Date(appointment.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <Badge className={`${getStatusColor(appointment.status)} flex items-center space-x-1 w-fit`}>
                            {getStatusIcon(appointment.status)}
                            <span className="text-xs">{getStatusText(appointment.status)}</span>
                          </Badge>
                          <span className="text-sm font-medium">{formatToReal(appointment.price)}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium">{appointment.service}</span> • {appointment.professional}
                      </div>
                      {appointment.notes && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Observações:</span> {appointment.notes}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            {/* Botões de Ação */}
            <div className="flex justify-end pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                className="cursor-pointer w-full sm:w-auto"
              >
                Fechar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 
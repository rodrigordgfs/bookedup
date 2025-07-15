import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Archive, Calendar, Clock, User, Bell, Edit, XCircle, CheckCircle, MoreVertical, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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

interface AppointmentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
  updateAppointmentStatus: (id: number, newStatus: string) => void;
  onEdit: (appointment: Appointment) => void;
  onViewClientHistory: (appointment: Appointment) => void;
}

export default function AppointmentDetailsDialog({
  open,
  onOpenChange,
  appointment,
  getStatusColor,
  getStatusIcon,
  getStatusText,
  updateAppointmentStatus,
  onEdit,
  onViewClientHistory,
}: AppointmentDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px] sm:mx-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Detalhes do Agendamento</span>
          </DialogTitle>
          <DialogDescription>
            Visualize e gerencie os detalhes completos do agendamento.
          </DialogDescription>
        </DialogHeader>
        {appointment && (
          <div className="space-y-4 sm:space-y-6">
            {/* Status do Agendamento */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge className={`${getStatusColor(appointment.status)} flex items-center space-x-1`}>
                  {getStatusIcon(appointment.status)}
                  <span className="text-xs">{getStatusText(appointment.status)}</span>
                </Badge>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {formatToReal(appointment.price)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {appointment.duration} minutos
                </div>
              </div>
            </div>
            {/* Informações do Cliente */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Informações do Cliente</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-muted-foreground" htmlFor="detailClientName">Nome</label>
                  <p className="text-sm font-medium" id="detailClientName">{appointment.client.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground" htmlFor="detailClientEmail">Email</label>
                  <p className="text-sm" id="detailClientEmail">{appointment.client.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground" htmlFor="detailClientPhone">Telefone</label>
                  <p className="text-sm" id="detailClientPhone">{appointment.client.phone}</p>
                </div>
              </div>
            </div>
            {/* Informações do Serviço */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Archive className="w-5 h-5" />
                <span>Detalhes do Serviço</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-muted-foreground" htmlFor="detailService">Serviço</label>
                  <p className="text-sm font-medium" id="detailService">{appointment.service}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground" htmlFor="detailProfessional">Profissional</label>
                  <div className="flex items-center space-x-2" id="detailProfessional">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{appointment.professional}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Data e Horário */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Data e Horário</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-muted-foreground" htmlFor="detailDate">Data</label>
                  <div className="flex items-center space-x-2" id="detailDate">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{new Date(appointment.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground" htmlFor="detailTime">Horário</label>
                  <div className="flex items-center space-x-2" id="detailTime">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{appointment.time}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Observações */}
            {appointment.notes && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Observações</h3>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm">{appointment.notes}</p>
                </div>
              </div>
            )}
            {/* Ações */}
            <div className="space-y-4 pt-4 border-t">
              {/* Status Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Alterar Status:</span>
                <div className="flex flex-wrap gap-2">
                  {appointment.status === 'pending' && (
                    <>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="text-green-600 border-green-200 hover:bg-green-50 flex-1 sm:flex-none"
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirmar
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="text-red-600 border-red-200 hover:bg-red-50 flex-1 sm:flex-none"
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer flex-1 sm:flex-none"
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Concluir
                    </Button>
                  )}
                  {appointment.status === 'completed' && (
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="text-gray-600 border-gray-200 hover:bg-gray-50 cursor-pointer flex-1 sm:flex-none"
                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
              {/* Other Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Outras Ações:</span>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // Lógica para reenviar confirmação
                      if (appointment.client.email) {
                        // Exemplo: reenviar confirmação
                        // Pode ser passado por prop se necessário
                      }
                    }}
                    className="cursor-pointer flex-1 sm:flex-none"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Reenviar Confirmação
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="cursor-pointer flex-1 sm:flex-none">
                        <MoreVertical className="w-4 h-4 mr-2" />
                        Mais Opções
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                        <DropdownMenuItem onClick={() => onEdit(appointment)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Agendamento
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onViewClientHistory(appointment)}>
                        <User className="mr-2 h-4 w-4" />
                        Ver Histórico do Cliente
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {appointment.status === 'pending' && (
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir Agendamento
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 
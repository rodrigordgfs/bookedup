import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PaginationBar } from '@/components/ui/pagination';
import { Users, Archive, Calendar, Clock, User } from 'lucide-react';
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

interface AppointmentsTableProps {
  appointments: Appointment[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
}

export default function AppointmentsTable({
  appointments,
  loading,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalCount,
  onPageChange,
  onAppointmentClick,
  getStatusColor,
  getStatusIcon,
  getStatusText,
}: AppointmentsTableProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold">Lista de Agendamentos</h3>
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-{Math.min(endIndex, totalCount)} de {totalCount} agendamentos
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Cliente</th>
                  <th className="text-left p-4 font-medium text-sm">Serviço</th>
                  <th className="text-left p-4 font-medium text-sm">Data</th>
                  <th className="text-left p-4 font-medium text-sm">Horário</th>
                  <th className="text-left p-4 font-medium text-sm">Profissional</th>
                  <th className="text-left p-4 font-medium text-sm">Valor</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-4"><Skeleton className="h-6 w-32" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-16" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Cliente</th>
                  <th className="text-left p-4 font-medium text-sm">Serviço</th>
                  <th className="text-left p-4 font-medium text-sm">Data</th>
                  <th className="text-left p-4 font-medium text-sm">Horário</th>
                  <th className="text-left p-4 font-medium text-sm">Profissional</th>
                  <th className="text-left p-4 font-medium text-sm">Valor</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr 
                    key={appointment.id} 
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => onAppointmentClick(appointment)}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.client.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Archive className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.service}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.time} ({appointment.duration} min)</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.professional}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">{formatToReal(appointment.price)}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getStatusColor(appointment.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(appointment.status)}
                        <span className="text-xs">{getStatusText(appointment.status)}</span>
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        {!loading && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="py-4"
          />
        )}
      </CardContent>
    </Card>
  );
} 
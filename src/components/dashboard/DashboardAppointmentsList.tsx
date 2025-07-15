import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { formatToReal } from '@/lib/utils';

interface Appointment {
  id: string;
  client: { name: string };
  service: string;
  time: string;
  duration: number;
  price: number;
  status: string;
}

interface DashboardAppointmentsListProps {
  loading: boolean;
  todayAppointments: Appointment[];
  filters: any;
  setFilters: (filters: any) => void;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

export default function DashboardAppointmentsList({
  loading,
  todayAppointments,
  filters,
  setFilters,
  filterOpen,
  setFilterOpen,
  getStatusColor,
  getStatusText,
}: DashboardAppointmentsListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-bold text-foreground">
            Agendamentos de Hoje
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filtros de Agendamentos</DialogTitle>
                  <DialogDescription>
                    Configure os filtros para visualizar agendamentos específicos.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Adicione outros filtros conforme necessário */}
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setFilters({ status: '', service: '', dateRange: '', professional: '' })}>
                      Limpar
                    </Button>
                    <Button onClick={() => setFilterOpen(false)}>
                      Aplicar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </>
          ) : (
            todayAppointments.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground text-base gap-4">
                <Calendar className="w-10 h-10 text-primary mb-2" />
                <div className="font-semibold text-lg">Nenhum agendamento para hoje!</div>
                <div className="text-sm">Aproveite para descansar, organizar sua agenda ou tomar um café ☕</div>
              </div>
            ) : (
              <>
                {[...todayAppointments]
                  .sort((a, b) => b.time.localeCompare(a.time))
                  .slice(0, 10)
                  .map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <div className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">{appointment.client.name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="font-medium text-sm">{appointment.time}</p>
                          <p className="text-xs text-muted-foreground">{appointment.duration} min</p>
                        </div>
                        <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                          {getStatusText(appointment.status)}
                        </Badge>
                        <p className="font-medium text-sm sm:text-base">{formatToReal(appointment.price)}</p>
                      </div>
                    </div>
                  ))}
                <Button className="mt-4 w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300 cursor-pointer" asChild>
                  <Link href="/dashboard/appointments">Ver todos os agendamentos</Link>
                </Button>
              </>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
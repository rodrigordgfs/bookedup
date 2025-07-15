import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Filter, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface AppointmentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  filters: {
    status: string;
    service: string;
    professional: string;
    dateRange: string;
  };
  setFilters: (filters: any) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
  loading: boolean;
}

export default function AppointmentsFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filters,
  setFilters,
  isFilterModalOpen,
  setIsFilterModalOpen,
  loading,
}: AppointmentsFiltersProps) {
  return (
    <div className="mb-6">
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-full sm:w-1/2 mb-2" />
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-10 w-48 mb-2" />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por cliente, serviço ou profissional..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
              <Button variant="outline" className="cursor-pointer" onClick={() => setIsFilterModalOpen(true)}>
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
              </Button>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Filtros de Agendamentos</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="filterStatus">Status</Label>
                    <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filterService">Serviço</Label>
                    <Select value={filters.service} onValueChange={(value) => setFilters({...filters, service: value})}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os serviços</SelectItem>
                        <SelectItem value="haircut">Corte Masculino</SelectItem>
                        <SelectItem value="beard">Barba</SelectItem>
                        <SelectItem value="haircut-beard">Corte + Barba</SelectItem>
                        <SelectItem value="treatment">Tratamento Capilar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filterProfessional">Profissional</Label>
                    <Select value={filters.professional} onValueChange={(value) => setFilters({...filters, professional: value})}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os profissionais</SelectItem>
                        <SelectItem value="joao">João Barbeiro</SelectItem>
                        <SelectItem value="maria">Maria Silva</SelectItem>
                        <SelectItem value="pedro">Pedro Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filterDateRange">Período</Label>
                    <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os períodos</SelectItem>
                        <SelectItem value="today">Hoje</SelectItem>
                        <SelectItem value="week">Esta semana</SelectItem>
                        <SelectItem value="month">Este mês</SelectItem>
                        <SelectItem value="past">Passado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setFilters({
                    status: 'all',
                    service: 'all',
                    professional: 'all',
                    dateRange: 'all'
                  })}>
                    Limpar Filtros
                  </Button>
                  <Button onClick={() => setIsFilterModalOpen(false)}>
                    Aplicar Filtros
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
} 
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import React from 'react';

interface StaffFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  specialtyFilter: string;
  setSpecialtyFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  loading: boolean;
  specialties: string[];
}

export default function StaffFilters({
  searchTerm,
  setSearchTerm,
  specialtyFilter,
  setSpecialtyFilter,
  statusFilter,
  setStatusFilter,
  loading,
  specialties,
}: StaffFiltersProps) {
  return loading ? (
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
          placeholder="Buscar funcionários por nome, email ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por especialidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas especialidades</SelectItem>
            {specialties.map((spec) => (
              <SelectItem key={spec} value={spec}>{spec}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 
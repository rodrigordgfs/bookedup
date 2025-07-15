import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import React from 'react';
import type { Client } from '@/mocks/data';

interface ClientsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  loading: boolean;
  clients: Client[];
}

export default function ClientsFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  loading,
  clients,
}: ClientsFiltersProps) {
  return (
    <div className="mb-6">
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-full sm:w-1/2 mb-2" />
            <Skeleton className="h-10 w-48 mb-2" />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar clientes por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
              >
                Todos ({clients.length})
              </Button>
              <Button 
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
              >
                Ativos ({clients.filter(c => c.status === 'active').length})
              </Button>
              <Button 
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('inactive')}
              >
                Inativos ({clients.filter(c => c.status === 'inactive').length})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
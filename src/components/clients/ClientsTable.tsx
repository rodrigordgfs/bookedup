import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PaginationBar } from '@/components/ui/pagination';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import React from 'react';
import type { Client } from '@/mocks/data';

interface ClientsTableProps {
  clients: Client[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onClientClick: (client: Client) => void;
}

export default function ClientsTable({
  clients,
  loading,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalCount,
  onPageChange,
  onClientClick,
}: ClientsTableProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Lista de Clientes</h3>
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-{Math.min(endIndex, totalCount)} de {totalCount} clientes
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Nome</th>
                  <th className="text-left p-4 font-medium text-sm">Email</th>
                  <th className="text-left p-4 font-medium text-sm">Telefone</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Última Visita</th>
                  <th className="text-left p-4 font-medium text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-4"><Skeleton className="h-6 w-32" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-40" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-24" /></td>
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
                  <th className="text-left p-4 font-medium text-sm">Contato</th>
                  <th className="text-left p-4 font-medium text-sm">Agendamentos</th>
                  <th className="text-left p-4 font-medium text-sm">Última Visita</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr 
                    key={client.id} 
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => onClientClick(client)}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          {client.notes && (
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {client.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{client.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{client.totalAppointments} agendamentos</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm">
                        {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                        {client.status === 'active' ? 'Ativo' : 'Inativo'}
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
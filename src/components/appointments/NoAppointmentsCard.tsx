import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import React from 'react';

interface NoAppointmentsCardProps {
  searchTerm: string;
  statusFilter: string;
  onAddAppointment: () => void;
}

export default function NoAppointmentsCard({ searchTerm, statusFilter, onAddAppointment }: NoAppointmentsCardProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum agendamento encontrado</h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm || statusFilter !== 'all' 
            ? 'Tente ajustar os filtros de busca' 
            : 'Comece criando seu primeiro agendamento'
          }
        </p>
        <Button onClick={onAddAppointment}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </CardContent>
    </Card>
  );
} 
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Plus } from 'lucide-react';
import React from 'react';

interface NoStaffCardProps {
  searchTerm: string;
  specialtyFilter: string;
  statusFilter: string;
  onAddStaff: () => void;
}

export default function NoStaffCard({
  searchTerm,
  specialtyFilter,
  statusFilter,
  onAddStaff,
}: NoStaffCardProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum funcionário encontrado</h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm || specialtyFilter !== 'all' || statusFilter !== 'all'
            ? 'Tente ajustar os filtros de busca'
            : 'Comece adicionando seu primeiro funcionário'}
        </p>
        <Button onClick={onAddStaff}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Funcionário
        </Button>
      </CardContent>
    </Card>
  );
} 
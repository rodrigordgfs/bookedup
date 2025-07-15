import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Plus } from 'lucide-react';
import React from 'react';

interface NoClientsCardProps {
  searchTerm: string;
  statusFilter: string;
  onAddClient: () => void;
}

export default function NoClientsCard({ searchTerm, statusFilter, onAddClient }: NoClientsCardProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum cliente encontrado</h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm || statusFilter !== 'all' 
            ? 'Tente ajustar os filtros de busca' 
            : 'Comece adicionando seu primeiro cliente'
          }
        </p>
        <Button onClick={onAddClient}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cliente
        </Button>
      </CardContent>
    </Card>
  );
} 
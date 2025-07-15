import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, Plus } from 'lucide-react';
import React from 'react';

interface NoServicesCardProps {
  searchTerm: string;
  categoryFilter: string;
  onAddService: () => void;
}

export default function NoServicesCard({
  searchTerm,
  categoryFilter,
  onAddService,
}: NoServicesCardProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhum serviço encontrado</h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm || categoryFilter !== 'all' 
            ? 'Tente ajustar os filtros de busca' 
            : 'Comece adicionando seu primeiro serviço'
          }
        </p>
        <Button onClick={onAddService}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Serviço
        </Button>
      </CardContent>
    </Card>
  );
} 
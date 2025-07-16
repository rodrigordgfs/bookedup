import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Archive, Plus } from 'lucide-react';
import React from 'react';

interface NoCategoriesCardProps {
  searchTerm?: string;
  onAddCategory: () => void;
}

export default function NoCategoriesCard({ searchTerm, onAddCategory }: NoCategoriesCardProps) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhuma categoria encontrada</h3>
        <p className="text-muted-foreground mb-4">
          {searchTerm
            ? 'Tente ajustar o termo de busca'
            : 'Comece adicionando sua primeira categoria'
          }
        </p>
        <Button onClick={onAddCategory}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Categoria
        </Button>
      </CardContent>
    </Card>
  );
} 
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import React from 'react';

interface Category {
  id: number;
  name: string;
  active: boolean;
}

interface ServicesFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  loading: boolean;
  categories: Category[];
}

export default function ServicesFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  loading,
  categories,
}: ServicesFiltersProps) {
  return loading ? (
    <div className="flex flex-col sm:flex-row gap-4">
      <Skeleton className="h-10 w-full sm:w-1/2 mb-2" />
      <Skeleton className="h-10 w-48 mb-2" />
    </div>
  ) : (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar serviços por nome, descrição ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.filter(cat => cat.active).map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 
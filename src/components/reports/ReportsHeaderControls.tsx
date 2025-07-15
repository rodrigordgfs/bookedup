import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter, Download } from 'lucide-react';
import React from 'react';

interface ReportsHeaderControlsProps {
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  selectedReport: string;
  exportReport: (type: string) => void;
  loading: boolean;
}

export default function ReportsHeaderControls({
  selectedPeriod,
  setSelectedPeriod,
  selectedReport,
  exportReport,
  loading,
}: ReportsHeaderControlsProps) {
  if (loading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
        <Skeleton className="h-10 w-1/2 mb-2" />
        <Skeleton className="h-10 w-32 mb-2" />
        <Skeleton className="h-10 w-32 mb-2" />
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-4 mb-6">
      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Últimos 7 dias</SelectItem>
          <SelectItem value="30">Últimos 30 dias</SelectItem>
          <SelectItem value="90">Últimos 90 dias</SelectItem>
          <SelectItem value="365">Último ano</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="border-input">
        <Filter className="w-4 h-4 mr-2" />
        Filtros
      </Button>
      <Button onClick={() => exportReport(selectedReport)} className="bg-foreground text-background hover:bg-foreground/90">
        <Download className="w-4 h-4 mr-2" />
        Exportar
      </Button>
    </div>
  );
} 
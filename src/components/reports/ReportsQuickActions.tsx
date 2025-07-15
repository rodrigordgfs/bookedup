import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, DollarSign, Users } from 'lucide-react';
import React from 'react';

interface ReportsQuickActionsProps {
  loading: boolean;
  exportReport: (type: string) => void;
}

export default function ReportsQuickActions({ loading, exportReport }: ReportsQuickActionsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => exportReport('resumo-mensal')}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h4 className="font-medium">Resumo Mensal</h4>
              <p className="text-sm text-muted-foreground">Principais métricas do mês</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => exportReport('financeiro')}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div>
              <h4 className="font-medium">Relatório Financeiro</h4>
              <p className="text-sm text-muted-foreground">Receitas e despesas detalhadas</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => exportReport('clientes')}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-medium">Análise de Clientes</h4>
              <p className="text-sm text-muted-foreground">Comportamento e preferências</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
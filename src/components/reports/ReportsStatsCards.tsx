import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Users, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface ReportsStatsCardsProps {
  loading: boolean;
  formatToReal: (value: number) => string;
  stats: {
    agendamentos: number;
    agendamentosDelta: string;
    receita: number;
    receitaDelta: string;
    clientes: number;
    clientesDelta: string;
    satisfacao: string;
    satisfacaoDelta: string;
  };
}

export default function ReportsStatsCards({ loading, formatToReal, stats }: ReportsStatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.agendamentos}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">{stats.agendamentosDelta}</span> em relação ao período anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatToReal(stats.receita)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">{stats.receitaDelta}</span> em relação ao período anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.clientes}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">{stats.clientesDelta}</span> em relação ao período anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Satisfação</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.satisfacao}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">{stats.satisfacaoDelta}</span> em relação ao período anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 
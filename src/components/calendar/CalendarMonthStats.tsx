import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatToReal } from '@/lib/utils';

interface CalendarMonthStatsProps {
  loading: boolean;
  monthStats: {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    revenue: number;
  };
}

export default function CalendarMonthStats({ loading, monthStats }: CalendarMonthStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estatísticas do Mês</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <>
            <Skeleton className="h-6 w-2/3 mb-3" />
            <Skeleton className="h-6 w-1/2 mb-3" />
            <Skeleton className="h-6 w-1/2 mb-3" />
            <Skeleton className="h-6 w-1/2 mb-3" />
            <Skeleton className="h-8 w-full mt-4" />
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total de Agendamentos</span>
              <span className="font-medium">{monthStats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Confirmados</span>
              <span className="font-medium text-green-600">{monthStats.confirmed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Pendentes</span>
              <span className="font-medium text-yellow-600">{monthStats.pending}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Cancelados</span>
              <span className="font-medium text-red-600">{monthStats.cancelled}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Faturamento</span>
                <span className="font-bold">{formatToReal(monthStats.revenue)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
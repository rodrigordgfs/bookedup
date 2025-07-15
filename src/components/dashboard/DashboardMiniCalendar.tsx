import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

export function DashboardMiniCalendar({ loading, selectedDate }: { loading: boolean, selectedDate: Date }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground">
          Calendário
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-32 w-full bg-muted rounded-md animate-pulse" />
        ) : (
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-1">
              {selectedDate.getDate()}
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <Button variant="outline" className="w-full cursor-pointer" asChild>
              <Link href="/dashboard/calendar">
                Ver Calendário Completo
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DashboardMiniCalendar; 
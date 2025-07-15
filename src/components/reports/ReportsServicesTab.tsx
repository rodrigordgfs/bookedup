import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { Service } from '@/mocks/data';

type ServiceWithStats = Service & { agendamentos: number; receita: number };

interface ReportsServicesTabProps {
  loading: boolean;
  topServices: ServiceWithStats[];
  formatToReal: (value: number) => string;
}

export default function ReportsServicesTab({ loading, topServices, formatToReal }: ReportsServicesTabProps) {
  return (
    <>
      {loading ? (
        <Skeleton className="h-80 w-full mb-4" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Análise de Serviços</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">Serviços Mais Populares</h4>
                <div className="space-y-3">
                  {topServices.map((service: ServiceWithStats) => (
                    <div key={service.name} className="flex items-center justify-between">
                      <span>{service.name}</span>
                      <Badge variant="secondary">{service.agendamentos} agendamentos</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Receita por Serviço</h4>
                <div className="space-y-3">
                  {topServices.map((service: ServiceWithStats) => (
                    <div key={service.name} className="flex items-center justify-between">
                      <span>{service.name}</span>
                      <span className="font-medium">{formatToReal(service.receita)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
} 
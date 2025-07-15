import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface ReportsClientsTabProps {
  loading: boolean;
  topClients: any[];
  formatToReal: (value: number) => string;
}

export default function ReportsClientsTab({ loading, topClients, formatToReal }: ReportsClientsTabProps) {
  return (
    <>
      {loading ? (
        <Skeleton className="h-80 w-full mb-4" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Top Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClients.map((client: any, index: number) => (
                <div key={client.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                      <span className="text-background text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {client.agendamentos} agendamentos • Última visita: {client.ultimaVisita}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatToReal(client.valor)}</p>
                    <p className="text-sm text-muted-foreground">Valor total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
} 
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react';
import { Service } from '@/mocks/data';
import type { Appointment } from '@/mocks/data';

type ServiceWithStats = Service & { agendamentos: number; receita: number; crescimento: number };

interface ReportsFinancialTabProps {
  loading: boolean;
  appointmentData: Appointment[];
  topServices: ServiceWithStats[];
  formatToReal: (value: number) => string;
}

export default function ReportsFinancialTab({ loading, appointmentData, topServices, formatToReal }: ReportsFinancialTabProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {loading ? (
        <Skeleton className="h-80 w-full mb-4" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Receita vs Cancelamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="receita" fill="#82ca9d" />
                <Bar dataKey="cancelamentos" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
      {loading ? (
        <Skeleton className="h-80 w-full mb-4" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Top Serviços por Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service: ServiceWithStats, index: number) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                      <span className="text-background text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.agendamentos} agendamentos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatToReal(service.receita)}</p>
                    <p className="text-sm text-green-600">+{service.crescimento}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
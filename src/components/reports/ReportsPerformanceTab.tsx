import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from 'recharts';
import React from 'react';

interface ReportsPerformanceTabProps {
  loading: boolean;
  performanceData: any[];
}

export default function ReportsPerformanceTab({ loading, performanceData }: ReportsPerformanceTabProps) {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (
          <Skeleton className="h-80 w-full mb-4" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Performance Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="atendimentos" fill="#8884d8" />
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
              <CardTitle>Satisfação por Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[4, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="satisfacao" stroke="#82ca9d" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      {loading ? (
        <Skeleton className="h-80 w-full mb-4" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <p className="text-muted-foreground">Taxa de Comparecimento</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.8/5</div>
                <p className="text-muted-foreground">Avaliação Média</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">12min</div>
                <p className="text-muted-foreground">Tempo Médio de Atendimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
} 
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { Client } from '@/mocks/data';

type AppointmentChartData = {
  name: string;
  agendamentos: number;
  cancelamentos: number;
  receita: number;
};

type ServiceChartData = {
  name: string;
  value: number;
  color: string;
};

type ClientWithColor = Client & { color: string };

interface ReportsOverviewTabProps {
  loading: boolean;
  appointmentData: AppointmentChartData[];
  serviceData: ServiceChartData[];
  clientData: ClientWithColor[];
}

export default function ReportsOverviewTab({ loading, appointmentData, serviceData, clientData }: ReportsOverviewTabProps) {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (
          <Skeleton className="h-80 w-full mb-4" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="agendamentos" fill="#8884d8" />
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
              <CardTitle>Receita por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="receita" stroke="#82ca9d" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (
          <Skeleton className="h-80 w-full mb-4" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry: ServiceChartData, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        {loading ? (
          <Skeleton className="h-80 w-full mb-4" />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Novos vs Clientes Recorrentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={clientData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clientData.map((entry: ClientWithColor, index) => (
                      <Cell key={`cell-client-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
} 
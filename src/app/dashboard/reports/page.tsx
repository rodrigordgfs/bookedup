'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme-toggle';
import { DrawerMenu } from '@/components/DrawerMenu';
import { NotificationsDropdown } from '@/components/NotificationsDropdown';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  DollarSign,
  Clock,
  Star,
  Filter,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { formatToReal } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Dados simulados para os relatórios
  const appointmentData = [
    { name: 'Jan', agendamentos: 65, cancelamentos: 8, receita: 8500 },
    { name: 'Fev', agendamentos: 72, cancelamentos: 5, receita: 9200 },
    { name: 'Mar', agendamentos: 85, cancelamentos: 12, receita: 10800 },
    { name: 'Abr', agendamentos: 78, cancelamentos: 7, receita: 9800 },
    { name: 'Mai', agendamentos: 92, cancelamentos: 9, receita: 11500 },
    { name: 'Jun', agendamentos: 88, cancelamentos: 6, receita: 11200 },
  ];

  const serviceData = [
    { name: 'Consultoria', value: 35, color: '#8884d8' },
    { name: 'Avaliação', value: 25, color: '#82ca9d' },
    { name: 'Sessão Completa', value: 30, color: '#ffc658' },
    { name: 'Manutenção', value: 10, color: '#ff7300' },
  ];

  const clientData = [
    { name: 'Novos', value: 45, color: '#8884d8' },
    { name: 'Recorrentes', value: 55, color: '#82ca9d' },
  ];

  const performanceData = [
    { name: 'Seg', atendimentos: 12, satisfacao: 4.8 },
    { name: 'Ter', atendimentos: 15, satisfacao: 4.9 },
    { name: 'Qua', atendimentos: 18, satisfacao: 4.7 },
    { name: 'Qui', atendimentos: 14, satisfacao: 4.8 },
    { name: 'Sex', atendimentos: 20, satisfacao: 4.9 },
    { name: 'Sab', atendimentos: 16, satisfacao: 4.6 },
    { name: 'Dom', atendimentos: 8, satisfacao: 4.5 },
  ];

  const topServices = [
    { name: 'Consultoria', agendamentos: 156, receita: 23400, crescimento: 12 },
    { name: 'Sessão Completa', agendamentos: 142, receita: 28400, crescimento: 8 },
    { name: 'Avaliação', agendamentos: 98, receita: 7840, crescimento: 15 },
    { name: 'Manutenção', agendamentos: 67, receita: 8040, crescimento: 5 },
  ];

  const topClients = [
    { name: 'João Silva', agendamentos: 12, valor: 2400, ultimaVisita: '2024-01-15' },
    { name: 'Maria Santos', agendamentos: 10, valor: 2100, ultimaVisita: '2024-01-12' },
    { name: 'Carlos Lima', agendamentos: 8, valor: 1800, ultimaVisita: '2024-01-10' },
    { name: 'Ana Costa', agendamentos: 7, valor: 1500, ultimaVisita: '2024-01-08' },
  ];

  const exportReport = (type: string) => {
    // Simulação de exportação com diferentes formatos
    const formats = ['pdf', 'excel', 'csv'];
    const format = formats[Math.floor(Math.random() * formats.length)];
    
    const link = document.createElement('a');
    link.download = `relatorio-${type}-${new Date().toISOString().split('T')[0]}.${format}`;
    link.href = '#';
    
    // Simular download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar notificação de sucesso
    alert(`Relatório ${type} exportado com sucesso!`);
  };

  const user = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    avatar: 'JS'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <DrawerMenu user={user} />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">BookedUp</h1>
                  <p className="text-sm text-muted-foreground">Relatórios</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationsDropdown />
              <ThemeToggle />
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 cursor-pointer">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Relatórios</h2>
            <p className="text-muted-foreground">Analise o desempenho do seu negócio</p>
          </div>
          
          <div className="flex items-center space-x-4">
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">480</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatToReal(61000)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Satisfação</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.2</span> em relação ao período anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Reports */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Relatórios Rápidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>

        {/* Reports Tabs */}
        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
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
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
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
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

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
                        {clientData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financeiro */}
          <TabsContent value="financial" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
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

              <Card>
                <CardHeader>
                  <CardTitle>Top Serviços por Receita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topServices.map((service, index) => (
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
            </div>
          </TabsContent>

          {/* Clientes */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topClients.map((client, index) => (
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
          </TabsContent>

          {/* Serviços */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Serviços Mais Populares</h4>
                    <div className="space-y-3">
                      {topServices.map((service) => (
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
                      {topServices.map((service) => (
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
          </TabsContent>

          {/* Performance */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
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
            </div>

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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 
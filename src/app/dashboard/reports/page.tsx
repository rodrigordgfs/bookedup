'use client';

import { useState, useEffect } from 'react';
import { formatToReal } from '@/lib/utils';
import ReportsHeaderControls from '@/components/reports/ReportsHeaderControls';
import ReportsStatsCards from '@/components/reports/ReportsStatsCards';
import ReportsQuickActions from '@/components/reports/ReportsQuickActions';
import ReportsTabs from '@/components/reports/ReportsTabs';
import ReportsOverviewTab from '@/components/reports/ReportsOverviewTab';
import ReportsFinancialTab from '@/components/reports/ReportsFinancialTab';
import ReportsClientsTab from '@/components/reports/ReportsClientsTab';
import ReportsServicesTab from '@/components/reports/ReportsServicesTab';
import ReportsPerformanceTab from '@/components/reports/ReportsPerformanceTab';
import ReportsSkeleton from '@/components/reports/ReportsSkeleton';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [loading, setLoading] = useState(false); // Estado de loading

  // Dados simulados para os relatórios
  const appointmentData = [
    { 
      id: 1,
      client: { id: 1, name: 'Cliente Janeiro', email: 'jan@email.com', phone: '11999999999' },
      service: 'Consultoria',
      professional: 'João Silva',
      date: '2024-01-15',
      time: '09:00',
      duration: 60,
      status: 'completed',
      price: 100,
      name: 'Jan',
      agendamentos: 65,
      cancelamentos: 8,
      receita: 8500
    },
    { 
      id: 2,
      client: { id: 2, name: 'Cliente Fevereiro', email: 'fev@email.com', phone: '11999999999' },
      service: 'Avaliação',
      professional: 'Maria Santos',
      date: '2024-02-15',
      time: '10:00',
      duration: 45,
      status: 'completed',
      price: 80,
      name: 'Fev',
      agendamentos: 72,
      cancelamentos: 5,
      receita: 9200
    },
    { 
      id: 3,
      client: { id: 3, name: 'Cliente Março', email: 'mar@email.com', phone: '11999999999' },
      service: 'Sessão Completa',
      professional: 'Carlos Lima',
      date: '2024-03-15',
      time: '14:00',
      duration: 90,
      status: 'completed',
      price: 150,
      name: 'Mar',
      agendamentos: 85,
      cancelamentos: 12,
      receita: 10800
    },
    { 
      id: 4,
      client: { id: 4, name: 'Cliente Abril', email: 'abr@email.com', phone: '11999999999' },
      service: 'Manutenção',
      professional: 'Ana Costa',
      date: '2024-04-15',
      time: '15:00',
      duration: 30,
      status: 'completed',
      price: 60,
      name: 'Abr',
      agendamentos: 78,
      cancelamentos: 7,
      receita: 9800
    },
    { 
      id: 5,
      client: { id: 5, name: 'Cliente Maio', email: 'mai@email.com', phone: '11999999999' },
      service: 'Consultoria',
      professional: 'Pedro Silva',
      date: '2024-05-15',
      time: '16:00',
      duration: 60,
      status: 'completed',
      price: 100,
      name: 'Mai',
      agendamentos: 92,
      cancelamentos: 9,
      receita: 11500
    },
    { 
      id: 6,
      client: { id: 6, name: 'Cliente Junho', email: 'jun@email.com', phone: '11999999999' },
      service: 'Avaliação',
      professional: 'Lucia Santos',
      date: '2024-06-15',
      time: '11:00',
      duration: 45,
      status: 'completed',
      price: 80,
      name: 'Jun',
      agendamentos: 88,
      cancelamentos: 6,
      receita: 11200
    }
  ];

  const serviceData = [
    { name: 'Consultoria', value: 35, color: '#8884d8' },
    { name: 'Avaliação', value: 25, color: '#82ca9d' },
    { name: 'Sessão Completa', value: 30, color: '#ffc658' },
    { name: 'Manutenção', value: 10, color: '#ff7300' },
  ];

  const clientData = [
    { 
      id: 1,
      name: 'Novos', 
      email: 'novos@example.com',
      phone: '11999999999',
      totalAppointments: 45,
      totalSpent: 4500,
      lastVisit: '2024-01-15',
      status: 'active' as const,
      notes: 'Clientes novos',
      value: 45, 
      color: '#8884d8' 
    },
    { 
      id: 2,
      name: 'Recorrentes', 
      email: 'recorrentes@example.com',
      phone: '11999999998',
      totalAppointments: 55,
      totalSpent: 5500,
      lastVisit: '2024-01-12',
      status: 'active' as const,
      notes: 'Clientes recorrentes',
      value: 55, 
      color: '#82ca9d' 
    },
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
    { 
      id: '1',
      name: 'Consultoria', 
      description: 'Serviço de consultoria especializada',
      duration: 60,
      price: 150,
      category: 'Consultoria',
      active: true,
      agendamentos: 156, 
      receita: 23400, 
      crescimento: 12 
    },
    { 
      id: '2',
      name: 'Sessão Completa', 
      description: 'Sessão completa de atendimento',
      duration: 90,
      price: 200,
      category: 'Atendimento',
      active: true,
      agendamentos: 142, 
      receita: 28400, 
      crescimento: 8 
    },
    { 
      id: '3',
      name: 'Avaliação', 
      description: 'Avaliação técnica detalhada',
      duration: 45,
      price: 80,
      category: 'Avaliação',
      active: true,
      agendamentos: 98, 
      receita: 7840, 
      crescimento: 15 
    },
    { 
      id: '4',
      name: 'Manutenção', 
      description: 'Serviço de manutenção preventiva',
      duration: 30,
      price: 120,
      category: 'Manutenção',
      active: true,
      agendamentos: 67, 
      receita: 8040, 
      crescimento: 5 
    },
  ];

  const topClients = [
    { 
      id: 1,
      name: 'João Silva', 
      email: 'joao@email.com',
      phone: '11999999999',
      totalAppointments: 12,
      totalSpent: 2400,
      lastVisit: '2024-01-15',
      status: 'active' as const,
      notes: 'Cliente VIP',
      agendamentos: 12, 
      valor: 2400, 
      ultimaVisita: '2024-01-15' 
    },
    { 
      id: 2,
      name: 'Maria Santos', 
      email: 'maria@email.com',
      phone: '11999999998',
      totalAppointments: 10,
      totalSpent: 2100,
      lastVisit: '2024-01-12',
      status: 'active' as const,
      notes: 'Cliente frequente',
      agendamentos: 10, 
      valor: 2100, 
      ultimaVisita: '2024-01-12' 
    },
    { 
      id: 3,
      name: 'Carlos Lima', 
      email: 'carlos@email.com',
      phone: '11999999997',
      totalAppointments: 8,
      totalSpent: 1800,
      lastVisit: '2024-01-10',
      status: 'active' as const,
      notes: 'Cliente regular',
      agendamentos: 8, 
      valor: 1800, 
      ultimaVisita: '2024-01-10' 
    },
    { 
      id: 4,
      name: 'Ana Costa', 
      email: 'ana@email.com',
      phone: '11999999996',
      totalAppointments: 7,
      totalSpent: 1500,
      lastVisit: '2024-01-08',
      status: 'active' as const,
      notes: 'Cliente novo',
      agendamentos: 7, 
      valor: 1500, 
      ultimaVisita: '2024-01-08' 
    },
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

  // Simula o loading ao montar a página
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Controls */}
        <ReportsHeaderControls 
          loading={loading}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedReport={selectedReport}
          exportReport={exportReport}
        />

        {/* Stats Cards */}
        <ReportsStatsCards 
          loading={loading} 
          formatToReal={formatToReal}
          stats={{
            agendamentos: 480,
            agendamentosDelta: '+12%',
            receita: 61000,
            receitaDelta: '+8%',
            clientes: 45,
            clientesDelta: '+15%',
            satisfacao: '4.8/5',
            satisfacaoDelta: '+0.2',
          }}
        />

        {/* Quick Reports */}
        <ReportsQuickActions loading={loading} exportReport={exportReport} />

        {/* Reports Tabs */}
        {loading ? (
          <ReportsSkeleton />
        ) : (
          <ReportsTabs 
            selectedReport={selectedReport}
            setSelectedReport={setSelectedReport}
            loading={loading}
            OverviewTab={<ReportsOverviewTab loading={loading} appointmentData={appointmentData} serviceData={serviceData} clientData={clientData} />}
            FinancialTab={<ReportsFinancialTab loading={loading} appointmentData={appointmentData} topServices={topServices} formatToReal={formatToReal} />}
            ClientsTab={<ReportsClientsTab loading={loading} topClients={topClients} formatToReal={formatToReal} />}
            ServicesTab={<ReportsServicesTab loading={loading} topServices={topServices} formatToReal={formatToReal} />}
            PerformanceTab={<ReportsPerformanceTab loading={loading} performanceData={performanceData} />}
          />
        )}
      </main>
    </div>
  );
} 
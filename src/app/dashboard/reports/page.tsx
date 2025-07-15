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
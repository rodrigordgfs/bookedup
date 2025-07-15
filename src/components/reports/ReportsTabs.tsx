import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

interface ReportsTabsProps {
  selectedReport: string;
  setSelectedReport: (value: string) => void;
  loading: boolean;
  OverviewTab: React.ReactNode;
  FinancialTab: React.ReactNode;
  ClientsTab: React.ReactNode;
  ServicesTab: React.ReactNode;
  PerformanceTab: React.ReactNode;
}

export default function ReportsTabs({
  selectedReport,
  setSelectedReport,
  OverviewTab,
  FinancialTab,
  ClientsTab,
  ServicesTab,
  PerformanceTab,
}: ReportsTabsProps) {
  return (
    <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="financial">Financeiro</TabsTrigger>
        <TabsTrigger value="clients">Clientes</TabsTrigger>
        <TabsTrigger value="services">Serviços</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-6">{OverviewTab}</TabsContent>
      <TabsContent value="financial" className="space-y-6">{FinancialTab}</TabsContent>
      <TabsContent value="clients" className="space-y-6">{ClientsTab}</TabsContent>
      <TabsContent value="services" className="space-y-6">{ServicesTab}</TabsContent>
      <TabsContent value="performance" className="space-y-6">{PerformanceTab}</TabsContent>
    </Tabs>
  );
} 
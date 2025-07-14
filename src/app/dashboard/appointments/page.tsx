'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatToReal } from '@/lib/utils';
import {
  User,
  Bell,
  Settings,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2, Calendar,
  Clock, CheckCircle,
  XCircle,
  AlertCircle,
  Filter, MoreVertical,
  Archive,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toolbar } from '@/components/Toolbar';
import { PaginationBar } from '@/components/ui/pagination';
import { appointments } from '@/mocks/data';

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAppointmentDetailOpen, setIsAppointmentDetailOpen] = useState(false);
  const [isEditAppointmentOpen, setIsEditAppointmentOpen] = useState(false);
  const [isClientHistoryOpen, setIsClientHistoryOpen] = useState(false);
  type Appointment = {
    id: number;
    client: {
      name: string;
      email: string;
      phone: string;
    };
    service: string;
    professional: string;
    date: string;
    time: string;
    duration: number;
    price: number;
    status: string;
    notes?: string;
  };

  type EditAppointment = {
    id: number;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    service: string;
    professional: string;
    date: string;
    time: string;
    notes?: string;
  };

  interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
  }

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<EditAppointment | null>(null);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [isClientSelectOpen, setIsClientSelectOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: 'all',
    service: 'all',
    professional: 'all',
    dateRange: 'all'
  });
  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    professional: '',
    date: '',
    time: '',
    notes: ''
  });

  // Dados dos clientes para o select
  const clients: Client[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999'
    },
    {
      id: 2,
      name: 'Pedro Santos',
      email: 'pedro@email.com',
      phone: '(11) 88888-8888'
    },
    {
      id: 3,
      name: 'Carlos Lima',
      email: 'carlos@email.com',
      phone: '(11) 77777-7777'
    },
    {
      id: 4,
      name: 'Roberto Costa',
      email: 'roberto@email.com',
      phone: '(11) 66666-6666'
    },
    {
      id: 5,
      name: 'Lucas Oliveira',
      email: 'lucas@email.com',
      phone: '(11) 55555-5555'
    }
  ];

  // Verificar se há um cliente selecionado para agendamento ou se deve abrir o modal de novo agendamento
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selectedClientForAppointment = localStorage.getItem('selectedClientForAppointment');
      const openNewAppointmentModal = localStorage.getItem('openNewAppointmentModal');
      const selectedDateForAppointment = localStorage.getItem('selectedDateForAppointment');
      
      if (selectedClientForAppointment) {
        try {
          const clientData = JSON.parse(selectedClientForAppointment);
          setNewAppointment(prev => ({
            ...prev,
            clientName: clientData.name,
            clientEmail: clientData.email,
            clientPhone: clientData.phone
          }));
          setClientSearchTerm(clientData.name);
          setIsAddAppointmentOpen(true);
          // Limpar o localStorage após usar
          localStorage.removeItem('selectedClientForAppointment');
        } catch (error) {
          console.error('Erro ao processar dados do cliente:', error);
          localStorage.removeItem('selectedClientForAppointment');
        }
      } else if (openNewAppointmentModal === 'true') {
        // Abrir modal de novo agendamento sem dados de cliente
        setIsAddAppointmentOpen(true);
        // Limpar o localStorage após usar
        localStorage.removeItem('openNewAppointmentModal');
        if (selectedDateForAppointment) {
          setNewAppointment(prev => ({
            ...prev,
            date: selectedDateForAppointment
          }));
          localStorage.removeItem('selectedDateForAppointment');
        }
      }
    }
  }, []);

  // Abrir modal de detalhes automaticamente se vier do calendário
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const openAppointmentDetailId = localStorage.getItem('openAppointmentDetailId');
      if (openAppointmentDetailId) {
        const apt = appointments.find(a => a.id === Number(openAppointmentDetailId));
        if (apt) {
          setSelectedAppointment(apt);
          setIsAppointmentDetailOpen(true);
        }
        localStorage.removeItem('openAppointmentDetailId');
      }
    }
  }, []);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('#clientSelect') && !target.closest('.client-dropdown')) {
          setIsClientSelectOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.professional.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesAdvancedStatus = filters.status === 'all' || appointment.status === filters.status;
    const matchesService = filters.service === 'all' || appointment.service.toLowerCase().includes(filters.service);
    const matchesProfessional = filters.professional === 'all' || appointment.professional.toLowerCase().includes(filters.professional);
    
    return matchesSearch && matchesStatus && matchesAdvancedStatus && matchesService && matchesProfessional;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      case 'completed': return 'Concluído';
      default: return status;
    }
  };

  const handleAddAppointment = () => {
    console.log('Adding appointment:', newAppointment);
    setIsAddAppointmentOpen(false);
    setNewAppointment({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      professional: '',
      date: '',
      time: '',
      notes: ''
    });
    setClientSearchTerm('');
    setIsClientSelectOpen(false);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsAppointmentDetailOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    console.log('Opening edit modal for appointment:', appointment);
    
    const editData = {
      id: appointment.id,
      clientName: appointment.client.name,
      clientEmail: appointment.client.email,
      clientPhone: appointment.client.phone,
      service: appointment.service,
      professional: appointment.professional,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes || ''
    };
    
    console.log('Edit data prepared:', editData);
    setEditingAppointment(editData);
    setIsEditAppointmentOpen(true);
    setIsAppointmentDetailOpen(false);
  };

  const handleSaveEdit = () => {
    console.log('Saving edited appointment:', editingAppointment);
    // Aqui você implementaria a lógica para salvar as alterações no backend
    setIsEditAppointmentOpen(false);
    setEditingAppointment(null);
    // Recarregar os dados do agendamento selecionado
    if (selectedAppointment) {
      const updatedAppointment = appointments.find(a => a.id === selectedAppointment.id);
      if (updatedAppointment) {
        setSelectedAppointment(updatedAppointment);
      }
    }
  };

  const handleViewClientHistory = (appointment: Appointment) => {
    console.log('Opening client history for:', appointment.client.name);
    setIsClientHistoryOpen(true);
    setIsAppointmentDetailOpen(false);
  };

  const handleClientSelect = (client: Client) => {
    setNewAppointment(prev => ({
      ...prev,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone
    }));
    setClientSearchTerm(client.name);
    setIsClientSelectOpen(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    client.phone.includes(clientSearchTerm)
  );

  const updateAppointmentStatus = (id: number, newStatus: string) => {
    console.log(`Updating appointment ${id} to status: ${newStatus}`);
    // Here you would update the appointment status in your backend
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toolbar
        title="BookedUp"
        subtitle="Agendamentos"
        icon={<Calendar className="w-5 h-5 text-white" />}
        showDrawer
        showNotifications
        showThemeToggle
        showUserMenu={false}
        rightActions={
          <>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 cursor-pointer">
              <LogOut className="w-5 h-5" />
            </Button>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Gerenciar Agendamentos</h2>
            <p className="text-muted-foreground">
              Visualize e gerencie todos os agendamentos do seu negócio
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[500px] sm:mx-0">
                <DialogHeader>
                  <DialogTitle>Novo Agendamento</DialogTitle>
                  <DialogDescription>
                    Preencha as informações para criar um novo agendamento.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientSelect">Selecionar Cliente</Label>
                    <div className="relative">
                      <Input
                        id="clientSelect"
                        placeholder="Digite para buscar um cliente..."
                        value={clientSearchTerm}
                        onChange={(e) => {
                          setClientSearchTerm(e.target.value);
                          setIsClientSelectOpen(true);
                        }}
                        onFocus={() => setIsClientSelectOpen(true)}
                      />
                      {isClientSelectOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto client-dropdown">
                          {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                              <div
                                key={client.id}
                                className="px-3 py-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                                onClick={() => handleClientSelect(client)}
                              >
                                <div className="font-medium">{client.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {client.email} • {client.phone}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-muted-foreground">
                              Nenhum cliente encontrado
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {newAppointment.clientName && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientPhone">Telefone</Label>
                        <Input
                          id="clientPhone"
                          value={newAppointment.clientPhone}
                          onChange={(e) => setNewAppointment(prev => ({...prev, clientPhone: e.target.value}))}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientEmail">Email</Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          value={newAppointment.clientEmail}
                          onChange={(e) => setNewAppointment(prev => ({...prev, clientEmail: e.target.value}))}
                          placeholder="email@exemplo.com"
                        />
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service">Serviço</Label>
                      <Select value={newAppointment.service} onValueChange={(value) => setNewAppointment(prev => ({...prev, service: value}))}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="haircut">Corte Masculino</SelectItem>
                          <SelectItem value="beard">Barba</SelectItem>
                          <SelectItem value="haircut-beard">Corte + Barba</SelectItem>
                          <SelectItem value="treatment">Tratamento Capilar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="professional">Profissional</Label>
                      <Select value={newAppointment.professional} onValueChange={(value) => setNewAppointment(prev => ({...prev, professional: value}))}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o profissional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joao">João Barbeiro</SelectItem>
                          <SelectItem value="maria">Maria Silva</SelectItem>
                          <SelectItem value="pedro">Pedro Costa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment(prev => ({...prev, date: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Horário</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment(prev => ({...prev, time: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment(prev => ({...prev, notes: e.target.value}))}
                      placeholder="Observações sobre o agendamento..."
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddAppointmentOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddAppointment}>
                    Criar Agendamento
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por cliente, serviço ou profissional..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros Avançados
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Filtros de Agendamentos</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="filterStatus">Status</Label>
                      <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os status</SelectItem>
                          <SelectItem value="confirmed">Confirmado</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterService">Serviço</Label>
                      <Select value={filters.service} onValueChange={(value) => setFilters({...filters, service: value})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os serviços</SelectItem>
                          <SelectItem value="haircut">Corte Masculino</SelectItem>
                          <SelectItem value="beard">Barba</SelectItem>
                          <SelectItem value="haircut-beard">Corte + Barba</SelectItem>
                          <SelectItem value="treatment">Tratamento Capilar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterProfessional">Profissional</Label>
                      <Select value={filters.professional} onValueChange={(value) => setFilters({...filters, professional: value})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o profissional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os profissionais</SelectItem>
                          <SelectItem value="joao">João Barbeiro</SelectItem>
                          <SelectItem value="maria">Maria Silva</SelectItem>
                          <SelectItem value="pedro">Pedro Costa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filterDateRange">Período</Label>
                      <Select value={filters.dateRange} onValueChange={(value) => setFilters({...filters, dateRange: value})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os períodos</SelectItem>
                          <SelectItem value="today">Hoje</SelectItem>
                          <SelectItem value="week">Esta semana</SelectItem>
                          <SelectItem value="month">Este mês</SelectItem>
                          <SelectItem value="past">Passado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {
                      setFilters({
                        status: 'all',
                        service: 'all',
                        professional: 'all',
                        dateRange: 'all'
                      });
                    }}>
                      Limpar Filtros
                    </Button>
                    <Button onClick={() => setIsFilterModalOpen(false)}>
                      Aplicar Filtros
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-semibold">Lista de Agendamentos</h3>
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredAppointments.length)} de {filteredAppointments.length} agendamentos
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm">Cliente</th>
                    <th className="text-left p-4 font-medium text-sm">Serviço</th>
                    <th className="text-left p-4 font-medium text-sm">Data</th>
                    <th className="text-left p-4 font-medium text-sm">Horário</th>
                    <th className="text-left p-4 font-medium text-sm">Profissional</th>
                    <th className="text-left p-4 font-medium text-sm">Valor</th>
                    <th className="text-left p-4 font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAppointments.map((appointment) => (
                    <tr 
                      key={appointment.id} 
                      className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{appointment.client.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Archive className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.service}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.time} ({appointment.duration} min)</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.professional}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold">{formatToReal(appointment.price)}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(appointment.status)} flex items-center space-x-1 w-fit`}>
                          {getStatusIcon(appointment.status)}
                          <span className="text-xs">{getStatusText(appointment.status)}</span>
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="py-4"
            />
          </CardContent>
        </Card>

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum agendamento encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca' 
                  : 'Comece criando seu primeiro agendamento'
                }
              </p>
              <Button onClick={() => setIsAddAppointmentOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modal de Detalhes do Agendamento */}
        <Dialog open={isAppointmentDetailOpen} onOpenChange={setIsAppointmentDetailOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px] sm:mx-0 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Detalhes do Agendamento</span>
              </DialogTitle>
              <DialogDescription>
                Visualize e gerencie os detalhes completos do agendamento.
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4 sm:space-y-6">
                {/* Status do Agendamento */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={`${getStatusColor(selectedAppointment.status)} flex items-center space-x-1`}>
                      {getStatusIcon(selectedAppointment.status)}
                      <span className="text-xs">{getStatusText(selectedAppointment.status)}</span>
                    </Badge>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {formatToReal(selectedAppointment.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedAppointment.duration} minutos
                    </div>
                  </div>
                </div>

                {/* Informações do Cliente */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Informações do Cliente</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="detailClientName">Nome</label>
                      <p className="text-sm font-medium" id="detailClientName">{selectedAppointment.client.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="detailClientEmail">Email</label>
                      <p className="text-sm" id="detailClientEmail">{selectedAppointment.client.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="detailClientPhone">Telefone</label>
                      <p className="text-sm" id="detailClientPhone">{selectedAppointment.client.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Informações do Serviço */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Archive className="w-5 h-5" />
                    <span>Detalhes do Serviço</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="detailService">Serviço</label>
                      <p className="text-sm font-medium" id="detailService">{selectedAppointment.service}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="detailProfessional">Profissional</label>
                      <div className="flex items-center space-x-2" id="detailProfessional">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedAppointment.professional}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data e Horário */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Data e Horário</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="detailDate">Data</label>
                      <div className="flex items-center space-x-2" id="detailDate">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{new Date(selectedAppointment.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground" htmlFor="detailTime">Horário</label>
                      <div className="flex items-center space-x-2" id="detailTime">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedAppointment.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                {selectedAppointment.notes && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Observações</h3>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="space-y-4 pt-4 border-t">
                  {/* Status Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Alterar Status:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedAppointment.status === 'pending' && (
                        <>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="text-green-600 border-green-200 hover:bg-green-50 flex-1 sm:flex-none"
                            onClick={() => {
                              updateAppointmentStatus(selectedAppointment.id, 'confirmed');
                              setIsAppointmentDetailOpen(false);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirmar
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="text-red-600 border-red-200 hover:bg-red-50 flex-1 sm:flex-none"
                            onClick={() => {
                              updateAppointmentStatus(selectedAppointment.id, 'cancelled');
                              setIsAppointmentDetailOpen(false);
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancelar
                          </Button>
                        </>
                      )}
                      
                      {selectedAppointment.status === 'confirmed' && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 cursor-pointer flex-1 sm:flex-none"
                          onClick={() => {
                            updateAppointmentStatus(selectedAppointment.id, 'completed');
                            setIsAppointmentDetailOpen(false);
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Concluir
                        </Button>
                      )}
                      
                      {selectedAppointment.status === 'completed' && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-gray-600 border-gray-200 hover:bg-gray-50 cursor-pointer flex-1 sm:flex-none"
                          onClick={() => {
                            updateAppointmentStatus(selectedAppointment.id, 'cancelled');
                            setIsAppointmentDetailOpen(false);
                          }}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Other Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Outras Ações:</span>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // Lógica para reenviar confirmação
                          console.log('Reenviar confirmação para:', selectedAppointment.client.email);
                          setIsAppointmentDetailOpen(false);
                        }}
                        className="cursor-pointer flex-1 sm:flex-none"
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Reenviar Confirmação
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="cursor-pointer flex-1 sm:flex-none">
                            <MoreVertical className="w-4 h-4 mr-2" />
                            Mais Opções
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {selectedAppointment.status !== 'cancelled' && selectedAppointment.status !== 'completed' && (
                            <DropdownMenuItem 
                              onClick={() => {
                                console.log('Edit clicked for appointment:', selectedAppointment);
                                handleEditAppointment(selectedAppointment);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar Agendamento
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleViewClientHistory(selectedAppointment)}>
                            <User className="mr-2 h-4 w-4" />
                            Ver Histórico do Cliente
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {selectedAppointment.status === 'pending' && (
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir Agendamento
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="flex justify-end pt-2">
                    <Button variant="outline" onClick={() => setIsAppointmentDetailOpen(false)}>
                      Fechar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Edição do Agendamento */}
        <Dialog open={isEditAppointmentOpen} onOpenChange={(open) => {
          console.log('Edit modal open state:', open);
          setIsEditAppointmentOpen(open);
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5" />
                <span>Editar Agendamento</span>
              </DialogTitle>
              <DialogDescription>
                Modifique as informações do agendamento conforme necessário.
              </DialogDescription>
            </DialogHeader>
            {editingAppointment && (
              <div className="grid gap-4 py-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Editando agendamento ID: {editingAppointment.id}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editClientName">Nome do cliente</Label>
                    <Input
                      id="editClientName"
                      value={editingAppointment.clientName}
                      onChange={(e) => setEditingAppointment({...editingAppointment, clientName: e.target.value})}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editClientPhone">Telefone</Label>
                    <Input
                      id="editClientPhone"
                      value={editingAppointment.clientPhone}
                      onChange={(e) => setEditingAppointment({...editingAppointment, clientPhone: e.target.value})}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editClientEmail">Email</Label>
                  <Input
                    id="editClientEmail"
                    type="email"
                    value={editingAppointment.clientEmail}
                    onChange={(e) => setEditingAppointment({...editingAppointment, clientEmail: e.target.value})}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editService">Serviço</Label>
                    <Select value={editingAppointment.service} onValueChange={(value) => setEditingAppointment({...editingAppointment, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Corte Masculino">Corte Masculino</SelectItem>
                        <SelectItem value="Barba">Barba</SelectItem>
                        <SelectItem value="Corte + Barba">Corte + Barba</SelectItem>
                        <SelectItem value="Tratamento Capilar">Tratamento Capilar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editProfessional">Profissional</Label>
                    <Select value={editingAppointment.professional} onValueChange={(value) => setEditingAppointment({...editingAppointment, professional: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="João Barbeiro">João Barbeiro</SelectItem>
                        <SelectItem value="Maria Silva">Maria Silva</SelectItem>
                        <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editDate">Data</Label>
                    <Input
                      id="editDate"
                      type="date"
                      value={editingAppointment.date}
                      onChange={(e) => setEditingAppointment({...editingAppointment, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editTime">Horário</Label>
                    <Input
                      id="editTime"
                      type="time"
                      value={editingAppointment.time}
                      onChange={(e) => setEditingAppointment({...editingAppointment, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editNotes">Observações</Label>
                  <textarea
                    id="editNotes"
                    value={editingAppointment.notes}
                    onChange={(e) => setEditingAppointment({...editingAppointment, notes: e.target.value})}
                    placeholder="Observações sobre o agendamento..."
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setIsEditAppointmentOpen(false);
                setEditingAppointment(null);
              }}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Histórico do Cliente */}
        <Dialog open={isClientHistoryOpen} onOpenChange={setIsClientHistoryOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[700px] sm:mx-0 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Histórico do Cliente</span>
              </DialogTitle>
              <DialogDescription>
                Visualize o histórico completo de agendamentos do cliente.
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-4 sm:space-y-6">
                {/* Informações do Cliente */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Informações do Cliente</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nome</label>
                      <p className="text-sm font-medium">{selectedAppointment.client.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-sm">{selectedAppointment.client.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                      <p className="text-sm">{selectedAppointment.client.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Estatísticas</h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">12</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Total de Visitas</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-green-600">8</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Concluídos</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-yellow-600">2</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Pendentes</div>
                    </div>
                    <div className="p-3 sm:p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-600">2</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Cancelados</div>
                    </div>
                  </div>
                </div>

                {/* Histórico de Agendamentos */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Histórico de Agendamentos</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {appointments
                      .filter(apt => apt.client.email === selectedAppointment.client.email)
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((appointment) => (
                        <div key={appointment.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  {new Date(appointment.date).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{appointment.time}</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <Badge className={`${getStatusColor(appointment.status)} flex items-center space-x-1 w-fit`}>
                                {getStatusIcon(appointment.status)}
                                <span className="text-xs">{getStatusText(appointment.status)}</span>
                              </Badge>
                              <span className="text-sm font-medium">{formatToReal(appointment.price)}</span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <span className="font-medium">{appointment.service}</span> • {appointment.professional}
                          </div>
                          {appointment.notes && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="font-medium">Observações:</span> {appointment.notes}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsClientHistoryOpen(false)} 
                    className="cursor-pointer w-full sm:w-auto"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
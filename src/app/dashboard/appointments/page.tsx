'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import NewAppointmentDialog from '@/components/appointments/NewAppointmentDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatToReal } from '@/lib/utils';
import {
  User,
  Bell, Plus,
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
import { PaginationBar } from '@/components/ui/pagination';
import { appointments } from '@/mocks/data';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppointmentsTable from '@/components/appointments/AppointmentsTable';
import AppointmentsFilters from '@/components/appointments/AppointmentsFilters';
import AppointmentDetailsDialog from '@/components/appointments/AppointmentDetailsDialog';
import EditAppointmentDialog from '@/components/appointments/EditAppointmentDialog';
import ClientHistoryDialog from '@/components/appointments/ClientHistoryDialog';
import NoAppointmentsCard from '@/components/appointments/NoAppointmentsCard';

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
  const [loading, setLoading] = useState(false); // Estado de loading

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

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
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
            <NewAppointmentDialog
              open={isAddAppointmentOpen}
              onOpenChange={setIsAddAppointmentOpen}
              clientSearchTerm={clientSearchTerm}
              setClientSearchTerm={setClientSearchTerm}
              isClientSelectOpen={isClientSelectOpen}
              setIsClientSelectOpen={setIsClientSelectOpen}
              filteredClients={filteredClients}
              handleClientSelect={handleClientSelect}
              newAppointment={newAppointment}
              setNewAppointment={setNewAppointment}
              handleAddAppointment={handleAddAppointment}
            />
          </div>
        </div>

        {/* Search and Filters */}
        <AppointmentsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filters={filters}
          setFilters={setFilters}
          isFilterModalOpen={isFilterModalOpen}
          setIsFilterModalOpen={setIsFilterModalOpen}
          loading={loading}
        />

        {/* Appointments List */}
        <AppointmentsTable
          appointments={currentAppointments}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={filteredAppointments.length}
          onPageChange={handlePageChange}
          onAppointmentClick={handleAppointmentClick}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getStatusText={getStatusText}
        />

        {filteredAppointments.length === 0 && (
          <NoAppointmentsCard
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onAddAppointment={() => setIsAddAppointmentOpen(true)}
          />
        )}

        {/* Modal de Detalhes do Agendamento */}
        <AppointmentDetailsDialog
          open={isAppointmentDetailOpen}
          onOpenChange={setIsAppointmentDetailOpen}
          appointment={selectedAppointment}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getStatusText={getStatusText}
          updateAppointmentStatus={(id, status) => {
            updateAppointmentStatus(id, status);
            setIsAppointmentDetailOpen(false);
          }}
          onEdit={handleEditAppointment}
          onViewClientHistory={handleViewClientHistory}
        />

        {/* Modal de Edição do Agendamento */}
        <EditAppointmentDialog
          open={isEditAppointmentOpen}
          onOpenChange={setIsEditAppointmentOpen}
          editingAppointment={editingAppointment}
          setEditingAppointment={setEditingAppointment}
          handleSaveEdit={handleSaveEdit}
        />

        {/* Modal de Histórico do Cliente */}
        <ClientHistoryDialog
          open={isClientHistoryOpen}
          onOpenChange={setIsClientHistoryOpen}
          selectedAppointment={selectedAppointment}
          appointments={appointments}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getStatusText={getStatusText}
        />
      </div>
    </div>
  );
}
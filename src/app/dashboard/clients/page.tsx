'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Client } from '@/mocks/data';
import { clients } from '@/mocks/data';
import NewClientDialog from '@/components/clients/NewClientDialog';
import ClientsFilters from '@/components/clients/ClientsFilters';
import ClientsTable from '@/components/clients/ClientsTable';
import NoClientsCard from '@/components/clients/NoClientsCard';
import ClientDetailsDialog from '@/components/clients/ClientDetailsDialog';
import EditClientDialog from '@/components/clients/EditClientDialog';

export default function ClientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isClientDetailOpen, setIsClientDetailOpen] = useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false); // Estado de loading

  // Simula o loading ao montar a página
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = () => {
    // Here you would typically send the data to your backend
    console.log('Adding client:', newClient);
    setIsAddClientOpen(false);
    setNewClient({ name: '', email: '', phone: '', notes: '' });
  };

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setIsClientDetailOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      totalAppointments: client.totalAppointments,
      lastVisit: client.lastVisit,
      status: client.status,
      notes: client.notes || ''
    });
    setIsEditClientOpen(true);
    setIsClientDetailOpen(false);
  };

  const handleSaveEdit = () => {
    console.log('Saving edited client:', editingClient);
    // Aqui você implementaria a lógica para salvar as alterações no backend
    setIsEditClientOpen(false);
    setEditingClient(null);
    // Recarregar os dados do cliente selecionado
    if (selectedClient) {
      const updatedClient = clients.find(c => c.id === selectedClient.id);
      if (updatedClient) {
        setSelectedClient(updatedClient);
      }
    }
  };

  const handleScheduleForClient = (client: Client) => {
    if (typeof window !== 'undefined') {
      // Salvar dados do cliente no localStorage para usar na tela de appointments
      localStorage.setItem('selectedClientForAppointment', JSON.stringify({
        name: client.name,
        email: client.email,
        phone: client.phone
      }));
      // Redirecionar para a tela de appointments
      router.push('/dashboard/appointments');
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Gerenciar Clientes</h2>
            <p className="text-muted-foreground">
              Gerencie informações dos seus clientes e histórico de agendamentos
            </p>
          </div>
          <NewClientDialog
            open={isAddClientOpen}
            onOpenChange={setIsAddClientOpen}
            newClient={newClient}
            setNewClient={setNewClient}
            handleAddClient={handleAddClient}
          />
        </div>

        {/* Search and Filters */}
        <ClientsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          loading={loading}
          clients={clients}
        />

        {/* Clients List */}
        <ClientsTable
          clients={currentClients}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={filteredClients.length}
          onPageChange={handlePageChange}
          onClientClick={handleClientClick}
        />

        {filteredClients.length === 0 && (
          <NoClientsCard
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onAddClient={() => setIsAddClientOpen(true)}
          />
        )}

        {/* Modal de Detalhes do Cliente */}
        <ClientDetailsDialog
          open={isClientDetailOpen}
          onOpenChange={setIsClientDetailOpen}
          selectedClient={selectedClient}
          onSchedule={handleScheduleForClient}
          onEdit={handleEditClient}
          onDelete={() => {
            // Aqui você pode implementar lógica de ativar/desativar/excluir
            setIsClientDetailOpen(false);
          }}
        />

        {/* Modal de Edição do Cliente */}
        <EditClientDialog
          open={isEditClientOpen}
          onOpenChange={setIsEditClientOpen}
          editingClient={editingClient}
          setEditingClient={setEditingClient}
          handleSaveEdit={handleSaveEdit}
        />
      </div>
    </div>
  );
}
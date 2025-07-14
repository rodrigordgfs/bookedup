'use client';

import { SignOutButton } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Toolbar } from '@/components/Toolbar';
import {
  User, Settings,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail, Calendar, ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PaginationBar } from '@/components/ui/pagination';
import type { Client } from '@/mocks/data';
import { clients } from '@/mocks/data';

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

  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    avatarUrl: '',
    role: 'Administrador',
  };

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
      <Toolbar
        title="BookedUp"
        subtitle="Gerenciar Clientes"
        icon={<User className="w-5 h-5 text-white" />}
        showDrawer
        user={user}
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
            <SignOutButton>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 cursor-pointer">
                <LogOut className="w-5 h-5" />
              </Button>
            </SignOutButton>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Gerenciar Clientes</h2>
            <p className="text-muted-foreground">
              Gerencie informações dos seus clientes e histórico de agendamentos
            </p>
          </div>
          <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
            <DialogTrigger asChild>
              <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient(prev => ({...prev, name: e.target.value}))}
                    placeholder="Nome do cliente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient(prev => ({...prev, email: e.target.value}))}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient(prev => ({...prev, phone: e.target.value}))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <textarea
                    id="notes"
                    value={newClient.notes}
                    onChange={(e) => setNewClient(prev => ({...prev, notes: e.target.value}))}
                    placeholder="Observações sobre o cliente..."
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddClient}>
                  Adicionar Cliente
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar clientes por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  Todos ({clients.length})
                </Button>
                <Button 
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('active')}
                >
                  Ativos ({clients.filter(c => c.status === 'active').length})
                </Button>
                <Button 
                  variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('inactive')}
                >
                  Inativos ({clients.filter(c => c.status === 'inactive').length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients List */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lista de Clientes</h3>
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredClients.length)} de {filteredClients.length} clientes
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm">Cliente</th>
                    <th className="text-left p-4 font-medium text-sm">Contato</th>
                    <th className="text-left p-4 font-medium text-sm">Agendamentos</th>
                    <th className="text-left p-4 font-medium text-sm">Última Visita</th>
                    <th className="text-left p-4 font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => handleClientClick(client)}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            {client.notes && (
                              <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {client.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{client.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{client.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{client.totalAppointments} agendamentos</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm">
                          {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                          {client.status === 'active' ? 'Ativo' : 'Inativo'}
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

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum cliente encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca' 
                  : 'Comece adicionando seu primeiro cliente'
                }
              </p>
              <Button onClick={() => setIsAddClientOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Cliente
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modal de Detalhes do Cliente */}
        <Dialog open={isClientDetailOpen} onOpenChange={setIsClientDetailOpen}>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px] sm:mx-0 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Detalhes do Cliente</span>
              </DialogTitle>
              <DialogDescription>
                Visualize informações detalhadas sobre o cliente selecionado.
              </DialogDescription>
            </DialogHeader>
            {selectedClient && (
              <div className="space-y-4 sm:space-y-6">
                {/* Status do Cliente */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge variant={selectedClient.status === 'active' ? 'default' : 'secondary'}>
                      {selectedClient.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {selectedClient.totalAppointments}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Agendamentos totais
                    </div>
                  </div>
                </div>

                {/* Informações do Cliente */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Informações do Cliente</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nome</label>
                      <p className="text-sm font-medium">{selectedClient.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedClient.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{selectedClient.phone}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Última Visita</label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{new Date(selectedClient.lastVisit).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                {selectedClient.notes && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Observações</h3>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm">{selectedClient.notes}</p>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="space-y-4 pt-4 border-t">
                  {/* Status Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Alterar Status:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.status === 'active' && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-gray-600 border-gray-200 hover:bg-gray-50 cursor-pointer flex-1 sm:flex-none"
                          onClick={() => {
                            console.log('Desativar cliente:', selectedClient.id);
                            setIsClientDetailOpen(false);
                          }}
                        >
                          Desativar Cliente
                        </Button>
                      )}
                      {selectedClient.status === 'inactive' && (
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="text-green-600 border-green-200 hover:bg-green-50 cursor-pointer flex-1 sm:flex-none"
                          onClick={() => {
                            console.log('Ativar cliente:', selectedClient.id);
                            setIsClientDetailOpen(false);
                          }}
                        >
                          Ativar Cliente
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
                        className="cursor-pointer flex-1 sm:flex-none"
                        onClick={() => handleScheduleForClient(selectedClient)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        className="cursor-pointer flex-1 sm:flex-none"
                        onClick={() => handleEditClient(selectedClient)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Cliente
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer flex-1 sm:flex-none"
                        onClick={() => {
                          console.log('Excluir cliente:', selectedClient.id);
                          setIsClientDetailOpen(false);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Cliente
                      </Button>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="flex justify-end pt-2">
                    <Button variant="outline" onClick={() => setIsClientDetailOpen(false)} className="cursor-pointer">
                      Fechar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Edição do Cliente */}
        <Dialog open={isEditClientOpen} onOpenChange={setIsEditClientOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5" />
                <span>Editar Cliente</span>
              </DialogTitle>
              <DialogDescription>
                Modifique as informações do cliente conforme necessário.
              </DialogDescription>
            </DialogHeader>
            {editingClient && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Nome completo</Label>
                  <Input
                    id="editName"
                    value={editingClient.name}
                    onChange={(e) => setEditingClient(prev => prev ? {...prev, name: e.target.value} : null)}
                    placeholder="Nome do cliente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editingClient.email}
                    onChange={(e) => setEditingClient(prev => prev ? {...prev, email: e.target.value} : null)}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Telefone</Label>
                  <Input
                    id="editPhone"
                    value={editingClient.phone}
                    onChange={(e) => setEditingClient(prev => prev ? {...prev, phone: e.target.value} : null)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editNotes">Observações</Label>
                  <textarea
                    id="editNotes"
                    value={editingClient.notes}
                    onChange={(e) => setEditingClient(prev => prev ? {...prev, notes: e.target.value} : null)}
                    placeholder="Observações sobre o cliente..."
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setIsEditClientOpen(false);
                setEditingClient(null);
              }}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
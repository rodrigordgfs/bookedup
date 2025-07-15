'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Toolbar } from '@/components/Toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User, Settings,
  LogOut,
  Plus,
  Edit,
  Trash2, Users,
  Mail,
  Phone,
  Clock, Search
} from 'lucide-react';
import { PaginationBar } from '@/components/ui/pagination';
import type { StaffMember } from '@/mocks/data';
import { staff } from '@/mocks/data';

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isStaffDetailsOpen, setIsStaffDetailsOpen] = useState(false);
  const [isEditStaffOpen, setIsEditStaffOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [] as string[],
    workingHours: ''
  });
  const [editStaff, setEditStaff] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: [] as string[],
    workingHours: ''
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

  const handleAddStaff = () => {
    console.log('Adding staff:', newStaff);
    setIsAddStaffOpen(false);
    setNewStaff({ name: '', email: '', phone: '', specialties: [] as string[], workingHours: '' });
  };

  const handleStaffClick = (member: StaffMember) => {
    setSelectedStaff(member);
    setIsStaffDetailsOpen(true);
  };

  const handleEditStaff = () => {
    if (selectedStaff) {
      setEditStaff({
        name: selectedStaff.name,
        email: selectedStaff.email,
        phone: selectedStaff.phone,
        specialties: selectedStaff.specialties,
        workingHours: selectedStaff.workingHours
      });
      setIsStaffDetailsOpen(false);
      setIsEditStaffOpen(true);
    }
  };

  const handleSaveEditStaff = () => {
    console.log('Saving edited staff:', editStaff);
    // Implementar lógica de salvamento
    setIsEditStaffOpen(false);
    setEditStaff({ name: '', email: '', phone: '', specialties: [] as string[], workingHours: '' });
  };

  const handleDeleteStaff = () => {
    console.log('Deleting staff:', selectedStaff);
    setIsStaffDetailsOpen(false);
    setSelectedStaff(null);
  };

  const handleToggleStatus = () => {
    console.log('Toggling status for staff:', selectedStaff);
    // Implementar lógica de alteração de status
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.specialties.some((specialty: string) => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && member.active) ||
      (statusFilter === 'inactive' && !member.active);
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toolbar
        title="BookedUp"
        subtitle="Funcionários"
        icon={<Users className="w-5 h-5 text-white" />}
        showDrawer
        showNotifications
        showThemeToggle
        showUserMenu={false}
        rightActions={
          <>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
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
            <h2 className="text-2xl font-bold mb-2">Funcionários</h2>
            <p className="text-muted-foreground">
              Gerencie sua equipe de profissionais
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
              <DialogTrigger asChild>
                <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Funcionário
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="staffName">Nome completo</Label>
                    <Input
                      id="staffName"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                      placeholder="Nome do funcionário"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffEmail">Email</Label>
                    <Input
                      id="staffEmail"
                      type="email"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffPhone">Telefone</Label>
                    <Input
                      id="staffPhone"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffHours">Horário de trabalho</Label>
                    <Input
                      id="staffHours"
                      value={newStaff.workingHours}
                      onChange={(e) => setNewStaff({...newStaff, workingHours: e.target.value})}
                      placeholder="Ex: Seg-Sex: 9h-18h"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddStaff}>
                    Adicionar Funcionário
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {loading ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 w-full sm:w-1/2 mb-2" />
                <Skeleton className="h-10 w-48 mb-2" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar funcionários por nome, email, telefone ou especialidade..."
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
                    Todos os status
                  </Button>
                  <Button 
                    variant={statusFilter === 'active' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('active')}
                  >
                    Ativos
                  </Button>
                  <Button 
                    variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('inactive')}
                  >
                    Inativos
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Staff List */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-semibold">Lista de Funcionários</h3>
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredStaff.length)} de {filteredStaff.length} funcionários
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Nome</th>
                      <th className="text-left p-4 font-medium text-sm">Email</th>
                      <th className="text-left p-4 font-medium text-sm">Telefone</th>
                      <th className="text-left p-4 font-medium text-sm">Especialidades</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4"><Skeleton className="h-6 w-32" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-40" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-24" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-32" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                        <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Funcionário</th>
                      <th className="text-left p-4 font-medium text-sm">Contato</th>
                      <th className="text-left p-4 font-medium text-sm">Especialidades</th>
                      <th className="text-left p-4 font-medium text-sm">Horário</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStaff.map((member) => (
                      <tr 
                        key={member.id} 
                        className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => handleStaffClick(member)}
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{member.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.map((specialty: string) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{member.workingHours}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={member.active ? 'default' : 'secondary'}>
                            {member.active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Paginação */}
            {!loading && (
              <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="py-4"
              />
            )}
          </CardContent>
        </Card>

        {filteredStaff.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum funcionário encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca' 
                  : 'Comece adicionando seu primeiro funcionário'
                }
              </p>
              <Button onClick={() => setIsAddStaffOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Funcionário
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modal de Detalhes do Funcionário */}
        <Dialog open={isStaffDetailsOpen} onOpenChange={setIsStaffDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Funcionário</DialogTitle>
              <DialogDescription>
                Visualize informações detalhadas sobre o funcionário selecionado.
              </DialogDescription>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-6">
                {/* Informações do Funcionário */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedStaff.name}</h3>
                    <Badge variant={selectedStaff.active ? 'default' : 'secondary'} className="mt-1">
                      {selectedStaff.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>

                {/* Informações de Contato */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Informações de Contato</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStaff.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedStaff.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Horário de Trabalho */}
                  <div>
                    <h4 className="font-medium mb-2">Horário de Trabalho</h4>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedStaff.workingHours}</span>
                    </div>
                  </div>

                  {/* Especialidades */}
                  <div>
                    <h4 className="font-medium mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStaff.specialties.map((specialty: string) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleToggleStatus}
                    className="flex-1"
                  >
                    {selectedStaff.active ? 'Desativar' : 'Ativar'} Funcionário
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleEditStaff}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Funcionário
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDeleteStaff}
                    className="text-red-600 hover:text-red-700 flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Funcionário
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Edição de Funcionário */}
        <Dialog open={isEditStaffOpen} onOpenChange={setIsEditStaffOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Funcionário</DialogTitle>
              <DialogDescription>
                Modifique as informações do funcionário conforme necessário.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editStaffName">Nome completo</Label>
                <Input
                  id="editStaffName"
                  value={editStaff.name}
                  onChange={(e) => setEditStaff({...editStaff, name: e.target.value})}
                  placeholder="Nome do funcionário"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffEmail">Email</Label>
                <Input
                  id="editStaffEmail"
                  type="email"
                  value={editStaff.email}
                  onChange={(e) => setEditStaff({...editStaff, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffPhone">Telefone</Label>
                <Input
                  id="editStaffPhone"
                  value={editStaff.phone}
                  onChange={(e) => setEditStaff({...editStaff, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStaffHours">Horário de trabalho</Label>
                <Input
                  id="editStaffHours"
                  value={editStaff.workingHours}
                  onChange={(e) => setEditStaff({...editStaff, workingHours: e.target.value})}
                  placeholder="Ex: Seg-Sex: 9h-18h"
                />
              </div>
              <div className="space-y-2">
                <Label>Especialidades</Label>
                <div className="space-y-2">
                  {['Corte Masculino', 'Barba', 'Corte Feminino', 'Tratamento Capilar', 'Corte + Barba'].map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-${specialty}`}
                        checked={editStaff.specialties.includes(specialty)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setEditStaff({
                              ...editStaff,
                              specialties: [...editStaff.specialties, specialty]
                            });
                          } else {
                            setEditStaff({
                              ...editStaff,
                              specialties: editStaff.specialties.filter((s: string) => s !== specialty)
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`edit-${specialty}`} className="text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditStaffOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEditStaff}>
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 
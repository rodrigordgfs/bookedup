'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatToReal } from '@/lib/utils';
import {
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2, Archive,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';
import { Toolbar } from '@/components/Toolbar';

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  active: boolean;
}

interface NewService {
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  active: boolean;
}

interface NewCategory {
  name: string;
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isServiceDetailsOpen, setIsServiceDetailsOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newService, setNewService] = useState<NewService>({
    name: '',
    description: '',
    duration: '',
    price: '',
    category: ''
  });
  const [editService, setEditService] = useState<NewService>({
    name: '',
    description: '',
    duration: '',
    price: '',
    category: ''
  });

  // Estados para categorias
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<NewCategory>({ name: '' });
  const [editCategory, setEditCategory] = useState<NewCategory>({ name: '' });

  const services: Service[] = [
    {
      id: 1,
      name: 'Corte Masculino',
      description: 'Corte tradicional masculino com acabamento',
      duration: 30,
      price: 35,
      category: 'Cabelo',
      active: true
    },
    {
      id: 2,
      name: 'Barba',
      description: 'Aparar e modelar barba',
      duration: 20,
      price: 25,
      category: 'Barba',
      active: true
    },
    {
      id: 3,
      name: 'Corte + Barba',
      description: 'Pacote completo de corte e barba',
      duration: 45,
      price: 55,
      category: 'Combo',
      active: true
    },
    {
      id: 4,
      name: 'Tratamento Capilar',
      description: 'Hidratação e tratamento para cabelos',
      duration: 40,
      price: 45,
      category: 'Tratamento',
      active: true
    }
  ];

  // Dados das categorias
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Cabelo', active: true },
    { id: 2, name: 'Barba', active: true },
    { id: 3, name: 'Combo', active: true },
    { id: 4, name: 'Tratamento', active: true }
  ]);

  const handleAddService = () => {
    console.log('Adding service:', newService);
    setIsAddServiceOpen(false);
    setNewService({ name: '', description: '', duration: '', price: '', category: '' });
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsServiceDetailsOpen(true);
  };

  const handleEditService = () => {
    if (selectedService) {
      setEditService({
        name: selectedService.name,
        description: selectedService.description,
        duration: selectedService.duration.toString(),
        price: selectedService.price.toString(),
        category: selectedService.category
      });
      setIsServiceDetailsOpen(false);
      setIsEditServiceOpen(true);
    }
  };

  const handleSaveEditService = () => {
    console.log('Saving edited service:', editService);
    // Implementar lógica de salvamento
    setIsEditServiceOpen(false);
    setEditService({ name: '', description: '', duration: '', price: '', category: '' });
  };

  const handleDeleteService = () => {
    console.log('Deleting service:', selectedService);
    setIsServiceDetailsOpen(false);
    setSelectedService(null);
  };

  const handleToggleStatus = () => {
    console.log('Toggling status for service:', selectedService);
    // Implementar lógica de alteração de status
  };

  // Funções para gerenciar categorias
  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const newCategoryObj: Category = {
        id: Date.now(),
        name: newCategory.name.trim(),
        active: true
      };
      setCategories(prev => [...prev, newCategoryObj]);
      setNewCategory({ name: '' });
      setIsAddCategoryOpen(false);
    }
  };

  const handleEditCategory = () => {
    if (selectedCategory && editCategory.name.trim()) {
      setCategories(prev => 
        prev.map(cat => 
          cat.id === selectedCategory.id 
            ? { ...cat, name: editCategory.name.trim() }
            : cat
        )
      );
      setEditCategory({ name: '' });
      setIsEditCategoryOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const handleToggleCategoryStatus = (categoryId: number) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, active: !cat.active }
          : cat
      )
    );
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setEditCategory({ name: category.name });
    setIsEditCategoryOpen(true);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toolbar
        title="BookedUp"
        subtitle="Serviços"
        icon={<Archive className="w-5 h-5 text-white" />}
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
            <h2 className="text-2xl font-bold mb-2">Serviços</h2>
            <p className="text-muted-foreground">
              Gerencie os serviços oferecidos pelo seu estabelecimento
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setIsCategoriesModalOpen(true)}
              className="cursor-pointer"
            >
              Gerenciar Categorias
            </Button>
            <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
              <DialogTrigger asChild>
                <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Serviço</DialogTitle>
                  <DialogDescription>
                    Crie um novo serviço para oferecer aos seus clientes.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceName">Nome do serviço</Label>
                    <Input
                      id="serviceName"
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                      placeholder="Ex: Corte Masculino"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription">Descrição</Label>
                    <textarea
                      id="serviceDescription"
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      placeholder="Descrição do serviço..."
                      className="w-full px-3 py-2 border border-input rounded-md text-sm"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceDuration">Duração (min)</Label>
                      <Input
                        id="serviceDuration"
                        type="number"
                        value={newService.duration}
                        onChange={(e) => setNewService({...newService, duration: e.target.value})}
                        placeholder="30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="servicePrice">Preço (R$)</Label>
                      <Input
                        id="servicePrice"
                        type="number"
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: e.target.value})}
                        placeholder="35"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory">Categoria</Label>
                    <Select value={newService.category} onValueChange={(value) => setNewService({...newService, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat.active).map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddServiceOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddService}>
                    Adicionar Serviço
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
                  placeholder="Buscar serviços por nome, descrição ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.filter(cat => cat.active).map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services List */}
        <Card>
          <CardHeader className="pb-4">
            <div>
              <h3 className="text-lg font-semibold">Lista de Serviços</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredServices.length)} de {filteredServices.length} serviços
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm">Serviço</th>
                    <th className="text-left p-4 font-medium text-sm">Categoria</th>
                    <th className="text-left p-4 font-medium text-sm">Duração</th>
                    <th className="text-left p-4 font-medium text-sm">Preço</th>
                    <th className="text-left p-4 font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentServices.map((service) => (
                    <tr 
                      key={service.id} 
                      className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => handleServiceClick(service)}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Archive className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">
                          {service.category}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{service.duration} min</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{formatToReal(service.price)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={service.active ? 'default' : 'secondary'}>
                          {service.active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0 cursor-pointer"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer"
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {filteredServices.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum serviço encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca' 
                  : 'Comece adicionando seu primeiro serviço'
                }
              </p>
              <Button onClick={() => setIsAddServiceOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modal de Detalhes do Serviço */}
        <Dialog open={isServiceDetailsOpen} onOpenChange={setIsServiceDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Serviço</DialogTitle>
              <DialogDescription>
                Visualize informações completas sobre o serviço selecionado.
              </DialogDescription>
            </DialogHeader>
            {selectedService && (
              <div className="space-y-6">
                {/* Informações do Serviço */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                    <Archive className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedService.name}</h3>
                    <Badge variant={selectedService.active ? 'default' : 'secondary'} className="mt-1">
                      {selectedService.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <h4 className="font-medium mb-2">Descrição</h4>
                  <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                </div>

                {/* Informações do Serviço */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Categoria</h4>
                    <Badge variant="secondary">
                      {selectedService.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Duração</h4>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedService.duration} minutos</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Preço</h4>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-lg">{formatToReal(selectedService.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleToggleStatus}
                    className="flex-1 cursor-pointer"
                  >
                    {selectedService.active ? 'Desativar' : 'Ativar'} Serviço
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleEditService}
                    className="flex-1 cursor-pointer"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Serviço
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDeleteService}
                    className="text-red-600 hover:text-red-700 flex-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Serviço
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Edição de Serviço */}
        <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Serviço</DialogTitle>
              <DialogDescription>
                Modifique as informações do serviço conforme necessário.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editServiceName">Nome do serviço</Label>
                <Input
                  id="editServiceName"
                  value={editService.name}
                  onChange={(e) => setEditService({...editService, name: e.target.value})}
                  placeholder="Ex: Corte Masculino"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editServiceDescription">Descrição</Label>
                <textarea
                  id="editServiceDescription"
                  value={editService.description}
                  onChange={(e) => setEditService({...editService, description: e.target.value})}
                  placeholder="Descrição do serviço..."
                  className="w-full px-3 py-2 border border-input rounded-md text-sm"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editServiceDuration">Duração (min)</Label>
                  <Input
                    id="editServiceDuration"
                    type="number"
                    value={editService.duration}
                    onChange={(e) => setEditService({...editService, duration: e.target.value})}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editServicePrice">Preço (R$)</Label>
                  <Input
                    id="editServicePrice"
                    type="number"
                    value={editService.price}
                    onChange={(e) => setEditService({...editService, price: e.target.value})}
                    placeholder="35"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editServiceCategory">Categoria</Label>
                <Select value={editService.category} onValueChange={(value) => setEditService({...editService, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat.active).map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditServiceOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEditService}>
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Categorias */}
        <Dialog open={isCategoriesModalOpen} onOpenChange={setIsCategoriesModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Gerenciar Categorias</DialogTitle>
              <DialogDescription>
                Organize seus serviços em categorias para melhor organização.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Lista de Categorias */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Categorias Cadastradas</h3>
                  <Button 
                    size="sm" 
                    onClick={() => setIsAddCategoryOpen(true)}
                    className="cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Categoria
                  </Button>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div 
                      key={category.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                          <Archive className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <Badge variant={category.active ? 'default' : 'secondary'} className="text-xs">
                            {category.active ? 'Ativa' : 'Inativa'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCategoryStatus(category.id);
                          }}
                          className="cursor-pointer"
                        >
                          {category.active ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(category.id);
                          }}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Adicionar Categoria */}
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Categoria</DialogTitle>
              <DialogDescription>
                Crie uma nova categoria para organizar seus serviços.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Nome da Categoria</Label>
                <Input
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Ex: Cabelo, Barba, Tratamento..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCategory();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCategory}>
                Adicionar Categoria
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de Editar Categoria */}
        <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>
                Modifique o nome da categoria conforme necessário.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editCategoryName">Nome da Categoria</Label>
                <Input
                  id="editCategoryName"
                  value={editCategory.name}
                  onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                  placeholder="Ex: Cabelo, Barba, Tratamento..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleEditCategory();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditCategoryOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCategory}>
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
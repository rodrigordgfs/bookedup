'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Plus
} from 'lucide-react';
import type { Service } from '@/mocks/data';
import { services, categories } from '@/mocks/data';
import ServicesTable from '@/components/services/ServicesTable';
import ServicesListHeader from '@/components/services/ServicesListHeader';
import ServicesFilters from '@/components/services/ServicesFilters';
import ServiceDetailsDialog from '@/components/services/ServiceDetailsDialog';
import EditServiceDialog from '@/components/services/EditServiceDialog';
import CategoriesDialog from '@/components/services/CategoriesDialog';
import NoServicesCard from '@/components/services/NoServicesCard';

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

  // Dados das categorias
  const [categoriesState, setCategoriesState] = useState<Category[]>(categories);
  const [loading, setLoading] = useState(false); // Estado de loading

  // Simula o loading ao montar a página
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
      setCategoriesState(prev => [...prev, newCategoryObj]);
      setNewCategory({ name: '' });
      setIsAddCategoryOpen(false);
    }
  };

  const handleEditCategory = () => {
    if (selectedCategory && editCategory.name.trim()) {
      setCategoriesState(prev => 
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
    setCategoriesState(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const handleToggleCategoryStatus = (categoryId: number) => {
    setCategoriesState(prev => 
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
            <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer" onClick={() => setIsAddServiceOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <ServicesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          loading={loading}
          categories={categoriesState}
        />

        {/* Services List Header */}
        <div className="mb-2 mt-6">
          <ServicesListHeader
            title="Lista de Serviços"
            startIndex={startIndex}
            endIndex={endIndex}
            totalCount={filteredServices.length}
          />
        </div>

        {/* Services Table */}
        <ServicesTable
          services={currentServices}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={filteredServices.length}
          onPageChange={handlePageChange}
          onServiceClick={handleServiceClick}
        />

        {/* Nenhum serviço encontrado */}
        {filteredServices.length === 0 && !loading && (
          <NoServicesCard
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            onAddService={() => setIsAddServiceOpen(true)}
          />
        )}

        {/* Modal de Detalhes do Serviço */}
        <ServiceDetailsDialog
          open={isServiceDetailsOpen}
          onOpenChange={setIsServiceDetailsOpen}
          service={selectedService}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
          onToggleStatus={handleToggleStatus}
        />

        {/* Modal de Edição de Serviço */}
        <EditServiceDialog
          open={isEditServiceOpen}
          onOpenChange={setIsEditServiceOpen}
          editService={editService}
          setEditService={setEditService}
          handleSaveEdit={handleSaveEditService}
          categories={categoriesState}
        />

        {/* Modal de Categorias */}
        <CategoriesDialog
          open={isCategoriesModalOpen}
          onOpenChange={setIsCategoriesModalOpen}
          categories={categoriesState}
          onAddCategory={(name) => setNewCategory({ name })}
          onEditCategory={(id, name) => setEditCategory({ name })}
          onDeleteCategory={handleDeleteCategory}
          onToggleCategoryStatus={handleToggleCategoryStatus}
          isAddCategoryOpen={isAddCategoryOpen}
          setIsAddCategoryOpen={setIsAddCategoryOpen}
          isEditCategoryOpen={isEditCategoryOpen}
          setIsEditCategoryOpen={setIsEditCategoryOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          handleAddCategory={handleAddCategory}
          handleEditCategory={handleEditCategory}
        />
      </div>
    </div>
  );
}
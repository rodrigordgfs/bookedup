'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Plus
} from 'lucide-react';
import ServicesTable from '@/components/services/ServicesTable';
import ServicesListHeader from '@/components/services/ServicesListHeader';
import ServicesFilters from '@/components/services/ServicesFilters';
import EditServiceDialog from '@/components/services/EditServiceDialog';
import CategoriesDialog from '@/components/services/CategoriesDialog';
import NoServicesCard from '@/components/services/NoServicesCard';
import { useCategories } from '@/contexts/CategoriesContext';
import { useUser } from '@clerk/nextjs';
import { useService } from '@/contexts/ServiceContext';
import { toast } from 'sonner';
import type { Service } from '@/contexts/ServiceContext';

interface NewService {
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  active: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface NewCategory {
  name: string;
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermDebounced, setSearchTermDebounced] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
  const { categories } = useCategories();
  const { user } = useUser();
  const { services, addService, editService: editServiceCtx, deleteService, toggleStatus, fetchServices, loading } = useService();

  // Buscar serviços da API ao montar e ao filtrar
  useEffect(() => {
    const params: { name?: string; categoryId?: string } = {};
    if (searchTermDebounced) params.name = searchTermDebounced;
    if (categoryFilter !== 'all') params.categoryId = categoryFilter;
    fetchServices(params);
  }, [searchTermDebounced, categoryFilter, fetchServices]);

  // Debounce de 2 segundos para searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTermDebounced(searchTerm);
    }, 2000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setEditService({
      name: service.name,
      description: service.description,
      duration: service.duration.toString(),
      price: service.price.toString(),
      category: typeof service.category === 'object' ? service.category?.name || '' : (service.category || '')
    });
    setIsEditServiceOpen(true);
    setIsAddServiceOpen(false);
  };

  const handleSaveEditService = async () => {
    const categoryObj = categories.find(cat => cat.name === editService.category);
    const categoryId = categoryObj ? categoryObj.id : undefined;
    if (!categoryId) {
      toast.error('Selecione uma categoria válida.');
      return;
    }
    if (isAddServiceOpen) {
      if (!user?.id) {
        toast.error('Usuário não autenticado.');
        return;
      }
      await addService({
        name: editService.name,
        description: editService.description,
        duration: Number(editService.duration),
        price: Number(editService.price),
        categoryId,
        userId: user.id,
      });
    } else if (isEditServiceOpen && selectedService) {
      await editServiceCtx(selectedService.id, {
        name: editService.name,
        description: editService.description,
        duration: Number(editService.duration),
        price: Number(editService.price),
        categoryId,
      });
    }
    setIsEditServiceOpen(false);
    setIsAddServiceOpen(false);
    setEditService({ name: '', description: '', duration: '', price: '', category: '' });
  };

  const [loadingToggleStatus, setLoadingToggleStatus] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteService = async () => {
    if (!selectedService) return;
    setLoadingDelete(true);
    await deleteService(selectedService.id);
    setIsEditServiceOpen(false);
    setSelectedService(null);
    setLoadingDelete(false);
  };

  const handleToggleStatus = async () => {
    if (!selectedService) return;
    setLoadingToggleStatus(true);
    await toggleStatus(selectedService.id, !selectedService.active);
    setSelectedService(prev => prev ? { ...prev, active: !prev.active } : prev);
    setLoadingToggleStatus(false);
  };

  // Pagination logic
  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
            <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer" onClick={() => {
              setEditService({ name: '', description: '', duration: '', price: '', category: '' });
              setIsAddServiceOpen(true);
            }}>
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
          categories={categories}
        />

        {/* Services List Header */}
        <div className="mb-2 mt-6">
          <ServicesListHeader
            title="Lista de Serviços"
            startIndex={startIndex}
            endIndex={endIndex}
            totalCount={services.length}
          />
        </div>

        {/* Services Table */}
        <ServicesTable
          services={services.slice(startIndex, endIndex)}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={services.length}
          onPageChange={handlePageChange}
          onServiceClick={(service: unknown) => handleServiceClick(service as Service)}
        />

        {/* Nenhum serviço encontrado */}
        {services.length === 0 && !loading && (
          <NoServicesCard
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            onAddService={() => {
              setEditService({ name: '', description: '', duration: '', price: '', category: '' });
              setIsAddServiceOpen(true);
            }}
          />
        )}

        {/* Modal de Edição de Serviço */}
        <EditServiceDialog
          open={isAddServiceOpen || isEditServiceOpen}
          onOpenChange={(open) => {
            setIsEditServiceOpen(open);
            setIsAddServiceOpen(false);
          }}
          editService={editService}
          setEditService={setEditService}
          handleSaveEdit={handleSaveEditService}
          categories={categories.filter(cat => cat.active)}
          title={isAddServiceOpen ? 'Novo Serviço' : 'Editar Serviço'}
          description={isAddServiceOpen ? 'Preencha as informações para criar um novo serviço.' : 'Modifique as informações do serviço conforme necessário.'}
          isEdit={isEditServiceOpen}
          onDelete={handleDeleteService}
          onToggleStatus={handleToggleStatus}
          selectedService={
            selectedService
              ? {
                  ...selectedService,
                  duration: selectedService.duration.toString(),
                  price: selectedService.price.toString(),
                  category: typeof selectedService.category === 'object'
                    ? selectedService.category?.name || ''
                    : (selectedService.category || ''),
                }
              : undefined
          }
          loadingToggleStatus={loadingToggleStatus}
          loadingDelete={loadingDelete}
        />

        {/* Modal de Categorias */}
        <CategoriesDialog
          open={isCategoriesModalOpen}
          onOpenChange={setIsCategoriesModalOpen}
          isAddCategoryOpen={isAddCategoryOpen}
          setIsAddCategoryOpen={setIsAddCategoryOpen}
          isEditCategoryOpen={isEditCategoryOpen}
          setIsEditCategoryOpen={setIsEditCategoryOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat: unknown) => setSelectedCategory(cat as Category | null)}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
        />
      </div>
    </div>
  );
}
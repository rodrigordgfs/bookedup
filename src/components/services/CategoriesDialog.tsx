import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Archive, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/contexts/CategoriesContext';
import NoCategoriesCard from './NoCategoriesCard';

interface Category {
  id: string;
  name: string;
  active: boolean;
}

interface CategoriesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAddCategoryOpen: boolean;
  setIsAddCategoryOpen: (open: boolean) => void;
  isEditCategoryOpen: boolean;
  setIsEditCategoryOpen: (open: boolean) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (cat: Category | null) => void;
  newCategory: { name: string };
  setNewCategory: (cat: { name: string }) => void;
  editCategory: { name: string };
  setEditCategory: (cat: { name: string }) => void;
}

export default function CategoriesDialog({
  open,
  onOpenChange,
}: CategoriesDialogProps) {
  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    deleteCategory,
    toggleCategoryStatus,
    addingCategory,
    editingCategory,
    togglingStatusId,
    deletingCategoryId,
  } = useCategories();

  // Estados dos modais e inputs locais
  const [isAddCategoryOpenLocal, setIsAddCategoryOpenLocal] = useState(false);
  const [isEditCategoryOpenLocal, setIsEditCategoryOpenLocal] = useState(false);
  const [selectedCategoryLocal, setSelectedCategoryLocal] = useState<Category | null>(null);
  const [newCategoryLocal, setNewCategoryLocal] = useState<{ name: string }>({ name: '' });
  const [editCategoryLocal, setEditCategoryLocal] = useState<{ name: string }>({ name: '' });
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Criar categoria
  const handleAddCategory = async () => {
    if (!newCategoryLocal.name.trim()) return;
    await addCategory(newCategoryLocal.name.trim());
    setIsAddCategoryOpenLocal(false);
    setNewCategoryLocal({ name: '' });
  };

  // Editar categoria
  const handleEditCategory = async () => {
    if (!selectedCategoryLocal || !editCategoryLocal.name.trim()) return;
    await editCategory(selectedCategoryLocal.id, editCategoryLocal.name.trim());
    setIsEditCategoryOpenLocal(false);
    setEditCategoryLocal({ name: '' });
    setSelectedCategoryLocal(null);
  };

  // Ativar/desativar categoria
  const handleToggleCategoryStatus = async (id: string, active: boolean) => {
    toggleCategoryStatus(id, active);
  };

  // Deletar categoria
  const handleDeleteCategory = async (id: string) => {
    deleteCategory(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px] sm:mx-0 max-h-[90vh] overflow-y-auto">
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
                onClick={() => setIsAddCategoryOpenLocal(true)}
                className="cursor-pointer"
              >
                Nova Categoria
              </Button>
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map(() => {
                    const skeletonKey = `skeleton-${Math.random().toString(36).substr(2, 9)}`;
                    return (
                      <div key={skeletonKey} className="flex items-center justify-between p-3 border rounded-lg animate-pulse">
                        <div className="flex items-center space-x-3 w-full">
                          <Skeleton className="w-8 h-8 rounded-lg" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-8 w-16" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : categories.length === 0 ? (
                <NoCategoriesCard onAddCategory={() => setIsAddCategoryOpenLocal(true)} />
              ) : (
                paginatedCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer w-full text-left"
                    onClick={() => {
                      setSelectedCategoryLocal(category);
                      setEditCategoryLocal({ name: category.name });
                      setIsEditCategoryOpenLocal(true);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedCategoryLocal(category);
                        setEditCategoryLocal({ name: category.name });
                        setIsEditCategoryOpenLocal(true);
                      }
                    }}
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
                        onClick={e => {
                          e.stopPropagation();
                          handleToggleCategoryStatus(category.id, !category.active);
                        }}
                        className="cursor-pointer"
                        disabled={togglingStatusId === category.id}
                      >
                        {togglingStatusId === category.id ? (
                          <span className="flex items-center"><span className="animate-spin mr-1">⏳</span>...</span>
                        ) : (
                          category.active ? 'Desativar' : 'Ativar'
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteCategory(category.id);
                        }}
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                        disabled={deletingCategoryId === category.id}
                      >
                        {deletingCategoryId === category.id ? (
                          <span className="flex items-center"><span className="animate-spin mr-1">⏳</span>Deletando...</span>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </button>
                ))
              )}
              {categories.length > itemsPerPage && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    Anterior
                  </Button>
                  <span className="text-sm flex items-center px-2">Página {currentPage} de {totalPages}</span>
                  <Button size="sm" variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    Próxima
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Modal de Adicionar Categoria */}
        <Dialog open={isAddCategoryOpenLocal} onOpenChange={setIsAddCategoryOpenLocal}>
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
                  value={newCategoryLocal.name}
                  onChange={e => setNewCategoryLocal({ name: e.target.value })}
                  placeholder="Ex: Cabelo, Barba, Tratamento..."
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleAddCategory();
                    }
                  }}
                  disabled={addingCategory}
                />
                {addingCategory && <p className="text-sm text-muted-foreground">Adicionando categoria...</p>}
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddCategoryOpenLocal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCategory} disabled={addingCategory}>
                Adicionar Categoria
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Modal de Editar Categoria */}
        <Dialog open={isEditCategoryOpenLocal} onOpenChange={setIsEditCategoryOpenLocal}>
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
                  value={editCategoryLocal.name}
                  onChange={e => setEditCategoryLocal({ name: e.target.value })}
                  placeholder="Ex: Cabelo, Barba, Tratamento..."
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleEditCategory();
                    }
                  }}
                  disabled={editingCategory}
                />
                {editingCategory && <p className="text-sm text-muted-foreground">Salvando alterações...</p>}
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditCategoryOpenLocal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCategory} disabled={editingCategory}>
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
} 
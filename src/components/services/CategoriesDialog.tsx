import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Archive, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface Category {
  id: number;
  name: string;
  active: boolean;
}

interface CategoriesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
  onEditCategory: (id: number, name: string) => void;
  onDeleteCategory: (id: number) => void;
  onToggleCategoryStatus: (id: number) => void;
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
  handleAddCategory: () => void;
  handleEditCategory: () => void;
}

export default function CategoriesDialog({
  open,
  onOpenChange,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onToggleCategoryStatus,
  isAddCategoryOpen,
  setIsAddCategoryOpen,
  isEditCategoryOpen,
  setIsEditCategoryOpen,
  selectedCategory,
  setSelectedCategory,
  newCategory,
  setNewCategory,
  editCategory,
  setEditCategory,
  handleAddCategory,
  handleEditCategory,
}: CategoriesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-screen max-h-full overflow-y-auto my-8">
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
                Nova Categoria
              </Button>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category);
                    setEditCategory({ name: category.name });
                    setIsEditCategoryOpen(true);
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
                        onToggleCategoryStatus(category.id);
                      }}
                      className="cursor-pointer"
                    >
                      {category.active ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
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
                  onChange={e => setNewCategory({ name: e.target.value })}
                  placeholder="Ex: Cabelo, Barba, Tratamento..."
                  onKeyPress={e => {
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
                  onChange={e => setEditCategory({ name: e.target.value })}
                  placeholder="Ex: Cabelo, Barba, Tratamento..."
                  onKeyPress={e => {
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
      </DialogContent>
    </Dialog>
  );
} 
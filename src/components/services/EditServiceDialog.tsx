import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface EditService {
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

interface EditServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editService: EditService;
  setEditService: (service: EditService) => void;
  handleSaveEdit: () => void;
  categories: Category[];
}

export default function EditServiceDialog({
  open,
  onOpenChange,
  editService,
  setEditService,
  handleSaveEdit,
  categories,
}: EditServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onChange={(e) => setEditService({ ...editService, name: e.target.value })}
              placeholder="Ex: Corte Masculino"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editServiceDescription">Descrição</Label>
            <textarea
              id="editServiceDescription"
              value={editService.description}
              onChange={(e) => setEditService({ ...editService, description: e.target.value })}
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
                onChange={(e) => setEditService({ ...editService, duration: e.target.value })}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editServicePrice">Preço (R$)</Label>
              <Input
                id="editServicePrice"
                type="number"
                value={editService.price}
                onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                placeholder="35"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="editServiceCategory">Categoria</Label>
            <Select value={editService.category} onValueChange={(value) => setEditService({ ...editService, category: value })}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit}>
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
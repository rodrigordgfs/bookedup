import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface EditStaff {
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  workingHours: string;
}

interface EditStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editStaff: EditStaff;
  setEditStaff: (staff: EditStaff) => void;
  handleSaveEdit: () => void;
  specialties: string[];
}

export default function EditStaffDialog({
  open,
  onOpenChange,
  editStaff,
  setEditStaff,
  handleSaveEdit,
  specialties,
}: EditStaffDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
          <DialogDescription>
            Modifique as informações do funcionário conforme necessário.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="editStaffName">Nome</Label>
            <Input
              id="editStaffName"
              value={editStaff.name}
              onChange={(e) => setEditStaff({ ...editStaff, name: e.target.value })}
              placeholder="Nome do funcionário"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editStaffEmail">Email</Label>
            <Input
              id="editStaffEmail"
              value={editStaff.email}
              onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })}
              placeholder="Email do funcionário"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editStaffPhone">Telefone</Label>
            <Input
              id="editStaffPhone"
              value={editStaff.phone}
              onChange={(e) => setEditStaff({ ...editStaff, phone: e.target.value })}
              placeholder="Telefone do funcionário"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editStaffWorkingHours">Horário de trabalho</Label>
            <Input
              id="editStaffWorkingHours"
              value={editStaff.workingHours}
              onChange={(e) => setEditStaff({ ...editStaff, workingHours: e.target.value })}
              placeholder="Ex: Seg-Sex: 9h-18h"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editStaffSpecialties">Especialidades</Label>
            <Select
              value={editStaff.specialties[0] || ''}
              onValueChange={(value) => setEditStaff({ ...editStaff, specialties: [value] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma especialidade" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
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
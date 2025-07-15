import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface NewStaff {
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  workingHours: string;
}

interface NewStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newStaff: NewStaff;
  setNewStaff: (staff: NewStaff) => void;
  handleAddStaff: () => void;
  specialties: string[];
}

export default function NewStaffDialog({
  open,
  onOpenChange,
  newStaff,
  setNewStaff,
  handleAddStaff,
  specialties,
}: NewStaffDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Funcionário</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo funcionário.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="newStaffName">Nome</Label>
            <Input
              id="newStaffName"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              placeholder="Nome do funcionário"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newStaffEmail">Email</Label>
            <Input
              id="newStaffEmail"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              placeholder="Email do funcionário"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newStaffPhone">Telefone</Label>
            <Input
              id="newStaffPhone"
              value={newStaff.phone}
              onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
              placeholder="Telefone do funcionário"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newStaffWorkingHours">Horário de trabalho</Label>
            <Input
              id="newStaffWorkingHours"
              value={newStaff.workingHours}
              onChange={(e) => setNewStaff({ ...newStaff, workingHours: e.target.value })}
              placeholder="Ex: Seg-Sex: 9h-18h"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newStaffSpecialties">Especialidades</Label>
            <Select
              value={newStaff.specialties[0] || ''}
              onValueChange={(value) => setNewStaff({ ...newStaff, specialties: [value] })}
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
          <Button onClick={handleAddStaff}>
            Adicionar Funcionário
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
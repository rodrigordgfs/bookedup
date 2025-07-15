import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface NewClient {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface NewClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newClient: NewClient;
  setNewClient: (fn: (prev: NewClient) => NewClient) => void;
  handleAddClient: () => void;
}

export default function NewClientDialog({
  open,
  onOpenChange,
  newClient,
  setNewClient,
  handleAddClient,
}: NewClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddClient}>
            Adicionar Cliente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
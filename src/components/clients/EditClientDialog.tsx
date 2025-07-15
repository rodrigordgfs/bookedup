import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import React from 'react';
import type { Client } from '@/mocks/data';

interface EditClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingClient: Client | null;
  setEditingClient: (client: Client | null) => void;
  handleSaveEdit: () => void;
}

export default function EditClientDialog({
  open,
  onOpenChange,
  editingClient,
  setEditingClient,
  handleSaveEdit,
}: EditClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="w-5 h-5" />
            <span>Editar Cliente</span>
          </DialogTitle>
          <DialogDescription>
            Modifique as informações do cliente conforme necessário.
          </DialogDescription>
        </DialogHeader>
        {editingClient && (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Nome completo</Label>
              <Input
                id="editName"
                value={editingClient.name}
                onChange={(e) => setEditingClient(editingClient ? { ...editingClient, name: e.target.value } : null)}
                placeholder="Nome do cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={editingClient.email}
                onChange={(e) => setEditingClient(editingClient ? { ...editingClient, email: e.target.value } : null)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">Telefone</Label>
              <Input
                id="editPhone"
                value={editingClient.phone}
                onChange={(e) => setEditingClient(editingClient ? { ...editingClient, phone: e.target.value } : null)}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editNotes">Observações</Label>
              <textarea
                id="editNotes"
                value={editingClient.notes}
                onChange={(e) => setEditingClient(editingClient ? { ...editingClient, notes: e.target.value } : null)}
                placeholder="Observações sobre o cliente..."
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
                rows={3}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => {
            onOpenChange(false);
            setEditingClient(null);
          }}>
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
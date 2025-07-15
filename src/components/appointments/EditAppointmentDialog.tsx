import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import React from 'react';

interface EditAppointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  notes?: string;
}

interface EditAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAppointment: EditAppointment | null;
  setEditingAppointment: (apt: EditAppointment | null) => void;
  handleSaveEdit: () => void;
}

export default function EditAppointmentDialog({
  open,
  onOpenChange,
  editingAppointment,
  setEditingAppointment,
  handleSaveEdit,
}: EditAppointmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="w-5 h-5" />
            <span>Editar Agendamento</span>
          </DialogTitle>
          <DialogDescription>
            Modifique as informações do agendamento conforme necessário.
          </DialogDescription>
        </DialogHeader>
        {editingAppointment && (
          <div className="grid gap-4 py-4">
            <div className="text-sm text-muted-foreground mb-2">
              Editando agendamento ID: {editingAppointment.id}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editClientName">Nome do cliente</Label>
                <Input
                  id="editClientName"
                  value={editingAppointment.clientName}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, clientName: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editClientPhone">Telefone</Label>
                <Input
                  id="editClientPhone"
                  value={editingAppointment.clientPhone}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, clientPhone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editClientEmail">Email</Label>
              <Input
                id="editClientEmail"
                type="email"
                value={editingAppointment.clientEmail}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, clientEmail: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editService">Serviço</Label>
                <Select value={editingAppointment.service} onValueChange={(value) => setEditingAppointment({ ...editingAppointment, service: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corte Masculino">Corte Masculino</SelectItem>
                    <SelectItem value="Barba">Barba</SelectItem>
                    <SelectItem value="Corte + Barba">Corte + Barba</SelectItem>
                    <SelectItem value="Tratamento Capilar">Tratamento Capilar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editProfessional">Profissional</Label>
                <Select value={editingAppointment.professional} onValueChange={(value) => setEditingAppointment({ ...editingAppointment, professional: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="João Barbeiro">João Barbeiro</SelectItem>
                    <SelectItem value="Maria Silva">Maria Silva</SelectItem>
                    <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editDate">Data</Label>
                <Input
                  id="editDate"
                  type="date"
                  value={editingAppointment.date}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editTime">Horário</Label>
                <Input
                  id="editTime"
                  type="time"
                  value={editingAppointment.time}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editNotes">Observações</Label>
              <textarea
                id="editNotes"
                value={editingAppointment.notes}
                onChange={(e) => setEditingAppointment({ ...editingAppointment, notes: e.target.value })}
                placeholder="Observações sobre o agendamento..."
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
                rows={3}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => {
            onOpenChange(false);
            setEditingAppointment(null);
          }}>
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} disabled={!editingAppointment}>
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
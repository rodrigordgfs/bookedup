import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import React from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface NewAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientSearchTerm: string;
  setClientSearchTerm: (value: string) => void;
  isClientSelectOpen: boolean;
  setIsClientSelectOpen: (open: boolean) => void;
  filteredClients: Client[];
  handleClientSelect: (client: Client) => void;
  newAppointment: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    service: string;
    professional: string;
    date: string;
    time: string;
    notes: string;
  };
  setNewAppointment: (fn: (prev: any) => any) => void;
  handleAddAppointment: () => void;
}

export default function NewAppointmentDialog({
  open,
  onOpenChange,
  clientSearchTerm,
  setClientSearchTerm,
  isClientSelectOpen,
  setIsClientSelectOpen,
  filteredClients,
  handleClientSelect,
  newAppointment,
  setNewAppointment,
  handleAddAppointment,
}: NewAppointmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[500px] sm:mx-0">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo agendamento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clientSelect">Selecionar Cliente</Label>
            <div className="relative">
              <Input
                id="clientSelect"
                placeholder="Digite para buscar um cliente..."
                value={clientSearchTerm}
                onChange={(e) => {
                  setClientSearchTerm(e.target.value);
                  setIsClientSelectOpen(true);
                }}
                onFocus={() => setIsClientSelectOpen(true)}
              />
              {isClientSelectOpen && (
                <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto client-dropdown">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className="px-3 py-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                        onClick={() => handleClientSelect(client)}
                      >
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.email} • {client.phone}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Nenhum cliente encontrado
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {newAppointment.clientName && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Telefone</Label>
                <Input
                  id="clientPhone"
                  value={newAppointment.clientPhone}
                  onChange={(e) => setNewAppointment((prev: any) => ({...prev, clientPhone: e.target.value}))}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={newAppointment.clientEmail}
                  onChange={(e) => setNewAppointment((prev: any) => ({...prev, clientEmail: e.target.value}))}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <Select value={newAppointment.service} onValueChange={(value) => setNewAppointment((prev: any) => ({...prev, service: value}))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="haircut">Corte Masculino</SelectItem>
                  <SelectItem value="beard">Barba</SelectItem>
                  <SelectItem value="haircut-beard">Corte + Barba</SelectItem>
                  <SelectItem value="treatment">Tratamento Capilar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="professional">Profissional</Label>
              <Select value={newAppointment.professional} onValueChange={(value) => setNewAppointment((prev: any) => ({...prev, professional: value}))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joao">João Barbeiro</SelectItem>
                  <SelectItem value="maria">Maria Silva</SelectItem>
                  <SelectItem value="pedro">Pedro Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment((prev: any) => ({...prev, date: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment((prev: any) => ({...prev, time: e.target.value}))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <textarea
              id="notes"
              value={newAppointment.notes}
              onChange={(e) => setNewAppointment((prev: any) => ({...prev, notes: e.target.value}))}
              placeholder="Observações sobre o agendamento..."
              className="w-full px-3 py-2 border border-input rounded-md text-sm"
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddAppointment}>
            Criar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
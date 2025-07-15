import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, Edit, Trash2 } from 'lucide-react';
import React from 'react';
import type { Client } from '@/mocks/data';

interface ClientDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClient: Client | null;
  onSchedule: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export default function ClientDetailsDialog({
  open,
  onOpenChange,
  selectedClient,
  onSchedule,
  onEdit,
  onDelete,
}: ClientDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px] sm:mx-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Detalhes do Cliente</span>
          </DialogTitle>
          <DialogDescription>
            Visualize informações detalhadas sobre o cliente selecionado.
          </DialogDescription>
        </DialogHeader>
        {selectedClient && (
          <div className="space-y-4 sm:space-y-6">
            {/* Status do Cliente */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={selectedClient.status === 'active' ? 'default' : 'secondary'}>
                  {selectedClient.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {selectedClient.totalAppointments}
                </div>
                <div className="text-sm text-muted-foreground">
                  Agendamentos totais
                </div>
              </div>
            </div>
            {/* Informações do Cliente */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informações do Cliente</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-sm font-medium">{selectedClient.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{selectedClient.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{selectedClient.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Última Visita</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{new Date(selectedClient.lastVisit).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Observações */}
            {selectedClient.notes && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Observações</h3>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm">{selectedClient.notes}</p>
                </div>
              </div>
            )}
            {/* Ações */}
            <div className="space-y-4 pt-4 border-t">
              {/* Status Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Alterar Status:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.status === 'active' && (
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="text-gray-600 border-gray-200 hover:bg-gray-50 cursor-pointer flex-1 sm:flex-none"
                      onClick={() => onDelete(selectedClient)}
                    >
                      Desativar Cliente
                    </Button>
                  )}
                  {selectedClient.status === 'inactive' && (
                    <Button 
                      size="sm"
                      variant="outline" 
                      className="text-green-600 border-green-200 hover:bg-green-50 cursor-pointer flex-1 sm:flex-none"
                      onClick={() => onDelete(selectedClient)}
                    >
                      Ativar Cliente
                    </Button>
                  )}
                </div>
              </div>
              {/* Other Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">Outras Ações:</span>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="cursor-pointer flex-1 sm:flex-none"
                    onClick={() => onSchedule(selectedClient)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="cursor-pointer flex-1 sm:flex-none"
                    onClick={() => onEdit(selectedClient)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Cliente
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer flex-1 sm:flex-none"
                    onClick={() => onDelete(selectedClient)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Cliente
                  </Button>
                </div>
              </div>
              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 
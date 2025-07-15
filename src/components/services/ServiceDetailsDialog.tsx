import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Archive, Clock, DollarSign, Edit, Trash2 } from 'lucide-react';
import type { Service } from '@/mocks/data';
import React from 'react';

interface ServiceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export default function ServiceDetailsDialog({
  open,
  onOpenChange,
  service,
  onEdit,
  onDelete,
  onToggleStatus,
}: ServiceDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Serviço</DialogTitle>
          <DialogDescription>
            Visualize informações completas sobre o serviço selecionado.
          </DialogDescription>
        </DialogHeader>
        {service && (
          <div className="space-y-6">
            {/* Informações do Serviço */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                <Archive className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <Badge variant={service.active ? 'default' : 'secondary'} className="mt-1">
                  {service.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <h4 className="font-medium mb-2">Descrição</h4>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>

            {/* Informações do Serviço */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Categoria</h4>
                <Badge variant="secondary">
                  {service.category}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Duração</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{service.duration} minutos</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Preço</h4>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-lg">{service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={onToggleStatus}
                className="flex-1 cursor-pointer"
              >
                {service.active ? 'Desativar' : 'Ativar'} Serviço
              </Button>
              <Button 
                variant="outline" 
                onClick={onEdit}
                className="flex-1 cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Serviço
              </Button>
              <Button 
                variant="outline" 
                onClick={onDelete}
                className="text-red-600 hover:text-red-700 flex-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Serviço
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 
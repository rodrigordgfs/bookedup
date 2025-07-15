import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import type { StaffMember } from '@/mocks/data';
import React from 'react';

interface StaffDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffMember | null;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export default function StaffDetailsDialog({
  open,
  onOpenChange,
  staff,
  onEdit,
  onDelete,
  onToggleStatus,
}: StaffDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Funcionário</DialogTitle>
          <DialogDescription>
            Visualize informações completas sobre o funcionário selecionado.
          </DialogDescription>
        </DialogHeader>
        {staff && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{staff.name}</h3>
                <Badge variant={staff.active ? 'default' : 'secondary'} className="mt-1">
                  {staff.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Email</h4>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                {staff.email}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Telefone</h4>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                {staff.phone}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Especialidades</h4>
              <div className="text-muted-foreground">
                {staff.specialties.join(', ')}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={onToggleStatus}
                className="flex-1 cursor-pointer"
              >
                {staff.active ? 'Desativar' : 'Ativar'} Funcionário
              </Button>
              <Button 
                variant="outline" 
                onClick={onEdit}
                className="flex-1 cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Funcionário
              </Button>
              <Button 
                variant="outline" 
                onClick={onDelete}
                className="text-red-600 hover:text-red-700 flex-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Funcionário
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 
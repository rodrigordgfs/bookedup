import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import React, { useState } from 'react';

interface SettingsSecurityProps {
  onSavePassword: () => void;
  on2FAConfig: () => void;
}

export default function SettingsSecurity({ onSavePassword, on2FAConfig }: SettingsSecurityProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Senha atual</Label>
            <Input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova senha</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <Button onClick={onSavePassword}>Alterar Senha</Button>
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">Autenticação de Dois Fatores</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
            <Button variant="outline" onClick={on2FAConfig}>
              <Smartphone className="w-4 h-4 mr-2" />
              Configurar 2FA
            </Button>
          </div>
        </div>
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4 text-red-600">Zona de Perigo</h4>
          <div className="space-y-4">
            <Button variant="destructive" className="w-full">
              Excluir Conta
            </Button>
            <p className="text-xs text-muted-foreground">
              Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
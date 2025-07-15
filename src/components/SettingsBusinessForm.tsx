import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';

interface BusinessInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

interface SettingsBusinessFormProps {
  businessInfo: BusinessInfo;
  setBusinessInfo: (info: BusinessInfo) => void;
  onSave: () => void;
}

export default function SettingsBusinessForm({ businessInfo, setBusinessInfo, onSave }: SettingsBusinessFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Negócio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Nome do negócio</Label>
            <Input
              id="businessName"
              value={businessInfo.name}
              onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessEmail">Email</Label>
            <Input
              id="businessEmail"
              type="email"
              value={businessInfo.email}
              onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="businessPhone">Telefone</Label>
            <Input
              id="businessPhone"
              value={businessInfo.phone}
              onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessAddress">Endereço</Label>
            <Input
              id="businessAddress"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessDescription">Descrição</Label>
          <textarea
            id="businessDescription"
            value={businessInfo.description}
            onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md text-sm"
            rows={3}
          />
        </div>
        <Button onClick={onSave}>Salvar Alterações</Button>
      </CardContent>
    </Card>
  );
} 
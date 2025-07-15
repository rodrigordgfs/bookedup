import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import React, { useState } from 'react';

interface SettingsAppearanceProps {
  onSave: () => void;
}

export default function SettingsAppearance({ onSave }: SettingsAppearanceProps) {
  const [language, setLanguage] = useState('pt-BR');
  const [timezone, setTimezone] = useState('America/Sao_Paulo');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aparência</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Tema</Label>
            <div className="flex items-center space-x-4 mt-2">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">
                Alterne entre modo claro e escuro
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Idioma</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fuso Horário</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={onSave}>Salvar Configurações</Button>
      </CardContent>
    </Card>
  );
} 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import React from 'react';

interface Notifications {
  emailBookings: boolean;
  smsReminders: boolean;
  whatsappNotifications: boolean;
  dailyReport: boolean;
}

interface SettingsNotificationsProps {
  notifications: Notifications;
  setNotifications: (n: Notifications) => void;
  onSave: () => void;
}

export default function SettingsNotifications({ notifications, setNotifications, onSave }: SettingsNotificationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências de Notificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notificações por Email</h4>
              <p className="text-sm text-muted-foreground">Receber emails sobre novos agendamentos</p>
            </div>
            <Switch
              checked={notifications.emailBookings}
              onCheckedChange={(checked) => setNotifications({ ...notifications, emailBookings: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Lembretes por SMS</h4>
              <p className="text-sm text-muted-foreground">Enviar lembretes por SMS para clientes</p>
            </div>
            <Switch
              checked={notifications.smsReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, smsReminders: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notificações WhatsApp</h4>
              <p className="text-sm text-muted-foreground">Receber notificações via WhatsApp</p>
            </div>
            <Switch
              checked={notifications.whatsappNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, whatsappNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Relatório Diário</h4>
              <p className="text-sm text-muted-foreground">Receber relatório diário por email</p>
            </div>
            <Switch
              checked={notifications.dailyReport}
              onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReport: checked })}
            />
          </div>
        </div>
        <Button onClick={onSave}>Salvar Preferências</Button>
      </CardContent>
    </Card>
  );
} 
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell, Store,
  Clock,
  Palette,
  Shield
} from 'lucide-react';
import SettingsBusinessForm from '@/components/SettingsBusinessForm';
import SettingsWorkingHours from '@/components/SettingsWorkingHours';
import SettingsNotifications from '@/components/SettingsNotifications';
import SettingsAppearance from '@/components/SettingsAppearance';
import SettingsSecurity from '@/components/SettingsSecurity';

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'BookedUp Barbearia',
    email: 'contato@bookedup.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    description: 'A melhor barbearia da região'
  });

  const [workingHours, setWorkingHours] = useState({
    monday: { open: '09:00', close: '18:00', enabled: true },
    tuesday: { open: '09:00', close: '18:00', enabled: true },
    wednesday: { open: '09:00', close: '18:00', enabled: true },
    thursday: { open: '09:00', close: '18:00', enabled: true },
    friday: { open: '09:00', close: '18:00', enabled: true },
    saturday: { open: '09:00', close: '16:00', enabled: true },
    sunday: { open: '10:00', close: '14:00', enabled: false }
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    smsReminders: true,
    whatsappNotifications: true,
    dailyReport: false
  });

  const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações do seu negócio e preferências da conta
          </p>
        </div>

        {/* Skeleton de loading global */}
        {/* <SettingsSkeleton /> */}

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="business" className="flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">Negócio</span>
            </TabsTrigger>
            <TabsTrigger value="hours" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Horários</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Aparência</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
          </TabsList>

          {/* Business Settings */}
          <TabsContent value="business">
            <SettingsBusinessForm 
              businessInfo={businessInfo}
              setBusinessInfo={setBusinessInfo}
              onSave={() => {}}
            />
          </TabsContent>

          {/* Working Hours */}
          <TabsContent value="hours">
            <SettingsWorkingHours 
              workingHours={workingHours}
              setWorkingHours={(hours) => setWorkingHours(hours as typeof workingHours)}
              dayNames={dayNames}
              onSave={() => {}}
            />
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <SettingsNotifications 
              notifications={notifications}
              setNotifications={setNotifications}
              onSave={() => {}}
            />
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <SettingsAppearance onSave={() => {}} />
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <SettingsSecurity 
              onSavePassword={() => {}}
              on2FAConfig={() => {}}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
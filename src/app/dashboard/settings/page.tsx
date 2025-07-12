'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/theme-toggle';
import { DrawerMenu } from '@/components/DrawerMenu';
import {
  User,
  Bell,
  LogOut, Store,
  Clock,
  Palette,
  Shield,
  Smartphone
} from 'lucide-react';

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'StyleBook Barbearia',
    email: 'contato@stylebook.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    description: 'A melhor barbearia da região'
  });

  const user = {
    name: 'João Silva',
    email: 'joao@email.com',
    avatarUrl: '',
    role: 'Administrador',
  };

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
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <DrawerMenu user={user} />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">StyleBook</h1>
                  <p className="text-sm text-muted-foreground">Configurações</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Configurações</h2>
          <p className="text-muted-foreground">
            Gerencie as configurações do seu negócio e preferências da conta
          </p>
        </div>

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
                      onChange={(e) => setBusinessInfo({...businessInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Email</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => setBusinessInfo({...businessInfo, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Telefone</Label>
                    <Input
                      id="businessPhone"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({...businessInfo, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Endereço</Label>
                    <Input
                      id="businessAddress"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Descrição</Label>
                  <textarea
                    id="businessDescription"
                    value={businessInfo.description}
                    onChange={(e) => setBusinessInfo({...businessInfo, description: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md text-sm"
                    rows={3}
                  />
                </div>
                <Button>Salvar Alterações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Working Hours */}
          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Horários de Funcionamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={hours.enabled}
                        onCheckedChange={(checked) => 
                          setWorkingHours({
                            ...workingHours,
                            [day]: { ...hours, enabled: checked }
                          })
                        }
                      />
                      <span className="font-medium w-24">{dayNames[day as keyof typeof dayNames]}</span>
                    </div>
                    {hours.enabled && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => 
                            setWorkingHours({
                              ...workingHours,
                              [day]: { ...hours, open: e.target.value }
                            })
                          }
                          className="w-24"
                        />
                        <span>às</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => 
                            setWorkingHours({
                              ...workingHours,
                              [day]: { ...hours, close: e.target.value }
                            })
                          }
                          className="w-24"
                        />
                      </div>
                    )}
                    {!hours.enabled && (
                      <span className="text-muted-foreground">Fechado</span>
                    )}
                  </div>
                ))}
                <Button>Salvar Horários</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
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
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, emailBookings: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Lembretes por SMS</h4>
                      <p className="text-sm text-muted-foreground">Enviar lembretes por SMS para clientes</p>
                    </div>
                    <Switch
                      checked={notifications.smsReminders}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, smsReminders: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações WhatsApp</h4>
                      <p className="text-sm text-muted-foreground">Receber notificações via WhatsApp</p>
                    </div>
                    <Switch
                      checked={notifications.whatsappNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, whatsappNotifications: checked})
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Relatório Diário</h4>
                      <p className="text-sm text-muted-foreground">Receber relatório diário por email</p>
                    </div>
                    <Switch
                      checked={notifications.dailyReport}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, dailyReport: checked})
                      }
                    />
                  </div>
                </div>
                <Button>Salvar Preferências</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
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
                    <Select defaultValue="pt-BR">
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
                    <Select defaultValue="America/Sao_Paulo">
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
                <Button>Salvar Configurações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha atual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova senha</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                <Button>Alterar Senha</Button>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Autenticação de Dois Fatores</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Button variant="outline">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Bell, CheckCircle, XCircle, Clock, User, Archive, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Notification {
  id: number;
  type: 'appointment_confirmed' | 'appointment_cancelled' | 'appointment_reminder' | 'new_client' | 'new_appointment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: {
    appointmentId?: number;
    clientId?: number;
    serviceId?: number;
  };
}

export function NotificationsDropdown() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'appointment_confirmed',
      title: 'Agendamento Confirmado',
      message: 'João Silva confirmou o agendamento para amanhã às 09:00',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      data: { appointmentId: 1, clientId: 1 }
    },
    {
      id: 2,
      type: 'appointment_reminder',
      title: 'Lembrete de Agendamento',
      message: 'Você tem um agendamento em 30 minutos com Pedro Santos',
      timestamp: '2024-01-15T09:00:00Z',
      read: false,
      data: { appointmentId: 2, clientId: 2 }
    },
    {
      id: 3,
      type: 'new_client',
      title: 'Novo Cliente Cadastrado',
      message: 'Carlos Lima foi cadastrado no sistema',
      timestamp: '2024-01-15T08:45:00Z',
      read: true,
      data: { clientId: 3 }
    },
    {
      id: 4,
      type: 'appointment_cancelled',
      title: 'Agendamento Cancelado',
      message: 'Roberto Costa cancelou o agendamento de hoje às 16:00',
      timestamp: '2024-01-15T08:30:00Z',
      read: false,
      data: { appointmentId: 4, clientId: 4 }
    },
    {
      id: 5,
      type: 'system',
      title: 'Manutenção Programada',
      message: 'O sistema ficará indisponível das 02:00 às 04:00 para manutenção',
      timestamp: '2024-01-14T20:00:00Z',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment_confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'appointment_cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'appointment_reminder':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'new_client':
        return <User className="w-4 h-4 text-purple-600" />;
      case 'new_appointment':
        return <Calendar className="w-4 h-4 text-orange-600" />;
      case 'system':
        return <Archive className="w-4 h-4 text-gray-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'appointment_confirmed':
        return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
      case 'appointment_cancelled':
        return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'appointment_reminder':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
      case 'new_client':
        return 'border-l-purple-500 bg-purple-50 dark:bg-purple-950/20';
      case 'new_appointment':
        return 'border-l-orange-500 bg-orange-50 dark:bg-orange-950/20';
      case 'system':
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Navegar para a página relevante baseada no tipo de notificação
    if (notification.data?.appointmentId) {
      // Navegar para detalhes do agendamento
      localStorage.setItem('openAppointmentDetail', notification.data.appointmentId.toString());
      router.push('/dashboard/appointments');
    } else if (notification.data?.clientId) {
      // Navegar para detalhes do cliente
      localStorage.setItem('openClientDetail', notification.data.clientId.toString());
      router.push('/dashboard/clients');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-80 mx-4 sm:mx-0 mt-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notificações</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                  !notification.read ? 'bg-muted/50' : ''
                } cursor-pointer mb-2 last:mb-0`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => router.push('/dashboard/notifications')}
            >
              Ver todas as notificações
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
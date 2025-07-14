'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toolbar } from '@/components/Toolbar';
import {
  Bell,
  Settings,
  LogOut,
  Search, CheckCircle,
  XCircle,
  Clock,
  User,
  Archive,
  Calendar, Check,
  Trash2
} from 'lucide-react';
import { PaginationBar } from '@/components/ui/pagination';
import type { Notification } from '@/mocks/data';
import { notifications } from '@/mocks/data';

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isNotificationDetailOpen, setIsNotificationDetailOpen] = useState(false);

  const [notificationsState, setNotificationsState] = useState<Notification[]>(notifications);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment_confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'appointment_cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'appointment_reminder':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'new_client':
        return <User className="w-5 h-5 text-purple-600" />;
      case 'new_appointment':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'system':
        return <Archive className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
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

  const getTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'appointment_confirmed':
        return 'Agendamento Confirmado';
      case 'appointment_cancelled':
        return 'Agendamento Cancelado';
      case 'appointment_reminder':
        return 'Lembrete';
      case 'new_client':
        return 'Novo Cliente';
      case 'new_appointment':
        return 'Novo Agendamento';
      case 'system':
        return 'Sistema';
      default:
        return type;
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
    setNotificationsState(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsState(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (notificationId: number) => {
    setNotificationsState(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsNotificationDetailOpen(true);
    markAsRead(notification.id);
  };

  const filteredNotifications = notificationsState.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'read' && notification.read) ||
      (statusFilter === 'unread' && !notification.read);
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const unreadCount = notificationsState.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Toolbar
        title="BookedUp"
        subtitle="Notificações"
        icon={<Bell className="w-5 h-5 text-white" />}
        showDrawer
        showNotifications
        showThemeToggle
        showUserMenu={false}
        rightActions={
          <>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 cursor-pointer">
              <LogOut className="w-5 h-5" />
            </Button>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Notificações</h2>
            <p className="text-muted-foreground">
              Gerencie todas as suas notificações
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{unreadCount}</span> não lidas
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
                className="cursor-pointer"
              >
                <Check className="w-4 h-4 mr-2" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar notificações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="unread">Não lidas</SelectItem>
                    <SelectItem value="read">Lidas</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="appointment_confirmed">Agendamento Confirmado</SelectItem>
                    <SelectItem value="appointment_cancelled">Agendamento Cancelado</SelectItem>
                    <SelectItem value="appointment_reminder">Lembrete</SelectItem>
                    <SelectItem value="new_client">Novo Cliente</SelectItem>
                    <SelectItem value="new_appointment">Novo Agendamento</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lista de Notificações</h3>
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} de {filteredNotifications.length} notificações
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {currentNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhuma notificação encontrada</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                      ? 'Tente ajustar os filtros de busca'
                      : 'Você está em dia com suas notificações'
                    }
                  </p>
                </div>
              ) : (
                currentNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-l-4 ${getNotificationColor(notification.type)} rounded-lg cursor-pointer transition-colors hover:bg-muted/30 ${
                      !notification.read ? 'bg-muted/50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-foreground">
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">
                                  Nova
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {getTypeLabel(notification.type)}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6"
        />

        {/* Notification Detail Modal */}
        <Dialog open={isNotificationDetailOpen} onOpenChange={setIsNotificationDetailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Notificação</DialogTitle>
              <DialogDescription>
                Visualize informações detalhadas sobre a notificação selecionada.
              </DialogDescription>
            </DialogHeader>
            {selectedNotification && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(selectedNotification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {selectedNotification.title}
                    </h3>
                    <Badge variant="outline" className="mb-3">
                      {getTypeLabel(selectedNotification.type)}
                    </Badge>
                    <p className="text-muted-foreground mb-4">
                      {selectedNotification.message}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatTimestamp(selectedNotification.timestamp)}
                    </p>
                  </div>
                </div>

                {selectedNotification.data && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Dados Relacionados</h4>
                    <div className="space-y-2 text-sm">
                      {selectedNotification.data.appointmentId && (
                        <p><strong>ID do Agendamento:</strong> {selectedNotification.data.appointmentId}</p>
                      )}
                      {selectedNotification.data.clientId && (
                        <p><strong>ID do Cliente:</strong> {selectedNotification.data.clientId}</p>
                      )}
                      {selectedNotification.data.serviceId && (
                        <p><strong>ID do Serviço:</strong> {selectedNotification.data.serviceId}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsNotificationDetailOpen(false)}
                  >
                    Fechar
                  </Button>
                  {selectedNotification.data?.appointmentId && (
                    <Button>
                      Ver Agendamento
                    </Button>
                  )}
                  {selectedNotification.data?.clientId && (
                    <Button>
                      Ver Cliente
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 
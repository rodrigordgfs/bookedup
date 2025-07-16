"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
    active: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  fetchServices: (params?: { name?: string; categoryId?: string }) => Promise<void>;
  addService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'active' | 'category'>) => Promise<Service | null>;
  editService: (id: string, data: Partial<Service>) => Promise<Service | null>;
  deleteService: (id: string) => Promise<boolean>;
  toggleStatus: (id: string, active: boolean) => Promise<Service | null>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchServices = React.useCallback(
    async (params?: { name?: string; categoryId?: string }) => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const urlParams = new URLSearchParams();
        urlParams.append('userId', user.id);
        if (params?.name) urlParams.append('name', params.name);
        if (params?.categoryId) urlParams.append('categoryId', params.categoryId);
        const res = await fetch(`${API_URL}/services?${urlParams.toString()}`);
        const data = await res.json();
        setServices(data);
      } catch {
        toast.error('Erro ao buscar serviços');
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  const addService = async (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'active' | 'category'>) => {
    try {
      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Erro ao criar serviço');
      const newService = await res.json();
      setServices(prev => [newService, ...prev]);
      toast.success('Serviço criado com sucesso!');
      return newService;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar serviço';
      toast.error(errorMessage);
      return null;
    }
  };

  const editService = async (id: string, data: Partial<Service>) => {
    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Erro ao editar serviço');
      const updatedService = await res.json();
      setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
      toast.success('Serviço editado com sucesso!');
      return updatedService;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao editar serviço';
      toast.error(errorMessage);
      return null;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao deletar serviço');
      setServices(prev => prev.filter(s => s.id !== id));
      toast.success('Serviço deletado com sucesso!');
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar serviço';
      toast.error(errorMessage);
      return false;
    }
  };

  const toggleStatus = async (id: string, active: boolean) => {
    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      if (!res.ok) throw new Error('Erro ao atualizar status do serviço');
      const updatedService = await res.json();
      setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
      toast.success('Status do serviço atualizado!');
      return updatedService;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar status do serviço';
      toast.error(errorMessage);
      return null;
    }
  };

  // Carregar serviços ao montar
  useEffect(() => {
    if (user?.id) {
      fetchServices();
    }
  }, [user?.id, fetchServices]);

  return (
    <ServiceContext.Provider value={{ services, loading, fetchServices, addService, editService, deleteService, toggleStatus }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService deve ser usado dentro de ServiceProvider');
  }
  return context;
} 
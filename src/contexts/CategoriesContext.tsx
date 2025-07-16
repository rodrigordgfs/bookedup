"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

interface Category {
  id: string;
  name: string;
  active: boolean;
}

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => void;
  addCategory: (name: string) => Promise<void>;
  editCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  toggleCategoryStatus: (id: string, active: boolean) => Promise<void>;
  addingCategory: boolean;
  editingCategory: boolean;
  togglingStatusId: string | null;
  deletingCategoryId: string | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingCategory, setAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [togglingStatusId, setTogglingStatusId] = useState<string | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  const fetchCategories = React.useCallback(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`http://127.0.0.1:3333/categories?userId=${userId}`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {
        setError('Erro ao carregar categorias');
        toast.error('Erro ao carregar categorias');
      })
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      fetchCategories();
    }
  }, [isLoaded, userId, fetchCategories]);

  const addCategory = async (name: string) => {
    if (!userId) return;
    setAddingCategory(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:3333/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name }),
      });
      if (!res.ok) throw new Error('Erro ao criar categoria');
      const newCategory = await res.json();
      setCategories(prev => [...prev, newCategory]);
      toast.success('Categoria criada com sucesso!');
    } catch {
      setError('Erro ao criar categoria');
      toast.error('Erro ao criar categoria');
    } finally {
      setAddingCategory(false);
    }
  };

  const editCategory = async (id: string, name: string) => {
    setEditingCategory(true);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:3333/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Erro ao editar categoria');
      const updatedCategory = await res.json();
      setCategories(prev => prev.map(cat => (cat.id === id ? updatedCategory : cat)));
      toast.success('Categoria editada com sucesso!');
    } catch {
      setError('Erro ao editar categoria');
      toast.error('Erro ao editar categoria');
    } finally {
      setEditingCategory(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setDeletingCategoryId(id);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:3333/categories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao deletar categoria');
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast.success('Categoria deletada com sucesso!');
    } catch {
      setError('Erro ao deletar categoria');
      toast.error('Erro ao deletar categoria');
    } finally {
      setDeletingCategoryId(null);
    }
  };

  const toggleCategoryStatus = async (id: string, active: boolean) => {
    setTogglingStatusId(id);
    setError(null);
    try {
      const res = await fetch(`http://127.0.0.1:3333/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active }),
      });
      if (!res.ok) throw new Error('Erro ao alterar status');
      const updatedCategory = await res.json();
      setCategories(prev => prev.map(cat => (cat.id === id ? updatedCategory : cat)));
      toast.success('Status da categoria atualizado!');
    } catch {
      setError('Erro ao alterar status');
      toast.error('Erro ao alterar status da categoria');
    } finally {
      setTogglingStatusId(null);
    }
  };

  return (
    <CategoriesContext.Provider value={{
      categories,
      loading,
      error,
      fetchCategories,
      addCategory,
      editCategory,
      deleteCategory,
      toggleCategoryStatus,
      addingCategory,
      editingCategory,
      togglingStatusId,
      deletingCategoryId,
    }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories deve ser usado dentro de CategoriesProvider');
  }
  return context;
} 
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um valor numérico para o formato de moeda brasileira (Real)
 * @param value - Valor numérico a ser formatado
 * @returns String formatada no formato R$ X,XX
 */
export function formatToReal(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Formata um valor numérico para o formato de moeda brasileira (Real) sem símbolo
 * @param value - Valor numérico a ser formatado
 * @returns String formatada no formato X,XX
 */
export function formatToRealWithoutSymbol(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

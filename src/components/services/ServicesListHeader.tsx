import React from 'react';

interface ServicesListHeaderProps {
  title: string;
  startIndex: number;
  endIndex: number;
  totalCount: number;
}

export default function ServicesListHeader({
  title,
  startIndex,
  endIndex,
  totalCount,
}: ServicesListHeaderProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Mostrando {startIndex + 1}-{Math.min(endIndex, totalCount)} de {totalCount} serviços
      </p>
    </div>
  );
} 
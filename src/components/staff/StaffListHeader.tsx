import React from 'react';

interface StaffListHeaderProps {
  title: string;
  startIndex: number;
  endIndex: number;
  totalCount: number;
}

export default function StaffListHeader({
  title,
  startIndex,
  endIndex,
  totalCount,
}: StaffListHeaderProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Mostrando {startIndex + 1}-{Math.min(endIndex, totalCount)} de {totalCount} funcionários
      </p>
    </div>
  );
} 
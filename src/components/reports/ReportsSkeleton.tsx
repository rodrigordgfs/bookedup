import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function ReportsSkeleton() {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
        <Skeleton className="h-10 w-1/2 mb-2" />
        <Skeleton className="h-10 w-32 mb-2" />
        <Skeleton className="h-10 w-32 mb-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-80 w-full mb-4" />
      <Skeleton className="h-80 w-full mb-4" />
    </>
  );
} 
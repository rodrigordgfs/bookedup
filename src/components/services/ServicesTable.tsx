import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PaginationBar } from '@/components/ui/pagination';
import { Archive, Clock, DollarSign } from 'lucide-react';
import type { Service } from '@/mocks/data';

interface ServicesTableProps {
  services: Service[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onServiceClick: (service: Service) => void;
}

export default function ServicesTable({
  services,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onServiceClick,
}: ServicesTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Serviço</th>
                  <th className="text-left p-4 font-medium text-sm">Categoria</th>
                  <th className="text-left p-4 font-medium text-sm">Duração</th>
                  <th className="text-left p-4 font-medium text-sm">Preço</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-4"><Skeleton className="h-6 w-32" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Serviço</th>
                  <th className="text-left p-4 font-medium text-sm">Categoria</th>
                  <th className="text-left p-4 font-medium text-sm">Duração</th>
                  <th className="text-left p-4 font-medium text-sm">Preço</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr 
                    key={service.id} 
                    className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => onServiceClick(service)}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <Archive className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {service.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">
                        {service.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{service.duration} min</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={service.active ? 'default' : 'secondary'}>
                        {service.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        {!loading && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="py-4"
          />
        )}
      </CardContent>
    </Card>
  );
} 
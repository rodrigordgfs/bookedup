import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Activity {
  id: string | number;
  type: string;
  clientName: string;
  timestamp: Date;
  color: string;
}

interface DashboardRecentActivityProps {
  loading: boolean;
  recentActivities: Activity[];
  getActivityMessage: (type: string, clientName: string) => string;
}

export function DashboardRecentActivity({ loading, recentActivities, getActivityMessage }: DashboardRecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground">
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <>
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
            </>
          ) : (
            recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {getActivityMessage(activity.type, activity.clientName)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(activity.timestamp, { 
                      addSuffix: true, 
                      locale: ptBR 
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardRecentActivity; 
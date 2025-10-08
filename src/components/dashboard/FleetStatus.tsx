import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wagon } from '@/types';
import { Train } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FleetStatusProps {
  wagons: Wagon[];
}

export function FleetStatus({ wagons }: FleetStatusProps) {
  const statusCounts = wagons.reduce((acc, wagon) => {
    acc[wagon.status] = (acc[wagon.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusConfig = {
    idle: { label: 'Idle', color: 'bg-success', textColor: 'text-success' },
    loading: { label: 'Loading', color: 'bg-warning', textColor: 'text-warning' },
    'in-transit': { label: 'In Transit', color: 'bg-info', textColor: 'text-info' },
    maintenance: { label: 'Maintenance', color: 'bg-destructive', textColor: 'text-destructive' },
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Train className="h-5 w-5 text-primary" />
          Wagon Fleet Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = statusCounts[status] || 0;
              const percentage = (count / wagons.length) * 100;
              
              return (
                <div
                  key={status}
                  className={cn('h-16', config.color)}
                  style={{ width: `${percentage}%` }}
                  title={`${config.label}: ${count}`}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = statusCounts[status] || 0;
              
              return (
                <div key={status} className="flex items-center justify-between rounded-lg border bg-card p-3">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-3 w-3 rounded-full', config.color)} />
                    <span className="text-sm font-medium text-foreground">{config.label}</span>
                  </div>
                  <span className={cn('text-lg font-bold', config.textColor)}>{count}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border bg-muted p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{wagons.length}</p>
            <p className="text-xs text-muted-foreground">Total Wagons</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

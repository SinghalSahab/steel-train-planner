import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Stockyard } from '@/types';
import { Package } from 'lucide-react';

interface StockyardStatusProps {
  stockyards: Stockyard[];
}

export function StockyardStatus({ stockyards }: StockyardStatusProps) {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Stockyard Inventory
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stockyards.map((yard) => {
          const utilization = (yard.currentStock / yard.capacity) * 100;
          const status = utilization > 80 ? 'error' : utilization > 60 ? 'warning' : 'success';
          
          return (
            <div key={yard.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{yard.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{yard.materialType} • {yard.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    {yard.currentStock} / {yard.capacity}t
                  </p>
                  <p className="text-xs text-muted-foreground">{utilization.toFixed(0)}%</p>
                </div>
              </div>
              <Progress 
                value={utilization} 
                className={`h-2 ${
                  status === 'error' ? 'bg-destructive/20 [&>div]:bg-destructive' :
                  status === 'warning' ? 'bg-warning/20 [&>div]:bg-warning' :
                  'bg-success/20 [&>div]:bg-success'
                }`}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

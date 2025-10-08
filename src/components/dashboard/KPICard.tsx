import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { KPI } from '@/types';
import { cn } from '@/lib/utils';

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const getStatusColor = () => {
    switch (kpi.status) {
      case 'success':
        return 'border-success/30 bg-success-light';
      case 'warning':
        return 'border-warning/30 bg-warning-light';
      case 'error':
        return 'border-destructive/30 bg-destructive-light';
      case 'info':
        return 'border-info/30 bg-info-light';
      default:
        return 'border-border bg-card';
    }
  };

  const getTrendIcon = () => {
    switch (kpi.trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-success" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className={cn('border-2 transition-all hover:shadow-md', getStatusColor())}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-foreground">
                {kpi.value}
              </h3>
              {kpi.unit && (
                <span className="text-sm font-medium text-muted-foreground">{kpi.unit}</span>
              )}
            </div>
          </div>
          {kpi.trend && (
            <div className="flex items-center gap-1 rounded-full bg-background/50 px-2 py-1">
              {getTrendIcon()}
              {kpi.trendValue && (
                <span className="text-xs font-semibold">{kpi.trendValue}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

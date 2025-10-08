import { KPICard } from '@/components/dashboard/KPICard';
import { StockyardStatus } from '@/components/dashboard/StockyardStatus';
import { FleetStatus } from '@/components/dashboard/FleetStatus';
import { mockKPIs, mockStockyards, mockWagons, mockOrders } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Order } from '@/types';

export default function Dashboard() {
  const criticalOrders = mockOrders.filter(o => o.priority === 'critical');
  const pendingOrders = mockOrders.filter(o => o.status === 'pending');

  const getPriorityColor = (priority: Order['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-info text-info-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Operations Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of rake formation and dispatch operations</p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Critical Orders Alert */}
          {criticalOrders.length > 0 && (
            <Card className="border-destructive/50 bg-destructive-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  Critical Orders Require Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {criticalOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between rounded-lg border border-destructive/20 bg-card p-3">
                      <div>
                        <p className="font-semibold text-foreground">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">{order.customer} • {order.destination}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">{order.quantity}t</p>
                        <p className="text-xs text-destructive">Due: {order.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pending Orders */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Pending Orders ({pendingOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{order.orderNumber}</p>
                        <Badge className={getPriorityColor(order.priority)} variant="secondary">
                          {order.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground capitalize">{order.materialType} • {order.destination}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{order.quantity}t</p>
                      <p className="text-xs text-muted-foreground">Due: {order.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <StockyardStatus stockyards={mockStockyards} />
          <FleetStatus wagons={mockWagons} />
        </div>
      </div>
    </div>
  );
}

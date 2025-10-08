import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Train, Package, TrendingUp } from 'lucide-react';

export default function RakePlanner() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rake Formation Planner</h1>
        <p className="text-muted-foreground">Plan and optimize rake formations with drag-and-drop interface</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Available Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Interactive drag-and-drop rake planning interface coming soon. 
              This will allow you to club orders, assign wagons, and simulate different formation scenarios.
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="h-5 w-5 text-primary" />
              Rake Formation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Drop zone for building rake configurations with real-time capacity and cost calculations.
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Optimization Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View estimated costs, loading efficiency, and constraint violations in real-time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

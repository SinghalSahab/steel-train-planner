import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const costComparisonData = [
  { scenario: 'Current Plan', transportation: 420000, loading: 85000, handling: 45000, total: 550000 },
  { scenario: 'Optimized A', transportation: 385000, loading: 82000, handling: 42000, total: 509000 },
  { scenario: 'Optimized B', transportation: 395000, loading: 78000, handling: 40000, total: 513000 },
];

const fulfillmentData = [
  { name: 'On Time', value: 68, color: 'hsl(var(--success))' },
  { name: 'Delayed', value: 22, color: 'hsl(var(--warning))' },
  { name: 'Pending', value: 10, color: 'hsl(var(--info))' },
];

const utilizationData = [
  { period: 'Week 1', wagons: 72, capacity: 85, efficiency: 85 },
  { period: 'Week 2', wagons: 78, capacity: 88, efficiency: 89 },
  { period: 'Week 3', wagons: 65, capacity: 80, efficiency: 81 },
  { period: 'Week 4', wagons: 82, capacity: 92, efficiency: 89 },
];

const dailyDispatchData = [
  { day: 'Mon', dispatched: 4, planned: 5 },
  { day: 'Tue', dispatched: 6, planned: 6 },
  { day: 'Wed', dispatched: 5, planned: 7 },
  { day: 'Thu', dispatched: 7, planned: 6 },
  { day: 'Fri', dispatched: 5, planned: 5 },
];

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedScenario, setSelectedScenario] = useState<string>('Current Plan');

  const scenarios = costComparisonData.map(s => s.scenario);
  const currentScenario = costComparisonData.find(s => s.scenario === selectedScenario);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Simulation</h1>
          <p className="text-muted-foreground">Compare scenarios and optimize dispatch operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedPeriod === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('daily')}
          >
            Daily
          </Button>
          <Button
            variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('weekly')}
          >
            Weekly
          </Button>
          <Button
            variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('monthly')}
          >
            Monthly
          </Button>
        </div>
      </div>

      {/* Period Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-elevated border-success/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Fulfillment Rate</p>
                <p className="text-2xl font-bold text-success">92%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+5% vs last period</span>
                </div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cost Savings</p>
                <p className="text-2xl font-bold text-foreground">₹41K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">7.5% reduction</span>
                </div>
              </div>
              <TrendingDown className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fleet Utilization</p>
                <p className="text-2xl font-bold text-foreground">86%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-info" />
                  <span className="text-xs text-info">+3% efficiency</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rakes Dispatched</p>
                <p className="text-2xl font-bold text-foreground">27</p>
                <p className="text-xs text-muted-foreground mt-1">this {selectedPeriod === 'daily' ? 'day' : 'week'}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scenario Comparison */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Scenario Cost Comparison</CardTitle>
            <div className="flex items-center gap-2">
              {scenarios.map((scenario) => (
                <Button
                  key={scenario}
                  variant={selectedScenario === scenario ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedScenario(scenario)}
                >
                  {scenario}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList>
              <TabsTrigger value="comparison">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
              <TabsTrigger value="utilization">Utilization</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="scenario" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="transportation" fill="hsl(var(--chart-1))" name="Transportation" />
                  <Bar dataKey="loading" fill="hsl(var(--chart-2))" name="Loading" />
                  <Bar dataKey="handling" fill="hsl(var(--chart-3))" name="Handling" />
                </BarChart>
              </ResponsiveContainer>

              {currentScenario && (
                <div className="grid gap-4 md:grid-cols-4 pt-4">
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Transportation</p>
                    <p className="text-lg font-bold text-foreground">₹{(currentScenario.transportation / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Loading</p>
                    <p className="text-lg font-bold text-foreground">₹{(currentScenario.loading / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="rounded-lg border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Handling</p>
                    <p className="text-lg font-bold text-foreground">₹{(currentScenario.handling / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="rounded-lg border bg-success-light border-success/30 p-4">
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                    <p className="text-lg font-bold text-success">₹{(currentScenario.total / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="fulfillment" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fulfillmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fulfillmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="flex flex-col justify-center space-y-4">
                  {fulfillmentData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {item.value}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="utilization" className="space-y-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="wagons"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Wagons Used"
                  />
                  <Line
                    type="monotone"
                    dataKey="capacity"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Total Capacity"
                  />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Efficiency %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dispatch Performance & Suggestions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Daily Dispatch Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyDispatchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend />
                <Bar dataKey="planned" fill="hsl(var(--chart-4))" name="Planned" />
                <Bar dataKey="dispatched" fill="hsl(var(--chart-2))" name="Dispatched" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Production & Dispatch Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Card className="border-success/30 bg-success-light">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Optimal Loading Window</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Load 2 additional rakes today to maximize Southern Express route capacity (6/8 slots used)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-info/30 bg-info-light">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-info mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Efficiency Opportunity</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Club orders ORD-004 and ORD-006 for 15% cost savings via multi-destination routing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning/30 bg-warning-light">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Capacity Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      North Stockyard at 82% capacity. Plan dispatch within 48hrs to maintain operations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

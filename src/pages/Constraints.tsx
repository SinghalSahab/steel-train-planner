import { useState } from 'react';
import { mockConstraints } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Save, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Constraint } from '@/types';
import { toast } from 'sonner';

export default function Constraints() {
  const [constraints, setConstraints] = useState(mockConstraints);
  const [minRakeSize, setMinRakeSize] = useState(8);
  const [maxRouteCapacity, setMaxRouteCapacity] = useState(6);
  const [sidingLimit, setSidingLimit] = useState(3);
  const [priorityMode, setPriorityMode] = useState('strict');

  const toggleConstraint = (id: string) => {
    setConstraints(constraints.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
  };

  const handleSave = () => {
    toast.success('Constraint settings saved successfully');
  };

  const handleReset = () => {
    setMinRakeSize(8);
    setMaxRouteCapacity(6);
    setSidingLimit(3);
    setPriorityMode('strict');
    setConstraints(mockConstraints);
    toast.info('Settings reset to defaults');
  };

  const enabledCount = constraints.filter(c => c.enabled).length;
  const hasChanges = minRakeSize !== 8 || maxRouteCapacity !== 6 || sidingLimit !== 3;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Operational Constraints</h1>
        <p className="text-muted-foreground">Configure planning rules and operational limits</p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Constraints</p>
                <p className="text-2xl font-bold text-foreground">{enabledCount} / {constraints.length}</p>
              </div>
              <Settings className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Configuration Status</p>
                <Badge variant={hasChanges ? 'secondary' : 'secondary'} className={hasChanges ? 'bg-warning text-warning-foreground' : 'bg-success text-success-foreground'}>
                  {hasChanges ? 'Unsaved Changes' : 'Up to Date'}
                </Badge>
              </div>
              {hasChanges ? (
                <AlertCircle className="h-8 w-8 text-warning" />
              ) : (
                <CheckCircle2 className="h-8 w-8 text-success" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Priority Mode</p>
                <p className="text-lg font-bold text-foreground capitalize">{priorityMode}</p>
              </div>
              <Settings className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Configuration Panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Constraint Toggles */}
        <Card className="card-elevated lg:col-span-1">
          <CardHeader>
            <CardTitle>Constraint Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {constraints.map((constraint) => (
              <div key={constraint.id} className="flex items-start justify-between space-x-3 rounded-lg border p-4">
                <div className="flex-1 space-y-1">
                  <Label htmlFor={constraint.id} className="text-sm font-semibold cursor-pointer">
                    {constraint.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{constraint.description}</p>
                </div>
                <Switch
                  id={constraint.id}
                  checked={constraint.enabled}
                  onCheckedChange={() => toggleConstraint(constraint.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Configuration Controls */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle>Parameter Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Min Rake Size */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="rake-size" className="text-sm font-semibold">
                  Minimum Rake Size
                </Label>
                <Badge variant="secondary" className="font-mono">
                  {minRakeSize} wagons
                </Badge>
              </div>
              <Slider
                id="rake-size"
                min={6}
                max={15}
                step={1}
                value={[minRakeSize]}
                onValueChange={(value) => setMinRakeSize(value[0])}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Minimum number of wagons required to form a rake. Lower values allow more flexible planning.
              </p>
            </div>

            {/* Route Capacity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="route-capacity" className="text-sm font-semibold">
                  Maximum Route Capacity
                </Label>
                <Badge variant="secondary" className="font-mono">
                  {maxRouteCapacity} rakes/day
                </Badge>
              </div>
              <Slider
                id="route-capacity"
                min={3}
                max={10}
                step={1}
                value={[maxRouteCapacity]}
                onValueChange={(value) => setMaxRouteCapacity(value[0])}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of rakes that can use a single route per day. Prevents route congestion.
              </p>
            </div>

            {/* Siding Limit */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="siding-limit" className="text-sm font-semibold">
                  Simultaneous Loading Capacity
                </Label>
                <Badge variant="secondary" className="font-mono">
                  {sidingLimit} rakes
                </Badge>
              </div>
              <Slider
                id="siding-limit"
                min={1}
                max={5}
                step={1}
                value={[sidingLimit]}
                onValueChange={(value) => setSidingLimit(value[0])}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Maximum rakes that can be loaded simultaneously at the siding. Based on physical infrastructure.
              </p>
            </div>

            {/* Priority Mode */}
            <div className="space-y-4">
              <Label htmlFor="priority-mode" className="text-sm font-semibold">
                Priority Handling Mode
              </Label>
              <Select value={priorityMode} onValueChange={setPriorityMode}>
                <SelectTrigger id="priority-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strict">Strict - Critical orders first</SelectItem>
                  <SelectItem value="balanced">Balanced - Optimize mix</SelectItem>
                  <SelectItem value="flexible">Flexible - Cost priority</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {priorityMode === 'strict' && 'Critical orders must be planned before any other priority level.'}
                {priorityMode === 'balanced' && 'Balance between priority and operational efficiency.'}
                {priorityMode === 'flexible' && 'Prioritize cost optimization over order priority.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validation Alerts */}
      {hasChanges && (
        <Card className="border-warning/50 bg-warning-light">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning-foreground">Unsaved Configuration Changes</h3>
                <p className="text-sm text-foreground mt-1">
                  You have modified constraint parameters. Save your changes to apply them to future planning operations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {sidingLimit < 2 && (
        <Card className="border-destructive/50 bg-destructive-light">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive">Low Loading Capacity Warning</h3>
                <p className="text-sm text-foreground mt-1">
                  Setting simultaneous loading capacity below 2 may cause significant delays in operations during peak hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

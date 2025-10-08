import { useState } from 'react';
import { mockRoutes } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Search, MapPin, AlertCircle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { Route } from '@/types';

export default function Routes() {
  const [routes] = useState(mockRoutes);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeRoutes = routes.filter(r => !r.isBlocked).length;
  const blockedRoutes = routes.filter(r => r.isBlocked).length;
  const totalCapacity = routes.reduce((sum, r) => sum + r.capacity, 0);
  const avgCostPerTon = routes.reduce((sum, r) => sum + r.costPerTon, 0) / routes.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Route Management</h1>
        <p className="text-muted-foreground">Monitor and manage dispatch routes and capacity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                <p className="text-2xl font-bold text-success">{activeRoutes}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blocked Routes</p>
                <p className="text-2xl font-bold text-destructive">{blockedRoutes}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Daily Capacity</p>
                <p className="text-2xl font-bold text-foreground">{totalCapacity}</p>
                <p className="text-xs text-muted-foreground">rakes/day</p>
              </div>
              <TrendingUp className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Cost/Ton</p>
                <p className="text-2xl font-bold text-foreground">₹{avgCostPerTon.toFixed(0)}</p>
              </div>
              <MapPin className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blocked Routes Alert */}
      {blockedRoutes > 0 && (
        <Card className="border-destructive/50 bg-destructive-light">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive">Route Blockage Alert</h3>
                <p className="text-sm text-foreground mt-1">
                  {blockedRoutes} route(s) are currently blocked. Consider alternative routes for dispatch planning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Available Routes</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead>Route Name</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead className="text-right">Distance</TableHead>
                  <TableHead className="text-right">Est. Time</TableHead>
                  <TableHead className="text-right">Cost/Ton</TableHead>
                  <TableHead className="text-center">Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Efficiency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TooltipProvider>
                  {filteredRoutes.map((route) => {
                    const efficiency = route.distance / route.estimatedTime;
                    const efficiencyRating = efficiency > 60 ? 'Excellent' : efficiency > 45 ? 'Good' : 'Fair';
                    
                    return (
                      <TableRow key={route.id} className="hover:bg-muted/50">
                        <TableCell className="font-semibold">{route.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            {route.destination}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {route.distance.toLocaleString()} km
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {route.estimatedTime}h
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{route.costPerTon.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="font-mono">
                            {route.capacity}/day
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {route.isBlocked ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="destructive" className="gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Blocked
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Route temporarily unavailable due to maintenance</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="secondary" className="gap-1 bg-success text-success-foreground">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Active
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Route operational and available for dispatch</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge 
                                variant="secondary"
                                className={
                                  efficiencyRating === 'Excellent' ? 'bg-success-light text-success' :
                                  efficiencyRating === 'Good' ? 'bg-info-light text-info' :
                                  'bg-warning-light text-warning-foreground'
                                }
                              >
                                {efficiencyRating}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Speed: {efficiency.toFixed(1)} km/h avg</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TooltipProvider>
              </TableBody>
            </Table>
          </div>

          {/* Route Suggestions */}
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Dispatch Recommendations</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Card className="border-success/30 bg-success-light">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Optimal Route for Mumbai</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Main Western Corridor offers best cost-time balance for current orders
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
                      <p className="text-sm font-semibold text-foreground">High Capacity Available</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Southern Express has 8 slots/day - ideal for bulk dispatches
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

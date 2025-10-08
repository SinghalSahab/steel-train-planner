import { useState } from 'react';
import { mockStockyards } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Search, ChevronDown, ChevronUp, AlertTriangle, Info, Package } from 'lucide-react';
import { Stockyard } from '@/types';

export default function Inventory() {
  const [stockyards] = useState(mockStockyards);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: keyof Stockyard; direction: 'asc' | 'desc' } | null>(null);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (key: keyof Stockyard) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  let filteredStockyards = stockyards.filter(yard =>
    yard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    yard.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    yard.materialType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortConfig) {
    filteredStockyards.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const getUtilizationStatus = (utilization: number) => {
    if (utilization > 80) return { color: 'destructive', label: 'Critical' };
    if (utilization > 60) return { color: 'warning', label: 'High' };
    return { color: 'success', label: 'Normal' };
  };

  const totalCapacity = stockyards.reduce((sum, yard) => sum + yard.capacity, 0);
  const totalStock = stockyards.reduce((sum, yard) => sum + yard.currentStock, 0);
  const overallUtilization = (totalStock / totalCapacity) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stockyard Inventory</h1>
        <p className="text-muted-foreground">Monitor material availability and stockyard capacity</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold text-foreground">{totalCapacity.toLocaleString()}t</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Stock</p>
                <p className="text-2xl font-bold text-foreground">{totalStock.toLocaleString()}t</p>
              </div>
              <Package className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Space</p>
                <p className="text-2xl font-bold text-foreground">{(totalCapacity - totalStock).toLocaleString()}t</p>
              </div>
              <Package className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Overall Utilization</p>
              <p className="text-2xl font-bold text-foreground mb-2">{overallUtilization.toFixed(1)}%</p>
              <Progress value={overallUtilization} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stockyards.some(yard => (yard.currentStock / yard.capacity) * 100 > 80) && (
        <Card className="border-destructive/50 bg-destructive-light">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive">High Capacity Alert</h3>
                <p className="text-sm text-foreground mt-1">
                  {stockyards.filter(yard => (yard.currentStock / yard.capacity) * 100 > 80).length} stockyard(s) 
                  are at critical capacity. Consider dispatching or redistributing materials.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Stockyard Details</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stockyards..."
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
                  <TableHead className="w-12"></TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" onClick={() => handleSort('name')} className="h-8 px-2">
                      Stockyard
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" onClick={() => handleSort('location')} className="h-8 px-2">
                      Location
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" onClick={() => handleSort('materialType')} className="h-8 px-2">
                      Material Type
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleSort('currentStock')} className="h-8 px-2">
                      Current Stock
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Capacity</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TooltipProvider>
                  {filteredStockyards.map((yard) => {
                    const utilization = (yard.currentStock / yard.capacity) * 100;
                    const status = getUtilizationStatus(utilization);
                    const isExpanded = expandedRows.has(yard.id);

                    return (
                      <>
                        <TableRow key={yard.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRow(yard.id)}
                              className="h-8 w-8 p-0"
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                          </TableCell>
                          <TableCell className="font-semibold">{yard.name}</TableCell>
                          <TableCell>{yard.location}</TableCell>
                          <TableCell>
                            <span className="capitalize">{yard.materialType}</span>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {yard.currentStock.toLocaleString()}t
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {yard.capacity.toLocaleString()}t
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Progress value={utilization} className="h-2 w-24" />
                                <span className="text-xs font-medium">{utilization.toFixed(0)}%</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant={status.color as any}>
                                  {status.label}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  {status.label === 'Critical' && 'Immediate action required - capacity above 80%'}
                                  {status.label === 'High' && 'Monitor closely - capacity above 60%'}
                                  {status.label === 'Normal' && 'Operating within normal parameters'}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                        
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={8} className="bg-muted/30">
                              <div className="p-4 space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Available Space</p>
                                    <p className="text-sm font-semibold text-foreground">
                                      {(yard.capacity - yard.currentStock).toLocaleString()}t
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Last Updated</p>
                                    <p className="text-sm font-semibold text-foreground">{yard.lastUpdated}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Storage Efficiency</p>
                                    <p className="text-sm font-semibold text-foreground">
                                      {utilization > 70 ? 'Optimal' : utilization > 40 ? 'Good' : 'Underutilized'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Stockyard ID</p>
                                    <p className="text-sm font-mono font-semibold text-foreground">{yard.id}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-2 p-3 rounded-lg bg-info-light border border-info/20">
                                  <Info className="h-4 w-4 text-info mt-0.5" />
                                  <div>
                                    <p className="text-xs font-semibold text-foreground">Inventory Notes</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Material quality verified. All items meet production specifications. 
                                      Recommended for high-priority orders.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                </TooltipProvider>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

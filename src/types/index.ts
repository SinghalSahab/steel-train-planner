// Core data types for steel plant logistics

export type OrderPriority = 'critical' | 'high' | 'medium' | 'low';
export type OrderStatus = 'pending' | 'planned' | 'loading' | 'dispatched' | 'delivered';
export type WagonStatus = 'idle' | 'loading' | 'in-transit' | 'maintenance';
export type RakeStatus = 'forming' | 'ready' | 'dispatched' | 'returned';
export type MaterialType = 'coil' | 'plate' | 'billet' | 'slab' | 'pipe';

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  destination: string;
  materialType: MaterialType;
  quantity: number; // in tons
  priority: OrderPriority;
  status: OrderStatus;
  dueDate: string;
  createdDate: string;
  notes?: string;
}

export interface Stockyard {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  materialType: MaterialType;
  lastUpdated: string;
}

export interface Wagon {
  id: string;
  wagonNumber: string;
  type: string;
  capacity: number; // in tons
  status: WagonStatus;
  currentLocation?: string;
  assignedRake?: string;
  lastMaintenance: string;
}

export interface Rake {
  id: string;
  rakeNumber: string;
  wagons: Wagon[];
  status: RakeStatus;
  destination?: string;
  totalCapacity: number;
  currentLoad: number;
  orders: string[]; // Order IDs
  estimatedCost: number;
  createdDate: string;
  dispatchDate?: string;
}

export interface Route {
  id: string;
  name: string;
  destination: string;
  distance: number; // in km
  estimatedTime: number; // in hours
  costPerTon: number;
  isBlocked: boolean;
  capacity: number; // trains per day
}

export interface Constraint {
  id: string;
  name: string;
  type: 'rake_size' | 'route_capacity' | 'siding_limit' | 'material_type' | 'priority';
  value: number | string;
  enabled: boolean;
  description: string;
}

export interface KPI {
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  status?: 'success' | 'warning' | 'error' | 'info';
}

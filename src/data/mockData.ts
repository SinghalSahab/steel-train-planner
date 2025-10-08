import { Order, Stockyard, Wagon, Rake, Route, Constraint, KPI } from '@/types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    orderNumber: 'PO-2024-1523',
    customer: 'Tata Steel Processing',
    destination: 'Mumbai Port',
    materialType: 'coil',
    quantity: 450,
    priority: 'critical',
    status: 'pending',
    dueDate: '2024-10-12',
    createdDate: '2024-10-01',
    notes: 'Urgent export order'
  },
  {
    id: 'ORD-002',
    orderNumber: 'PO-2024-1524',
    customer: 'JSW Steel Ltd',
    destination: 'Chennai Hub',
    materialType: 'plate',
    quantity: 320,
    priority: 'high',
    status: 'planned',
    dueDate: '2024-10-15',
    createdDate: '2024-10-02'
  },
  {
    id: 'ORD-003',
    orderNumber: 'PO-2024-1525',
    customer: 'SAIL Manufacturing',
    destination: 'Delhi NCR',
    materialType: 'billet',
    quantity: 580,
    priority: 'high',
    status: 'pending',
    dueDate: '2024-10-14',
    createdDate: '2024-10-03'
  },
  {
    id: 'ORD-004',
    orderNumber: 'PO-2024-1526',
    customer: 'Essar Steel',
    destination: 'Kolkata Yard',
    materialType: 'slab',
    quantity: 280,
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-10-18',
    createdDate: '2024-10-04'
  },
  {
    id: 'ORD-005',
    orderNumber: 'PO-2024-1527',
    customer: 'Jindal Steel',
    destination: 'Bangalore Depot',
    materialType: 'pipe',
    quantity: 195,
    priority: 'medium',
    status: 'loading',
    dueDate: '2024-10-16',
    createdDate: '2024-10-05'
  },
  {
    id: 'ORD-006',
    orderNumber: 'PO-2024-1528',
    customer: 'ArcelorMittal',
    destination: 'Hyderabad Hub',
    materialType: 'coil',
    quantity: 410,
    priority: 'low',
    status: 'pending',
    dueDate: '2024-10-20',
    createdDate: '2024-10-06'
  }
];

export const mockStockyards: Stockyard[] = [
  {
    id: 'SY-001',
    name: 'North Stockyard',
    location: 'Zone A',
    capacity: 5000,
    currentStock: 3200,
    materialType: 'coil',
    lastUpdated: '2024-10-08 14:30'
  },
  {
    id: 'SY-002',
    name: 'South Stockyard',
    location: 'Zone B',
    capacity: 4500,
    currentStock: 2850,
    materialType: 'plate',
    lastUpdated: '2024-10-08 14:25'
  },
  {
    id: 'SY-003',
    name: 'East Stockyard',
    location: 'Zone C',
    capacity: 6000,
    currentStock: 4100,
    materialType: 'billet',
    lastUpdated: '2024-10-08 14:35'
  },
  {
    id: 'SY-004',
    name: 'West Stockyard',
    location: 'Zone D',
    capacity: 3500,
    currentStock: 1900,
    materialType: 'slab',
    lastUpdated: '2024-10-08 14:20'
  }
];

export const mockWagons: Wagon[] = Array.from({ length: 45 }, (_, i) => ({
  id: `WGN-${String(i + 1).padStart(3, '0')}`,
  wagonNumber: `IR-${1000 + i}`,
  type: i % 3 === 0 ? 'BOXN' : i % 3 === 1 ? 'BCNA' : 'BRN',
  capacity: 60 + (i % 4) * 5,
  status: i < 15 ? 'idle' : i < 25 ? 'loading' : i < 40 ? 'in-transit' : 'maintenance',
  currentLocation: i < 15 ? 'Main Siding' : i < 25 ? 'Loading Bay' : undefined,
  lastMaintenance: `2024-${9 + (i % 2)}-${(i % 28) + 1}`
}));

export const mockRakes: Rake[] = [
  {
    id: 'RK-001',
    rakeNumber: 'RAKE-2024-101',
    wagons: mockWagons.slice(0, 10),
    status: 'forming',
    destination: 'Mumbai Port',
    totalCapacity: 600,
    currentLoad: 450,
    orders: ['ORD-001'],
    estimatedCost: 185000,
    createdDate: '2024-10-08'
  },
  {
    id: 'RK-002',
    rakeNumber: 'RAKE-2024-102',
    wagons: mockWagons.slice(10, 20),
    status: 'ready',
    destination: 'Chennai Hub',
    totalCapacity: 620,
    currentLoad: 620,
    orders: ['ORD-002'],
    estimatedCost: 210000,
    createdDate: '2024-10-07',
    dispatchDate: '2024-10-09'
  }
];

export const mockRoutes: Route[] = [
  {
    id: 'RT-001',
    name: 'Main Western Corridor',
    destination: 'Mumbai Port',
    distance: 1450,
    estimatedTime: 28,
    costPerTon: 420,
    isBlocked: false,
    capacity: 6
  },
  {
    id: 'RT-002',
    name: 'Southern Express',
    destination: 'Chennai Hub',
    distance: 980,
    estimatedTime: 20,
    costPerTon: 350,
    isBlocked: false,
    capacity: 8
  },
  {
    id: 'RT-003',
    name: 'Northern Link',
    destination: 'Delhi NCR',
    distance: 1200,
    estimatedTime: 24,
    costPerTon: 390,
    isBlocked: true,
    capacity: 5
  },
  {
    id: 'RT-004',
    name: 'Eastern Route',
    destination: 'Kolkata Yard',
    distance: 780,
    estimatedTime: 16,
    costPerTon: 310,
    isBlocked: false,
    capacity: 7
  }
];

export const mockConstraints: Constraint[] = [
  {
    id: 'CST-001',
    name: 'Minimum Rake Size',
    type: 'rake_size',
    value: 8,
    enabled: true,
    description: 'Minimum number of wagons per rake'
  },
  {
    id: 'CST-002',
    name: 'Route Capacity Limit',
    type: 'route_capacity',
    value: 6,
    enabled: true,
    description: 'Maximum rakes per route per day'
  },
  {
    id: 'CST-003',
    name: 'Siding Loading Capacity',
    type: 'siding_limit',
    value: 3,
    enabled: true,
    description: 'Maximum rakes loading simultaneously'
  },
  {
    id: 'CST-004',
    name: 'Priority Order First',
    type: 'priority',
    value: 'enabled',
    enabled: true,
    description: 'Critical orders must be planned first'
  }
];

export const mockKPIs: KPI[] = [
  {
    label: 'Active Orders',
    value: 6,
    status: 'info',
    trend: 'up',
    trendValue: 2
  },
  {
    label: 'Idle Wagons',
    value: 15,
    status: 'success',
    trend: 'down',
    trendValue: 3
  },
  {
    label: 'Rakes Forming',
    value: 2,
    status: 'warning',
    trend: 'neutral'
  },
  {
    label: 'Avg. Loading Time',
    value: '18.5',
    unit: 'hrs',
    status: 'success',
    trend: 'down',
    trendValue: 2.5
  },
  {
    label: 'Total Capacity Utilized',
    value: '68',
    unit: '%',
    status: 'success',
    trend: 'up',
    trendValue: 5
  },
  {
    label: 'Blocked Routes',
    value: 1,
    status: 'error',
    trend: 'neutral'
  }
];

export type DeviceType = 'phone' | 'tablet' | 'laptop' | 'tv' | 'smartwatch' | 'earbuds';

export interface Device {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  releaseDate: string;
  deviceType: DeviceType;
  
  // Display
  screenSize: number;
  resolution: string;
  refreshRate: number;
  displayType: string;
  
  // Performance
  processor: string;
  ram: number;
  storage: number[];
  
  // Camera (optional for non-camera devices)
  mainCamera?: number;
  ultraWide?: number;
  telephoto?: number;
  frontCamera?: number;
  
  // Battery
  batteryCapacity: number;
  chargingSpeed: number;
  wirelessCharging: boolean;
  
  // Build
  weight: number;
  waterResistance: string;
  
  // Software
  os: string;
  
  // Scores
  performanceScore: number;
  cameraScore: number;
  batteryScore: number;
  valueScore: number;
  overallScore: number;
  
  // Features
  features: string[];
}

export interface ComparisonCriteria {
  budget?: number;
  useCase?: string[];
  brand?: string[];
  deviceType?: DeviceType[];
  batteryPriority?: number;
  cameraPriority?: number;
  performancePriority?: number;
  storagePriority?: number;
}

export const deviceTypeLabels: Record<DeviceType, string> = {
  phone: 'Phones',
  tablet: 'Tablets',
  laptop: 'Laptops',
  tv: 'TVs',
  smartwatch: 'Smartwatches',
  earbuds: 'Earbuds'
};

export const deviceTypeIcons: Record<DeviceType, string> = {
  phone: 'Smartphone',
  tablet: 'Tablet',
  laptop: 'Laptop',
  tv: 'Tv',
  smartwatch: 'Watch',
  earbuds: 'Headphones'
};

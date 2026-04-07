export type ProfileStatus = 'Active' | 'Inactive' | 'Archived';
export type FuelType = 'Diesel' | 'Petrol' | 'Electric' | 'Hybrid' | 'CNG';
export type EngineType = 'Turbocharged' | 'Naturally Aspirated' | 'Electric Motor' | 'Hybrid Drive';

export interface VehicleProfileRow {
  id: number;
  type: string;
  category: string;
  subCategory: string;
  manufacturer: string;
  model: string;
  fuelType: FuelType;
  engineType: EngineType;
  vehicleCount: number;
  profileStatus: ProfileStatus;
  archived: boolean;
}

export const VEHICLE_PROFILES_MOCK: VehicleProfileRow[] = [
  { id: 1,  type: 'Bus',       category: 'Public Transport', subCategory: 'City Bus',        manufacturer: 'Volvo',       model: 'B8RLE',        fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 42,  profileStatus: 'Active',   archived: false },
  { id: 2,  type: 'Bus',       category: 'Public Transport', subCategory: 'Articulated',     manufacturer: 'Mercedes',    model: 'Citaro G',     fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 18,  profileStatus: 'Active',   archived: false },
  { id: 3,  type: 'Coach',     category: 'Long Distance',    subCategory: 'Intercity',       manufacturer: 'Scania',      model: 'Touring HD',   fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 11,  profileStatus: 'Active',   archived: false },
  { id: 4,  type: 'Minibus',   category: 'Shuttle',          subCategory: 'Airport Shuttle', manufacturer: 'Ford',        model: 'Transit 17',   fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 27,  profileStatus: 'Active',   archived: false },
  { id: 5,  type: 'Bus',       category: 'Public Transport', subCategory: 'Low Floor',       manufacturer: 'Yutong',      model: 'E12',          fuelType: 'Electric', engineType: 'Electric Motor',        vehicleCount: 15,  profileStatus: 'Active',   archived: false },
  { id: 6,  type: 'Coach',     category: 'Charter',          subCategory: 'VIP Coach',       manufacturer: 'Neoplan',     model: 'Cityliner',    fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 6,   profileStatus: 'Active',   archived: false },
  { id: 7,  type: 'Taxi',      category: 'Ride Hailing',     subCategory: 'Sedan',           manufacturer: 'Toyota',      model: 'Camry',        fuelType: 'Hybrid',   engineType: 'Hybrid Drive',          vehicleCount: 134, profileStatus: 'Active',   archived: false },
  { id: 8,  type: 'Taxi',      category: 'Ride Hailing',     subCategory: 'SUV',             manufacturer: 'Toyota',      model: 'Land Cruiser', fuelType: 'Petrol',   engineType: 'Naturally Aspirated',   vehicleCount: 48,  profileStatus: 'Active',   archived: false },
  { id: 9,  type: 'Van',       category: 'Logistics',        subCategory: 'Cargo Van',       manufacturer: 'Mercedes',    model: 'Sprinter 316', fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 33,  profileStatus: 'Active',   archived: false },
  { id: 10, type: 'Bus',       category: 'School',           subCategory: 'School Bus',      manufacturer: 'Hino',        model: 'S-Bus',        fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 22,  profileStatus: 'Active',   archived: false },
  { id: 11, type: 'Minibus',   category: 'Corporate',        subCategory: 'Staff Shuttle',   manufacturer: 'Toyota',      model: 'Coaster',      fuelType: 'Diesel',   engineType: 'Naturally Aspirated',   vehicleCount: 19,  profileStatus: 'Active',   archived: false },
  { id: 12, type: 'Bus',       category: 'Public Transport', subCategory: 'Double Decker',   manufacturer: 'Alexander',   model: 'Enviro500',    fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 8,   profileStatus: 'Inactive', archived: false },
  { id: 13, type: 'Coach',     category: 'Long Distance',    subCategory: 'Sleeper',         manufacturer: 'Scania',      model: 'Irizar i8',    fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 4,   profileStatus: 'Inactive', archived: false },
  { id: 14, type: 'Taxi',      category: 'Ride Hailing',     subCategory: 'Minivan',         manufacturer: 'Kia',         model: 'Carnival',     fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 21,  profileStatus: 'Active',   archived: false },
  { id: 15, type: 'Van',       category: 'Logistics',        subCategory: 'Refrigerated',    manufacturer: 'Ford',        model: 'Transit Ref',  fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 9,   profileStatus: 'Active',   archived: false },
  { id: 16, type: 'Bus',       category: 'Public Transport', subCategory: 'Midi Bus',        manufacturer: 'Optare',      model: 'Solo SR',      fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 14,  profileStatus: 'Active',   archived: false },
  { id: 17, type: 'Minibus',   category: 'Medical',          subCategory: 'Patient Transfer',manufacturer: 'Mercedes',    model: 'Vito 116',     fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 7,   profileStatus: 'Active',   archived: false },
  { id: 18, type: 'Bus',       category: 'Public Transport', subCategory: 'City Bus',        manufacturer: 'BYD',         model: 'K9',           fuelType: 'Electric', engineType: 'Electric Motor',        vehicleCount: 20,  profileStatus: 'Active',   archived: false },
  { id: 19, type: 'Coach',     category: 'Charter',          subCategory: 'Standard Coach',  manufacturer: 'Volvo',       model: 'B11R',         fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 13,  profileStatus: 'Inactive', archived: false },
  { id: 20, type: 'Taxi',      category: 'Ride Hailing',     subCategory: 'Sedan',           manufacturer: 'Hyundai',     model: 'Sonata',       fuelType: 'Hybrid',   engineType: 'Hybrid Drive',          vehicleCount: 56,  profileStatus: 'Active',   archived: false },
  { id: 21, type: 'Van',       category: 'Logistics',        subCategory: 'Cargo Van',       manufacturer: 'Volkswagen',  model: 'Crafter 35',   fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 17,  profileStatus: 'Active',   archived: false },
  { id: 22, type: 'Bus',       category: 'School',           subCategory: 'Mini School Bus', manufacturer: 'Toyota',      model: 'Coaster 30',   fuelType: 'CNG',      engineType: 'Naturally Aspirated',   vehicleCount: 11,  profileStatus: 'Archived', archived: true  },
  { id: 23, type: 'Minibus',   category: 'Shuttle',          subCategory: 'Hotel Shuttle',   manufacturer: 'Ford',        model: 'Transit 15',   fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 5,   profileStatus: 'Archived', archived: true  },
  { id: 24, type: 'Coach',     category: 'Long Distance',    subCategory: 'Express',         manufacturer: 'MAN',         model: 'Lion\'s Coach', fuelType: 'Diesel',  engineType: 'Turbocharged',          vehicleCount: 9,   profileStatus: 'Active',   archived: false },
  { id: 25, type: 'Taxi',      category: 'Ride Hailing',     subCategory: 'SUV',             manufacturer: 'Lexus',       model: 'LX 570',       fuelType: 'Petrol',   engineType: 'Naturally Aspirated',   vehicleCount: 12,  profileStatus: 'Active',   archived: false },
  { id: 26, type: 'Bus',       category: 'Public Transport', subCategory: 'Articulated',     manufacturer: 'Solaris',     model: 'Urbino 18',    fuelType: 'Electric', engineType: 'Electric Motor',        vehicleCount: 10,  profileStatus: 'Active',   archived: false },
  { id: 27, type: 'Van',       category: 'Logistics',        subCategory: 'Flatbed',         manufacturer: 'Isuzu',       model: 'N-Series',     fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 6,   profileStatus: 'Inactive', archived: false },
  { id: 28, type: 'Minibus',   category: 'Corporate',        subCategory: 'Executive',       manufacturer: 'Mercedes',    model: 'V-Class 250',  fuelType: 'Diesel',   engineType: 'Turbocharged',          vehicleCount: 8,   profileStatus: 'Active',   archived: false },
];

export const PROFILE_TYPES   = ['All Types',        'Bus', 'Coach', 'Minibus', 'Taxi', 'Van'];
export const CATEGORIES       = ['All Categories',   'Public Transport', 'Long Distance', 'Shuttle', 'Charter', 'Ride Hailing', 'Logistics', 'School', 'Corporate', 'Medical'];
export const FUEL_TYPES       = ['All Fuel Types',   'Diesel', 'Petrol', 'Electric', 'Hybrid', 'CNG'];
export const PROFILE_STATUSES = ['All Statuses',     'Active', 'Inactive', 'Archived'];

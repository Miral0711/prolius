export type ProfileStatus = 'Active' | 'Inactive';

export interface AssetProfileRow {
  id: number;
  type: string;
  category: string;
  subCategory: string;
  manufacturer: string;
  model: string;
  fuelType: string;
  engineType: string;
  assetCount: number;
  profileStatus: ProfileStatus;
}

export interface AssetProfileDetail extends AssetProfileRow {
  odometerSetting: string;
  co2gkm: string;
  adrTestInterval: string;
  corrosionInspectionInterval: string;
  ladenBrakeTestInterval: string;
  majorWheelServiceInterval: string;
  pmiInterval: string;
  rubberIntegrityTestInterval: string;
  serviceFrequency: string;
  tankTestInterval: string;
  takeOutReturnDefects: string[];
  adHocDefects: string[];
  images: {
    backView: string | null;
    frontView: string | null;
    leftView: string | null;
    rightView: string | null;
  };
}

export const ASSET_PROFILE_DETAIL_MOCK: AssetProfileDetail = {
  id: 1,
  type: 'Amines Tank',
  category: 'Trailers',
  subCategory: 'Large trailer',
  manufacturer: 'Commercial',
  model: 'Magnor',
  fuelType: 'NA',
  engineType: 'NA',
  assetCount: 1,
  profileStatus: 'Active',
  odometerSetting: 'NA',
  co2gkm: '',
  adrTestInterval: '12 months',
  corrosionInspectionInterval: '6 months',
  ladenBrakeTestInterval: '6 weeks',
  majorWheelServiceInterval: '12 months',
  pmiInterval: '6 weeks',
  rubberIntegrityTestInterval: 'none',
  serviceFrequency: '12 months',
  tankTestInterval: '36 months',
  takeOutReturnDefects: [
    'Trailer Coupling and Security - Safety Clip',
    'Trailer Coupling and Security - 5th Wheel',
    'Trailer Coupling and Security - Landing Legs',
    'Trailer Coupling and Security - Winding Handle',
    'Trailer Electrical Coupling',
    'Trailer Air Coupling',
    'Trailer Twist Locks',
    'Trailer Brakes',
    'Trailer Leaks',
    'Trailer Tanker Washout',
    'Trailer Rear Lights',
    'Trailer Brake Lights',
    'Trailer Reversing Lights',
    'Trailer Fog Lights',
    'Trailer Marker Lights',
    'Trailer Reflectors',
    'Trailer Number Plate Lights',
    'Trailer Indicators and Hazard',
    'Trailer Wheels and Tyres',
    'Trailer Wings and Spray - Suspension',
    'Trailer Wings and Spray - Underrun Bar',
    'Trailer Wings and Spray - Safeguard',
    'Trailer Ladders',
    'Trailer Handrails',
    'Trailer Catwalks',
    'Tanker/Body Shell',
    'Trailer Valves, Gauges and Man Lids - Leakages',
    'Trailer Valves - Pressure Release Valve',
    'Trailer Valves - Pressure Gauge',
    'Trailer Valves - Non Return Valves',
    'Trailer Valves - Control Valves',
    'Trailer Valves - Foot Valve',
    'Trailer Valves - Saunders/Butterfly Valve',
    'Equipment - Vapour Return Pipe',
    'Trailer Manifold',
    'Trailer Inlet Pipe',
    'Trailer Outlet Pipe',
    'Trailer Hose Rack',
    'Trailer Hoses Straps',
    'Trailer Hoses',
    'Trailer Hose Numbers',
    'Trailer Hose Test Tag',
    'Trailer Fire Extinguisher - Pin and Seal',
    'Trailer Fire Extinguisher',
    'Trailer Plate Certificate',
    'Trailer ADR Certificate',
    'Trailer Kemler Boards',
    'Trailer Haz Board',
    'Trailer UN Numbers',
    'Additional Trailer Defects',
  ],
  adHocDefects: [],
  images: {
    backView: null,
    frontView: null,
    leftView: null,
    rightView: null,
  },
};

export const ASSET_PROFILES_MOCK: AssetProfileRow[] = [
  { id: 1,  type: 'Amines Tank',        category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Magnor',           fuelType: 'NA', engineType: 'NA', assetCount: 1,  profileStatus: 'Active' },
  { id: 2,  type: 'Curtain Slider',     category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Schmitz/M&G',      fuelType: 'NA', engineType: 'NA', assetCount: 2,  profileStatus: 'Active' },
  { id: 3,  type: 'HAULIER 12 WEEKS',   category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'SKELLY',           fuelType: 'NA', engineType: 'NA', assetCount: 2,  profileStatus: 'Active' },
  { id: 4,  type: 'HYPO Tank',          category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Clayton/Lakeland', fuelType: 'NA', engineType: 'NA', assetCount: 17, profileStatus: 'Active' },
  { id: 5,  type: 'Iso Tank - RL',      category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Van Hool/UBH',     fuelType: 'NA', engineType: 'NA', assetCount: 7,  profileStatus: 'Active' },
  { id: 6,  type: 'Iso Tank - ST',      category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'UBH',              fuelType: 'NA', engineType: 'NA', assetCount: 7,  profileStatus: 'Active' },
  { id: 7,  type: 'Low Loader',         category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Andover',          fuelType: 'NA', engineType: 'NA', assetCount: 1,  profileStatus: 'Active' },
  { id: 8,  type: 'Powder Tank',        category: 'Trailers', subCategory: 'Small trailer', manufacturer: 'Commercial',  model: 'Spitzer',          fuelType: 'NA', engineType: 'NA', assetCount: 3,  profileStatus: 'Active' },
  { id: 9,  type: 'Rubber Lined Tank',  category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Clayton/Lakeland', fuelType: 'NA', engineType: 'NA', assetCount: 22, profileStatus: 'Active' },
  { id: 10, type: 'Skelly',             category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Dennison',         fuelType: 'NA', engineType: 'NA', assetCount: 15, profileStatus: 'Active' },
  { id: 11, type: 'ST45',               category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'TCI TANKERS', model: 'STAINLESS',        fuelType: 'NA', engineType: 'NA', assetCount: 0,  profileStatus: 'Active' },
  { id: 12, type: 'Stainless Steel Tank',category:'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Magyar/Clayton',   fuelType: 'NA', engineType: 'NA', assetCount: 55, profileStatus: 'Active' },
  { id: 13, type: 'Tipper',             category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Crane Fruehauf/GEN',fuelType:'NA', engineType: 'NA', assetCount: 3,  profileStatus: 'Active' },
  { id: 14, type: 'Trailer',            category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Flat Bed',         fuelType: 'NA', engineType: 'NA', assetCount: 1,  profileStatus: 'Active' },
  { id: 15, type: 'Trailer - 12 Weeks', category: 'Trailers', subCategory: 'Large trailer', manufacturer: 'Commercial',  model: 'Schmitz/M&G',      fuelType: 'NA', engineType: 'NA', assetCount: 1,  profileStatus: 'Active' },
];

export type AssetDefectStatus =
  | 'Reported'
  | 'Acknowledged'
  | 'Duplicate'
  | 'Resolved'
  | 'Repair Rejected';

export type AssetDefectCategory =
  | 'Structural'
  | 'Electrical'
  | 'Mechanical'
  | 'Safety Equipment'
  | 'Hydraulics'
  | 'Pneumatics'
  | 'Body & Frame'
  | 'Fuel System';

export interface AssetDefectRow {
  id: number;
  date: string;
  assetNumber: string;
  defectId: string;
  category: AssetDefectCategory;
  defect: string;
  allocatedTo: string;
  defectStatus: AssetDefectStatus;
  lastModified: string;
  createdBy: string;
  region: string;
  division: string;
  archived: boolean;
}

export const ASSET_DEFECTS_MOCK: AssetDefectRow[] = [
  { id: 1,  date: '07/04/2026 08:30', assetNumber: 'AST-1001', defectId: 'ADF-4401', category: 'Structural',       defect: 'Main frame weld crack detected at joint A4',        allocatedTo: 'Workshop A', defectStatus: 'Reported',        lastModified: '07/04/2026 08:30', createdBy: 'Ahmed Al-Otaibi',   region: 'Riyadh',           division: 'North Depot',    archived: false },
  { id: 2,  date: '07/04/2026 07:55', assetNumber: 'AST-1002', defectId: 'ADF-4400', category: 'Electrical',       defect: 'Control panel display unit unresponsive',           allocatedTo: 'Workshop B', defectStatus: 'Acknowledged',    lastModified: '07/04/2026 09:15', createdBy: 'Sultan Al-Rashid',  region: 'Jeddah',           division: 'Jeddah Hub',     archived: false },
  { id: 3,  date: '07/04/2026 07:20', assetNumber: 'AST-1003', defectId: 'ADF-4399', category: 'Mechanical',       defect: 'Drive shaft bearing worn — excessive vibration',    allocatedTo: 'Workshop A', defectStatus: 'Resolved',        lastModified: '07/04/2026 11:40', createdBy: 'Khalid Al-Mutairi', region: 'Riyadh',           division: 'South Depot',    archived: false },
  { id: 4,  date: '06/04/2026 18:45', assetNumber: 'AST-1004', defectId: 'ADF-4398', category: 'Safety Equipment', defect: 'Emergency stop button jammed — not releasing',      allocatedTo: 'Workshop C', defectStatus: 'Repair Rejected', lastModified: '06/04/2026 20:10', createdBy: 'Faisal Al-Dosari',  region: 'Eastern Province', division: 'Dammam Depot',   archived: false },
  { id: 5,  date: '06/04/2026 17:15', assetNumber: 'AST-1005', defectId: 'ADF-4397', category: 'Hydraulics',       defect: 'Hydraulic cylinder seal leaking under load',        allocatedTo: 'Workshop B', defectStatus: 'Duplicate',       lastModified: '06/04/2026 17:50', createdBy: 'Nora Al-Qahtani',   region: 'Makkah',           division: 'Makkah Central', archived: false },
  { id: 6,  date: '06/04/2026 16:00', assetNumber: 'AST-1006', defectId: 'ADF-4396', category: 'Pneumatics',       defect: 'Air compressor pressure drop — valve fault',        allocatedTo: 'Workshop A', defectStatus: 'Reported',        lastModified: '06/04/2026 16:00', createdBy: 'Omar Al-Harbi',     region: 'Madinah',          division: 'Madinah North',  archived: false },
  { id: 7,  date: '06/04/2026 14:45', assetNumber: 'AST-1007', defectId: 'ADF-4395', category: 'Body & Frame',     defect: 'Side panel buckled — impact damage from loading',   allocatedTo: 'Workshop C', defectStatus: 'Acknowledged',    lastModified: '06/04/2026 15:35', createdBy: 'Layla Al-Zahrani',  region: 'Riyadh',           division: 'East Riyadh',    archived: false },
  { id: 8,  date: '06/04/2026 13:30', assetNumber: 'AST-1008', defectId: 'ADF-4394', category: 'Fuel System',      defect: 'Fuel line chafing against chassis — risk of leak',  allocatedTo: 'Workshop B', defectStatus: 'Resolved',        lastModified: '06/04/2026 16:05', createdBy: 'Ahmed Al-Otaibi',   region: 'Jeddah',           division: 'Jeddah South',   archived: false },
  { id: 9,  date: '06/04/2026 12:05', assetNumber: 'AST-1009', defectId: 'ADF-4393', category: 'Structural',       defect: 'Mounting bracket cracked at rear axle point',       allocatedTo: 'Workshop A', defectStatus: 'Repair Rejected', lastModified: '06/04/2026 14:25', createdBy: 'Sultan Al-Rashid',  region: 'Riyadh',           division: 'North Depot',    archived: false },
  { id: 10, date: '06/04/2026 10:50', assetNumber: 'AST-1010', defectId: 'ADF-4392', category: 'Electrical',       defect: 'Wiring harness short circuit — intermittent fault', allocatedTo: 'Workshop C', defectStatus: 'Reported',        lastModified: '06/04/2026 10:50', createdBy: 'Khalid Al-Mutairi', region: 'Eastern Province', division: 'Al Khobar',      archived: false },
  { id: 11, date: '06/04/2026 09:35', assetNumber: 'AST-1011', defectId: 'ADF-4391', category: 'Mechanical',       defect: 'Gearbox oil seal failure — oil seeping externally', allocatedTo: 'Workshop B', defectStatus: 'Acknowledged',    lastModified: '06/04/2026 10:20', createdBy: 'Faisal Al-Dosari',  region: 'Riyadh',           division: 'West Riyadh',    archived: false },
  { id: 12, date: '05/04/2026 17:20', assetNumber: 'AST-1012', defectId: 'ADF-4390', category: 'Safety Equipment', defect: 'Fire suppression system pressure below threshold',  allocatedTo: 'Workshop A', defectStatus: 'Resolved',        lastModified: '05/04/2026 19:05', createdBy: 'Nora Al-Qahtani',   region: 'Makkah',           division: 'Makkah East',    archived: false },
  { id: 13, date: '05/04/2026 15:05', assetNumber: 'AST-1013', defectId: 'ADF-4389', category: 'Hydraulics',       defect: 'Lift arm hydraulic hose burst under pressure',      allocatedTo: 'Workshop C', defectStatus: 'Reported',        lastModified: '05/04/2026 15:05', createdBy: 'Omar Al-Harbi',     region: 'Madinah',          division: 'Madinah South',  archived: false },
  { id: 14, date: '05/04/2026 12:50', assetNumber: 'AST-1014', defectId: 'ADF-4388', category: 'Pneumatics',       defect: 'Brake actuator air leak — reduced braking force',  allocatedTo: 'Workshop B', defectStatus: 'Duplicate',       lastModified: '05/04/2026 13:25', createdBy: 'Layla Al-Zahrani',  region: 'Riyadh',           division: 'North Depot',    archived: true  },
  { id: 15, date: '05/04/2026 10:35', assetNumber: 'AST-1015', defectId: 'ADF-4387', category: 'Body & Frame',     defect: 'Roof panel corrosion — structural integrity risk',  allocatedTo: 'Workshop A', defectStatus: 'Repair Rejected', lastModified: '05/04/2026 11:55', createdBy: 'Ahmed Al-Otaibi',   region: 'Jeddah',           division: 'Jeddah Hub',     archived: true  },
  { id: 16, date: '05/04/2026 08:20', assetNumber: 'AST-1016', defectId: 'ADF-4386', category: 'Structural',       defect: 'Outrigger pad cracked — stability concern',         allocatedTo: 'Workshop C', defectStatus: 'Resolved',        lastModified: '05/04/2026 11:50', createdBy: 'Sultan Al-Rashid',  region: 'Eastern Province', division: 'Dammam Depot',   archived: false },
  { id: 17, date: '04/04/2026 18:50', assetNumber: 'AST-1017', defectId: 'ADF-4385', category: 'Electrical',       defect: 'Battery management system fault code active',       allocatedTo: 'Workshop B', defectStatus: 'Acknowledged',    lastModified: '04/04/2026 19:35', createdBy: 'Khalid Al-Mutairi', region: 'Riyadh',           division: 'South Depot',    archived: false },
  { id: 18, date: '04/04/2026 16:35', assetNumber: 'AST-1018', defectId: 'ADF-4384', category: 'Fuel System',      defect: 'Injector pump delivering inconsistent fuel flow',   allocatedTo: 'Workshop A', defectStatus: 'Reported',        lastModified: '04/04/2026 16:35', createdBy: 'Faisal Al-Dosari',  region: 'Makkah',           division: 'Makkah Central', archived: false },
  { id: 19, date: '04/04/2026 14:20', assetNumber: 'AST-1019', defectId: 'ADF-4383', category: 'Mechanical',       defect: 'Conveyor belt tension spring snapped',              allocatedTo: 'Workshop C', defectStatus: 'Resolved',        lastModified: '04/04/2026 17:15', createdBy: 'Nora Al-Qahtani',   region: 'Madinah',          division: 'Madinah North',  archived: false },
  { id: 20, date: '04/04/2026 12:05', assetNumber: 'AST-1020', defectId: 'ADF-4382', category: 'Safety Equipment', defect: 'Seatbelt retractor mechanism seized',                allocatedTo: 'Workshop B', defectStatus: 'Acknowledged',    lastModified: '04/04/2026 13:05', createdBy: 'Omar Al-Harbi',     region: 'Riyadh',           division: 'East Riyadh',    archived: false },
  { id: 21, date: '04/04/2026 09:50', assetNumber: 'AST-1021', defectId: 'ADF-4381', category: 'Hydraulics',       defect: 'Steering ram internal bypass — loss of assist',     allocatedTo: 'Workshop A', defectStatus: 'Repair Rejected', lastModified: '04/04/2026 11:35', createdBy: 'Layla Al-Zahrani',  region: 'Jeddah',           division: 'Jeddah South',   archived: true  },
  { id: 22, date: '03/04/2026 18:10', assetNumber: 'AST-1022', defectId: 'ADF-4380', category: 'Pneumatics',       defect: 'Air dryer cartridge saturated — replace required',  allocatedTo: 'Workshop C', defectStatus: 'Resolved',        lastModified: '03/04/2026 20:05', createdBy: 'Ahmed Al-Otaibi',   region: 'Eastern Province', division: 'Al Khobar',      archived: false },
  { id: 23, date: '03/04/2026 15:55', assetNumber: 'AST-1023', defectId: 'ADF-4379', category: 'Body & Frame',     defect: 'Undercarriage cross-member bent — impact damage',   allocatedTo: 'Workshop B', defectStatus: 'Duplicate',       lastModified: '03/04/2026 16:25', createdBy: 'Sultan Al-Rashid',  region: 'Riyadh',           division: 'West Riyadh',    archived: false },
  { id: 24, date: '03/04/2026 13:40', assetNumber: 'AST-1024', defectId: 'ADF-4378', category: 'Electrical',       defect: 'Alternator output voltage fluctuating under load',  allocatedTo: 'Workshop A', defectStatus: 'Reported',        lastModified: '03/04/2026 13:40', createdBy: 'Khalid Al-Mutairi', region: 'Makkah',           division: 'Makkah East',    archived: false },
  { id: 25, date: '03/04/2026 11:25', assetNumber: 'AST-1025', defectId: 'ADF-4377', category: 'Mechanical',       defect: 'PTO shaft universal joint worn — clunking noise',   allocatedTo: 'Workshop C', defectStatus: 'Acknowledged',    lastModified: '03/04/2026 12:20', createdBy: 'Faisal Al-Dosari',  region: 'Madinah',          division: 'Madinah South',  archived: false },
];

export const DEFECT_STATUSES: AssetDefectStatus[] = [
  'Reported', 'Acknowledged', 'Duplicate', 'Resolved', 'Repair Rejected',
];
export const DEFECT_CATEGORIES: AssetDefectCategory[] = [
  'Structural', 'Electrical', 'Mechanical', 'Safety Equipment',
  'Hydraulics', 'Pneumatics', 'Body & Frame', 'Fuel System',
];
export const ALLOCATED_TO_OPTIONS = [
  'All Workshops', 'Workshop A', 'Workshop B', 'Workshop C',
];
export const CREATED_BY_OPTIONS = [
  'All Users', 'Ahmed Al-Otaibi', 'Sultan Al-Rashid', 'Khalid Al-Mutairi',
  'Faisal Al-Dosari', 'Nora Al-Qahtani', 'Omar Al-Harbi', 'Layla Al-Zahrani',
];
export const REGIONS = [
  'All Regions', 'Riyadh', 'Jeddah', 'Eastern Province', 'Makkah', 'Madinah',
];
export const DIVISIONS = [
  'All Divisions', 'North Depot', 'South Depot', 'East Riyadh', 'West Riyadh',
  'Jeddah Hub', 'Jeddah South', 'Dammam Depot', 'Al Khobar',
  'Makkah Central', 'Makkah East', 'Madinah North', 'Madinah South',
];

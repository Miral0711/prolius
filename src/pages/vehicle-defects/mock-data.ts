export type DefectStatus =
  | 'Reported'
  | 'Acknowledged'
  | 'Duplicate'
  | 'Resolved'
  | 'Repair Rejected';

export type DefectCategory =
  | 'Brakes'
  | 'Tyres'
  | 'Lights'
  | 'Engine'
  | 'Body'
  | 'Steering'
  | 'Electrical'
  | 'Fuel System';

export interface VehicleDefectRow {
  id: number;
  date: string;
  registration: string;
  defectId: string;
  category: DefectCategory;
  defect: string;
  allocatedTo: string;
  defectStatus: DefectStatus;
  lastModified: string;
  createdBy: string;
  region: string;
  division: string;
  archived: boolean;
}

export const VEHICLE_DEFECTS_MOCK: VehicleDefectRow[] = [
  { id: 1,  date: '07/04/2026 08:22', registration: 'ABC 1234', defectId: 'DEF-2201', category: 'Brakes',       defect: 'Brake pads worn below minimum thickness',        allocatedTo: 'Workshop A',       defectStatus: 'Reported',        lastModified: '07/04/2026 08:22', createdBy: 'Ahmed Al-Otaibi',   region: 'Riyadh',           division: 'North Depot',    archived: false },
  { id: 2,  date: '07/04/2026 07:50', registration: 'DEF 5678', defectId: 'DEF-2200', category: 'Tyres',        defect: 'Front left tyre tread depth below legal limit',  allocatedTo: 'Workshop B',       defectStatus: 'Acknowledged',    lastModified: '07/04/2026 09:10', createdBy: 'Sultan Al-Rashid',  region: 'Jeddah',           division: 'Jeddah Hub',     archived: false },
  { id: 3,  date: '07/04/2026 07:15', registration: 'GHI 9012', defectId: 'DEF-2199', category: 'Lights',       defect: 'Nearside headlight not functioning',              allocatedTo: 'Workshop A',       defectStatus: 'Resolved',        lastModified: '07/04/2026 11:30', createdBy: 'Khalid Al-Mutairi', region: 'Riyadh',           division: 'South Depot',    archived: false },
  { id: 4,  date: '06/04/2026 18:40', registration: 'JKL 3456', defectId: 'DEF-2198', category: 'Engine',       defect: 'Engine oil leak detected at sump gasket',        allocatedTo: 'Workshop C',       defectStatus: 'Repair Rejected', lastModified: '06/04/2026 20:05', createdBy: 'Faisal Al-Dosari',  region: 'Eastern Province', division: 'Dammam Depot',   archived: false },
  { id: 5,  date: '06/04/2026 17:10', registration: 'MNO 7890', defectId: 'DEF-2197', category: 'Body',         defect: 'Rear bumper cracked and partially detached',      allocatedTo: 'Workshop B',       defectStatus: 'Duplicate',       lastModified: '06/04/2026 17:45', createdBy: 'Nora Al-Qahtani',   region: 'Makkah',           division: 'Makkah Central', archived: false },
  { id: 6,  date: '06/04/2026 16:05', registration: 'PQR 1122', defectId: 'DEF-2196', category: 'Steering',     defect: 'Excessive play in steering wheel',                allocatedTo: 'Workshop A',       defectStatus: 'Reported',        lastModified: '06/04/2026 16:05', createdBy: 'Omar Al-Harbi',     region: 'Madinah',          division: 'Madinah North',  archived: false },
  { id: 7,  date: '06/04/2026 14:50', registration: 'STU 4433', defectId: 'DEF-2195', category: 'Electrical',   defect: 'Dashboard warning light — ABS fault',             allocatedTo: 'Workshop C',       defectStatus: 'Acknowledged',    lastModified: '06/04/2026 15:30', createdBy: 'Layla Al-Zahrani',  region: 'Riyadh',           division: 'East Riyadh',    archived: false },
  { id: 8,  date: '06/04/2026 13:35', registration: 'VWX 6677', defectId: 'DEF-2194', category: 'Fuel System',  defect: 'Fuel cap missing, risk of contamination',         allocatedTo: 'Workshop B',       defectStatus: 'Resolved',        lastModified: '06/04/2026 16:00', createdBy: 'Ahmed Al-Otaibi',   region: 'Jeddah',           division: 'Jeddah South',   archived: false },
  { id: 9,  date: '06/04/2026 12:10', registration: 'YZA 8899', defectId: 'DEF-2193', category: 'Brakes',       defect: 'Rear brake caliper seized',                       allocatedTo: 'Workshop A',       defectStatus: 'Repair Rejected', lastModified: '06/04/2026 14:20', createdBy: 'Sultan Al-Rashid',  region: 'Riyadh',           division: 'North Depot',    archived: false },
  { id: 10, date: '06/04/2026 10:55', registration: 'BCD 2233', defectId: 'DEF-2192', category: 'Tyres',        defect: 'Rear right tyre sidewall bulge',                  allocatedTo: 'Workshop C',       defectStatus: 'Reported',        lastModified: '06/04/2026 10:55', createdBy: 'Khalid Al-Mutairi', region: 'Eastern Province', division: 'Al Khobar',      archived: false },
  { id: 11, date: '06/04/2026 09:40', registration: 'EFG 4455', defectId: 'DEF-2191', category: 'Lights',       defect: 'Brake light inoperative — offside rear',          allocatedTo: 'Workshop B',       defectStatus: 'Acknowledged',    lastModified: '06/04/2026 10:15', createdBy: 'Faisal Al-Dosari',  region: 'Riyadh',           division: 'West Riyadh',    archived: false },
  { id: 12, date: '05/04/2026 17:25', registration: 'HIJ 6677', defectId: 'DEF-2190', category: 'Engine',       defect: 'Coolant level critically low, overheating risk',  allocatedTo: 'Workshop A',       defectStatus: 'Resolved',        lastModified: '05/04/2026 19:00', createdBy: 'Nora Al-Qahtani',   region: 'Makkah',           division: 'Makkah East',    archived: false },
  { id: 13, date: '05/04/2026 15:15', registration: 'KLM 8899', defectId: 'DEF-2189', category: 'Body',         defect: 'Windscreen crack in driver\'s line of sight',     allocatedTo: 'Workshop C',       defectStatus: 'Reported',        lastModified: '05/04/2026 15:15', createdBy: 'Omar Al-Harbi',     region: 'Madinah',          division: 'Madinah South',  archived: false },
  { id: 14, date: '05/04/2026 13:00', registration: 'NOP 1122', defectId: 'DEF-2188', category: 'Steering',     defect: 'Power steering fluid leak',                       allocatedTo: 'Workshop B',       defectStatus: 'Duplicate',       lastModified: '05/04/2026 13:30', createdBy: 'Layla Al-Zahrani',  region: 'Riyadh',           division: 'North Depot',    archived: true  },
  { id: 15, date: '05/04/2026 10:45', registration: 'QRS 3344', defectId: 'DEF-2187', category: 'Electrical',   defect: 'Wiper motor failure — no front wipe',             allocatedTo: 'Workshop A',       defectStatus: 'Repair Rejected', lastModified: '05/04/2026 12:00', createdBy: 'Ahmed Al-Otaibi',   region: 'Jeddah',           division: 'Jeddah Hub',     archived: true  },
  { id: 16, date: '05/04/2026 08:30', registration: 'TUV 5566', defectId: 'DEF-2186', category: 'Brakes',       defect: 'Handbrake cable snapped',                         allocatedTo: 'Workshop C',       defectStatus: 'Resolved',        lastModified: '05/04/2026 11:45', createdBy: 'Sultan Al-Rashid',  region: 'Eastern Province', division: 'Dammam Depot',   archived: false },
  { id: 17, date: '04/04/2026 18:55', registration: 'WXY 7788', defectId: 'DEF-2185', category: 'Tyres',        defect: 'Spare tyre missing from vehicle',                 allocatedTo: 'Workshop B',       defectStatus: 'Acknowledged',    lastModified: '04/04/2026 19:30', createdBy: 'Khalid Al-Mutairi', region: 'Riyadh',           division: 'South Depot',    archived: false },
  { id: 18, date: '04/04/2026 16:40', registration: 'ZAB 9900', defectId: 'DEF-2184', category: 'Fuel System',  defect: 'Diesel injector fault — rough idle',              allocatedTo: 'Workshop A',       defectStatus: 'Reported',        lastModified: '04/04/2026 16:40', createdBy: 'Faisal Al-Dosari',  region: 'Makkah',           division: 'Makkah Central', archived: false },
  { id: 19, date: '04/04/2026 14:25', registration: 'CDE 1234', defectId: 'DEF-2183', category: 'Lights',       defect: 'Interior passenger lighting strip failed',        allocatedTo: 'Workshop C',       defectStatus: 'Resolved',        lastModified: '04/04/2026 17:10', createdBy: 'Nora Al-Qahtani',   region: 'Madinah',          division: 'Madinah North',  archived: false },
  { id: 20, date: '04/04/2026 12:10', registration: 'FGH 5678', defectId: 'DEF-2182', category: 'Body',         defect: 'Door seal damaged — water ingress reported',      allocatedTo: 'Workshop B',       defectStatus: 'Acknowledged',    lastModified: '04/04/2026 13:00', createdBy: 'Omar Al-Harbi',     region: 'Riyadh',           division: 'East Riyadh',    archived: false },
  { id: 21, date: '04/04/2026 09:55', registration: 'IJK 9012', defectId: 'DEF-2181', category: 'Engine',       defect: 'Turbocharger boost pressure low',                 allocatedTo: 'Workshop A',       defectStatus: 'Repair Rejected', lastModified: '04/04/2026 11:30', createdBy: 'Layla Al-Zahrani',  region: 'Jeddah',           division: 'Jeddah South',   archived: true  },
  { id: 22, date: '03/04/2026 18:15', registration: 'LMN 3456', defectId: 'DEF-2180', category: 'Brakes',       defect: 'Brake fluid level low — top-up required',         allocatedTo: 'Workshop C',       defectStatus: 'Resolved',        lastModified: '03/04/2026 20:00', createdBy: 'Ahmed Al-Otaibi',   region: 'Eastern Province', division: 'Al Khobar',      archived: false },
  { id: 23, date: '03/04/2026 16:00', registration: 'OPQ 7890', defectId: 'DEF-2179', category: 'Steering',     defect: 'Steering column rattle at low speed',             allocatedTo: 'Workshop B',       defectStatus: 'Duplicate',       lastModified: '03/04/2026 16:30', createdBy: 'Sultan Al-Rashid',  region: 'Riyadh',           division: 'West Riyadh',    archived: false },
  { id: 24, date: '03/04/2026 13:45', registration: 'RST 1122', defectId: 'DEF-2178', category: 'Electrical',   defect: 'Battery voltage dropping — charging fault',       allocatedTo: 'Workshop A',       defectStatus: 'Reported',        lastModified: '03/04/2026 13:45', createdBy: 'Khalid Al-Mutairi', region: 'Makkah',           division: 'Makkah East',    archived: false },
  { id: 25, date: '03/04/2026 11:30', registration: 'UVW 4433', defectId: 'DEF-2177', category: 'Tyres',        defect: 'Front axle tyre pressure 20% below spec',         allocatedTo: 'Workshop C',       defectStatus: 'Acknowledged',    lastModified: '03/04/2026 12:15', createdBy: 'Faisal Al-Dosari',  region: 'Madinah',          division: 'Madinah South',  archived: false },
];

export const DEFECT_STATUSES: DefectStatus[] = [
  'Reported', 'Acknowledged', 'Duplicate', 'Resolved', 'Repair Rejected',
];
export const DEFECT_CATEGORIES: DefectCategory[] = [
  'Brakes', 'Tyres', 'Lights', 'Engine', 'Body', 'Steering', 'Electrical', 'Fuel System',
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

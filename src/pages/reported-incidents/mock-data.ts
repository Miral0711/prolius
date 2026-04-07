export type IncidentStatus =
  | 'Reported'
  | 'Under Review'
  | 'Pending'
  | 'Resolved'
  | 'Closed'
  | 'Archived';

export type IncidentType =
  | 'Collision'
  | 'Near Miss'
  | 'Passenger Injury'
  | 'Vehicle Damage'
  | 'Road Hazard'
  | 'Driver Misconduct'
  | 'Mechanical Failure'
  | 'Theft';

export interface ReportedIncidentRow {
  id: number;
  date: string;
  registration: string;
  incidentId: string;
  incidentDate: string;
  incidentType: IncidentType;
  allocatedTo: string;
  incidentStatus: IncidentStatus;
  createdBy: string;
  region: string;
  division: string;
  archived: boolean;
}

export const REPORTED_INCIDENTS_MOCK: ReportedIncidentRow[] = [
  { id: 1,  date: '07/04/2026 09:10', registration: 'ABC 1234', incidentId: 'INC-3301', incidentDate: '07/04/2026', incidentType: 'Collision',          allocatedTo: 'Safety Team A', incidentStatus: 'Reported',      createdBy: 'Ahmed Al-Otaibi',   region: 'Riyadh',           division: 'North Depot',    archived: false },
  { id: 2,  date: '07/04/2026 08:45', registration: 'DEF 5678', incidentId: 'INC-3300', incidentDate: '07/04/2026', incidentType: 'Near Miss',          allocatedTo: 'Safety Team B', incidentStatus: 'Under Review',  createdBy: 'Sultan Al-Rashid',  region: 'Jeddah',           division: 'Jeddah Hub',     archived: false },
  { id: 3,  date: '06/04/2026 19:20', registration: 'GHI 9012', incidentId: 'INC-3299', incidentDate: '06/04/2026', incidentType: 'Passenger Injury',   allocatedTo: 'Safety Team A', incidentStatus: 'Pending',       createdBy: 'Khalid Al-Mutairi', region: 'Riyadh',           division: 'South Depot',    archived: false },
  { id: 4,  date: '06/04/2026 17:55', registration: 'JKL 3456', incidentId: 'INC-3298', incidentDate: '06/04/2026', incidentType: 'Vehicle Damage',     allocatedTo: 'Safety Team C', incidentStatus: 'Resolved',      createdBy: 'Faisal Al-Dosari',  region: 'Eastern Province', division: 'Dammam Depot',   archived: false },
  { id: 5,  date: '06/04/2026 16:30', registration: 'MNO 7890', incidentId: 'INC-3297', incidentDate: '06/04/2026', incidentType: 'Road Hazard',        allocatedTo: 'Safety Team B', incidentStatus: 'Closed',        createdBy: 'Nora Al-Qahtani',   region: 'Makkah',           division: 'Makkah Central', archived: false },
  { id: 6,  date: '06/04/2026 15:05', registration: 'PQR 1122', incidentId: 'INC-3296', incidentDate: '06/04/2026', incidentType: 'Driver Misconduct',  allocatedTo: 'Safety Team A', incidentStatus: 'Reported',      createdBy: 'Omar Al-Harbi',     region: 'Madinah',          division: 'Madinah North',  archived: false },
  { id: 7,  date: '06/04/2026 13:40', registration: 'STU 4433', incidentId: 'INC-3295', incidentDate: '06/04/2026', incidentType: 'Mechanical Failure', allocatedTo: 'Safety Team C', incidentStatus: 'Under Review',  createdBy: 'Layla Al-Zahrani',  region: 'Riyadh',           division: 'East Riyadh',    archived: false },
  { id: 8,  date: '06/04/2026 12:15', registration: 'VWX 6677', incidentId: 'INC-3294', incidentDate: '05/04/2026', incidentType: 'Theft',              allocatedTo: 'Safety Team B', incidentStatus: 'Pending',       createdBy: 'Ahmed Al-Otaibi',   region: 'Jeddah',           division: 'Jeddah South',   archived: false },
  { id: 9,  date: '06/04/2026 10:50', registration: 'YZA 8899', incidentId: 'INC-3293', incidentDate: '05/04/2026', incidentType: 'Collision',          allocatedTo: 'Safety Team A', incidentStatus: 'Resolved',      createdBy: 'Sultan Al-Rashid',  region: 'Riyadh',           division: 'North Depot',    archived: false },
  { id: 10, date: '06/04/2026 09:25', registration: 'BCD 2233', incidentId: 'INC-3292', incidentDate: '05/04/2026', incidentType: 'Near Miss',          allocatedTo: 'Safety Team C', incidentStatus: 'Closed',        createdBy: 'Khalid Al-Mutairi', region: 'Eastern Province', division: 'Al Khobar',      archived: false },
  { id: 11, date: '05/04/2026 18:00', registration: 'EFG 4455', incidentId: 'INC-3291', incidentDate: '05/04/2026', incidentType: 'Passenger Injury',   allocatedTo: 'Safety Team B', incidentStatus: 'Reported',      createdBy: 'Faisal Al-Dosari',  region: 'Riyadh',           division: 'West Riyadh',    archived: false },
  { id: 12, date: '05/04/2026 16:35', registration: 'HIJ 6677', incidentId: 'INC-3290', incidentDate: '05/04/2026', incidentType: 'Vehicle Damage',     allocatedTo: 'Safety Team A', incidentStatus: 'Under Review',  createdBy: 'Nora Al-Qahtani',   region: 'Makkah',           division: 'Makkah East',    archived: false },
  { id: 13, date: '05/04/2026 15:10', registration: 'KLM 8899', incidentId: 'INC-3289', incidentDate: '04/04/2026', incidentType: 'Road Hazard',        allocatedTo: 'Safety Team C', incidentStatus: 'Resolved',      createdBy: 'Omar Al-Harbi',     region: 'Madinah',          division: 'Madinah South',  archived: false },
  { id: 14, date: '05/04/2026 13:45', registration: 'NOP 1122', incidentId: 'INC-3288', incidentDate: '04/04/2026', incidentType: 'Driver Misconduct',  allocatedTo: 'Safety Team B', incidentStatus: 'Archived',      createdBy: 'Layla Al-Zahrani',  region: 'Riyadh',           division: 'North Depot',    archived: true  },
  { id: 15, date: '05/04/2026 12:20', registration: 'QRS 3344', incidentId: 'INC-3287', incidentDate: '04/04/2026', incidentType: 'Mechanical Failure', allocatedTo: 'Safety Team A', incidentStatus: 'Closed',        createdBy: 'Ahmed Al-Otaibi',   region: 'Jeddah',           division: 'Jeddah Hub',     archived: false },
  { id: 16, date: '05/04/2026 10:55', registration: 'TUV 5566', incidentId: 'INC-3286', incidentDate: '04/04/2026', incidentType: 'Theft',              allocatedTo: 'Safety Team C', incidentStatus: 'Pending',       createdBy: 'Sultan Al-Rashid',  region: 'Eastern Province', division: 'Dammam Depot',   archived: false },
  { id: 17, date: '04/04/2026 19:30', registration: 'WXY 7788', incidentId: 'INC-3285', incidentDate: '04/04/2026', incidentType: 'Collision',          allocatedTo: 'Safety Team B', incidentStatus: 'Reported',      createdBy: 'Khalid Al-Mutairi', region: 'Riyadh',           division: 'South Depot',    archived: false },
  { id: 18, date: '04/04/2026 18:05', registration: 'ZAB 9900', incidentId: 'INC-3284', incidentDate: '03/04/2026', incidentType: 'Near Miss',          allocatedTo: 'Safety Team A', incidentStatus: 'Under Review',  createdBy: 'Faisal Al-Dosari',  region: 'Makkah',           division: 'Makkah Central', archived: false },
  { id: 19, date: '04/04/2026 16:40', registration: 'CDE 1234', incidentId: 'INC-3283', incidentDate: '03/04/2026', incidentType: 'Passenger Injury',   allocatedTo: 'Safety Team C', incidentStatus: 'Resolved',      createdBy: 'Nora Al-Qahtani',   region: 'Madinah',          division: 'Madinah North',  archived: false },
  { id: 20, date: '04/04/2026 15:15', registration: 'FGH 5678', incidentId: 'INC-3282', incidentDate: '03/04/2026', incidentType: 'Vehicle Damage',     allocatedTo: 'Safety Team B', incidentStatus: 'Archived',      createdBy: 'Omar Al-Harbi',     region: 'Riyadh',           division: 'East Riyadh',    archived: true  },
  { id: 21, date: '04/04/2026 13:50', registration: 'IJK 9012', incidentId: 'INC-3281', incidentDate: '03/04/2026', incidentType: 'Road Hazard',        allocatedTo: 'Safety Team A', incidentStatus: 'Closed',        createdBy: 'Layla Al-Zahrani',  region: 'Jeddah',           division: 'Jeddah South',   archived: false },
  { id: 22, date: '04/04/2026 12:25', registration: 'LMN 3456', incidentId: 'INC-3280', incidentDate: '02/04/2026', incidentType: 'Driver Misconduct',  allocatedTo: 'Safety Team C', incidentStatus: 'Pending',       createdBy: 'Ahmed Al-Otaibi',   region: 'Eastern Province', division: 'Al Khobar',      archived: false },
  { id: 23, date: '03/04/2026 17:00', registration: 'OPQ 7890', incidentId: 'INC-3279', incidentDate: '02/04/2026', incidentType: 'Mechanical Failure', allocatedTo: 'Safety Team B', incidentStatus: 'Reported',      createdBy: 'Sultan Al-Rashid',  region: 'Riyadh',           division: 'West Riyadh',    archived: false },
  { id: 24, date: '03/04/2026 15:35', registration: 'RST 1122', incidentId: 'INC-3278', incidentDate: '02/04/2026', incidentType: 'Theft',              allocatedTo: 'Safety Team A', incidentStatus: 'Under Review',  createdBy: 'Khalid Al-Mutairi', region: 'Makkah',           division: 'Makkah East',    archived: false },
  { id: 25, date: '03/04/2026 14:10', registration: 'UVW 4433', incidentId: 'INC-3277', incidentDate: '01/04/2026', incidentType: 'Collision',          allocatedTo: 'Safety Team C', incidentStatus: 'Resolved',      createdBy: 'Faisal Al-Dosari',  region: 'Madinah',          division: 'Madinah South',  archived: false },
];

export const INCIDENT_STATUSES: IncidentStatus[] = [
  'Reported', 'Under Review', 'Pending', 'Resolved', 'Closed', 'Archived',
];
export const INCIDENT_TYPES: IncidentType[] = [
  'Collision', 'Near Miss', 'Passenger Injury', 'Vehicle Damage',
  'Road Hazard', 'Driver Misconduct', 'Mechanical Failure', 'Theft',
];
export const ALLOCATED_TO_OPTIONS = [
  'All Teams', 'Safety Team A', 'Safety Team B', 'Safety Team C',
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

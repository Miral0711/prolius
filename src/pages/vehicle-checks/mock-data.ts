export type CheckResult = 'Roadworthy' | 'Safe to Operate' | 'Defect Found' | 'Failed' | 'Critical';
export type VehicleStatus = 'Active' | 'Out of Service' | 'Maintenance';
export type CheckType = 'Daily Walk-Around' | 'Pre-Trip' | 'Post-Trip' | 'Periodic' | 'Roadside';
export type VehicleType = 'Bus' | 'Coach' | 'Minibus' | 'Taxi' | 'Van';

export interface VehicleCheckRow {
  id: number;
  date: string;
  registration: string;
  check: string;
  type: CheckType;
  vehicleStatus: VehicleStatus;
  checkResult: CheckResult;
  createdBy: string;
  region: string;
  division: string;
}

export const VEHICLE_CHECKS_MOCK: VehicleCheckRow[] = [
  { id: 1, date: '07/04/2026 08:14', registration: 'ABC 1234', check: 'Daily Walk-Around #1042', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Ahmed Al-Otaibi', region: 'Riyadh', division: 'North Depot' },
  { id: 2, date: '07/04/2026 07:55', registration: 'DEF 5678', check: 'Pre-Trip Inspection #1041', type: 'Pre-Trip', vehicleStatus: 'Active', checkResult: 'Safe to Operate', createdBy: 'Sultan Al-Rashid', region: 'Jeddah', division: 'Jeddah Hub' },
  { id: 3, date: '07/04/2026 07:30', registration: 'GHI 9012', check: 'Daily Walk-Around #1040', type: 'Daily Walk-Around', vehicleStatus: 'Maintenance', checkResult: 'Defect Found', createdBy: 'Khalid Al-Mutairi', region: 'Riyadh', division: 'South Depot' },
  { id: 4, date: '06/04/2026 18:45', registration: 'JKL 3456', check: 'Post-Trip Check #1039', type: 'Post-Trip', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Faisal Al-Dosari', region: 'Eastern Province', division: 'Dammam Depot' },
  { id: 5, date: '06/04/2026 17:20', registration: 'MNO 7890', check: 'Periodic Inspection #1038', type: 'Periodic', vehicleStatus: 'Active', checkResult: 'Safe to Operate', createdBy: 'Nora Al-Qahtani', region: 'Makkah', division: 'Makkah Central' },
  { id: 6, date: '06/04/2026 16:10', registration: 'PQR 1122', check: 'Roadside Check #1037', type: 'Roadside', vehicleStatus: 'Out of Service', checkResult: 'Failed', createdBy: 'Omar Al-Harbi', region: 'Madinah', division: 'Madinah North' },
  { id: 7, date: '06/04/2026 14:55', registration: 'STU 4433', check: 'Daily Walk-Around #1036', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Layla Al-Zahrani', region: 'Riyadh', division: 'East Riyadh' },
  { id: 8, date: '06/04/2026 13:40', registration: 'VWX 6677', check: 'Pre-Trip Inspection #1035', type: 'Pre-Trip', vehicleStatus: 'Maintenance', checkResult: 'Critical', createdBy: 'Ahmed Al-Otaibi', region: 'Jeddah', division: 'Jeddah South' },
  { id: 9, date: '06/04/2026 12:15', registration: 'YZA 8899', check: 'Post-Trip Check #1034', type: 'Post-Trip', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Sultan Al-Rashid', region: 'Riyadh', division: 'North Depot' },
  { id: 10, date: '06/04/2026 11:00', registration: 'BCD 2233', check: 'Daily Walk-Around #1033', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Safe to Operate', createdBy: 'Khalid Al-Mutairi', region: 'Eastern Province', division: 'Al Khobar' },
  { id: 11, date: '06/04/2026 09:45', registration: 'EFG 4455', check: 'Periodic Inspection #1032', type: 'Periodic', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Faisal Al-Dosari', region: 'Riyadh', division: 'West Riyadh' },
  { id: 12, date: '05/04/2026 17:30', registration: 'HIJ 6677', check: 'Roadside Check #1031', type: 'Roadside', vehicleStatus: 'Out of Service', checkResult: 'Defect Found', createdBy: 'Nora Al-Qahtani', region: 'Makkah', division: 'Makkah East' },
  { id: 13, date: '05/04/2026 15:20', registration: 'KLM 8899', check: 'Daily Walk-Around #1030', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Omar Al-Harbi', region: 'Madinah', division: 'Madinah South' },
  { id: 14, date: '05/04/2026 13:05', registration: 'NOP 1122', check: 'Pre-Trip Inspection #1029', type: 'Pre-Trip', vehicleStatus: 'Active', checkResult: 'Safe to Operate', createdBy: 'Layla Al-Zahrani', region: 'Riyadh', division: 'North Depot' },
  { id: 15, date: '05/04/2026 10:50', registration: 'QRS 3344', check: 'Post-Trip Check #1028', type: 'Post-Trip', vehicleStatus: 'Maintenance', checkResult: 'Failed', createdBy: 'Ahmed Al-Otaibi', region: 'Jeddah', division: 'Jeddah Hub' },
  { id: 16, date: '05/04/2026 08:35', registration: 'TUV 5566', check: 'Daily Walk-Around #1027', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Sultan Al-Rashid', region: 'Eastern Province', division: 'Dammam Depot' },
  { id: 17, date: '04/04/2026 19:00', registration: 'WXY 7788', check: 'Periodic Inspection #1026', type: 'Periodic', vehicleStatus: 'Active', checkResult: 'Safe to Operate', createdBy: 'Khalid Al-Mutairi', region: 'Riyadh', division: 'South Depot' },
  { id: 18, date: '04/04/2026 16:45', registration: 'ZAB 9900', check: 'Roadside Check #1025', type: 'Roadside', vehicleStatus: 'Out of Service', checkResult: 'Critical', createdBy: 'Faisal Al-Dosari', region: 'Makkah', division: 'Makkah Central' },
  { id: 19, date: '04/04/2026 14:30', registration: 'CDE 1234', check: 'Daily Walk-Around #1024', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Nora Al-Qahtani', region: 'Madinah', division: 'Madinah North' },
  { id: 20, date: '04/04/2026 12:15', registration: 'FGH 5678', check: 'Pre-Trip Inspection #1023', type: 'Pre-Trip', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Omar Al-Harbi', region: 'Riyadh', division: 'East Riyadh' },
  { id: 21, date: '04/04/2026 10:00', registration: 'IJK 9012', check: 'Post-Trip Check #1022', type: 'Post-Trip', vehicleStatus: 'Maintenance', checkResult: 'Defect Found', createdBy: 'Layla Al-Zahrani', region: 'Jeddah', division: 'Jeddah South' },
  { id: 22, date: '03/04/2026 18:20', registration: 'LMN 3456', check: 'Daily Walk-Around #1021', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Safe to Operate', createdBy: 'Ahmed Al-Otaibi', region: 'Eastern Province', division: 'Al Khobar' },
  { id: 23, date: '03/04/2026 16:05', registration: 'OPQ 7890', check: 'Periodic Inspection #1020', type: 'Periodic', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Sultan Al-Rashid', region: 'Riyadh', division: 'West Riyadh' },
  { id: 24, date: '03/04/2026 13:50', registration: 'RST 1122', check: 'Roadside Check #1019', type: 'Roadside', vehicleStatus: 'Out of Service', checkResult: 'Failed', createdBy: 'Khalid Al-Mutairi', region: 'Makkah', division: 'Makkah East' },
  { id: 25, date: '03/04/2026 11:35', registration: 'UVW 4433', check: 'Daily Walk-Around #1018', type: 'Daily Walk-Around', vehicleStatus: 'Active', checkResult: 'Roadworthy', createdBy: 'Faisal Al-Dosari', region: 'Madinah', division: 'Madinah South' },
];

export const REGIONS = ['All Regions', 'Riyadh', 'Jeddah', 'Eastern Province', 'Makkah', 'Madinah'];
export const DIVISIONS = ['All Divisions', 'North Depot', 'South Depot', 'East Riyadh', 'West Riyadh', 'Jeddah Hub', 'Jeddah South', 'Dammam Depot', 'Al Khobar', 'Makkah Central', 'Makkah East', 'Madinah North', 'Madinah South'];
export const CHECK_TYPES: CheckType[] = ['Daily Walk-Around', 'Pre-Trip', 'Post-Trip', 'Periodic', 'Roadside'];
export const VEHICLE_TYPES: VehicleType[] = ['Bus', 'Coach', 'Minibus', 'Taxi', 'Van'];
export const VEHICLE_STATUSES: VehicleStatus[] = ['Active', 'Out of Service', 'Maintenance'];
export const CHECK_RESULTS: CheckResult[] = ['Roadworthy', 'Safe to Operate', 'Defect Found', 'Failed', 'Critical'];
export const CREATED_BY_OPTIONS = ['All Users', 'Ahmed Al-Otaibi', 'Sultan Al-Rashid', 'Khalid Al-Mutairi', 'Faisal Al-Dosari', 'Nora Al-Qahtani', 'Omar Al-Harbi', 'Layla Al-Zahrani'];

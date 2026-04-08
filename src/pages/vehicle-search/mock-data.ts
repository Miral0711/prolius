export type VehicleStatus = 'Roadworthy' | 'Roadworthy (with defects)' | 'VOR';

export interface VehicleSearchRow {
  id: number;
  registration: string;
  region: string;
  type: string;
  category: string;
  subCategory: string;
  manufacturer: string;
  model: string;
  vehicleStatus: VehicleStatus;
  checkedToday: boolean;
  vorDays?: number;
}

export const VEHICLE_SEARCH_MOCK: VehicleSearchRow[] = [
  { id: 1,  registration: 'EJ74VAY', region: 'West Thurrock', type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 2,  registration: 'EU15ZPT', region: 'West Thurrock', type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'VOR',                        checkedToday: false, vorDays: 198 },
  { id: 3,  registration: 'FX68BXJ', region: 'West Thurrock', type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: false },
  { id: 4,  registration: 'FX68BXM', region: 'West Thurrock', type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy',                checkedToday: false },
  { id: 5,  registration: 'FX68BXO', region: 'West Thurrock', type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: false },
  { id: 6,  registration: 'FX68BXR', region: 'West Thurrock', type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'VOR',                        checkedToday: false, vorDays: 71 },
  { id: 7,  registration: 'FY16FHV', region: 'Widnes',        type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 8,  registration: 'FY66MZP', region: 'West Thurrock', type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 9,  registration: 'FY66MZT', region: 'West Thurrock', type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 10, registration: 'FY66MZU', region: 'West Thurrock', type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'VOR',                        checkedToday: false, vorDays: 104 },
  { id: 11, registration: 'FY74WNH', region: 'Hebburn',       type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: false },
  { id: 12, registration: 'FY74WNJ', region: 'Hebburn',       type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: false },
  { id: 13, registration: 'FY74WNP', region: 'Hebburn',       type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 14, registration: 'FY74WNS', region: 'Hebburn',       type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'Roadworthy (with defects)', checkedToday: false },
  { id: 15, registration: 'FY74WNT', region: 'Hebburn',       type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 16, registration: 'FY74WNU', region: 'Widnes',        type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 17, registration: 'FY74WNW', region: 'Widnes',        type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy',                checkedToday: false },
  { id: 18, registration: 'FY75OAJ', region: 'Hebburn',       type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'Roadworthy',                checkedToday: false },
  { id: 19, registration: 'GN65RZA', region: 'Selby',         type: 'man unit',  category: 'HGV', subCategory: 'HGV',     manufacturer: 'MAN', model: 'TGX',         vehicleStatus: 'Roadworthy (with defects)', checkedToday: true },
  { id: 20, registration: 'HX14DWK', region: 'Newport',       type: 'Man Rigid', category: 'HGV', subCategory: 'None',    manufacturer: 'MAN', model: 'Rigid - TGM', vehicleStatus: 'Roadworthy',                checkedToday: false },
];

export const REGIONS = ['All Regions', 'West Thurrock', 'Widnes', 'Hebburn', 'Selby', 'Newport'];
export const VEHICLE_STATUSES = ['All Statuses', 'Roadworthy', 'Roadworthy (with defects)', 'VOR'];

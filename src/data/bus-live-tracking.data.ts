/**
 * Bus Live Tracking — Content structure and data configuration.
 * No UI. For backend integration: all fields are labeled and typed.
 */

// ---------------------------------------------------------------------------
// PAGE CONTENT (constants)
// ---------------------------------------------------------------------------

export const PAGE_TITLE = 'Bus Live Tracking';

export const MAP_PLACEHOLDER_MESSAGE =
  "This page can't load Google Maps correctly. For development purposes only.";

export const FOOTER_TEXT =
  'Copyright © 2026 Blitztech Solutions FZE LLC. All rights reserved.';

// ---------------------------------------------------------------------------
// TYPES (for backend / API contracts)
// ---------------------------------------------------------------------------

export interface SummaryCountersData {
  total: number;
  online: number;
  idling: number;
  accOff: number;
  alarm: number;
  dvrError: number;
  offline: number;
}

export interface VehicleInGroup {
  /** Vehicle plate/identifier */
  plateNo: string;
  /** Last GPS update timestamp (ISO or display string), null if N/A */
  gpsLastUpdate: string | null;
  /** Last DVR update (ISO or display string), null if N/A */
  dvrLastUpdate: string | null;
}

export interface VehicleGroupData {
  /** Backend: company_id */
  companyId?: string;
  companyName: string;
  totalVehicles: number;
  online: number;
  vehicles: VehicleInGroup[];
}

export interface VehicleInformation {
  vehicleStatus: string;
  speedKmh: number;
  engineStatus: 'On' | 'Off';
  driverLogin: boolean;
  batteryVoltage: string | null;
}

export interface DeviceInformation {
  deviceId: string | number;
  mdvrStatus: 'Online' | 'Offline';
  mdvrVersion: string;
  camera1Status: 'Online' | 'Offline';
  camera2Status: 'Online' | 'Offline';
}

export interface GpsNetworkInfo {
  gpsSatellites: number;
  connectedCameras: number;
  disconnectedCameras: number;
}

export interface SelectedVehicleDetailData {
  driverName: string;
  plateNo: string;
  vehicleInformation: VehicleInformation;
  deviceInformation: DeviceInformation;
  gpsNetwork: GpsNetworkInfo;
}

// ---------------------------------------------------------------------------
// TOP SUMMARY COUNTERS DATA (constant-based)
// ---------------------------------------------------------------------------

export const SUMMARY_COUNTERS: SummaryCountersData = {
  total: 779,
  online: 28,
  idling: 44,
  accOff: 64,
  alarm: 4,
  dvrError: 218,
  offline: 421,
};

// ---------------------------------------------------------------------------
// VEHICLE GROUP DATA (constant-based)
// ---------------------------------------------------------------------------

export const VEHICLE_GROUPS: VehicleGroupData[] = [
  {
    companyName: 'Blitztech Solutions',
    totalVehicles: 4,
    online: 0,
    vehicles: [
      {
        plateNo: 'KSA0001',
        gpsLastUpdate: '22-10-2024 14:28',
        dvrLastUpdate: null,
      },
      { plateNo: 'AVI001', gpsLastUpdate: null, dvrLastUpdate: null },
      { plateNo: 'AVI0012', gpsLastUpdate: null, dvrLastUpdate: null },
      { plateNo: 'AVI00123', gpsLastUpdate: null, dvrLastUpdate: null },
    ],
  },
  {
    companyName: 'Maged Ghalab Est',
    totalVehicles: 94,
    online: 3,
    vehicles: [
      {
        plateNo: 'HSA1098',
        gpsLastUpdate: '16-01-2025 01:11',
        dvrLastUpdate: null,
      },
      {
        plateNo: 'ASA8887',
        gpsLastUpdate: '07-01-2026 10:12',
        dvrLastUpdate: null,
      },
      {
        plateNo: 'XSA4247',
        gpsLastUpdate: '07-01-2026 09:55',
        dvrLastUpdate: null,
      },
      {
        plateNo: 'HSA1167',
        gpsLastUpdate: '16-01-2025 01:09',
        dvrLastUpdate: null,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// SELECTED VEHICLE DETAIL DATA (constant-based)
// ---------------------------------------------------------------------------

export const SELECTED_VEHICLE_DETAIL: SelectedVehicleDetailData = {
  driverName: 'xyz',
  plateNo: 'KSA0001',
  vehicleInformation: {
    vehicleStatus: 'No GPS',
    speedKmh: 0,
    engineStatus: 'On',
    driverLogin: true,
    batteryVoltage: null,
  },
  deviceInformation: {
    deviceId: 3254,
    mdvrStatus: 'Offline',
    mdvrVersion: 'T241008',
    camera1Status: 'Offline',
    camera2Status: 'Offline',
  },
  gpsNetwork: {
    gpsSatellites: -1,
    connectedCameras: 0,
    disconnectedCameras: 2,
  },
};

// ---------------------------------------------------------------------------
// MOCK API RESPONSE (sample structure for backend)
// ---------------------------------------------------------------------------

export const MOCK_API_RESPONSE = {
  pageTitle: PAGE_TITLE,
  summaryCounters: SUMMARY_COUNTERS,
  vehicleGroups: VEHICLE_GROUPS,
  selectedVehicle: SELECTED_VEHICLE_DETAIL,
  mapPlaceholderMessage: MAP_PLACEHOLDER_MESSAGE,
  footerText: FOOTER_TEXT,
} as const;

// ---------------------------------------------------------------------------
// RAW JSON STRUCTURE (for backend / docs)
// ---------------------------------------------------------------------------

/**
 * Sample API response format (conceptual JSON).
 * Backend can return this shape from e.g. GET /api/bus-tracking/live
 *
 * {
 *   "pageTitle": "Bus Live Tracking",
 *   "summaryCounters": {
 *     "total": 779,
 *     "online": 28,
 *     "idling": 44,
 *     "accOff": 64,
 *     "alarm": 4,
 *     "dvrError": 218,
 *     "offline": 421
 *   },
 *   "vehicleGroups": [
 *     {
 *       "companyId": "optional-uuid",
 *       "companyName": "Blitztech Solutions",
 *       "totalVehicles": 4,
 *       "online": 0,
 *       "vehicles": [
 *         {
 *           "plateNo": "KSA0001",
 *           "gpsLastUpdate": "22-10-2024 14:28",
 *           "dvrLastUpdate": null
 *         }
 *       ]
 *     }
 *   ],
 *   "selectedVehicle": {
 *     "driverName": "xyz",
 *     "plateNo": "KSA0001",
 *     "vehicleInformation": {
 *       "vehicleStatus": "No GPS",
 *       "speedKmh": 0,
 *       "engineStatus": "On",
 *       "driverLogin": true,
 *       "batteryVoltage": null
 *     },
 *     "deviceInformation": {
 *       "deviceId": 3254,
 *       "mdvrStatus": "Offline",
 *       "mdvrVersion": "T241008",
 *       "camera1Status": "Offline",
 *       "camera2Status": "Offline"
 *     },
 *     "gpsNetwork": {
 *       "gpsSatellites": -1,
 *       "connectedCameras": 0,
 *       "disconnectedCameras": 2
 *     }
 *   },
 *   "mapPlaceholderMessage": "This page can't load Google Maps correctly. For development purposes only.",
 *   "footerText": "Copyright © 2026 Blitztech Solutions FZE LLC. All rights reserved."
 * }
 */

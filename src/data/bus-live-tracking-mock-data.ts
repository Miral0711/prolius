/**
 * Bus Live Tracking — Mock vehicle data for development.
 * Production: replace with API response.
 */

export type VehicleStatusBadge = 'Online' | 'Offline' | 'Alarm' | 'Idling';

export interface BusLiveVehicle {
  id: number;
  plate: string;
  driver: string;
  company: string;
  gpsTime: string | null;
  speed: number;
  engineStatus: 'On' | 'Off';
  vehicleStatus: string;
  dvrStatus: 'Online' | 'Offline';
  deviceId: number | string;
  mdvrVersion: string;
  gpsSatellites: number;
  connectedCameras: number;
  disconnectedCameras: number;
  driverLogin: boolean;
  batteryVoltage: string | null;
  camera1Status: 'Online' | 'Offline';
  camera2Status: 'Online' | 'Offline';
  /** For badge and dot color */
  status: VehicleStatusBadge;
  /** Dummy coords when GPS available; null when no GPS */
  lat: number | null;
  lng: number | null;
}

export const BUS_LIVE_VEHICLES: BusLiveVehicle[] = [
  {
    id: 1,
    plate: 'KSA0001',
    driver: 'xyz',
    company: 'Blitztech Solutions',
    gpsTime: '22-10-2024 14:28',
    speed: 0,
    engineStatus: 'On',
    vehicleStatus: 'No GPS',
    dvrStatus: 'Offline',
    deviceId: 3254,
    mdvrVersion: 'T241008',
    gpsSatellites: -1,
    connectedCameras: 0,
    disconnectedCameras: 2,
    driverLogin: true,
    batteryVoltage: null,
    camera1Status: 'Offline',
    camera2Status: 'Offline',
    status: 'Offline',
    lat: null,
    lng: null,
  },
  {
    id: 2,
    plate: 'AVI001',
    driver: '—',
    company: 'Blitztech Solutions',
    gpsTime: null,
    speed: 0,
    engineStatus: 'Off',
    vehicleStatus: 'N/A',
    dvrStatus: 'Offline',
    deviceId: 3255,
    mdvrVersion: 'T241008',
    gpsSatellites: 0,
    connectedCameras: 0,
    disconnectedCameras: 2,
    driverLogin: false,
    batteryVoltage: null,
    camera1Status: 'Offline',
    camera2Status: 'Offline',
    status: 'Offline',
    lat: null,
    lng: null,
  },
  {
    id: 3,
    plate: 'AVI0012',
    driver: '—',
    company: 'Blitztech Solutions',
    gpsTime: null,
    speed: 0,
    engineStatus: 'Off',
    vehicleStatus: 'N/A',
    dvrStatus: 'Offline',
    deviceId: 3256,
    mdvrVersion: 'T241008',
    gpsSatellites: 0,
    connectedCameras: 0,
    disconnectedCameras: 2,
    driverLogin: false,
    batteryVoltage: null,
    camera1Status: 'Offline',
    camera2Status: 'Offline',
    status: 'Offline',
    lat: null,
    lng: null,
  },
  {
    id: 4,
    plate: 'AVI00123',
    driver: '—',
    company: 'Blitztech Solutions',
    gpsTime: null,
    speed: 0,
    engineStatus: 'Off',
    vehicleStatus: 'N/A',
    dvrStatus: 'Offline',
    deviceId: 3257,
    mdvrVersion: 'T241008',
    gpsSatellites: 0,
    connectedCameras: 0,
    disconnectedCameras: 2,
    driverLogin: false,
    batteryVoltage: null,
    camera1Status: 'Offline',
    camera2Status: 'Offline',
    status: 'Offline',
    lat: null,
    lng: null,
  },
  {
    id: 5,
    plate: 'HSA1098',
    driver: 'Driver A',
    company: 'Maged Ghalab Est',
    gpsTime: '16-01-2025 01:11',
    speed: 42,
    engineStatus: 'On',
    vehicleStatus: 'Moving',
    dvrStatus: 'Online',
    deviceId: 3301,
    mdvrVersion: 'T241008',
    gpsSatellites: 8,
    connectedCameras: 2,
    disconnectedCameras: 0,
    driverLogin: true,
    batteryVoltage: '12.4V',
    camera1Status: 'Online',
    camera2Status: 'Online',
    status: 'Online',
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    id: 6,
    plate: 'ASA8887',
    driver: 'Driver B',
    company: 'Maged Ghalab Est',
    gpsTime: '07-01-2026 10:12',
    speed: 0,
    engineStatus: 'On',
    vehicleStatus: 'Idling',
    dvrStatus: 'Online',
    deviceId: 3302,
    mdvrVersion: 'T241008',
    gpsSatellites: 10,
    connectedCameras: 2,
    disconnectedCameras: 0,
    driverLogin: true,
    batteryVoltage: '12.2V',
    camera1Status: 'Online',
    camera2Status: 'Online',
    status: 'Idling',
    lat: 24.7211,
    lng: 46.6822,
  },
  {
    id: 7,
    plate: 'XSA4247',
    driver: 'Driver C',
    company: 'Maged Ghalab Est',
    gpsTime: '07-01-2026 09:55',
    speed: 55,
    engineStatus: 'On',
    vehicleStatus: 'Moving',
    dvrStatus: 'Online',
    deviceId: 3303,
    mdvrVersion: 'T241008',
    gpsSatellites: 9,
    connectedCameras: 2,
    disconnectedCameras: 0,
    driverLogin: true,
    batteryVoltage: '12.5V',
    camera1Status: 'Online',
    camera2Status: 'Online',
    status: 'Online',
    lat: 24.705,
    lng: 46.668,
  },
  {
    id: 8,
    plate: 'HSA1167',
    driver: 'Driver D',
    company: 'Maged Ghalab Est',
    gpsTime: '16-01-2025 01:09',
    speed: 0,
    engineStatus: 'Off',
    vehicleStatus: 'Stopped',
    dvrStatus: 'Offline',
    deviceId: 3304,
    mdvrVersion: 'T241008',
    gpsSatellites: 0,
    connectedCameras: 0,
    disconnectedCameras: 2,
    driverLogin: false,
    batteryVoltage: null,
    camera1Status: 'Offline',
    camera2Status: 'Offline',
    status: 'Offline',
    lat: null,
    lng: null,
  },
];

/** Dummy coordinates for map when vehicle has no GPS (show placeholder position) */
export const DUMMY_MAP_CENTER = { lat: 24.7136, lng: 46.6753 };

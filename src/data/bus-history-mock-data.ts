
/**
 * Bus History Tracking — Mock data for playback and analysis.
 */

export interface HistoryEvent {
    id: string;
    type: 'Trip started' | 'Vehicle stopped' | 'Vehicle idling' | 'Overspeed' | 'Geofence entry' | 'Geofence exit';
    time: string;
    location: string;
    description: string;
    speed?: number;
}

export interface RoutePoint {
    lat: number;
    lng: number;
    speed: number;
    timestamp: string;
}

export const MOCK_HISTORY_ROUTE: RoutePoint[] = [
    { lat: 24.7136, lng: 46.6753, speed: 0, timestamp: '10:00:00' },
    { lat: 24.7145, lng: 46.6765, speed: 25, timestamp: '10:01:00' },
    { lat: 24.7160, lng: 46.6780, speed: 45, timestamp: '10:02:00' },
    { lat: 24.7185, lng: 46.6805, speed: 65, timestamp: '10:03:00' },
    { lat: 24.7210, lng: 46.6830, speed: 85, timestamp: '10:04:00' }, // Overspeed
    { lat: 24.7235, lng: 46.6855, speed: 95, timestamp: '10:05:00' }, // Overspeed
    { lat: 24.7250, lng: 46.6870, speed: 55, timestamp: '10:06:00' },
    { lat: 24.7260, lng: 46.6885, speed: 0, timestamp: '10:07:00' }, // Stop
    { lat: 24.7260, lng: 46.6885, speed: 0, timestamp: '10:10:00' }, // Stop end
    { lat: 24.7275, lng: 46.6905, speed: 35, timestamp: '10:11:00' },
    { lat: 24.7300, lng: 46.6930, speed: 50, timestamp: '10:12:00' },
    { lat: 24.7325, lng: 46.6955, speed: 52, timestamp: '10:13:00' },
    { lat: 24.7350, lng: 46.6980, speed: 48, timestamp: '10:14:00' },
    { lat: 24.7370, lng: 46.7000, speed: 0, timestamp: '10:15:00' },
];

export const MOCK_HISTORY_EVENTS: HistoryEvent[] = [
    { id: '1', type: 'Trip started', time: '10:00:00', location: 'Main Terminal', description: 'Trip sequence initiated.' },
    { id: '2', type: 'Overspeed', time: '10:04:12', location: 'King Fahd Rd', description: 'Vehicle exceeded 80km/h limit.', speed: 85 },
    { id: '3', type: 'Geofence exit', time: '10:05:45', location: 'Zone B-12', description: 'Exited municipal boundary.' },
    { id: '4', type: 'Vehicle stopped', time: '10:07:20', location: 'Al Nakheel Stop', description: 'Scheduled passenger stop.', speed: 0 },
    { id: '5', type: 'Geofence entry', time: '10:12:30', location: 'Zone C-05', description: 'Entered airport corridor.' },
    { id: '6', type: 'Overspeed', time: '10:14:05', location: 'Airport Access Rd', description: 'Vehicle exceeded city limit.', speed: 82 },
];

export const MOCK_TRIP_SUMMARY = {
    vehicle: 'KSA-1029',
    driver: 'Ahmed Ali',
    startTime: '2024-03-24 10:00',
    endTime: '2024-03-24 10:15',
    duration: '15 mins',
    distance: '8.4 km',
    avgSpeed: '42 km/h',
    maxSpeed: '95 km/h',
    overspeedEvents: 2,
    totalStops: 1,
    idleTime: '3 mins',
    longestStop: '3 mins'
};

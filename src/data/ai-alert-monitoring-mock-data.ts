import { 
  AlertTriangle, 
  Brain, 
  Eye, 
  Smartphone, 
  Cigarette, 
  ShieldAlert, 
  Ghost, 
  CameraOff, 
  Timer, 
  UserCheck, 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  UserMinus, 
  Bell, 
  Activity, 
  Flame, 
  Dna,
  Mic,
  Scale
} from 'lucide-react';

export const AI_ALERT_TYPES = [
  { id: 'fatigue', name: 'Fatigue Driving', icon: Brain, color: 'rose' },
  { id: 'phone', name: 'Phone Call', icon: Smartphone, color: 'amber' },
  { id: 'smoking', name: 'Smoking Detected', icon: Cigarette, color: 'slate' },
  { id: 'distracted', name: 'Distracted Driving', icon: Eye, color: 'rose' },
  { id: 'abnormal', name: 'Driver Abnormal', icon: ShieldAlert, color: 'amber' },
  { id: 'infrared', name: 'Infrared Blocked', icon: Ghost, color: 'slate' },
  { id: 'seatbelt', name: 'No Seatbelt', icon: Dna, color: 'rose' },
  { id: 'camera', name: 'Camera Blocked', icon: CameraOff, color: 'rose' },
  { id: 'overtime', name: 'Overtime Driving', icon: Timer, color: 'amber' },
  { id: 'using_phone', name: 'Using Phone', icon: Smartphone, color: 'rose' },
  { id: 'identification', name: 'Driver ID Check', icon: UserCheck, color: 'blue' },
  { id: 'collision', name: 'Forward Collision', icon: Zap, color: 'rose' },
  { id: 'lane_left', name: 'Lane Departure (L)', icon: ArrowLeft, color: 'amber' },
  { id: 'lane_right', name: 'Lane Departure (R)', icon: ArrowRight, color: 'amber' },
  { id: 'close', name: 'Vehicle Too Close', icon: UserMinus, color: 'amber' },
  { id: 'pedestrian', name: 'Pedestrian Alert', icon: Bell, color: 'rose' },
  { id: 'sos_driver', name: 'Driver SOS', icon: Activity, color: 'rose' },
  { id: 'sos_passenger', name: 'Passenger SOS', icon: Mic, color: 'amber' },
  { id: 'accident', name: 'Accident Detected', icon: Flame, color: 'rose' },
  { id: 'rollover', name: 'Roll-Over Detected', icon: Scale, color: 'rose' },
];

export const SYSTEM_HEALTH_METRICS = {
  lastUpdated: '14:32:05',
  activeAlerts: 12,
  busesWithAlerts: 8,
  refreshInterval: '30s',
  status: 'Operational'
};

export const ALERTS_OVER_TIME = [
  { time: '08:00', alerts: 2 },
  { time: '10:00', alerts: 5 },
  { time: '12:00', alerts: 3 },
  { time: '14:00', alerts: 8 },
  { time: '16:00', alerts: 4 },
  { time: '18:00', alerts: 6 },
  { time: '20:00', alerts: 2 },
  { time: '22:00', alerts: 1 },
];

export const ALERT_DISTRIBUTION = [
  { name: 'Fatigue', value: 35, color: '#f43f5e' },
  { name: 'Phone', value: 25, color: '#f59e0b' },
  { name: 'Seatbelt', value: 20, color: '#ec4899' },
  { name: 'Lane Departure', value: 15, color: '#fbbf24' },
  { name: 'Others', value: 5, color: '#64748b' },
];

export const BEHAVIOR_ALERTS = [
  { label: 'Speeding', value: '14' },
  { label: 'Harsh Braking', value: '5' },
  { label: 'Harsh Acceleration', value: '3' },
  { label: 'Harsh Left Turn', value: '2' },
  { label: 'Harsh Right Turn', value: '2' },
  { label: 'G-Sensor Alert', value: '1' },
];

export const HARDWARE_ALERTS = [
  { label: 'SD Card Status', value: 'Normal', color: 'text-emerald-500' },
  { label: 'DVR Shutdown', value: '0', color: 'text-slate-400' },
  { label: 'GPS Loss', value: '1', color: 'text-amber-500' },
  { label: 'Camera Disconnect', value: '0', color: 'text-slate-400' },
];

export const TRIP_ALERTS = [
  { label: 'Subscription Expiry', value: '25 Days', color: 'text-blue-500' },
];

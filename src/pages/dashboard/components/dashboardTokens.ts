export const TOKENS = {
  pageBg: 'bg-[#edf2f7]',
  sectionBg: 'bg-transparent',
  cardBg: 'bg-white',
  cardRadius: 'rounded-[6px]',
  cardShadow: 'shadow-[0_1px_6px_rgba(61,107,142,0.08),0_0_0_1px_rgba(61,107,142,0.04)]',
  strongShadow: 'shadow-[0_2px_12px_rgba(61,107,142,0.12),0_0_0_1px_rgba(61,107,142,0.06)]',
  cardBorder: 'border border-[#e2eaf2]',
  titleColor: 'text-[#1e3448]',
  valueColor: 'text-[#1e3448]',
  labelColor: 'text-[#4f6478]',
  subLabelColor: 'text-[#6b8299]',
};

export const SEMANTIC_COLORS = {
  blue: {
    main: '#3d6b8e',
    soft: 'bg-[#eef4f8]',
    border: 'border-[#3d6b8e]/15',
    accent: 'text-[#3d6b8e]',
    iconBg: 'bg-[#dce8f0]',
  },
  green: {
    main: '#22C55E',
    soft: 'bg-[#22C55E]/05',
    border: 'border-[#22C55E]/10',
    accent: 'text-[#22C55E]',
    iconBg: 'bg-[#22C55E]/10',
  },
  orange: {
    main: '#e8622a',
    soft: 'bg-[#fdeee6]',
    border: 'border-[#e8622a]/18',
    accent: 'text-[#e8622a]',
    iconBg: 'bg-[#fdeee6]',
  },
  secondaryBlue: {
    main: '#5a8aad',
    soft: 'bg-[#eef4f8]',
    border: 'border-[#5a8aad]/15',
    accent: 'text-[#5a8aad]',
    iconBg: 'bg-[#dce8f0]',
  },
  red: {
    main: '#DC2626',
    soft: 'bg-[#FEECEC]',
    border: 'border-[#DC2626]/18',
    accent: 'text-[#DC2626]',
    iconBg: 'bg-[#FEECEC]',
  },
} as const;

export type SemanticColor = keyof typeof SEMANTIC_COLORS;

export const MAP_MARKER_STYLES = {
  available: { dot: 'bg-[#22C55E]', halo: 'bg-[#22C55E]/25', ring: 'border-[#22C55E]/40', label: 'Available', color: '#22C55E' },
  'on-trip': { dot: 'bg-[#3d6b8e]', halo: 'bg-[#3d6b8e]/25', ring: 'border-[#3d6b8e]/40', label: 'On Trip', color: '#3d6b8e' },
  maintenance: { dot: 'bg-[#e8622a]', halo: 'bg-[#e8622a]/25', ring: 'border-[#e8622a]/40', label: 'Maintenance', color: '#e8622a' },
  alert: { dot: 'bg-[#DC2626]', halo: 'bg-[#DC2626]/25', ring: 'border-[#DC2626]/40', label: 'Alert', color: '#DC2626' },
} as const;

export type MapVehicleStatus = keyof typeof MAP_MARKER_STYLES;
export type MapFilter = 'all' | MapVehicleStatus;

export type DashboardRole = 'analyst' | 'ceo' | 'manager' | 'operations' | 'dispatcher' | 'workshop' | 'viewer';

export const DASHBOARD_ROLES: { value: DashboardRole; label: string }[] = [
  { value: 'analyst', label: 'Analyst Dashboard' },
  { value: 'ceo', label: 'CEO Dashboard' },
  { value: 'manager', label: 'Manager Dashboard' },
  { value: 'operations', label: 'Operations Dashboard' },
  { value: 'dispatcher', label: 'Dispatcher Dashboard' },
  { value: 'workshop', label: 'Workshop Dashboard' },
  { value: 'viewer', label: 'Viewer Dashboard' },
];

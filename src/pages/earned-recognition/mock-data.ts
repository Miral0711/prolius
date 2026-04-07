export type CellValue = number | null; // null = not yet available (shown as "–")
export type PeriodStatus = 'locked' | 'action' | 'pending' | null;

export interface ReportingPeriod {
  period: number;   // 1–13
  year: number;
  status: PeriodStatus;
}

export interface MetricRow {
  code: string;
  description: string;
  values: (number | null)[]; // index 0 = period 1, length 13
  isGroupHeader?: boolean;   // renders a sub-header row (Code / Description)
}

export const PERIODS: ReportingPeriod[] = [
  { period: 1,  year: 2026, status: 'locked'  },
  { period: 2,  year: 2026, status: 'locked'  },
  { period: 3,  year: 2026, status: 'action'  },
  { period: 4,  year: 2026, status: 'action'  },
  { period: 5,  year: 2026, status: 'pending' },
  { period: 6,  year: 2026, status: 'pending' },
  { period: 7,  year: 2026, status: 'pending' },
  { period: 8,  year: 2026, status: 'pending' },
  { period: 9,  year: 2026, status: 'pending' },
  { period: 10, year: 2026, status: 'pending' },
  { period: 11, year: 2026, status: 'pending' },
  { period: 12, year: 2026, status: 'pending' },
  { period: 13, year: 2026, status: 'pending' },
];

// Percentage values — null means period not yet available
export const METRIC_ROWS: MetricRow[] = [
  {
    code: 'M1',
    description: 'Completed records',
    values: [99.02, 100.00, 100.00, 98.14, null, null, null, null, null, null, null, null, null],
  },
  {
    code: 'M2',
    description: 'Sign off',
    values: [100.00, 100.00, 100.00, 100.00, null, null, null, null, null, null, null, null, null],
  },
  {
    code: 'M3',
    description: 'Frequency',
    values: [100.00, 100.00, 100.00, 100.00, null, null, null, null, null, null, null, null, null],
  },
  {
    code: 'M4',
    description: 'Defects',
    values: [100.00, 100.00, 100.00, 98.44, null, null, null, null, null, null, null, null, null],
  },
  // Sub-header before M5
  {
    code: 'Code',
    description: 'Description',
    values: [null, null, null, null, null, null, null, null, null, null, null, null, null],
    isGroupHeader: true,
  },
  {
    code: 'M5',
    description: 'MOT',
    values: [94.15, 94.64, 100.00, 100.00, null, null, null, null, null, null, null, null, null],
  },
];

export const YEAR_OPTIONS = [2024, 2025, 2026, 2027];

export const OPERATOR_ID = 'ACR-008360';
export const SYSTEM_PROVIDER_ID = 'SP1273';
export const LOCK_NOTE = 'Period 3 will be locked on 20 Apr 2026 (13 days left).';

// ── Reported Issues mock ──────────────────────────────────────────────────────
export type IssueStatus = 'Open' | 'Under Review' | 'Resolved' | 'Closed';

export interface ReportedIssueRow {
  id: number;
  date: string;
  period: number;
  code: string;
  description: string;
  issueDetail: string;
  status: IssueStatus;
  raisedBy: string;
}

export const REPORTED_ISSUES_MOCK: ReportedIssueRow[] = [
  { id: 1, date: '07/04/2026', period: 4, code: 'M1', description: 'Completed records', issueDetail: 'Three records missing sign-off from night shift supervisor.',       status: 'Open',         raisedBy: 'Ahmed Al-Otaibi'   },
  { id: 2, date: '06/04/2026', period: 4, code: 'M4', description: 'Defects',           issueDetail: 'Defect closure rate below threshold — 2 open items outstanding.',   status: 'Under Review', raisedBy: 'Sultan Al-Rashid'  },
  { id: 3, date: '05/04/2026', period: 3, code: 'M5', description: 'MOT',               issueDetail: 'Vehicle KSA-2041 MOT expired — renewal delayed by workshop.',       status: 'Resolved',     raisedBy: 'Khalid Al-Mutairi' },
  { id: 4, date: '03/04/2026', period: 3, code: 'M2', description: 'Sign off',          issueDetail: 'Driver sign-off not captured for 4 trips on 01/04/2026.',            status: 'Closed',       raisedBy: 'Faisal Al-Dosari'  },
  { id: 5, date: '01/04/2026', period: 3, code: 'M3', description: 'Frequency',         issueDetail: 'Inspection frequency dropped below 100% for Eastern Province depot.', status: 'Resolved',    raisedBy: 'Nora Al-Qahtani'   },
];

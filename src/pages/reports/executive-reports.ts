/**
 * Executive Reports configuration.
 * Each entry defines a one-click report card shown at the top of the Reports page.
 *
 * `defaultDays` drives the auto-applied date range (no filter UI needed).
 * `recommended` marks the most critical reports for leadership.
 * `insights` are the 2–3 key bullets surfaced after generation.
 *
 * To connect a real backend: replace `generateReport` in ExecutiveReportsSection
 * with an API call — this config file stays unchanged.
 */

import type { LucideIcon } from 'lucide-react';
import {
  HeartPulse,
  Wrench,
  ShieldAlert,
  ClipboardCheck,
  LayoutGrid,
  Users,
} from 'lucide-react';
import type { InsightType } from '@/lib/reportInsights';

export interface ExecInsight {
  type: InsightType;
  text: string;
}

export interface ExecutiveReport {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  /** Accent colour for the icon background — Tailwind bg class */
  iconBg: string;
  /** Accent colour for the icon itself — Tailwind text class */
  iconColor: string;
  /** Default date window applied automatically */
  defaultDays: 7 | 30;
  recommended: boolean;
  insights: ExecInsight[];
}

export const EXECUTIVE_REPORTS: ExecutiveReport[] = [
  {
    id: 'fleet-health',
    title: 'Fleet Health Summary',
    subtitle: 'VOR status, defects & maintenance',
    icon: HeartPulse,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    defaultDays: 7,
    recommended: true,
    insights: [
      { type: 'critical', text: '1 safety-critical defect open on active vehicle' },
      { type: 'warning',  text: '5 vehicles currently off-road (VOR)' },
      { type: 'info',     text: 'Fleet availability at 94% this week' },
    ],
  },
  {
    id: 'maintenance-overview',
    title: 'Maintenance Overview',
    subtitle: 'Costs, overdue jobs & workshop load',
    icon: Wrench,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    defaultDays: 30,
    recommended: true,
    insights: [
      { type: 'up',      text: 'Maintenance cost up 12% vs last month' },
      { type: 'warning', text: '3 jobs overdue beyond 5-day SLA' },
      { type: 'info',    text: '31 jobs completed; avg turnaround 1.8 days' },
    ],
  },
  {
    id: 'incident-safety',
    title: 'Incident & Safety Summary',
    subtitle: 'Incidents, hotspots & driver flags',
    icon: ShieldAlert,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    defaultDays: 7,
    recommended: true,
    insights: [
      { type: 'warning', text: '5 drivers flagged for coaching this week' },
      { type: 'up',      text: 'Harsh braking events up 8% vs last week' },
      { type: 'info',    text: '2 hotspots account for most incidents' },
    ],
  },
  {
    id: 'vehicle-checks',
    title: 'Vehicle Checks Status',
    subtitle: 'Pass rates, failures & overdue checks',
    icon: ClipboardCheck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    defaultDays: 7,
    recommended: false,
    insights: [
      { type: 'info',    text: 'Pass rate at 98.5% across 138 vehicles' },
      { type: 'warning', text: '3 vehicles missed scheduled check dates' },
      { type: 'up',      text: 'Check adherence up 5% vs last period' },
    ],
  },
  {
    id: 'utilisation-composition',
    title: 'Utilisation & Composition',
    subtitle: 'Fleet mix, inactive units & utilisation',
    icon: LayoutGrid,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    defaultDays: 30,
    recommended: false,
    insights: [
      { type: 'info',    text: 'Fleet utilisation at 78% — 3% below target' },
      { type: 'warning', text: '6 vehicles inactive for 30+ days' },
      { type: 'info',    text: 'Taxi category represents 46% of total fleet' },
    ],
  },
  {
    id: 'user-activity',
    title: 'User Activity Summary',
    subtitle: 'Logins, inactive accounts & anomalies',
    icon: Users,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
    defaultDays: 30,
    recommended: false,
    insights: [
      { type: 'down',    text: 'User logins dropped 18% vs last month' },
      { type: 'warning', text: '12 accounts inactive for 60+ days' },
      { type: 'info',    text: 'Peak activity on Monday mornings' },
    ],
  },
];

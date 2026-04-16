/**
 * Auto Insights engine for Reports.
 *
 * Each insight has a type that drives its visual treatment:
 *   - "up"       → metric increased (could be good or bad depending on context)
 *   - "down"     → metric decreased
 *   - "warning"  → something needs attention
 *   - "critical" → safety/compliance issue requiring immediate action
 *   - "info"     → neutral observation / composition fact
 *
 * To connect real data later: replace the REPORT_INSIGHTS map values with
 * functions that accept live API data and return the same Insight[] shape.
 */

export type InsightType = 'up' | 'down' | 'warning' | 'critical' | 'info';

export interface Insight {
  type: InsightType;
  text: string;
}

export type ReportInsightsResult =
  | { status: 'ready'; insights: Insight[] }
  | { status: 'unavailable' };

// ---------------------------------------------------------------------------
// Static mock insights — replace with computed/API values when backend is ready
// ---------------------------------------------------------------------------

const REPORT_INSIGHTS: Record<string, Insight[]> = {
  'Asset Check Report': [
    { type: 'warning', text: '4 assets have overdue checks this week' },
    { type: 'up',      text: 'Check completion rate up 6% vs last month' },
    { type: 'info',    text: 'Asset A-0042 has the highest check frequency' },
  ],
  'Asset Defect Report': [
    { type: 'critical', text: '2 critical defects unresolved for 7+ days' },
    { type: 'up',       text: 'Total defects up 15% vs previous period' },
    { type: 'info',     text: 'Asset A-0017 accounts for 3 of 8 defects this month' },
  ],
  'Asset Details Report': [
    { type: 'info',    text: '142 active assets across 4 categories' },
    { type: 'warning', text: '11 assets missing service date information' },
    { type: 'info',    text: 'HGV category represents 38% of total assets' },
  ],
  'Asset Maintenance Report': [
    { type: 'up',      text: 'Maintenance cost increased 12% vs last month' },
    { type: 'warning', text: '3 maintenance jobs overdue by more than 5 days' },
    { type: 'info',    text: 'Preventive jobs account for 61% of all work orders' },
    { type: 'down',    text: 'Average repair time down 0.4 days vs last period' },
  ],
  'Asset VOR Status Report': [
    { type: 'critical', text: '5 assets currently off-road (VOR)' },
    { type: 'warning',  text: '2 VOR assets awaiting parts for 10+ days' },
    { type: 'info',     text: 'Average VOR duration this period: 3.1 days' },
  ],
  'Fleet Archive Report': [
    { type: 'info',    text: '8 vehicles archived in the last 90 days' },
    { type: 'down',    text: 'Archive rate down 25% vs same period last year' },
    { type: 'info',    text: 'Diesel vehicles represent 70% of archived units' },
  ],
  'Fleet Disposition Report': [
    { type: 'warning', text: '6 vehicles inactive for 30+ days' },
    { type: 'info',    text: 'Fleet utilisation at 78% — 3% below target' },
    { type: 'info',    text: 'Taxi category represents 46% of total fleet' },
    { type: 'down',    text: 'Active vehicle count down 4 vs last quarter' },
  ],
  'Last Login Report': [
    { type: 'down',    text: 'User logins dropped 18% compared to last month' },
    { type: 'warning', text: '12 users have not logged in for 60+ days' },
    { type: 'info',    text: 'Peak login activity on Monday mornings' },
  ],
  'Line Manager Journey Report': [
    { type: 'info',    text: 'Journey compliance at 91% across all reporting lines' },
    { type: 'warning', text: '3 line managers have zero journey records this period' },
    { type: 'up',      text: 'Compliance improved 4% vs previous period' },
  ],
  'P11D Vehicle Changes': [
    { type: 'info',    text: '3 employee vehicle assignments changed this tax year' },
    { type: 'warning', text: '1 assignment change lacks required approval sign-off' },
  ],
  'Trailer PMI Performance Report': [
    { type: 'warning', text: '4 trailers overdue for PMI service' },
    { type: 'down',    text: 'PMI completion rate dropped to 84% (target: 95%)' },
    { type: 'info',    text: 'Trailer T-009 has missed 2 consecutive PMI windows' },
  ],
  'User Checks Report': [
    { type: 'info',    text: '97% of scheduled user vehicle checks completed on time' },
    { type: 'warning', text: '2 users have not completed any checks this month' },
    { type: 'up',      text: 'On-time completion up 3% vs last period' },
  ],
  'User Defects Report': [
    { type: 'critical', text: '1 user-reported defect marked safety-critical' },
    { type: 'up',       text: 'Defect reports up 20% this week vs last week' },
    { type: 'info',     text: '6 defects raised; 4 resolved within 24 hours' },
  ],
  'User Details Report': [
    { type: 'info',    text: '214 active users across 8 departments' },
    { type: 'warning', text: '12 accounts inactive for 60+ days — review access' },
    { type: 'down',    text: 'New user registrations down 30% this quarter' },
  ],
  'Vehicle Assignment Report': [
    { type: 'info',    text: '9 vehicle reassignments in the selected date range' },
    { type: 'warning', text: '2 vehicles assigned to drivers with expired licences' },
  ],
  'Vehicle Checks Calendar Tracker Report': [
    { type: 'warning', text: '3 vehicles missed scheduled check dates this week' },
    { type: 'info',    text: 'Highest check density on Tuesdays and Thursdays' },
    { type: 'up',      text: 'Overall check adherence up 5% vs last month' },
  ],
  'Vehicle Checks Report': [
    { type: 'info',    text: 'All 138 vehicles checked in the period' },
    { type: 'warning', text: '2 vehicles flagged for follow-up inspection' },
    { type: 'up',      text: 'Pass rate improved to 98.5% vs 96% last period' },
  ],
  'Vehicle Defects Report': [
    { type: 'critical', text: '1 safety-critical defect open on active vehicle' },
    { type: 'warning',  text: '3 additional defects unresolved for 5+ days' },
    { type: 'info',     text: 'Reg. LK21 ABC accounts for 2 of 4 open defects' },
    { type: 'down',     text: 'Total open defects down 2 vs last week' },
  ],
  'Vehicle Details Report': [
    { type: 'info',    text: '18 vehicles due for renewal this quarter' },
    { type: 'warning', text: '5 vehicles have missing or expired MOT records' },
    { type: 'info',    text: 'Electric vehicles now represent 12% of the fleet' },
  ],
  'Vehicle VOR Status Report': [
    { type: 'warning', text: '7 vehicles VOR\'d this period — 2 above 7-day threshold' },
    { type: 'info',    text: 'Average VOR downtime: 2.4 days per incident' },
    { type: 'up',      text: 'VOR incidents up 3 vs same period last month' },
  ],
  'Workshop Report': [
    { type: 'info',    text: '31 jobs processed this month; avg turnaround 1.8 days' },
    { type: 'up',      text: 'Job volume up 12% vs last month' },
    { type: 'warning', text: '4 jobs open beyond the 5-day SLA target' },
    { type: 'down',    text: 'Average cost per job down £42 vs last period' },
  ],
  'Driver Behaviour Report': [
    { type: 'warning', text: '5 drivers flagged for coaching based on behaviour scores' },
    { type: 'info',    text: 'Average fleet driver score: 74/100' },
    { type: 'up',      text: 'Harsh braking events up 8% vs last month' },
    { type: 'info',    text: 'Top performer: Driver D-0031 with score 96/100' },
  ],
  'Fuel Usage Report': [
    { type: 'up',      text: 'Fleet fuel spend up 8% this month' },
    { type: 'warning', text: '3 vehicles consistently above fuel consumption threshold' },
    { type: 'info',    text: 'Diesel accounts for 74% of total fuel spend' },
    { type: 'down',    text: 'Electric vehicle charging cost down 5% vs last period' },
  ],
  'Mileage Report': [
    { type: 'info',    text: 'Total fleet mileage: 48,320 km this period' },
    { type: 'warning', text: '2 vehicles exceeded their monthly mileage limit' },
    { type: 'up',      text: 'Total mileage up 6% vs same period last month' },
    { type: 'info',    text: 'Reg. MN70 XYZ is the highest-mileage vehicle at 4,210 km' },
  ],
};

// ---------------------------------------------------------------------------
// Category-level fallbacks
// ---------------------------------------------------------------------------

function detectCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('maintenance') || n.includes('workshop') || n.includes('pmi')) return 'maintenance';
  if (n.includes('defect')) return 'defect';
  if (n.includes('check')) return 'check';
  if (n.includes('fleet') || n.includes('asset detail') || n.includes('vehicle detail')) return 'fleet';
  if (n.includes('vor')) return 'vor';
  if (n.includes('login') || n.includes('user detail') || n.includes('user check') || n.includes('user defect')) return 'user';
  if (n.includes('driver')) return 'driver';
  if (n.includes('fuel')) return 'fuel';
  if (n.includes('mileage')) return 'mileage';
  if (n.includes('assignment') || n.includes('p11d')) return 'assignment';
  if (n.includes('journey')) return 'journey';
  return 'generic';
}

const CATEGORY_FALLBACKS: Record<string, Insight[]> = {
  maintenance: [
    { type: 'info',    text: 'Maintenance data available for the selected period' },
    { type: 'warning', text: 'Review overdue maintenance items' },
  ],
  defect: [
    { type: 'info',    text: 'Defect records available for review' },
    { type: 'warning', text: 'Check for any unresolved critical defects' },
  ],
  check: [
    { type: 'info', text: 'Check completion data available for the selected period' },
  ],
  fleet: [
    { type: 'info', text: 'Fleet composition and utilisation data ready to review' },
  ],
  vor: [
    { type: 'warning', text: 'Review current off-road (VOR) vehicles' },
  ],
  user: [
    { type: 'info', text: 'User activity data available for the selected period' },
  ],
  driver: [
    { type: 'info', text: 'Driver behaviour data available; review flagged events' },
  ],
  fuel: [
    { type: 'info', text: 'Fuel consumption data available for the selected period' },
  ],
  mileage: [
    { type: 'info', text: 'Mileage data available; check for vehicles over limit' },
  ],
  assignment: [
    { type: 'info', text: 'Vehicle assignment changes recorded this period' },
  ],
  journey: [
    { type: 'info', text: 'Journey data available for the selected period' },
  ],
  generic: [
    { type: 'info', text: 'Report data available for the selected period' },
  ],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns up to 4 insights for a given report.
 * Returns `unavailable` when the report has never been generated.
 *
 * To connect a real backend: replace this function body with an API call
 * that returns the same ReportInsightsResult shape.
 */
export function getReportInsights(name: string, lastGenerated: string): ReportInsightsResult {
  if (!lastGenerated) return { status: 'unavailable' };

  const insights = REPORT_INSIGHTS[name] ?? CATEGORY_FALLBACKS[detectCategory(name)];
  return { status: 'ready', insights: insights.slice(0, 4) };
}

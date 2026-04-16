/**
 * AI Report Summary utility
 * Generates concise, business-oriented 1-line summaries per report type.
 * Designed to be easily replaced with a real AI/API call later.
 */

export type ReportSummaryResult =
  | { status: 'ready'; text: string }
  | { status: 'unavailable' };

/**
 * Keyword-based category detection so new reports are handled gracefully
 * without needing an explicit entry in the map.
 */
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

/** Per-report static summaries (mock). Replace values with live data later. */
const STATIC_SUMMARIES: Record<string, string> = {
  'Asset Check Report': 'Last run found 4 assets with overdue checks this week.',
  'Asset Defect Report': '2 critical defects logged across fleet assets this month.',
  'Asset Details Report': 'Fleet asset register is up to date with 142 active assets.',
  'Asset Maintenance Report': 'Maintenance costs up 12% vs last period; 3 jobs overdue.',
  'Asset VOR Status Report': '5 assets currently off-road — 2 pending parts, 3 in workshop.',
  'Fleet Archive Report': '8 vehicles archived in the last 90 days.',
  'Fleet Disposition Report': 'Fleet utilisation at 78%; 6 vehicles inactive for 30+ days.',
  'Last Login Report': 'User login activity dropped 18% compared to last month.',
  'Line Manager Journey Report': 'Journey compliance at 91% across all reporting lines.',
  'P11D Vehicle Changes': '3 employee vehicle assignments changed this tax year.',
  'Trailer PMI Performance Report': 'PMI completion rate at 84%; 4 trailers overdue for service.',
  'User Checks Report': '97% of scheduled user vehicle checks completed on time.',
  'User Defects Report': '6 defects raised by users this week; 1 marked critical.',
  'User Details Report': '214 active users; 12 accounts inactive for 60+ days.',
  'Vehicle Assignment Report': '9 vehicle reassignments recorded in the selected date range.',
  'Vehicle Checks Calendar Tracker Report': '3 vehicles missed their scheduled check dates this week.',
  'Vehicle Checks Report': 'All vehicles checked; 2 flagged for follow-up inspection.',
  'Vehicle Defects Report': '4 open defects on fleet vehicles — 1 safety-critical.',
  'Vehicle Details Report': 'Vehicle register current; 18 vehicles due for renewal this quarter.',
  'Vehicle VOR Status Report': '7 vehicles VOR\'d this period; average downtime 2.4 days.',
  'Workshop Report': 'Workshop processed 31 jobs this month; average turnaround 1.8 days.',
  'Driver Behaviour Report': 'Average driver score 74/100; 5 drivers flagged for coaching.',
  'Fuel Usage Report': 'Fleet fuel spend up 8% this month; 3 vehicles above threshold.',
  'Mileage Report': 'Total fleet mileage 48,320 km this period; 2 vehicles over limit.',
};

/** Category-level fallback summaries when no static entry exists. */
const CATEGORY_FALLBACKS: Record<string, string> = {
  maintenance: 'Maintenance activity recorded; review overdue items.',
  defect: 'Defect data available — check for any critical items.',
  check: 'Check completion data available for the selected period.',
  fleet: 'Fleet composition and utilisation data ready to review.',
  vor: 'VOR status data available; review off-road vehicles.',
  user: 'User activity data available for the selected period.',
  driver: 'Driver behaviour data available; review flagged events.',
  fuel: 'Fuel consumption data available for the selected period.',
  mileage: 'Mileage data available; check for vehicles over limit.',
  assignment: 'Vehicle assignment changes recorded this period.',
  journey: 'Journey data available for the selected period.',
  generic: 'Report data available for the selected period.',
};

/**
 * Returns a summary for a given report.
 * Pass `lastGenerated` so we can return "unavailable" when the report has never run.
 *
 * To wire up a real AI backend later, replace this function body with an API call
 * and keep the same return type.
 */
export function getReportSummary(name: string, lastGenerated: string): ReportSummaryResult {
  if (!lastGenerated) return { status: 'unavailable' };

  const text = STATIC_SUMMARIES[name] ?? CATEGORY_FALLBACKS[detectCategory(name)];
  return { status: 'ready', text };
}

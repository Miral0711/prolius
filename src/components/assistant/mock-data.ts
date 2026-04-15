import type { AssistantMessage, Conversation } from './types';

export const WELCOME_MESSAGE: AssistantMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi, I'm your Prolius Assistant. I can help you navigate modules, understand features, and answer platform-related questions.",
  timestamp: new Date(),
};

export const QUICK_PROMPTS = [
  'Show me vehicle management modules',
  'How do alerts work?',
  'What can managers see?',
  'Explain reports section',
];

export const MOCK_RESPONSES: Record<string, string> = {
  'Show me vehicle management modules':
    'Vehicle Management includes: Vehicle Profiles (full specs & docs), Vehicle Checks (pre/post-trip), Defects (raise & track issues), Inspections (scheduled audits), and Maintenance Records. You can access all of these from the sidebar under Vehicle Management.',
  'How do alerts work?':
    'Alerts in Prolius are triggered by real-time events — speeding, geofence breaches, harsh braking, and more. You can view active alerts under Tracking & Monitoring → Alerts, configure thresholds in Settings, and assign escalation rules per vehicle or driver.',
  'What can managers see?':
    'Managers have access to the full Dashboard (KPIs, fleet health, driver performance), all Tracking & Monitoring views, Reports, and User & System Management. Role-based permissions can be configured under System Management → Roles & Permissions.',
  'Explain reports section':
    'The Reports section gives you exportable analytics across fleet utilisation, fuel consumption, driver behaviour, trip history, and compliance. Reports can be filtered by date range, vehicle group, or driver and exported as PDF or CSV.',
};

export function getMockResponse(input: string): string {
  const trimmed = input.trim();
  if (MOCK_RESPONSES[trimmed]) return MOCK_RESPONSES[trimmed];

  const lower = trimmed.toLowerCase();
  if (lower.includes('vehicle')) return MOCK_RESPONSES['Show me vehicle management modules'];
  if (lower.includes('alert')) return MOCK_RESPONSES['How do alerts work?'];
  if (lower.includes('manager') || lower.includes('role') || lower.includes('permission'))
    return MOCK_RESPONSES['What can managers see?'];
  if (lower.includes('report')) return MOCK_RESPONSES['Explain reports section'];
  if (lower.includes('dashboard'))
    return 'The Dashboard gives you a real-time overview of your fleet — active trips, driver status, maintenance alerts, fuel consumption, and key performance indicators. You can customise which panels are visible from the layout settings.';
  if (lower.includes('tracking') || lower.includes('live'))
    return 'Live Tracking shows real-time GPS positions for all active vehicles on an interactive map. You can click any vehicle to see speed, driver, route, and status. History Tracking lets you replay past routes with full telemetry data.';
  if (lower.includes('messaging'))
    return 'The Messaging module lets you communicate directly with drivers and teams. You can send broadcast messages, individual chats, and attach job-related documents. All messages are logged for compliance.';
  if (lower.includes('workshop'))
    return 'Workshops manages your maintenance facilities — job cards, technician assignments, parts inventory, and service schedules. It integrates with Vehicle Defects so raised issues flow directly into workshop job queues.';

  return "I don't have a specific answer for that yet, but I can help you navigate any Prolius module. Try asking about dashboards, tracking, alerts, vehicle management, reports, or messaging.";
}

/* ─── Mock conversation history ─────────────────────────────────────────── */

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function hoursAgo(n: number) {
  const d = new Date();
  d.setHours(d.getHours() - n);
  return d;
}

function makeMsg(
  id: string,
  role: 'user' | 'assistant',
  content: string,
  date: Date,
): AssistantMessage {
  return { id, role, content, timestamp: date };
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-alerts',
    title: 'Vehicle alerts help',
    preview: 'How do alerts work?',
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
    messages: [
      makeMsg('ca-1', 'assistant', WELCOME_MESSAGE.content, hoursAgo(2)),
      makeMsg('ca-2', 'user', 'How do alerts work?', hoursAgo(2)),
      makeMsg('ca-3', 'assistant', MOCK_RESPONSES['How do alerts work?'], hoursAgo(2)),
      makeMsg(
        'ca-4',
        'user',
        'Can I set custom thresholds for speeding alerts?',
        hoursAgo(2),
      ),
      makeMsg(
        'ca-5',
        'assistant',
        'Yes — custom thresholds can be configured per vehicle or vehicle group under Settings → Alert Rules. You can set speed limits, idle time limits, geofence boundaries, and more.',
        hoursAgo(2),
      ),
    ],
  },
  {
    id: 'conv-dashboard',
    title: 'Dashboard permissions',
    preview: 'What can managers see?',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    messages: [
      makeMsg('cd-1', 'assistant', WELCOME_MESSAGE.content, daysAgo(1)),
      makeMsg('cd-2', 'user', 'What can managers see?', daysAgo(1)),
      makeMsg('cd-3', 'assistant', MOCK_RESPONSES['What can managers see?'], daysAgo(1)),
      makeMsg('cd-4', 'user', 'What about drivers — what is their view limited to?', daysAgo(1)),
      makeMsg(
        'cd-5',
        'assistant',
        'Drivers typically see their own assigned jobs, vehicle check forms, and messaging. They do not have access to fleet-wide analytics, other drivers\' data, or system settings. Permissions are fully configurable per role.',
        daysAgo(1),
      ),
    ],
  },
  {
    id: 'conv-reports',
    title: 'Reports overview',
    preview: 'Explain reports section',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
    messages: [
      makeMsg('cr-1', 'assistant', WELCOME_MESSAGE.content, daysAgo(3)),
      makeMsg('cr-2', 'user', 'Explain reports section', daysAgo(3)),
      makeMsg('cr-3', 'assistant', MOCK_RESPONSES['Explain reports section'], daysAgo(3)),
      makeMsg('cr-4', 'user', 'Can I schedule reports to be emailed automatically?', daysAgo(3)),
      makeMsg(
        'cr-5',
        'assistant',
        'Scheduled report delivery is on the Prolius roadmap. Currently you can generate and export reports on demand as PDF or CSV from the Reports section.',
        daysAgo(3),
      ),
    ],
  },
  {
    id: 'conv-tracking',
    title: 'Tracking module questions',
    preview: 'How does live tracking work?',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
    messages: [
      makeMsg('ct-1', 'assistant', WELCOME_MESSAGE.content, daysAgo(5)),
      makeMsg('ct-2', 'user', 'How does live tracking work?', daysAgo(5)),
      makeMsg(
        'ct-3',
        'assistant',
        'Live Tracking shows real-time GPS positions for all active vehicles on an interactive map. You can click any vehicle to see speed, driver, route, and status. History Tracking lets you replay past routes with full telemetry data.',
        daysAgo(5),
      ),
      makeMsg('ct-4', 'user', 'What is the GPS update frequency?', daysAgo(5)),
      makeMsg(
        'ct-5',
        'assistant',
        'GPS positions update every 10–30 seconds depending on the device configuration and network conditions. You can see the last-updated timestamp on each vehicle marker in the live map.',
        daysAgo(5),
      ),
    ],
  },
];

export function createNewConversation(id: string): Conversation {
  const now = new Date();
  return {
    id,
    title: 'New conversation',
    preview: '',
    messages: [{ ...WELCOME_MESSAGE, id: `${id}-welcome`, timestamp: now }],
    createdAt: now,
    updatedAt: now,
  };
}

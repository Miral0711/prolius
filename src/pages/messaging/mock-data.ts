export interface HistoryRow {
  id: number;
  dateSent: string;
  sender: string;
  templateName: string;
  message: string;
  recipients: number;
  hasReport: boolean;
}

export const HISTORY_MOCK: HistoryRow[] = [
  { id: 1,  dateSent: '07/04/2026 09:15', sender: 'Ahmed Al-Otaibi',   templateName: 'Morning Shift Briefing',     message: 'Good morning team. Please ensure all vehicles are checked before departure. Route R-402 has light traffic today.',  recipients: 48,  hasReport: true  },
  { id: 2,  dateSent: '07/04/2026 08:30', sender: 'Sultan Al-Rashid',  templateName: 'Route Update Alert',         message: 'Route R-101 is experiencing delays due to road works near junction 5. Please use alternate route via R-202.',       recipients: 22,  hasReport: true  },
  { id: 3,  dateSent: '06/04/2026 17:45', sender: 'Nora Al-Qahtani',   templateName: 'End of Day Summary',         message: 'All drivers please submit your end-of-day reports by 18:00. Outstanding vehicle checks must be completed.',         recipients: 61,  hasReport: true  },
  { id: 4,  dateSent: '06/04/2026 14:20', sender: 'Khalid Al-Mutairi', templateName: 'Maintenance Reminder',       message: 'Scheduled maintenance for fleet batch KSA-1000 to KSA-1050 is due this week. Please book your slot.',              recipients: 15,  hasReport: false },
  { id: 5,  dateSent: '06/04/2026 11:05', sender: 'Faisal Al-Dosari',  templateName: 'Safety Alert',               message: 'Heavy rain forecast for Eastern Province this afternoon. All drivers must reduce speed and increase following distance.', recipients: 89, hasReport: true  },
  { id: 6,  dateSent: '05/04/2026 16:30', sender: 'Omar Al-Harbi',     templateName: 'Shift Change Notice',        message: 'Shift change for Riyadh North Depot is moved from 14:00 to 15:00 today due to operational requirements.',           recipients: 34,  hasReport: false },
  { id: 7,  dateSent: '05/04/2026 13:00', sender: 'Layla Al-Zahrani',  templateName: 'Fuel Station Update',        message: 'Fuel station 4 at Jeddah Hub is temporarily closed for maintenance. Please use station 2 or 6 as alternatives.',   recipients: 27,  hasReport: true  },
  { id: 8,  dateSent: '05/04/2026 09:45', sender: 'Ahmed Al-Otaibi',   templateName: 'Morning Shift Briefing',     message: 'Good morning. Today is a high-demand day. All vehicles must be on route by 07:30. No late departures.',              recipients: 52,  hasReport: true  },
  { id: 9,  dateSent: '04/04/2026 18:15', sender: 'Sultan Al-Rashid',  templateName: 'Emergency Broadcast',        message: 'Urgent: All drivers in Makkah region must report to depot immediately. Emergency protocol activated.',               recipients: 18,  hasReport: true  },
  { id: 10, dateSent: '04/04/2026 15:50', sender: 'Nora Al-Qahtani',   templateName: 'Policy Update',              message: 'Updated vehicle inspection checklist is now in effect. Please review the new form before your next pre-trip check.', recipients: 110, hasReport: false },
  { id: 11, dateSent: '04/04/2026 12:30', sender: 'Khalid Al-Mutairi', templateName: 'Route Update Alert',         message: 'Route R-305 Industrial is now clear after earlier incident. Normal operations can resume.',                         recipients: 19,  hasReport: true  },
  { id: 12, dateSent: '03/04/2026 17:00', sender: 'Faisal Al-Dosari',  templateName: 'End of Day Summary',         message: 'Please ensure all trip logs are submitted before 18:30. Incomplete logs will be flagged for review.',               recipients: 44,  hasReport: true  },
  { id: 13, dateSent: '03/04/2026 10:20', sender: 'Omar Al-Harbi',     templateName: 'Training Reminder',          message: 'Mandatory driver safety training session is scheduled for Saturday 06/04. Attendance is compulsory.',               recipients: 73,  hasReport: false },
  { id: 14, dateSent: '02/04/2026 16:45', sender: 'Layla Al-Zahrani',  templateName: 'Maintenance Reminder',       message: 'Vehicles KSA-2041 and KSA-2042 are due for their 10,000km service. Please schedule with Workshop B.',               recipients: 8,   hasReport: true  },
  { id: 15, dateSent: '02/04/2026 09:00', sender: 'Ahmed Al-Otaibi',   templateName: 'Morning Shift Briefing',     message: 'Good morning. All routes are clear. Ensure passenger manifests are completed before boarding.',                      recipients: 55,  hasReport: true  },
];

export const STATS_MOCK = {
  today:     12,
  yesterday: 18,
  thisMonth: 247,
  lastMonth: 312,
  thisYear:  1840,
  allTime:   9420,
};

export const TEMPLATE_OPTIONS = [
  'Morning Shift Briefing',
  'Route Update Alert',
  'End of Day Summary',
  'Maintenance Reminder',
  'Safety Alert',
  'Shift Change Notice',
  'Emergency Broadcast',
  'Policy Update',
  'Training Reminder',
];

export const RECIPIENT_OPTIONS = [
  'All Drivers',
  'All Dispatchers',
  'Riyadh Region',
  'Jeddah Region',
  'Eastern Province',
  'Makkah Region',
  'Madinah Region',
  'North Depot Team',
  'South Depot Team',
  'Workshop Staff',
];

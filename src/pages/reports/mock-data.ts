export interface ReportRow {
  id: number;
  name: string;
  description: string;
  reportType: string;
  lastGenerated: string;
}

export const REPORTS_MOCK: ReportRow[] = [
  { id: 1,  name: 'Asset Check Report',                  description: 'This report keeps track of asset checks by asset number.',                                          reportType: 'Standard', lastGenerated: '06:00:39 08 Apr 2026' },
  { id: 2,  name: 'Asset Defect Report',                 description: 'This report keeps track of asset defects by Asset number.',                                         reportType: 'Standard', lastGenerated: '04:07:18 23 Dec 2025' },
  { id: 3,  name: 'Asset Details Report',                description: 'This report keeps track of Asset details.',                                                          reportType: 'Standard', lastGenerated: '07:48:49 16 May 2025' },
  { id: 4,  name: 'Asset Maintenance Report',            description: 'This report keeps track of Asset maintenance details.',                                              reportType: 'Standard', lastGenerated: '11:05:37 18 Mar 2026' },
  { id: 5,  name: 'Asset VOR Status Report',             description: 'This report keeps track of assets that have been VOR\'d in the date range requested.',              reportType: 'Standard', lastGenerated: '10:48:48 10 Mar 2026' },
  { id: 6,  name: 'Fleet Archive Report',                description: 'This report provides an overview of the archived vehicles and associated details.',                  reportType: 'Standard', lastGenerated: '04:36:34 12 Dec 2025' },
  { id: 7,  name: 'Fleet Disposition Report',            description: 'This report provides an overview of the fleet and associated details.',                              reportType: 'Standard', lastGenerated: '05:21:45 20 Feb 2026' },
  { id: 8,  name: 'Last Login Report',                   description: 'This report keeps track of the last time users logged in.',                                          reportType: 'Standard', lastGenerated: '03:06:28 28 Mar 2026' },
  { id: 9,  name: 'Line Manager Journey Report',         description: 'This report keeps track of user journeys for all users reporting directly to a line manager.',       reportType: 'Standard', lastGenerated: '' },
  { id: 10, name: 'P11D Vehicle Changes',                description: 'Captures all employee vehicle assignments and any changes relevant for P11D reporting.',             reportType: 'Standard', lastGenerated: '07:01:23 28 Oct 2025' },
  { id: 11, name: 'Trailer PMI Performance Report',      description: 'This report tracks the performance of the completion of trailer PMI maintenance events.',            reportType: 'Standard', lastGenerated: '04:56:08 06 Feb 2026' },
  { id: 12, name: 'User Checks Report',                  description: 'This report keeps track of user vehicle checks.',                                                    reportType: 'Standard', lastGenerated: '06:28:30 22 Jan 2026' },
  { id: 13, name: 'User Defects Report',                 description: 'This report keeps track of user vehicle defects.',                                                   reportType: 'Standard', lastGenerated: '12:30:59 18 Mar 2026' },
  { id: 14, name: 'User Details Report',                 description: 'This report keeps track of user details.',                                                           reportType: 'Standard', lastGenerated: '06:48:32 14 Nov 2025' },
  { id: 15, name: 'Vehicle Assignment Report',           description: 'This report provides visibility into vehicle assignment history within a specified date range.',     reportType: 'Standard', lastGenerated: '' },
  { id: 16, name: 'Vehicle Checks Calendar Tracker Report', description: 'This report keeps track of vehicle checks by date.',                                             reportType: 'Standard', lastGenerated: '03:06:40 28 Mar 2026' },
  { id: 17, name: 'Vehicle Checks Report',               description: 'This report keeps track of vehicle checks by registration number.',                                  reportType: 'Standard', lastGenerated: '06:00:27 08 Apr 2026' },
  { id: 18, name: 'Vehicle Defects Report',              description: 'This report keeps track of vehicle defects by registration number.',                                 reportType: 'Standard', lastGenerated: '06:00:15 08 Apr 2026' },
  { id: 19, name: 'Vehicle Details Report',              description: 'This report keeps track of vehicle details.',                                                        reportType: 'Standard', lastGenerated: '08:12:44 02 Apr 2026' },
  { id: 20, name: 'Vehicle VOR Status Report',           description: 'This report keeps track of vehicles that have been VOR\'d in the date range requested.',            reportType: 'Standard', lastGenerated: '10:48:48 10 Mar 2026' },
  { id: 21, name: 'Workshop Report',                     description: 'This report keeps track of workshop activity and maintenance records.',                              reportType: 'Standard', lastGenerated: '09:15:22 01 Apr 2026' },
  { id: 22, name: 'Driver Behaviour Report',             description: 'This report tracks driver behaviour events and scores.',                                             reportType: 'Standard', lastGenerated: '07:30:00 05 Apr 2026' },
  { id: 23, name: 'Fuel Usage Report',                   description: 'This report tracks fuel consumption across the fleet.',                                              reportType: 'Standard', lastGenerated: '06:45:10 07 Apr 2026' },
  { id: 24, name: 'Mileage Report',                      description: 'This report tracks total mileage per vehicle over a selected period.',                              reportType: 'Standard', lastGenerated: '05:00:00 06 Apr 2026' },
];

export const REPORT_TYPES = ['All Types', 'Standard', 'Custom'];

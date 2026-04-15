export type DateStatus = 'overdue' | 'warning' | 'ok' | 'none';

export interface InspectionDate {
  value: string; // display string e.g. "12/03/2026"
  status: DateStatus;
}

export interface VehicleRow {
  id: number;
  registration: string;
  division: string;
  region: string;
  location: string;
  supplier: string;
  adrTest: InspectionDate;
  annualService: InspectionDate;
  cambelChange: InspectionDate;
  collection: InspectionDate;
  pmi: InspectionDate;
  brakeTest: InspectionDate;
}

export interface AssetRow {
  id: number;
  assetNumber: string;
  division: string;
  region: string;
  location: string;
  adrTest: InspectionDate;
  annualService: InspectionDate;
  corrosionInspection: InspectionDate;
  electricalInspection: InspectionDate;
  ladenBrakeTest: InspectionDate;
  lolerTest: InspectionDate;
}

function d(value: string, status: DateStatus): InspectionDate {
  return { value, status };
}

export const VEHICLE_ROWS: VehicleRow[] = [
  { id: 1,  registration: 'BUS-0041', division: 'North',  region: 'Region A', location: 'Depot 1',  supplier: 'Al Futtaim',  adrTest: d('15/06/2026','warning'), annualService: d('01/04/2026','overdue'), cambelChange: d('20/08/2026','ok'),    collection: d('10/05/2026','warning'), pmi: d('05/04/2026','overdue'), brakeTest: d('30/09/2026','ok') },
  // CONFLICT: annualService + collection both on 18/05/2026
  { id: 2,  registration: 'BUS-0112', division: 'South',  region: 'Region B', location: 'Depot 2',  supplier: 'FAMCO',       adrTest: d('22/07/2026','ok'),     annualService: d('18/05/2026','warning'), cambelChange: d('11/03/2026','overdue'), collection: d('18/05/2026','warning'), pmi: d('14/07/2026','ok'),     brakeTest: d('08/04/2026','overdue') },
  { id: 3,  registration: 'BUS-0198', division: 'East',   region: 'Region C', location: 'Depot 3',  supplier: 'Al Futtaim',  adrTest: d('03/09/2026','ok'),     annualService: d('29/04/2026','warning'), cambelChange: d('17/06/2026','ok'),    collection: d('12/08/2026','ok'),    pmi: d('22/05/2026','warning'), brakeTest: d('15/07/2026','ok') },
  // CONFLICT: adrTest + collection both on 07/04/2026
  { id: 4,  registration: 'BUS-0204', division: 'West',   region: 'Region A', location: 'Depot 4',  supplier: 'Trident',     adrTest: d('07/04/2026','overdue'), annualService: d('30/06/2026','ok'),     cambelChange: d('25/09/2026','ok'),    collection: d('07/04/2026','overdue'), pmi: d('18/08/2026','ok'),     brakeTest: d('20/05/2026','warning') },
  { id: 5,  registration: 'BUS-0301', division: 'North',  region: 'Region B', location: 'Depot 1',  supplier: 'FAMCO',       adrTest: d('19/05/2026','warning'), annualService: d('14/07/2026','ok'),     cambelChange: d('08/04/2026','overdue'), collection: d('27/05/2026','warning'), pmi: d('03/09/2026','ok'),     brakeTest: d('11/06/2026','ok') },
  { id: 6,  registration: 'BUS-0302', division: 'South',  region: 'Region C', location: 'Depot 2',  supplier: 'Al Futtaim',  adrTest: d('28/08/2026','ok'),     annualService: d('06/04/2026','overdue'), cambelChange: d('14/07/2026','ok'),    collection: d('19/09/2026','ok'),    pmi: d('25/04/2026','warning'), brakeTest: d('02/08/2026','ok') },
  { id: 7,  registration: 'BUS-0303', division: 'East',   region: 'Region A', location: 'Depot 3',  supplier: 'Trident',     adrTest: d('11/06/2026','ok'),     annualService: d('23/08/2026','ok'),     cambelChange: d('30/04/2026','warning'), collection: d('08/07/2026','ok'),    pmi: d('16/06/2026','ok'),     brakeTest: d('27/04/2026','warning') },
  // CONFLICT: adrTest + pmi both on 04/04/2026
  { id: 8,  registration: 'BUS-0304', division: 'West',   region: 'Region B', location: 'Depot 4',  supplier: 'FAMCO',       adrTest: d('04/04/2026','overdue'), annualService: d('17/05/2026','warning'), cambelChange: d('22/08/2026','ok'),    collection: d('14/06/2026','ok'),    pmi: d('04/04/2026','overdue'), brakeTest: d('18/09/2026','ok') },
  { id: 9,  registration: 'BUS-0305', division: 'North',  region: 'Region C', location: 'Depot 1',  supplier: 'Al Futtaim',  adrTest: d('16/07/2026','ok'),     annualService: d('02/09/2026','ok'),     cambelChange: d('05/05/2026','warning'), collection: d('21/04/2026','warning'), pmi: d('28/07/2026','ok'),     brakeTest: d('06/05/2026','warning') },
  { id: 10, registration: 'BUS-0306', division: 'South',  region: 'Region A', location: 'Depot 2',  supplier: 'Trident',     adrTest: d('25/09/2026','ok'),     annualService: d('11/06/2026','ok'),     cambelChange: d('18/04/2026','warning'), collection: d('30/07/2026','ok'),    pmi: d('14/05/2026','warning'), brakeTest: d('23/08/2026','ok') },
  { id: 11, registration: 'BUS-0077', division: 'East',   region: 'Region B', location: 'Depot 3',  supplier: 'FAMCO',       adrTest: d('08/05/2026','warning'), annualService: d('26/07/2026','ok'),     cambelChange: d('12/09/2026','ok'),    collection: d('04/04/2026','overdue'), pmi: d('20/06/2026','ok'),     brakeTest: d('15/04/2026','overdue') },
  // CONFLICT: annualService + brakeTest both on 09/04/2026
  { id: 12, registration: 'BUS-0088', division: 'West',   region: 'Region C', location: 'Depot 4',  supplier: 'Al Futtaim',  adrTest: d('31/08/2026','ok'),     annualService: d('09/04/2026','overdue'), cambelChange: d('27/06/2026','ok'),    collection: d('16/08/2026','ok'),    pmi: d('02/05/2026','warning'), brakeTest: d('09/04/2026','overdue') },
];

export const ASSET_ROWS: AssetRow[] = [
  // CONFLICT: annualService + ladenBrakeTest both on 01/04/2026
  { id: 1,  assetNumber: 'AST-1001', division: 'North',  region: 'Region A', location: 'Depot 1', adrTest: d('15/06/2026','warning'), annualService: d('01/04/2026','overdue'), corrosionInspection: d('20/08/2026','ok'),    electricalInspection: d('10/05/2026','warning'), ladenBrakeTest: d('01/04/2026','overdue'), lolerTest: d('30/09/2026','ok') },
  { id: 2,  assetNumber: 'AST-1002', division: 'South',  region: 'Region B', location: 'Depot 2', adrTest: d('22/07/2026','ok'),     annualService: d('18/05/2026','warning'), corrosionInspection: d('11/03/2026','overdue'), electricalInspection: d('25/06/2026','ok'),    ladenBrakeTest: d('14/07/2026','ok'),     lolerTest: d('08/04/2026','overdue') },
  { id: 3,  assetNumber: 'AST-1003', division: 'East',   region: 'Region C', location: 'Depot 3', adrTest: d('03/09/2026','ok'),     annualService: d('29/04/2026','warning'), corrosionInspection: d('17/06/2026','ok'),    electricalInspection: d('12/08/2026','ok'),    ladenBrakeTest: d('22/05/2026','warning'), lolerTest: d('15/07/2026','ok') },
  // CONFLICT: adrTest + electricalInspection both on 07/04/2026
  { id: 4,  assetNumber: 'AST-1004', division: 'West',   region: 'Region A', location: 'Depot 4', adrTest: d('07/04/2026','overdue'), annualService: d('30/06/2026','ok'),     corrosionInspection: d('25/09/2026','ok'),    electricalInspection: d('07/04/2026','overdue'), ladenBrakeTest: d('18/08/2026','ok'),     lolerTest: d('20/05/2026','warning') },
  { id: 5,  assetNumber: 'AST-1005', division: 'North',  region: 'Region B', location: 'Depot 1', adrTest: d('19/05/2026','warning'), annualService: d('14/07/2026','ok'),     corrosionInspection: d('08/04/2026','overdue'), electricalInspection: d('27/05/2026','warning'), ladenBrakeTest: d('03/09/2026','ok'),     lolerTest: d('11/06/2026','ok') },
  { id: 6,  assetNumber: 'AST-1006', division: 'South',  region: 'Region C', location: 'Depot 2', adrTest: d('28/08/2026','ok'),     annualService: d('06/04/2026','overdue'), corrosionInspection: d('14/07/2026','ok'),    electricalInspection: d('19/09/2026','ok'),    ladenBrakeTest: d('25/04/2026','warning'), lolerTest: d('02/08/2026','ok') },
  { id: 7,  assetNumber: 'AST-1007', division: 'East',   region: 'Region A', location: 'Depot 3', adrTest: d('11/06/2026','ok'),     annualService: d('23/08/2026','ok'),     corrosionInspection: d('30/04/2026','warning'), electricalInspection: d('08/07/2026','ok'),    ladenBrakeTest: d('16/06/2026','ok'),     lolerTest: d('27/04/2026','warning') },
  // CONFLICT: adrTest + ladenBrakeTest both on 04/04/2026
  { id: 8,  assetNumber: 'AST-1008', division: 'West',   region: 'Region B', location: 'Depot 4', adrTest: d('04/04/2026','overdue'), annualService: d('17/05/2026','warning'), corrosionInspection: d('22/08/2026','ok'),    electricalInspection: d('14/06/2026','ok'),    ladenBrakeTest: d('04/04/2026','overdue'), lolerTest: d('18/09/2026','ok') },
  { id: 9,  assetNumber: 'AST-1009', division: 'North',  region: 'Region C', location: 'Depot 1', adrTest: d('16/07/2026','ok'),     annualService: d('02/09/2026','ok'),     corrosionInspection: d('05/05/2026','warning'), electricalInspection: d('21/04/2026','warning'), ladenBrakeTest: d('28/07/2026','ok'),     lolerTest: d('06/05/2026','warning') },
  { id: 10, assetNumber: 'AST-1010', division: 'South',  region: 'Region A', location: 'Depot 2', adrTest: d('25/09/2026','ok'),     annualService: d('11/06/2026','ok'),     corrosionInspection: d('18/04/2026','warning'), electricalInspection: d('30/07/2026','ok'),    ladenBrakeTest: d('14/05/2026','warning'), lolerTest: d('23/08/2026','ok') },
];

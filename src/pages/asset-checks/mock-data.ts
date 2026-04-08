export type AssetStatus = 'Roadworthy' | 'Roadworthy (with defects)' | 'VOR' | 'Safe to operate';
export type CheckResult = 'Roadworthy' | 'Safe to operate';

export interface AssetCheckRow {
  id: number;
  date: string;
  assetNumber: string;
  check: string;
  type: string;
  assetStatus: AssetStatus;
  checkResult: CheckResult;
  createdBy: string;
}

export const ASSET_CHECKS_MOCK: AssetCheckRow[] = [
  { id: 1,  date: '12:12:42 08 Apr 2026', assetNumber: 'ST47',  check: 'Asset return',   type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'A Davidson' },
  { id: 2,  date: '11:38:00 08 Apr 2026', assetNumber: 'ST48',  check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'R Ziobrowski' },
  { id: 3,  date: '11:36:32 08 Apr 2026', assetNumber: 'ST48',  check: 'Asset return',   type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'R Ziobrowski' },
  { id: 4,  date: '11:34:14 08 Apr 2026', assetNumber: 'HYP6',  check: 'Asset return',   type: 'HYPO Tank',            assetStatus: 'Roadworthy',                checkResult: 'Roadworthy',      createdBy: 'P Roud' },
  { id: 5,  date: '10:00:20 08 Apr 2026', assetNumber: 'ST44',  check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'D Murphy' },
  { id: 6,  date: '09:51:09 08 Apr 2026', assetNumber: 'ST40',  check: 'Asset return',   type: 'Stainless Steel Tank', assetStatus: 'Roadworthy',                checkResult: 'Roadworthy',      createdBy: 'D Murphy' },
  { id: 7,  date: '08:37:58 08 Apr 2026', assetNumber: 'FCH9',  check: 'Asset take out', type: 'Rubber Lined Tank',    assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'M Drane' },
  { id: 8,  date: '08:15:22 08 Apr 2026', assetNumber: 'LLYP14',check: 'Asset return',   type: 'HYPO Tank',            assetStatus: 'Roadworthy',                checkResult: 'Roadworthy',      createdBy: 'M Drane' },
  { id: 9,  date: '07:59:03 08 Apr 2026', assetNumber: 'ST48',  check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'R Ziobrowski' },
  { id: 10, date: '07:52:05 08 Apr 2026', assetNumber: 'ST40',  check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'D Murphy' },
  { id: 11, date: '07:50:50 08 Apr 2026', assetNumber: 'ST18',  check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy',                checkResult: 'Roadworthy',      createdBy: 'D Timney' },
  { id: 12, date: '07:47:49 08 Apr 2026', assetNumber: 'ST13',  check: 'Asset return',   type: 'Stainless Steel Tank', assetStatus: 'VOR',                       checkResult: 'Roadworthy',      createdBy: 'R Ziobrowski' },
  { id: 13, date: '07:27:17 08 Apr 2026', assetNumber: 'ST20',  check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy',                checkResult: 'Safe to operate', createdBy: 'C Gratton' },
  { id: 14, date: '07:14:18 08 Apr 2026', assetNumber: '320',   check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy',                checkResult: 'Roadworthy',      createdBy: 'D Horsman' },
  { id: 15, date: '07:10:58 08 Apr 2026', assetNumber: 'ST39',  check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'D Lewandowski' },
  { id: 16, date: '07:01:03 08 Apr 2026', assetNumber: 'RL15',  check: 'Asset take out', type: 'Rubber Lined Tank',    assetStatus: 'Roadworthy',                checkResult: 'Roadworthy',      createdBy: 'A Rockliffe' },
  { id: 17, date: '06:43:49 08 Apr 2026', assetNumber: 'RL24',  check: 'Asset take out', type: 'Rubber Lined Tank',    assetStatus: 'Roadworthy',                checkResult: 'Roadworthy',      createdBy: 'D Jackow' },
  { id: 18, date: '06:41:12 08 Apr 2026', assetNumber: 'ST9',   check: 'Asset take out', type: 'Stainless Steel Tank', assetStatus: 'Roadworthy (with defects)', checkResult: 'Roadworthy',      createdBy: 'J Schollck' },
];

export const ASSET_NUMBERS = [...new Set(ASSET_CHECKS_MOCK.map(r => r.assetNumber))];
export const CREATED_BY_OPTIONS = ['All Users', ...new Set(ASSET_CHECKS_MOCK.map(r => r.createdBy))];

export type AssetStatus = 'Roadworthy' | 'Roadworthy (with defects)' | 'VOR' | 'VOR - Quarantined';
export type Availability = 'Available' | 'In use' | 'Out for repair';

export interface AssetSearchRow {
  id: number;
  assetNumber: string;
  region: string;
  type: string;
  category: string;
  subCategory: string;
  ownership: string;
  assetStatus: AssetStatus;
  availability: Availability;
  checkedToday: boolean;
  vorDays?: number;
}

export const ASSET_SEARCH_MOCK: AssetSearchRow[] = [
  { id: 1,  assetNumber: '320',      region: 'Selby',         type: 'Stainless Steel Tank', category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'In use',       checkedToday: true },
  { id: 2,  assetNumber: 'A02',      region: 'West Thurrock', type: 'Amines Tank',          category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 267 },
  { id: 3,  assetNumber: 'BA1',      region: 'Selby',         type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'Available',    checkedToday: false },
  { id: 4,  assetNumber: 'BA2/RL16', region: 'Selby',         type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 2 },
  { id: 5,  assetNumber: 'RT1',      region: 'West Thurrock', type: 'Powder Tank',          category: 'Trailers', subCategory: 'Small trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 113 },
  { id: 6,  assetNumber: 'RT4',      region: 'West Thurrock', type: 'Powder Tank',          category: 'Trailers', subCategory: 'Small trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 111 },
  { id: 7,  assetNumber: 'RT5',      region: 'West Thurrock', type: 'Powder Tank',          category: 'Trailers', subCategory: 'Small trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 42 },
  { id: 8,  assetNumber: 'C409360',  region: 'Widnes',        type: 'Stainless Steel Tank', category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'VOR - Quarantined',         availability: 'Out for repair',checkedToday: false, vorDays: 557 },
  { id: 9,  assetNumber: 'CP1',      region: 'West Thurrock', type: 'Curtain Slider',       category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy (with defects)', availability: 'Available',    checkedToday: false },
  { id: 10, assetNumber: 'F3',       region: 'West Thurrock', type: 'Low Loader',           category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'Available',    checkedToday: false },
  { id: 11, assetNumber: 'F4',       region: 'Selby',         type: 'Curtain Slider',       category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 602 },
  { id: 12, assetNumber: 'F44',      region: 'West Thurrock', type: 'Trailer - 12 Weeks',   category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 557 },
  { id: 13, assetNumber: 'FCH1',     region: 'West Thurrock', type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 160 },
  { id: 14, assetNumber: 'FCH110',   region: 'Newport',       type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'Available',    checkedToday: false },
  { id: 15, assetNumber: 'FCH111',   region: 'Newport',       type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'Available',    checkedToday: false },
  { id: 16, assetNumber: 'FCH113',   region: 'West Thurrock', type: 'Iso Tank - RL',        category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'Available',    checkedToday: false },
  { id: 17, assetNumber: 'FCH14',    region: 'West Thurrock', type: 'Iso Tank - RL',        category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'Available',    checkedToday: false },
  { id: 18, assetNumber: 'FCH2',     region: 'West Thurrock', type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'VOR',                       availability: 'Out for repair',checkedToday: false, vorDays: 6 },
  { id: 19, assetNumber: 'FCH21',    region: 'Selby',         type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy',                availability: 'Available',    checkedToday: true },
  { id: 20, assetNumber: 'FCH22',    region: 'Hebburn',       type: 'Rubber Lined Tank',    category: 'Trailers', subCategory: 'Large trailer', ownership: 'Owned', assetStatus: 'Roadworthy (with defects)', availability: 'Available',    checkedToday: false },
];

export const REGIONS = ['All Regions', 'West Thurrock', 'Widnes', 'Hebburn', 'Selby', 'Newport'];
export const ASSET_STATUSES = ['All Statuses', 'Roadworthy', 'Roadworthy (with defects)', 'VOR', 'VOR - Quarantined'];
export const AVAILABILITIES = ['All', 'Available', 'In use', 'Out for repair'];

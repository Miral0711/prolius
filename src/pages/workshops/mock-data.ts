export type WorkshopUserStatus = 'Activated' | 'Re-send invite';

export interface WorkshopUserRow {
  id: number;
  company: string;
  firstName: string;
  lastName: string;
  usernameEmail: string;
  landlineNumber: string;
  mobileNumber: string;
  status: WorkshopUserStatus;
}

export const WORKSHOPS_MOCK: WorkshopUserRow[] = [
  { id: 1,  company: 'ICL - Hebburn',           firstName: 'Kevin',    lastName: 'Taylor',      usernameEmail: 'ktaylor@icgl.co.uk',                  landlineNumber: '',             mobileNumber: '',             status: 'Activated' },
  { id: 2,  company: 'Industrial Chemicals',     firstName: 'Devan',    lastName: 'Archer',      usernameEmail: 'darcher@icgl.co.uk',                  landlineNumber: '01375389054',  mobileNumber: '',             status: 'Activated' },
  { id: 3,  company: 'Industrial Chemicals',     firstName: 'Steven',   lastName: 'Goicoechea',  usernameEmail: 'SGoicoechea@icgl.co.uk',              landlineNumber: '01914309800',  mobileNumber: '',             status: 'Activated' },
  { id: 4,  company: 'Industrial Chemicals',     firstName: 'Michelle', lastName: 'Gower',       usernameEmail: 'mgower@icgl.co.uk',                   landlineNumber: '',             mobileNumber: '07912980833',  status: 'Activated' },
  { id: 5,  company: 'Industrial Chemicals',     firstName: 'Lee',      lastName: 'Pullen',      usernameEmail: 'l.Pullen@icgl.co.uk',                 landlineNumber: '',             mobileNumber: '07872867645',  status: 'Activated' },
  { id: 6,  company: 'Renault - West Thurrock',  firstName: 'Neil',     lastName: 'McCarthy',    usernameEmail: 'neil.mccarthy@renault-trucks.com',    landlineNumber: '01708 866643', mobileNumber: '',             status: 'Re-send invite' },
  { id: 7,  company: 'Renault - West Thurrock',  firstName: 'James',    lastName: 'Patten',      usernameEmail: 'james.patten@volvo.com',              landlineNumber: '01708 866643', mobileNumber: '',             status: 'Re-send invite' },
  { id: 8,  company: 'Purfleet Commercials',     firstName: 'Bradley',  lastName: 'Fage',        usernameEmail: 'bradley.fage@purcom.com',             landlineNumber: '01708 863931', mobileNumber: '',             status: 'Re-send invite' },
  { id: 9,  company: 'Purfleet Commercials',     firstName: 'Daniel',   lastName: 'Pyman',       usernameEmail: 'daniel.pyman@purcom.com',             landlineNumber: '01708 863931', mobileNumber: '',             status: 'Re-send invite' },
  { id: 10, company: 'Commercial Motors - Ma',   firstName: 'Robin',    lastName: 'Clayton',     usernameEmail: 'robinclayton@commercial-motors.com',  landlineNumber: '01633 273000', mobileNumber: '',             status: 'Re-send invite' },
  { id: 11, company: 'Commercial Motors - Ma',   firstName: 'Robert',   lastName: 'Jones',       usernameEmail: 'robertjones@commercial-motors.com',   landlineNumber: '01633 273000', mobileNumber: '',             status: 'Re-send invite' },
  { id: 12, company: 'Commercial Motors - Ma',   firstName: 'Christine',lastName: 'Kent',        usernameEmail: 'christinekent@commercial-motors.com', landlineNumber: '01633 273000', mobileNumber: '',             status: 'Re-send invite' },
  { id: 13, company: 'Cruselys',                 firstName: 'Lewis',    lastName: 'Riddle',      usernameEmail: 'lewis@cruselytrailer.co.uk',          landlineNumber: '01708 861144', mobileNumber: '',             status: 'Re-send invite' },
  { id: 14, company: 'Cruselys',                 firstName: 'Richard',  lastName: 'Ely',         usernameEmail: 'richard@cruselytrailer.co.uk',        landlineNumber: '01708 861144', mobileNumber: '',             status: 'Re-send invite' },
  { id: 15, company: 'Ebor Trucks',              firstName: 'Sue',      lastName: 'Ebor',        usernameEmail: 'ebortrucksyork@gmail.com',            landlineNumber: '01904 700372', mobileNumber: '',             status: 'Re-send invite' },
  { id: 16, company: 'GCA',                      firstName: 'Kris',     lastName: 'Wilsher',     usernameEmail: 'kris.wilsher@gcauk.gcatrans.com',     landlineNumber: '01642 202457', mobileNumber: '',             status: 'Re-send invite' },
  { id: 17, company: 'Lynch Transport',          firstName: 'Mark',     lastName: 'Owen',        usernameEmail: 'mark@lynchtankers.co.uk',             landlineNumber: '',             mobileNumber: '07709411983',  status: 'Re-send invite' },
  { id: 18, company: 'MAN - Gateshead',          firstName: 'Melissa',  lastName: 'Dixon',       usernameEmail: 'melissa.dixon@man.eu',                landlineNumber: '0191 4211111', mobileNumber: '',             status: 'Re-send invite' },
  { id: 19, company: 'MAN - Gateshead',          firstName: 'Paul',     lastName: 'Robson',      usernameEmail: 'paul.robson@man.eu',                  landlineNumber: '0191 4211111', mobileNumber: '',             status: 'Re-send invite' },
  { id: 20, company: 'Volvo Trucks - Teesside',  firstName: 'Gary',     lastName: 'Stephenson',  usernameEmail: 'gary.stephenson@volvo.com',           landlineNumber: '01642 244000', mobileNumber: '',             status: 'Re-send invite' },
];

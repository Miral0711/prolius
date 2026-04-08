export type UserStatus = 'Active' | 'Resend invite';

export interface UserRow {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  username: string;
  email: string;
  jobTitle: string;
  driverTag: string;
  mobileNumber: string;
  lastLoginWeb: string;
  status: UserStatus;
}

export const USERS_MOCK: UserRow[] = [
  { id: 1,  firstName: 'Alexander', lastName: 'Wilson',      company: 'ICL - Hebburn',          username: 'alexander.wilson',      email: 'alexander.wilson',          jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 2,  firstName: 'Andrew',    lastName: 'Davidson',    company: 'ICL - Port Clarence',    username: 'andrew.davidson',       email: 'andrew.davidson',           jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 3,  firstName: 'Andrew',    lastName: 'Rockliffe',   company: 'ICL - Newport',          username: 'andrew.rockliffe',      email: 'andrew.rockliffe',          jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 4,  firstName: 'Andrew',    lastName: 'Wells',       company: 'ICL - Hebburn',          username: 'andrew.wells',          email: 'andrew.wells',              jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 5,  firstName: 'Antony',    lastName: 'Doherty',     company: 'ICL - Hebburn',          username: 'antony.doherty',        email: 'antony.doherty',            jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 6,  firstName: 'Arkadiusz', lastName: 'Steronczak',  company: 'ICL - West Thurrock',    username: 'arkadiusz.steronczak',  email: 'arkadiusz.steronczak',      jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 7,  firstName: 'Arminas',   lastName: 'Tubis',       company: 'ICL - West Thurrock',    username: 'arminas.tubis',         email: 'arminas.tubis',             jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 8,  firstName: 'Ben',       lastName: 'Spence',      company: 'ICL - Selby',            username: 'ben.spence',            email: 'benspence1993@gmail.com',   jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '07369225554',  lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 9,  firstName: 'Bradley',   lastName: 'Carter',      company: 'ICL - West Thurrock',    username: 'bradley.carter',        email: 'bradley.carter',            jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 10, firstName: 'Brian',     lastName: 'Holme',       company: 'ICL - Widnes',           username: 'brian.holme',           email: 'brian.holme',               jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 11, firstName: 'Calum',     lastName: 'Arnison',     company: 'ICL - Hebburn',          username: 'CArnison@icgl.co.uk',   email: 'CArnison@icgl.co.uk',       jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Resend invite' },
  { id: 12, firstName: 'Carl',      lastName: 'Flynn',       company: 'ICL - West Thurrock',    username: 'carl.flynn',            email: 'carl.flynn',                jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 13, firstName: 'Charlie',   lastName: 'Gratton',     company: 'ICL - Hebburn',          username: 'charlie.gratton',       email: 'charlie.gratton',           jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 14, firstName: 'Chelsey',   lastName: 'Lawrence',    company: 'Industrial Chemicals',   username: 'CLawrence@icgl.co.uk',  email: 'CLawrence@icgl.co.uk',      jobTitle: 'Fleet Maintenance Su',   driverTag: '', mobileNumber: '07872867644',  lastLoginWeb: '10:37:30 08 Apr 2026',   status: 'Active' },
  { id: 15, firstName: 'Chris',     lastName: 'Doherty',     company: 'ICL - Hebburn',          username: 'chris.doherty',         email: 'chris.doherty',             jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 16, firstName: 'Chris',     lastName: 'Murry',       company: 'ICL - Port Clarence',    username: 'chris.murry',           email: 'chris.murry',               jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 17, firstName: 'Colin',     lastName: 'Campbell',    company: 'ICL - Hebburn',          username: 'colin.campbell',        email: 'colin.campbell',            jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 18, firstName: 'Daniel',    lastName: 'Thomas',      company: 'ICL - Newport',          username: 'daniel.thomas',         email: 'daniel.thomas',             jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 19, firstName: 'David',     lastName: 'Horsman',     company: 'ICL - Selby',            username: 'david.horsman',         email: 'david.horsman',             jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
  { id: 20, firstName: 'David',     lastName: 'Jackow',      company: 'ICL - West Thurrock',    username: 'david.jackow',          email: 'david.jackow',              jobTitle: 'HGV Driver',             driverTag: '', mobileNumber: '',             lastLoginWeb: 'No login data recorded', status: 'Active' },
];

import { CategoryItem } from '../types/scholarship';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { code: 'Open', label: 'Open / General', order: 1, active: true },
  { code: 'EWS', label: 'EWS (Economically Weaker)', order: 2, active: true },
  { code: 'OBC', label: 'OBC (Other Backward Class)', order: 3, active: true },
  { code: 'SC', label: 'SC (Scheduled Caste)', order: 4, active: true },
  { code: 'ST', label: 'ST (Scheduled Tribe)', order: 5, active: true },
  { code: 'VJ/DT', label: 'VJ / DT (Vimukta Jati)', order: 6, active: true },
  { code: 'NT-B', label: 'NT-B (Nomadic Tribes)', order: 7, active: true },
  { code: 'NT-C', label: 'NT-C (Dhangar & Allied)', order: 8, active: true },
  { code: 'NT-D', label: 'NT-D (Vanjari & Allied)', order: 9, active: true },
  { code: 'SEBC', label: 'SEBC (Socially & Educationally Backward)', order: 10, active: true },
  { code: 'Minority', label: 'Minority (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)', order: 11, active: true },
  { code: 'PWD', label: 'PWD / Divyangjan (≥40% disability)', order: 12, active: true },
  { code: 'Defence', label: 'Defence / Ex-Servicemen Wards', order: 13, active: true },
  { code: 'Orphan', label: 'Orphan (State Certificate)', order: 14, active: true },
  { code: 'Girls', label: 'Women / Girl Students Only', order: 15, active: true },
];

export const EDUCATION_LEVELS = ['Diploma', 'UG', 'PG', 'PhD', '12th pass'] as const;

export const ENGINEERING_BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Telecommunication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Automobile Engineering',
  'Instrumentation Engineering',
  'Biotechnology',
  'All Engineering Streams'
];

export const INDIAN_STATES = [
  'All India',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Delhi',
  'Uttar Pradesh',
  'Gujarat',
  'Telangana',
  'Andhra Pradesh',
  'Madhya Pradesh',
  'Rajasthan',
  'West Bengal',
  'Punjab',
  'Haryana',
  'Bihar',
  'Kerala',
  'Odisha',
  'Assam',
  'Jammu & Kashmir',
  'Ladakh'
];

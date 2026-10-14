export type ScholarshipType = 'Government' | 'Private';

export type ScholarshipStatus = 'Open' | 'Closing soon' | 'Upcoming' | 'Rolling' | 'Closed';

export type EducationLevel = 'Diploma' | 'UG' | 'PG' | 'PhD' | '12th pass';

export interface Scholarship {
  id: string; // unique slug e.g. 'aicte-pragati'
  name: string;
  short_name: string;
  aliases: string[]; // e.g. ['pragati', 'pragti', 'aicte girls']
  type: ScholarshipType;
  provider: string; // e.g. 'AICTE, Ministry of Education'
  level: EducationLevel[]; // e.g. ['Diploma', 'UG']
  courses: string[]; // e.g. ['Engineering', 'Technology', 'Architecture', 'Pharmacy']
  branches: string[]; // e.g. ['Computer', 'IT', 'Mechanical', 'Civil', 'Electrical', 'All']
  states: string[]; // e.g. ['All India'] or ['Maharashtra']
  categories: string[]; // e.g. ['Open', 'SC', 'ST', 'OBC', 'All']
  gender: 'Female only' | 'Male only' | 'All' | 'Transgender/All';
  min_percent?: number; // e.g. 60 or undefined
  max_income?: number; // annual family income in INR e.g. 800000 (8 Lakhs)
  amount_text: string; // e.g. '₹50,000 per year + college fee reimbursement'
  amount_value: number; // numeric value in INR for sorting e.g. 50000
  amount_frequency: 'Per Year' | 'One-Time' | 'Per Month' | 'Full Tuition';
  benefits: string; // detailed benefits description
  eligibility: string; // detailed eligibility criteria text
  special_criteria: {
    orphan?: boolean;
    pwd?: boolean;
    defence?: boolean;
    minority?: boolean;
    first_gen?: boolean;
    single_parent?: boolean;
    girls_only?: boolean;
  };
  disability_min_percent?: number; // e.g. 40%
  documents: string[]; // list of required documents
  selection_process: string;
  how_to_apply: string[]; // step-by-step instructions
  official_link: string; // portal / official site
  apply_link: string; // direct registration link
  notification_link?: string; // official PDF or gazette notification
  helpline?: string; // email or phone
  open_date: string; // ISO YYYY-MM-DD
  last_date: string; // ISO YYYY-MM-DD (or empty for rolling)
  status: ScholarshipStatus;
  renewable: boolean;
  featured: boolean;
  show_on_site: boolean;
  tags: string[]; // keywords e.g. ['Engineering', 'Girls', 'Central Govt']
  verified_on: string; // ISO YYYY-MM-DD
  added_on: string;
  internal_notes?: string; // official source URLs & verification notes
}

export interface CategoryItem {
  code: string;
  label: string;
  description?: string;
  order: number;
  active: boolean;
}

export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  tagline: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_subtitle: string;
  ticker_enabled: boolean;
  ticker_speed: number; // px/sec
  ticker_window_days: number; // e.g. 60 days
  ticker_min_items: number;
  contact_email: string;
  helpline_number: string;
}

export type ApplicationStage = 'Saved' | 'Preparing' | 'Applied' | 'Result';

export interface TrackedApplication {
  scholarshipId: string;
  stage: ApplicationStage;
  notes?: string;
  appliedDate?: string;
  resultDate?: string;
  resultStatus?: 'Pending' | 'Awarded' | 'Rejected';
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  domicile_state: string;
  gender: string;
  category: string;
  sub_category?: string;
  is_orphan: boolean;
  is_pwd: boolean;
  pwd_percent?: number;
  is_defence_ward: boolean;
  is_minority: boolean;
  minority_community?: string;
  is_first_gen: boolean;
  is_single_parent: boolean;
  current_level: EducationLevel | '';
  course: string;
  branch: string;
  year_of_study: number | string;
  college_type: string; // 'Government' | 'Aided' | 'Private' | 'Autonomous'
  accommodation: string; // 'Hostel' | 'Day Scholar'
  admission_route: string; // 'CAP' | 'Institute Level' | 'Direct Second Year'
  last_exam_percentage: number | '';
  tenth_percentage: number | '';
  twelfth_percentage: number | '';
  annual_family_income: number | '';
  parent_occupation?: string;
  existing_scholarship: boolean;
  preferred_type: 'Both' | 'Government' | 'Private';
}

export interface MatchScoreResult {
  scholarship: Scholarship;
  matchScore: number; // 0 - 100
  isEligible: boolean;
  ineligibilityReasons: string[];
  matchStrengths: string[];
  warningChecks: string[];
}

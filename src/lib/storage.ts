import { Scholarship, SiteSettings, UserProfile, TrackedApplication, CategoryItem } from '../types/scholarship';
import { SEED_SCHOLARSHIPS } from '../data/seedScholarships';
import { DEFAULT_SETTINGS } from '../data/settings';
import { INITIAL_CATEGORIES } from '../data/categories';
import { LanguageCode } from './i18n';

const SCHOLARSHIPS_KEY = 'scholarconnect_scholarships_v1';
const SETTINGS_KEY = 'scholarconnect_settings_v1';
const CATEGORIES_KEY = 'scholarconnect_categories_v1';
const SAVED_KEY = 'scholarconnect_saved_v1';
const APPLICATIONS_KEY = 'scholarconnect_apps_v1';
const PROFILE_KEY = 'scholarconnect_profile_v1';
const COMPARE_KEY = 'scholarconnect_compare_v1';
const THEME_KEY = 'scholarconnect-theme';
const LANG_KEY = 'scholarconnect-lang';
const AUDIT_LOG_KEY = 'scholarconnect_audit_log_v1';

export interface AuditLogItem {
  id: string;
  action: 'create' | 'update' | 'delete' | 'verify' | 'settings';
  target: string;
  timestamp: string;
  details: string;
}

export function getStoredScholarships(): Scholarship[] {
  try {
    const raw = localStorage.getItem(SCHOLARSHIPS_KEY);
    if (!raw) {
      // First run: save seed to localStorage
      localStorage.setItem(SCHOLARSHIPS_KEY, JSON.stringify(SEED_SCHOLARSHIPS));
      return SEED_SCHOLARSHIPS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SEED_SCHOLARSHIPS;
  } catch (err) {
    console.warn('Failed to parse stored scholarships, falling back to seed:', err);
    return SEED_SCHOLARSHIPS;
  }
}

export function saveStoredScholarships(scholarships: Scholarship[], auditDetail?: string): void {
  try {
    localStorage.setItem(SCHOLARSHIPS_KEY, JSON.stringify(scholarships));
    if (auditDetail) {
      addAuditLog('update', 'Scholarships Database', auditDetail);
    }
  } catch (err) {
    console.error('Failed to save scholarships:', err);
  }
}

export function getStoredSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: SiteSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    addAuditLog('settings', 'Site Settings', 'Updated tagline, ticker, or hero texts');
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
}

export function getStoredCategories(): CategoryItem[] {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: CategoryItem[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getSavedScholarshipIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSavedScholarship(id: string): boolean {
  const current = getSavedScholarshipIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter(x => x !== id) : [...current, id];
  localStorage.setItem(SAVED_KEY, JSON.stringify(updated));

  // Also maintain tracked applications list
  if (!exists) {
    addOrUpdateApplication(id, 'Saved');
  }
  return !exists;
}

export function getTrackedApplications(): TrackedApplication[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addOrUpdateApplication(
  scholarshipId: string,
  stage: TrackedApplication['stage'],
  notes?: string,
  resultStatus?: TrackedApplication['resultStatus']
): void {
  const current = getTrackedApplications();
  const index = current.findIndex(a => a.scholarshipId === scholarshipId);
  const updatedItem: TrackedApplication = {
    scholarshipId,
    stage,
    notes: notes ?? (index >= 0 ? current[index].notes : ''),
    resultStatus: resultStatus ?? (index >= 0 ? current[index].resultStatus : 'Pending'),
    updatedAt: new Date().toISOString()
  };

  if (index >= 0) {
    current[index] = updatedItem;
  } else {
    current.push(updatedItem);
  }
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(current));
}

export function removeTrackedApplication(scholarshipId: string): void {
  const current = getTrackedApplications().filter(a => a.scholarshipId !== scholarshipId);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(current));
}

export function getComparedScholarshipIds(): string[] {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleComparedScholarship(id: string): { ids: string[]; added: boolean } {
  const current = getComparedScholarshipIds();
  if (current.includes(id)) {
    const updated = current.filter(x => x !== id);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
    return { ids: updated, added: false };
  } else {
    // Max 3
    if (current.length >= 3) {
      return { ids: current, added: false };
    }
    const updated = [...current, id];
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
    return { ids: updated, added: true };
  }
}

export function clearComparedScholarships(): void {
  localStorage.setItem(COMPARE_KEY, JSON.stringify([]));
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr_guest',
  name: 'Anuj Sharma',
  email: 'anujw7226@gmail.com',
  phone: '+91 98765 43210',
  domicile_state: 'Maharashtra',
  gender: 'All',
  category: 'OBC',
  sub_category: 'Kunbi',
  is_orphan: false,
  is_pwd: false,
  pwd_percent: 0,
  is_defence_ward: false,
  is_minority: false,
  is_first_gen: true,
  is_single_parent: false,
  current_level: 'UG',
  course: 'Engineering',
  branch: 'Computer Engineering',
  year_of_study: 1,
  college_type: 'Government',
  accommodation: 'Day Scholar',
  admission_route: 'CAP',
  last_exam_percentage: 84.5,
  tenth_percentage: 88.2,
  twelfth_percentage: 84.5,
  annual_family_income: 350000,
  parent_occupation: 'Agriculture / Private Service',
  existing_scholarship: false,
  preferred_type: 'Both'
};

export function getStoredUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_USER_PROFILE));
      return DEFAULT_USER_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER_PROFILE;
  }
}

export function saveStoredUserProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getStoredTheme(): 'light' | 'dark' | 'system' {
  try {
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark' | 'system') || 'system';
  } catch {
    return 'system';
  }
}

export function applyThemeToDOM(theme: 'light' | 'dark' | 'system'): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
    body?.classList.add('dark');
    root.style.colorScheme = 'dark';
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    body?.classList.remove('dark');
    root.style.colorScheme = 'light';
    root.setAttribute('data-theme', 'light');
  }
}

export function saveStoredTheme(theme: 'light' | 'dark' | 'system'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  applyThemeToDOM(theme);
}

export function getStoredLang(): LanguageCode {
  try {
    const lang = localStorage.getItem(LANG_KEY) as LanguageCode;
    return lang || 'en';
  } catch {
    return 'en';
  }
}

export function saveStoredLang(lang: LanguageCode): void {
  localStorage.setItem(LANG_KEY, lang);
  document.cookie = `scholarconnect_lang=${lang};path=/;max-age=31536000`;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
}

export function getAuditLogs(): AuditLogItem[] {
  try {
    const raw = localStorage.getItem(AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [
      {
        id: 'log-1',
        action: 'verify',
        target: 'AICTE Pragati Scholarship for Girls',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        details: 'Verified criteria and updated deadline to 30 Nov 2026'
      },
      {
        id: 'log-2',
        action: 'create',
        target: 'Reliance Foundation UG Scholarship',
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
        details: 'Added Reliance Foundation 2026 scheme'
      }
    ];
  } catch {
    return [];
  }
}

export function addAuditLog(
  action: AuditLogItem['action'],
  target: string,
  details: string
): void {
  const current = getAuditLogs();
  const newItem: AuditLogItem = {
    id: `log-${Date.now()}`,
    action,
    target,
    timestamp: new Date().toISOString(),
    details
  };
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify([newItem, ...current.slice(0, 50)]));
}

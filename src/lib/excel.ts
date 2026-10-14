import * as XLSX from 'xlsx';
import { Scholarship, SiteSettings, CategoryItem } from '../types/scholarship';

export function exportScholarshipsToWorkbook(
  scholarships: Scholarship[],
  settings: SiteSettings,
  categories: CategoryItem[]
): void {
  const wb = XLSX.utils.book_new();

  // 1. Scholarships Sheet
  const flatScholarships = scholarships.map(s => ({
    id: s.id,
    name: s.name,
    short_name: s.short_name,
    aliases: s.aliases.join('|'),
    type: s.type,
    provider: s.provider,
    level: s.level.join('|'),
    courses: s.courses.join('|'),
    branches: s.branches.join('|'),
    states: s.states.join('|'),
    categories: s.categories.join('|'),
    gender: s.gender,
    min_percent: s.min_percent ?? '',
    max_income: s.max_income ?? '',
    amount_text: s.amount_text,
    amount_value: s.amount_value,
    amount_frequency: s.amount_frequency,
    benefits: s.benefits,
    eligibility: s.eligibility,
    orphan: s.special_criteria.orphan ? 'Y' : 'N',
    pwd: s.special_criteria.pwd ? 'Y' : 'N',
    defence: s.special_criteria.defence ? 'Y' : 'N',
    minority: s.special_criteria.minority ? 'Y' : 'N',
    girls_only: s.special_criteria.girls_only ? 'Y' : 'N',
    disability_min_percent: s.disability_min_percent ?? '',
    documents: s.documents.join('|'),
    selection_process: s.selection_process,
    how_to_apply: s.how_to_apply.join('|'),
    official_link: s.official_link,
    apply_link: s.apply_link,
    notification_link: s.notification_link ?? '',
    helpline: s.helpline ?? '',
    open_date: s.open_date,
    last_date: s.last_date,
    status: s.status,
    renewable: s.renewable ? 'Y' : 'N',
    featured: s.featured ? 'Y' : 'N',
    show_on_site: s.show_on_site ? 'Y' : 'N',
    tags: s.tags.join('|'),
    verified_on: s.verified_on,
    added_on: s.added_on,
    internal_notes: s.internal_notes ?? ''
  }));

  const wsScholarships = XLSX.utils.json_to_sheet(flatScholarships);
  XLSX.utils.book_append_sheet(wb, wsScholarships, 'Scholarships');

  // 2. Settings Sheet
  const settingsRows = [
    { key: 'site_name', value: settings.site_name, description: 'Display name of website' },
    { key: 'site_tagline', value: settings.site_tagline, description: 'Short brand theme line' },
    { key: 'tagline', value: settings.tagline, description: 'Main banner tagline' },
    { key: 'hero_title_1', value: settings.hero_title_1, description: 'Hero line 1' },
    { key: 'hero_title_2', value: settings.hero_title_2, description: 'Hero line 2' },
    { key: 'hero_subtitle', value: settings.hero_subtitle, description: 'Hero subtitle' },
    { key: 'ticker_speed', value: settings.ticker_speed, description: 'Ticker scroll speed in px/s' },
    { key: 'ticker_window_days', value: settings.ticker_window_days, description: 'Ticker window in days' },
    { key: 'contact_email', value: settings.contact_email, description: 'Support email' },
    { key: 'helpline_number', value: settings.helpline_number, description: 'Toll-free helpline' }
  ];
  const wsSettings = XLSX.utils.json_to_sheet(settingsRows);
  XLSX.utils.book_append_sheet(wb, wsSettings, 'Settings');

  // 3. Categories Sheet
  const wsCategories = XLSX.utils.json_to_sheet(categories);
  XLSX.utils.book_append_sheet(wb, wsCategories, 'Categories');

  // 4. README Sheet
  const readmeData = [
    { Instructions: 'HOW TO EDIT THIS SPREADSHEET' },
    { Instructions: '1. Scholarships tab is the single source of truth for all entries.' },
    { Instructions: '2. Multiple values in fields like aliases, branches, states, categories must be separated by pipe (|).' },
    { Instructions: '3. Dates must be in YYYY-MM-DD format (e.g., 2026-10-31).' },
    { Instructions: '4. To hide a scholarship without deleting, change show_on_site to N.' },
    { Instructions: '5. Upload this workbook at /admin to update the website immediately.' }
  ];
  const wsReadme = XLSX.utils.json_to_sheet(readmeData);
  XLSX.utils.book_append_sheet(wb, wsReadme, 'README');

  // Download trigger
  XLSX.writeFile(wb, 'ScholarConnect_Scholarships_Master.xlsx');
}

export interface ParseResult {
  scholarships: Scholarship[];
  errors: string[];
  warnings: string[];
}

export function parseScholarshipsWorkbook(fileData: ArrayBuffer): ParseResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const scholarships: Scholarship[] = [];

  try {
    const wb = XLSX.read(fileData, { type: 'array' });
    const sheetName = wb.SheetNames.includes('Scholarships') ? 'Scholarships' : wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws);

    if (rawRows.length === 0) {
      errors.push('No data rows found in worksheet.');
      return { scholarships, errors, warnings };
    }

    rawRows.forEach((row, idx) => {
      const rowNum = idx + 2;
      const name = String(row.name || '').trim();
      const id = String(row.id || name.toLowerCase().replace(/[^a-z0-9]/g, '-')).trim();
      const type = (String(row.type || 'Government').toLowerCase().includes('priv') ? 'Private' : 'Government') as Scholarship['type'];

      if (!name) {
        warnings.push(`Row ${rowNum}: Skipped row without scholarship name.`);
        return;
      }

      const parseArray = (val: unknown): string[] => {
        if (!val) return [];
        return String(val).split('|').map(s => s.trim()).filter(Boolean);
      };

      const parseNumber = (val: unknown, fallback?: number): number | undefined => {
        if (val === undefined || val === null || val === '') return fallback;
        const n = Number(val);
        return isNaN(n) ? fallback : n;
      };

      const open_date = String(row.open_date || '2026-08-01').trim();
      const last_date = String(row.last_date || '').trim();

      // Compute status dynamically if needed
      let status = (String(row.status || 'Open').trim()) as Scholarship['status'];
      if (last_date) {
        const lastTime = new Date(last_date).getTime();
        const now = Date.now();
        if (lastTime < now) {
          status = 'Closed';
        } else if (lastTime - now < 15 * 86400000) {
          status = 'Closing soon';
        }
      }

      scholarships.push({
        id,
        name,
        short_name: String(row.short_name || name),
        aliases: parseArray(row.aliases),
        type,
        provider: String(row.provider || 'Scholarship Authority'),
        level: parseArray(row.level) as Scholarship['level'],
        courses: parseArray(row.courses).length ? parseArray(row.courses) : ['Engineering'],
        branches: parseArray(row.branches).length ? parseArray(row.branches) : ['All'],
        states: parseArray(row.states).length ? parseArray(row.states) : ['All India'],
        categories: parseArray(row.categories).length ? parseArray(row.categories) : ['Open'],
        gender: (String(row.gender || 'All')) as Scholarship['gender'],
        min_percent: parseNumber(row.min_percent),
        max_income: parseNumber(row.max_income),
        amount_text: String(row.amount_text || 'Financial Assistance'),
        amount_value: parseNumber(row.amount_value, 50000) ?? 50000,
        amount_frequency: (String(row.amount_frequency || 'Per Year')) as Scholarship['amount_frequency'],
        benefits: String(row.benefits || 'Tuition and educational assistance.'),
        eligibility: String(row.eligibility || 'Check official portal guidelines for detailed criteria.'),
        special_criteria: {
          orphan: String(row.orphan).toUpperCase() === 'Y',
          pwd: String(row.pwd).toUpperCase() === 'Y',
          defence: String(row.defence).toUpperCase() === 'Y',
          minority: String(row.minority).toUpperCase() === 'Y',
          girls_only: String(row.girls_only).toUpperCase() === 'Y'
        },
        disability_min_percent: parseNumber(row.disability_min_percent),
        documents: parseArray(row.documents),
        selection_process: String(row.selection_process || 'Merit and eligibility verification.'),
        how_to_apply: parseArray(row.how_to_apply),
        official_link: String(row.official_link || 'https://scholarships.gov.in'),
        apply_link: String(row.apply_link || row.official_link || 'https://scholarships.gov.in'),
        notification_link: row.notification_link ? String(row.notification_link) : undefined,
        helpline: row.helpline ? String(row.helpline) : undefined,
        open_date,
        last_date,
        status,
        renewable: String(row.renewable).toUpperCase() !== 'N',
        featured: String(row.featured).toUpperCase() === 'Y',
        show_on_site: String(row.show_on_site).toUpperCase() !== 'N',
        tags: parseArray(row.tags),
        verified_on: String(row.verified_on || '2026-10-12'),
        added_on: String(row.added_on || '2026-01-15'),
        internal_notes: row.internal_notes ? String(row.internal_notes) : undefined
      });
    });

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    errors.push(`Failed to parse file: ${errorMsg}`);
  }

  return { scholarships, errors, warnings };
}

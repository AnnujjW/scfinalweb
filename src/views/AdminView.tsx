import React, { useState, useRef } from 'react';
import {
  ShieldAlert,
  Plus,
  FileSpreadsheet,
  Upload,
  Download,
  Search,
  CheckCircle2,
  Trash2,
  Copy,
  Edit,
  Eye,
  Sliders,
  History,
  RotateCcw,
  Save,
  Check
} from 'lucide-react';
import { Scholarship, SiteSettings, CategoryItem } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate } from '../lib/i18n';
import { exportScholarshipsToWorkbook, parseScholarshipsWorkbook } from '../lib/excel';
import { AuditLogItem } from '../lib/storage';
import { TypeTag } from '../components/TypeTag';
import { EDUCATION_LEVELS, INDIAN_STATES } from '../data/categories';

interface AdminViewProps {
  scholarships: Scholarship[];
  onSaveScholarships: (updated: Scholarship[], auditDetail?: string) => void;
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  categories: CategoryItem[];
  auditLogs: AuditLogItem[];
  lang: LanguageCode;
  onNavigate: (route: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  scholarships,
  onSaveScholarships,
  settings,
  onSaveSettings,
  categories,
  auditLogs,
  lang,
  onNavigate
}) => {
  const t = getTranslation(lang);
  const [adminTab, setAdminTab] = useState<'scholarships' | 'settings' | 'audit'>('scholarships');
  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [isNewModal, setIsNewModal] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // Settings form state
  const [formSettings, setFormSettings] = useState<SiteSettings>({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered table rows
  const tableRows = scholarships.filter(s => {
    if (!searchTableQuery) return true;
    const q = searchTableQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.short_name.toLowerCase().includes(q) ||
      s.provider.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q)
    );
  });

  // Handle Excel Export
  const handleExportExcel = () => {
    exportScholarshipsToWorkbook(scholarships, settings, categories);
  };

  // Handle Excel Import
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const parsed = parseScholarshipsWorkbook(buffer);

      if (parsed.errors.length > 0) {
        setUploadNotice(`Error: ${parsed.errors.join('; ')}`);
        return;
      }

      if (parsed.scholarships.length > 0) {
        onSaveScholarships(parsed.scholarships, `Imported ${parsed.scholarships.length} scholarships from ${file.name}`);
        setUploadNotice(`Successfully imported ${parsed.scholarships.length} scholarships!`);
        setTimeout(() => setUploadNotice(null), 4000);
      }
    } catch (err) {
      setUploadNotice(`Failed to parse file: ${String(err)}`);
    }
  };

  // Mark Verified Today
  const handleMarkVerified = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = scholarships.map(s => (s.id === id ? { ...s, verified_on: today } : s));
    const target = scholarships.find(s => s.id === id);
    onSaveScholarships(updated, `Verified credentials for ${target?.short_name || target?.name}`);
  };

  // Toggle Show on Site
  const handleTogglePublish = (id: string) => {
    const updated = scholarships.map(s => (s.id === id ? { ...s, show_on_site: !s.show_on_site } : s));
    onSaveScholarships(updated, `Toggled publication status for ${id}`);
  };

  // Delete
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this scholarship?')) {
      const updated = scholarships.filter(s => s.id !== id);
      onSaveScholarships(updated, `Deleted scholarship ${id}`);
    }
  };

  // Duplicate
  const handleDuplicate = (s: Scholarship) => {
    const newId = `${s.id}-copy-${Date.now().toString().slice(-4)}`;
    const copy: Scholarship = {
      ...s,
      id: newId,
      name: `${s.name} (Copy)`,
      short_name: `${s.short_name} (Copy)`
    };
    onSaveScholarships([copy, ...scholarships], `Duplicated scholarship ${s.short_name}`);
  };

  // Save Add/Edit modal
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScholarship) return;

    if (isNewModal) {
      onSaveScholarships([editingScholarship, ...scholarships], `Added new scholarship ${editingScholarship.name}`);
    } else {
      const updated = scholarships.map(s => (s.id === editingScholarship.id ? editingScholarship : s));
      onSaveScholarships(updated, `Updated scholarship ${editingScholarship.name}`);
    }
    setEditingScholarship(null);
  };

  // Save Settings
  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formSettings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="max-w-[1240px] mx-auto w-full px-4 md:px-8 py-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
              ScholarConnect Admin Console
            </h1>
            <p className="text-xs text-slate-500">
              Manage single source of truth spreadsheet data, theme copy, and audit logs.
            </p>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-xs font-semibold">
          <button
            onClick={() => setAdminTab('scholarships')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              adminTab === 'scholarships'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Scholarships ({scholarships.length})
          </button>
          <button
            onClick={() => setAdminTab('settings')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              adminTab === 'settings'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Site Copy & Settings
          </button>
          <button
            onClick={() => setAdminTab('audit')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              adminTab === 'audit'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Audit Log
          </button>
        </div>
      </div>

      {uploadNotice && (
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-800 dark:text-indigo-300">
          {uploadNotice}
        </div>
      )}

      {/* TAB 1: SCHOLARSHIPS TABLE */}
      {adminTab === 'scholarships' && (
        <div className="space-y-4">
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTableQuery}
                onChange={e => setSearchTableQuery(e.target.value)}
                placeholder="Search table rows..."
                className="w-full h-9 pl-9 pr-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-indigo-500" />
                <span>Upload Excel / CSV</span>
              </button>

              <button
                type="button"
                onClick={handleExportExcel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-500" />
                <span>Export Excel (.xlsx)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsNewModal(true);
                  setEditingScholarship({
                    id: `new-${Date.now()}`,
                    name: '',
                    short_name: '',
                    aliases: [],
                    type: 'Government',
                    provider: '',
                    level: ['UG'],
                    courses: ['Engineering'],
                    branches: ['All'],
                    states: ['All India'],
                    categories: ['Open'],
                    gender: 'All',
                    amount_text: '₹50,000 per year',
                    amount_value: 50000,
                    amount_frequency: 'Per Year',
                    benefits: 'College tuition and maintenance allowance support.',
                    eligibility: 'Open to full-time technical students.',
                    special_criteria: {},
                    documents: ['10th & 12th marksheet', 'Income certificate', 'Admission fee receipt'],
                    selection_process: 'Merit list based on qualifying board marks.',
                    how_to_apply: ['Register on official portal.', 'Submit certified documents.'],
                    official_link: 'https://scholarships.gov.in',
                    apply_link: 'https://scholarships.gov.in',
                    open_date: '2026-08-01',
                    last_date: '2026-11-30',
                    status: 'Open',
                    renewable: true,
                    featured: false,
                    show_on_site: true,
                    tags: ['Engineering'],
                    verified_on: new Date().toISOString().split('T')[0],
                    added_on: new Date().toISOString().split('T')[0]
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Scholarship</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-500">
                  <th className="p-3 font-semibold">Scholarship Name</th>
                  <th className="p-3 font-semibold">Type</th>
                  <th className="p-3 font-semibold">Benefit Amount</th>
                  <th className="p-3 font-semibold">Deadline</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Published</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {tableRows.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-medium text-slate-900 dark:text-white max-w-[260px]">
                      <div className="truncate font-semibold">{s.short_name || s.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{s.provider}</div>
                    </td>
                    <td className="p-3">
                      <TypeTag type={s.type} lang={lang} size="sm" />
                    </td>
                    <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                      {s.amount_text.split('+')[0].trim()}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">
                      {s.last_date ? formatDate(s.last_date, lang) : 'Rolling'}
                    </td>
                    <td className="p-3">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleTogglePublish(s.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                          s.show_on_site
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {s.show_on_site ? 'Published' : 'Draft / Hidden'}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleMarkVerified(s.id)}
                          className="p-1 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 rounded cursor-pointer"
                          title="Mark verified today"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onNavigate(`/scholarship/${s.id}`)}
                          className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                          title="View detail page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setIsNewModal(false);
                            setEditingScholarship({ ...s });
                          }}
                          className="p-1 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(s)}
                          className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded cursor-pointer"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SITE COPY & SETTINGS */}
      {adminTab === 'settings' && (
        <form onSubmit={handleSaveSettingsSubmit} className="space-y-6 max-w-3xl">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 text-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Editable Theme Line & Brand Copy
            </h2>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Main Tagline (Displayed below Ticker)
              </label>
              <input
                type="text"
                value={formSettings.tagline}
                onChange={e => setFormSettings({ ...formSettings, tagline: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Site Tagline (Footer and Metadata)
              </label>
              <input
                type="text"
                value={formSettings.site_tagline}
                onChange={e => setFormSettings({ ...formSettings, site_tagline: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hero Headline 1
              </label>
              <input
                type="text"
                value={formSettings.hero_title_1}
                onChange={e => setFormSettings({ ...formSettings, hero_title_1: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hero Line 2
              </label>
              <input
                type="text"
                value={formSettings.hero_title_2}
                onChange={e => setFormSettings({ ...formSettings, hero_title_2: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ticker Speed (px/s)
                </label>
                <input
                  type="number"
                  value={formSettings.ticker_speed}
                  onChange={e => setFormSettings({ ...formSettings, ticker_speed: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Helpline Number
                </label>
                <input
                  type="text"
                  value={formSettings.helpline_number}
                  onChange={e => setFormSettings({ ...formSettings, helpline_number: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                {settingsSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
                <span>{settingsSaved ? 'Settings Saved Live!' : 'Save Settings Live'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: AUDIT LOG */}
      {adminTab === 'audit' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-500" />
            <span>Audit Trail (Modifications Log)</span>
          </h2>

          <div className="space-y-3">
            {auditLogs.map(log => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{log.target}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{log.details}</p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                  {formatDate(log.timestamp, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT SCHOLARSHIP MODAL */}
      {editingScholarship && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
              {isNewModal ? 'Add New Scholarship' : `Edit: ${editingScholarship.name}`}
            </h2>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Scholarship Name</label>
                  <input
                    type="text"
                    required
                    value={editingScholarship.name}
                    onChange={e => setEditingScholarship({ ...editingScholarship, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Short Name</label>
                  <input
                    type="text"
                    required
                    value={editingScholarship.short_name}
                    onChange={e => setEditingScholarship({ ...editingScholarship, short_name: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Type</label>
                  <select
                    value={editingScholarship.type}
                    onChange={e => setEditingScholarship({ ...editingScholarship, type: e.target.value as any })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Provider / Authority</label>
                  <input
                    type="text"
                    required
                    value={editingScholarship.provider}
                    onChange={e => setEditingScholarship({ ...editingScholarship, provider: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Benefit Amount Text</label>
                  <input
                    type="text"
                    value={editingScholarship.amount_text}
                    onChange={e => setEditingScholarship({ ...editingScholarship, amount_text: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Amount Value (INR)</label>
                  <input
                    type="number"
                    value={editingScholarship.amount_value}
                    onChange={e => setEditingScholarship({ ...editingScholarship, amount_value: Number(e.target.value) })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Deadline (YYYY-MM-DD)</label>
                  <input
                    type="text"
                    value={editingScholarship.last_date}
                    onChange={e => setEditingScholarship({ ...editingScholarship, last_date: e.target.value })}
                    placeholder="2026-11-30"
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Max Annual Income (INR)</label>
                  <input
                    type="number"
                    value={editingScholarship.max_income || ''}
                    onChange={e => setEditingScholarship({ ...editingScholarship, max_income: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="800000"
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Eligibility Criteria</label>
                <textarea
                  rows={3}
                  value={editingScholarship.eligibility}
                  onChange={e => setEditingScholarship({ ...editingScholarship, eligibility: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Portal Link</label>
                  <input
                    type="text"
                    value={editingScholarship.official_link}
                    onChange={e => setEditingScholarship({ ...editingScholarship, official_link: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Direct Apply Link</label>
                  <input
                    type="text"
                    value={editingScholarship.apply_link}
                    onChange={e => setEditingScholarship({ ...editingScholarship, apply_link: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingScholarship(null)}
                  className="px-4 py-2 rounded-full font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                  Save Scholarship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

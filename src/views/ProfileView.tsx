import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, DollarSign, Download, Trash2, ShieldCheck, Check } from 'lucide-react';
import { UserProfile, CategoryItem } from '../types/scholarship';
import { LanguageCode, getTranslation } from '../lib/i18n';
import { INDIAN_STATES, EDUCATION_LEVELS, ENGINEERING_BRANCHES } from '../data/categories';

interface ProfileViewProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  categories: CategoryItem[];
  lang: LanguageCode;
  onNavigate: (route: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onSaveProfile,
  categories,
  lang,
  onNavigate
}) => {
  const t = getTranslation(lang);
  const [profile, setProfile] = useState<UserProfile>({ ...userProfile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = <K extends keyof UserProfile>(key: K, val: UserProfile[K]) => {
    setProfile(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `ScholarConnect_Profile_${profile.name.replace(/\s+/g, '_')}.json`);
    dlAnchor.click();
  };

  return (
    <div className="max-w-[860px] mx-auto w-full px-4 md:px-8 py-4 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
          My Student Profile
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Your profile automatically powers the Smart Match calculator without retyping details.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            <span>Personal Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={e => handleChange('name', e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">State of Domicile</label>
              <select
                value={profile.domicile_state}
                onChange={e => handleChange('domicile_state', e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reservation Category</label>
              <select
                value={profile.category}
                onChange={e => handleChange('category', e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold text-indigo-600 dark:text-indigo-400"
              >
                {categories.filter(c => c.active).map(c => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Academic Qualifications</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Program Level</label>
              <select
                value={profile.current_level}
                onChange={e => handleChange('current_level', e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                {EDUCATION_LEVELS.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Branch / Course</label>
              <select
                value={profile.branch}
                onChange={e => handleChange('branch', e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                {ENGINEERING_BRANCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Exam Marks (%)</label>
              <input
                type="number"
                step="0.1"
                value={profile.last_exam_percentage}
                onChange={e => handleChange('last_exam_percentage', e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 tabular-nums font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">12th Marks (%)</label>
              <input
                type="number"
                step="0.1"
                value={profile.twelfth_percentage}
                onChange={e => handleChange('twelfth_percentage', e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 tabular-nums font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Family Income (₹)</label>
              <input
                type="number"
                value={profile.annual_family_income}
                onChange={e => handleChange('annual_family_income', e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 tabular-nums font-semibold text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : null}
              <span>{savedSuccess ? 'Profile Saved Successfully!' : 'Save Profile Changes'}</span>
            </button>
            <button
              type="button"
              onClick={handleExportData}
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download My Data (JSON)</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Stored locally on this device only</span>
          </div>
        </div>
      </form>
    </div>
  );
};

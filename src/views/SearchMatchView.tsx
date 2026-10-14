import React, { useState, useMemo } from 'react';
import {
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Sparkles,
  Info,
  Building,
  Heart,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Scholarship, UserProfile, CategoryItem } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate } from '../lib/i18n';
import { groupAndRankMatches } from '../lib/match';
import { TypeTag } from '../components/TypeTag';
import { INDIAN_STATES, EDUCATION_LEVELS, ENGINEERING_BRANCHES } from '../data/categories';

interface SearchMatchViewProps {
  scholarships: Scholarship[];
  categories: CategoryItem[];
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  savedIds: string[];
  comparedIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

export const SearchMatchView: React.FC<SearchMatchViewProps> = ({
  scholarships,
  categories,
  userProfile,
  onUpdateProfile,
  lang,
  onNavigate,
  savedIds,
  comparedIds,
  onToggleSave,
  onToggleCompare
}) => {
  const t = getTranslation(lang);

  // Stepper state: 1 (Basics) -> 2 (Education) -> 3 (Academics) -> 4 (Finance) -> 5 (Preferences) -> 6 (Results)
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  // Form profile state (prefilled from userProfile)
  const [formData, setFormData] = useState<UserProfile>({ ...userProfile });
  const [showNotEligible, setShowNotEligible] = useState(false);

  const handleUpdate = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFinish = () => {
    onUpdateProfile(formData);
    setStep(6); // Show results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  // Run matching engine
  const matchResults = useMemo(() => {
    return groupAndRankMatches(formData, scholarships);
  }, [formData, scholarships]);

  const { bestMatches, goodMatches, worthChecking, notEligible } = matchResults;

  // Progress bar %
  const progressPercent = Math.min(100, Math.round(((step - 1) / totalSteps) * 100));

  return (
    <div className="max-w-[1100px] mx-auto w-full px-4 md:px-8 py-4 space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Target className="w-3.5 h-3.5" />
          <span>Interactive Eligibility Calculator</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
          {t.heroSearchBtn}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
          Answer 5 quick sections to evaluate 100% of engineering & reserved category criteria.
        </p>
      </div>

      {step <= 5 ? (
        /* Questionnaire Container */
        <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                1. Basics: Domicile & Reservation Category
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  State or UT of Domicile
                </label>
                <select
                  value={formData.domicile_state}
                  onChange={e => handleUpdate('domicile_state', e.target.value)}
                  className="w-full h-11 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={e => handleUpdate('gender', e.target.value)}
                    className="w-full h-11 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">Male or Prefer Not to Say</option>
                    <option value="Female only">Female Student</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Category (Social Reservation)
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => handleUpdate('category', e.target.value)}
                    className="w-full h-11 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-semibold text-indigo-600 dark:text-indigo-400"
                  >
                    {categories.filter(c => c.active).map(c => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Situations */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Special Circumstances (Check if applicable):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.is_orphan}
                      onChange={e => handleUpdate('is_orphan', e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Orphan or Martyr Child</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.is_pwd}
                      onChange={e => handleUpdate('is_pwd', e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Divyangjan / PWD (≥40%)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.is_defence_ward}
                      onChange={e => handleUpdate('is_defence_ward', e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Defence / Ex-Servicemen Ward</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.is_minority}
                      onChange={e => handleUpdate('is_minority', e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Notified Religious Minority</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATION */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                2. Current Education Details
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Current Program Level
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {(['Diploma', 'UG', 'PG', 'PhD'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleUpdate('current_level', lvl)}
                      className={`py-2 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
                        formData.current_level === lvl
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Engineering Branch / Course
                </label>
                <select
                  value={formData.branch}
                  onChange={e => handleUpdate('branch', e.target.value)}
                  className="w-full h-11 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                >
                  {ENGINEERING_BRANCHES.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Admission Counseling Route
                  </label>
                  <select
                    value={formData.admission_route}
                    onChange={e => handleUpdate('admission_route', e.target.value)}
                    className="w-full h-11 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="CAP">Centralized (CAP / DTE)</option>
                    <option value="Direct Second Year">Direct 2nd Year (DSE)</option>
                    <option value="Institute Level">Institute / Management Quota</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Living Status
                  </label>
                  <select
                    value={formData.accommodation}
                    onChange={e => handleUpdate('accommodation', e.target.value)}
                    className="w-full h-11 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Day Scholar">Day Scholar (Home/Local)</option>
                    <option value="Hostel">College Hostel / Rented Room</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ACADEMICS */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                3. Academic Scores & Percentages
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Last Examination / Qualifying Percentage (%)
                </label>
                <input
                  type="number"
                  min="35"
                  max="100"
                  step="0.1"
                  value={formData.last_exam_percentage}
                  onChange={e => handleUpdate('last_exam_percentage', e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 84.5"
                  className="w-full h-11 px-3 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 tabular-nums"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    12th Standard Marks (%)
                  </label>
                  <input
                    type="number"
                    min="35"
                    max="100"
                    step="0.1"
                    value={formData.twelfth_percentage}
                    onChange={e => handleUpdate('twelfth_percentage', e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 82.0"
                    className="w-full h-11 px-3 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 tabular-nums"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    10th Standard Marks (%)
                  </label>
                  <input
                    type="number"
                    min="35"
                    max="100"
                    step="0.1"
                    value={formData.tenth_percentage}
                    onChange={e => handleUpdate('tenth_percentage', e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 88.4"
                    className="w-full h-11 px-3 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 tabular-nums"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FINANCE */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                4. Family Income (Annual)
              </h2>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Annual Household Income</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                    ₹{Number(formData.annual_family_income || 0).toLocaleString()}
                  </span>
                </div>

                {/* Range Presets */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: 'Under ₹2.5 Lakh', val: 240000 },
                    { label: '₹2.5L – ₹5.0L', val: 400000 },
                    { label: '₹5.0L – ₹8.0L', val: 750000 },
                  ].map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handleUpdate('annual_family_income', p.val)}
                      className={`py-2 px-1 text-center rounded-xl border text-[11px] font-semibold cursor-pointer ${
                        Number(formData.annual_family_income) === p.val
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="50000"
                  max="1200000"
                  step="25000"
                  value={Number(formData.annual_family_income || 300000)}
                  onChange={e => handleUpdate('annual_family_income', Number(e.target.value))}
                  className="w-full accent-indigo-600 mt-2 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  Government schemes (MahaDBT & AICTE) cap eligibility at ₹8 Lakh per annum for EBC/OBC/SEBC/Saksham.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: PREFERENCES */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                5. Search Preferences
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Preferred Scholarship Type
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['Both', 'Government', 'Private'] as const).map(pref => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => handleUpdate('preferred_type', pref)}
                      className={`py-2.5 rounded-xl border text-center font-bold cursor-pointer ${
                        formData.preferred_type === pref
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {pref === 'Both' ? 'Show Both' : pref}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800/70 text-xs text-teal-900 dark:text-teal-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />
                <span>
                  All set! Our deterministic engine will score 8 weighted parameters and immediately rank eligible schemes.
                </span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full cursor-pointer shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="inline-flex items-center gap-1.5 px-7 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full cursor-pointer shadow-md"
              >
                <span>Calculate My Matches</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RESULTS VIEW (STEP 6) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{t.editMyAnswers}</span>
              </button>
              <span className="text-xs text-slate-500">
                Matched for: {formData.category} · {formData.branch} · {formData.domicile_state}
              </span>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.printOrSavePdf}</span>
            </button>
          </div>

          {/* GROUP 1: BEST MATCHES (80%+) */}
          {bestMatches.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                  {t.matchBestMatches} ({bestMatches.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bestMatches.map(res => (
                  <MatchCard
                    key={res.scholarship.id}
                    result={res}
                    lang={lang}
                    isSaved={savedIds.includes(res.scholarship.id)}
                    isCompared={comparedIds.includes(res.scholarship.id)}
                    onToggleSave={onToggleSave}
                    onToggleCompare={onToggleCompare}
                    onSelect={slug => onNavigate(`/scholarship/${slug}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* GROUP 2: GOOD MATCHES (50% - 79%) */}
          {goodMatches.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                  {t.matchGoodMatches} ({goodMatches.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goodMatches.map(res => (
                  <MatchCard
                    key={res.scholarship.id}
                    result={res}
                    lang={lang}
                    isSaved={savedIds.includes(res.scholarship.id)}
                    isCompared={comparedIds.includes(res.scholarship.id)}
                    onToggleSave={onToggleSave}
                    onToggleCompare={onToggleCompare}
                    onSelect={slug => onNavigate(`/scholarship/${slug}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* GROUP 3: WORTH CHECKING (<50%) */}
          {worthChecking.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                  {t.matchWorthChecking} ({worthChecking.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {worthChecking.map(res => (
                  <MatchCard
                    key={res.scholarship.id}
                    result={res}
                    lang={lang}
                    isSaved={savedIds.includes(res.scholarship.id)}
                    isCompared={comparedIds.includes(res.scholarship.id)}
                    onToggleSave={onToggleSave}
                    onToggleCompare={onToggleCompare}
                    onSelect={slug => onNavigate(`/scholarship/${slug}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* GROUP 4: NOT ELIGIBLE ACCORDION (With explicit reasons why) */}
          {notEligible.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowNotEligible(!showNotEligible)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>{t.matchNotEligible} ({notEligible.length})</span>
                </div>
                {showNotEligible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showNotEligible && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {notEligible.map(res => (
                    <div
                      key={res.scholarship.id}
                      className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2 opacity-80"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {res.scholarship.short_name || res.scholarship.name}
                        </span>
                        <TypeTag type={res.scholarship.type} lang={lang} size="sm" />
                      </div>
                      <div className="space-y-1 text-[11px] text-rose-600 dark:text-rose-400">
                        {res.ineligibilityReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-start gap-1">
                            <span>✕</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Specialized MatchCard showing percentage ring & why it matches ticks
interface MatchCardProps {
  result: ReturnType<typeof groupAndRankMatches>['bestMatches'][0];
  lang: LanguageCode;
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelect: (slug: string) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  result: r,
  lang,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onSelect
}) => {
  const s = r.scholarship;

  return (
    <article className="p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
      <div>
        {/* Top bar with Match Score Ring */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            {/* Match Score Badge */}
            <div className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs flex items-center gap-1 border border-indigo-200/60 dark:border-indigo-800/60">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{r.matchScore}% Match</span>
            </div>
            <TypeTag type={s.type} lang={lang} size="sm" />
          </div>

          <button
            onClick={() => onToggleSave(s.id)}
            className={`p-1.5 rounded-full transition-colors ${
              isSaved ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'text-slate-400 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <button
          onClick={() => onSelect(s.id)}
          className="text-left font-heading font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2 cursor-pointer"
        >
          {s.name}
        </button>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
          {s.provider}
        </p>

        {/* Amount */}
        <div className="mt-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg inline-block">
          {s.amount_text}
        </div>

        {/* Why it matches (3 Green Ticks) */}
        {r.matchStrengths.length > 0 && (
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {r.matchStrengths.map((str, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px]">{str}</span>
              </div>
            ))}
          </div>
        )}

        {/* Warning checks (Amber points) */}
        {r.warningChecks.length > 0 && (
          <div className="mt-2 space-y-1 text-xs text-amber-700 dark:text-amber-400">
            {r.warningChecks.map((w, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-[11px]">{w}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
        <span className="text-[11px] text-slate-400">
          Last date: {s.last_date ? formatDate(s.last_date, lang) : 'Rolling'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(s.id)}
            className="px-3 py-1.5 rounded-full font-semibold text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 cursor-pointer"
          >
            Details
          </button>
          <a
            href={s.apply_link || s.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1 shadow-xs"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
};

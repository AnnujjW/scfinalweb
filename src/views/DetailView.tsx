import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Copy,
  Check,
  FileText,
  Clock,
  Sparkles,
  Phone,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Scholarship, UserProfile } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate } from '../lib/i18n';
import { calculateScholarshipMatch } from '../lib/match';
import { TypeTag } from '../components/TypeTag';
import { ScholarshipCard } from '../components/ScholarshipCard';

interface DetailViewProps {
  scholarship: Scholarship;
  allScholarships: Scholarship[];
  userProfile: UserProfile;
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onQuickView: (s: Scholarship) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  scholarship: s,
  allScholarships,
  userProfile,
  lang,
  onNavigate,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onQuickView
}) => {
  const t = getTranslation(lang);
  const [copiedLink, setCopiedLink] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Live match check against user's profile
  const matchEvaluation = calculateScholarshipMatch(userProfile, s);

  // Toggle document tick-off checklist
  const handleToggleDoc = (doc: string) => {
    setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

  // Copy share link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // WhatsApp share
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out ${s.name} (${s.type} Scholarship): ${s.amount_text}. Official portal deadline: ${s.last_date || 'Rolling'}. Details at ScholarConnect: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Calendar .ics download
  const handleDownloadICS = () => {
    if (!s.last_date) return;
    const dateFormatted = s.last_date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ScholarConnect//Scholarship Deadline//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Deadline: ${s.name} (${s.type})`,
      `DESCRIPTION:${s.amount_text}. Apply on official portal: ${s.official_link}`,
      `DTSTART;VALUE=DATE:${dateFormatted}`,
      `DTEND;VALUE=DATE:${dateFormatted}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${s.id}-deadline.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Similar scholarships (same type or branch)
  const similarScholarships = allScholarships
    .filter(item => item.id !== s.id && item.show_on_site && (item.type === s.type || item.level.some(l => s.level.includes(l))))
    .slice(0, 3);

  return (
    <div className="max-w-[1140px] mx-auto w-full px-4 md:px-8 py-4 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-indigo-600 cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigate(s.type === 'Government' ? '/government-scholarships' : '/private-scholarships')}
          className="hover:text-indigo-600 cursor-pointer"
        >
          {s.type} Scholarships
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
          {s.short_name || s.name}
        </span>
      </nav>

      {/* Main Header Card */}
      <div className="p-6 md:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TypeTag type={s.type} lang={lang} size="md" />
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {s.level.join(' / ')}
            </span>
            {s.renewable && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Renewable Yearly
              </span>
            )}
          </div>

          {/* Social & Save Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(s.id)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isSaved
                  ? 'border-rose-200 bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:border-rose-800'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500'
              }`}
              title={isSaved ? 'Saved to profile' : 'Save scholarship'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              title="Copy Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            {s.last_date && (
              <button
                onClick={handleDownloadICS}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                title="Add to Google / Apple Calendar"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>
            )}
          </div>
        </div>

        {/* Scholarship Name with Provider */}
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {s.name}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
            <Building className="w-4 h-4 text-slate-400" />
            <span>{s.provider}</span>
          </p>
        </div>

        {/* Primary CTA Row */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href={s.apply_link || s.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs md:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors cursor-pointer shadow-sm"
          >
            <span>{t.applyOnOfficialSite}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {s.notification_link && (
            <a
              href={s.notification_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Official Notification PDF</span>
            </a>
          )}
        </div>
      </div>

      {/* 2-Column Split: Left Detailed Content + Right Sticky Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Sections */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Live Interactive Eligibility Checker */}
          <div className="p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                  Live Eligibility Check Against Your Profile
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                {matchEvaluation.matchScore}% Match
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Comparing criteria against your saved profile ({userProfile.category}, {userProfile.branch}, {userProfile.domicile_state}):
            </p>

            {matchEvaluation.matchStrengths.length > 0 && (
              <div className="space-y-1.5 text-xs">
                {matchEvaluation.matchStrengths.map((str, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            )}

            {matchEvaluation.ineligibilityReasons.length > 0 && (
              <div className="space-y-1 text-xs text-rose-700 dark:text-rose-400 pt-1">
                {matchEvaluation.ineligibilityReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Detailed Overview & Benefits */}
          <section className="space-y-3">
            <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
              Scholarship Benefits & Coverage
            </h2>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-semibold text-emerald-900 dark:text-emerald-200 text-sm">
                {s.amount_text}
              </div>
              <p>{s.benefits}</p>
            </div>
          </section>

          {/* Section 3: Eligibility Checklist */}
          <section className="space-y-3">
            <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
              Detailed Eligibility Criteria
            </h2>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300 space-y-3">
              <p>{s.eligibility}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <span className="font-bold block text-slate-900 dark:text-white mb-0.5">Maximum Family Income:</span>
                  <span>{s.max_income ? `₹${s.max_income.toLocaleString()} per year` : 'No income cap'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <span className="font-bold block text-slate-900 dark:text-white mb-0.5">Academic Cutoff:</span>
                  <span>{s.min_percent ? `Minimum ${s.min_percent}% in qualifying exam` : 'Passing score in entrance/board'}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Document Tick-off Checklist */}
          {s.documents.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                  Mandatory Document Checklist
                </h2>
                <span className="text-[11px] text-slate-400">
                  Tick off documents you have prepared
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
                {s.documents.map((doc, idx) => {
                  const isChecked = !!checkedDocs[doc];
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border transition-colors cursor-pointer text-xs ${
                        isChecked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-medium'
                          : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleDoc(doc)}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span className={isChecked ? 'line-through opacity-80' : ''}>{doc}</span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section 5: How to Apply (Numbered Steps) */}
          {s.how_to_apply.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                How to Apply Step-by-Step
              </h2>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
                {s.how_to_apply.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Selection Process & Helpline */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Selection Process
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.selection_process}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                <span>Helpline & Queries</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {s.helpline || 'Refer to the official portal grievance desk.'}
              </p>
            </div>
          </section>

          {/* Section 7: Verification Stamp */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>{t.lastVerifiedOn.replace('{date}', formatDate(s.verified_on, lang))}</span>
            </div>
            <button
              onClick={() => onNavigate('/contact?type=correction')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Report an update
            </button>
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Quick Summary Card */}
        <aside className="lg:col-span-4 sticky top-20 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-5">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
              Scholarship Summary
            </h3>

            <div className="space-y-3.5 text-xs divide-y divide-slate-100 dark:divide-slate-800">
              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-500">Type</span>
                <TypeTag type={s.type} lang={lang} size="sm" />
              </div>

              <div className="pt-3.5 flex items-center justify-between">
                <span className="text-slate-500">Last Date</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {s.last_date ? formatDate(s.last_date, lang) : t.rolling}
                </span>
              </div>

              <div className="pt-3.5 flex items-center justify-between">
                <span className="text-slate-500">Applicable States</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {s.states.join(', ')}
                </span>
              </div>

              <div className="pt-3.5 flex items-center justify-between">
                <span className="text-slate-500">Target Categories</span>
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                  {s.categories.join(', ')}
                </span>
              </div>

              <div className="pt-3.5 flex items-center justify-between">
                <span className="text-slate-500">Gender Eligibility</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {s.gender}
                </span>
              </div>
            </div>

            <a
              href={s.apply_link || s.official_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>
      </div>

      {/* Similar Scholarships */}
      {similarScholarships.length > 0 && (
        <section className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
            Similar Scholarships You May Qualify For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarScholarships.map(item => (
              <ScholarshipCard
                key={item.id}
                scholarship={item}
                lang={lang}
                isSaved={s.id === item.id}
                isCompared={false}
                onToggleSave={onToggleSave}
                onToggleCompare={onToggleCompare}
                onSelect={slug => onNavigate(`/scholarship/${slug}`)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Application Action Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 dark:bg-[#161513]/95 backdrop-blur-xl border-t border-stone-200/90 dark:border-stone-800/90 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="min-w-0">
          <span className="text-[10px] text-stone-500 dark:text-stone-400 block uppercase font-bold tracking-wider">
            Benefit
          </span>
          <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate block">
            {s.amount_text.split('+')[0].trim()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSave(s.id)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isSaved
                ? 'border-rose-200 bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:border-rose-800'
                : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:text-rose-500'
            }`}
            title={isSaved ? 'Saved to profile' : 'Save scholarship'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>

          <a
            href={s.apply_link || s.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

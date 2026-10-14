import React from 'react';
import { X, ExternalLink, ArrowRight, Heart, Calendar, Building, DollarSign, BookOpen, FileText } from 'lucide-react';
import { Scholarship } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate } from '../lib/i18n';
import { TypeTag } from './TypeTag';

interface QuickViewDrawerProps {
  scholarship: Scholarship | null;
  onClose: () => void;
  lang: LanguageCode;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewFullDetails: (slug: string) => void;
}

export const QuickViewDrawer: React.FC<QuickViewDrawerProps> = ({
  scholarship: s,
  onClose,
  lang,
  isSaved,
  onToggleSave,
  onViewFullDetails
}) => {
  const t = getTranslation(lang);

  if (!s) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-250 p-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <TypeTag type={s.type} lang={lang} size="sm" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {s.level.join(', ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(s.id)}
              className={`p-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors ${
                isSaved ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="py-4 space-y-5 flex-1">
          <div>
            <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white leading-snug">
              {s.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>{s.provider}</span>
            </p>
          </div>

          {/* Amount Badge */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80">
            <span className="text-[11px] font-bold uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
              Scholarship Benefit
            </span>
            <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-200 mt-0.5">
              {s.amount_text}
            </p>
          </div>

          {/* Dates & Deadline */}
          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Last Date</span>
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {s.last_date ? formatDate(s.last_date, lang) : t.rolling}
            </span>
          </div>

          {/* Eligibility highlight */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Eligibility Overview</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              {s.eligibility}
            </p>
          </div>

          {/* Documents required */}
          {s.documents.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>Documents Needed</span>
              </h3>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
                {s.documents.slice(0, 4).map((doc, i) => (
                  <li key={i} className="truncate">{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-auto">
          <button
            onClick={() => {
              onClose();
              onViewFullDetails(s.id);
            }}
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>View Full Details & Requirements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={s.apply_link || s.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{t.applyOnOfficialSite}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

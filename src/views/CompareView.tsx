import React from 'react';
import { ArrowLeft, X, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { Scholarship } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate } from '../lib/i18n';
import { TypeTag } from '../components/TypeTag';

interface CompareViewProps {
  comparedIds: string[];
  scholarships: Scholarship[];
  onRemoveCompare: (id: string) => void;
  onClearCompare: () => void;
  lang: LanguageCode;
  onNavigate: (route: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  comparedIds,
  scholarships,
  onRemoveCompare,
  onClearCompare,
  lang,
  onNavigate
}) => {
  const t = getTranslation(lang);

  const items = scholarships.filter(s => comparedIds.includes(s.id));

  if (items.length === 0) {
    return (
      <div className="max-w-[1000px] mx-auto w-full px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
          No Scholarships Selected for Comparison
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          You can select up to 3 scholarships on the Explore or Government/Private pages using the compare checkbox.
        </p>
        <button
          onClick={() => onNavigate('/explore')}
          className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-xs"
        >
          Explore Scholarships
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1140px] mx-auto w-full px-4 md:px-8 py-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
            Compare Scholarships Side-by-Side
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comparing {items.length} of max 3 selected schemes.
          </p>
        </div>
        <button
          onClick={onClearCompare}
          className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
        >
          Clear Comparison
        </button>
      </div>

      {/* Mobile Swipe Hint */}
      <p className="sm:hidden text-center text-[11px] text-stone-400 dark:text-stone-500 font-medium py-1">
        ← Swipe horizontally to compare schemes →
      </p>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm scrollbar-thin">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <th className="p-4 w-36 sm:w-44 font-bold text-slate-400 uppercase tracking-wider text-[11px] sticky left-0 bg-white dark:bg-slate-900 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                Criteria
              </th>
              {items.map(s => (
                <th key={s.id} className="p-4 min-w-[240px] align-top">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <TypeTag type={s.type} lang={lang} size="sm" />
                      <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mt-1.5 line-clamp-2">
                        {s.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-normal mt-0.5 truncate">{s.provider}</p>
                    </div>
                    <button
                      onClick={() => onRemoveCompare(s.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {/* Amount */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] backdrop-blur-xs">
                Benefit Amount
              </td>
              {items.map(s => (
                <td key={s.id} className="p-4 font-semibold text-emerald-700 dark:text-emerald-400">
                  {s.amount_text}
                </td>
              ))}
            </tr>

            {/* Income Ceiling */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] backdrop-blur-xs">
                Income Limit
              </td>
              {items.map(s => (
                <td key={s.id} className="p-4">
                  {s.max_income ? `≤ ₹${s.max_income.toLocaleString()} / year` : 'No strict income cap'}
                </td>
              ))}
            </tr>

            {/* Academic Cutoff */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] backdrop-blur-xs">
                Minimum Marks
              </td>
              {items.map(s => (
                <td key={s.id} className="p-4">
                  {s.min_percent ? `≥ ${s.min_percent}% in qualifying exam` : 'Passing grade required'}
                </td>
              ))}
            </tr>

            {/* Target Categories */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] backdrop-blur-xs">
                Categories
              </td>
              {items.map(s => (
                <td key={s.id} className="p-4 font-medium">
                  {s.categories.join(', ')}
                </td>
              ))}
            </tr>

            {/* Eligible Levels */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] backdrop-blur-xs">
                Degree Level
              </td>
              {items.map(s => (
                <td key={s.id} className="p-4">
                  {s.level.join(', ')}
                </td>
              ))}
            </tr>

            {/* Application Deadline */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] backdrop-blur-xs">
                Application Deadline
              </td>
              {items.map(s => (
                <td key={s.id} className="p-4 font-bold">
                  {s.last_date ? formatDate(s.last_date, lang) : t.rolling}
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 font-bold text-slate-900 dark:text-white bg-slate-50/90 dark:bg-slate-800/90 sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] backdrop-blur-xs">
                Action
              </td>
              {items.map(s => (
                <td key={s.id} className="p-4 space-y-2">
                  <button
                    onClick={() => onNavigate(`/scholarship/${s.id}`)}
                    className="w-full py-2 px-3 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 cursor-pointer text-center"
                  >
                    View Full Details
                  </button>
                  <a
                    href={s.apply_link || s.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-1 shadow-xs text-center"
                  >
                    <span>Apply</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

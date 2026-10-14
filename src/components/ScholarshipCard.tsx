import React from 'react';
import { Heart, CheckSquare, Square, Calendar, ArrowRight } from 'lucide-react';
import { Scholarship } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate } from '../lib/i18n';
import { TypeTag } from './TypeTag';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  lang: LanguageCode;
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onSelect: (slug: string) => void;
  onQuickView?: (s: Scholarship) => void;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship: s,
  lang,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onSelect,
  onQuickView
}) => {
  const t = getTranslation(lang);

  const getStatusBadge = () => {
    switch (s.status) {
      case 'Closing soon':
        return (
          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
            {t.closingSoon}
          </span>
        );
      case 'Open':
        return (
          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDF4F0] text-[#224A37] dark:bg-[#14261D] dark:text-[#78B395]">
            {t.open}
          </span>
        );
      case 'Rolling':
        return (
          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300">
            {t.rolling}
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-400">
            {t.closed}
          </span>
        );
      default:
        return null;
    }
  };

  const visibleCategories = s.categories.slice(0, 3);
  const extraCategoriesCount = Math.max(0, s.categories.length - 3);

  return (
    <article
      className="group relative flex flex-col justify-between p-5 md:p-6 rounded-[22px] bg-white dark:bg-[#181715] border border-stone-200/90 dark:border-stone-800/90 hover:border-stone-400 dark:hover:border-stone-600 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none hover:-translate-y-0.5 transition-all duration-200 ease-out"
    >
      <div>
        {/* Top bar: Provider + Actions (Save heart, Compare checkbox) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 truncate max-w-[220px]" title={s.provider}>
            {s.provider}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Compare Checkbox */}
            <button
              type="button"
              onClick={() => onToggleCompare(s.id)}
              className={`p-1 rounded-md text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                isCompared
                  ? 'text-stone-900 dark:text-stone-100 font-medium'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to compare (max 3)'}
            >
              {isCompared ? (
                <CheckSquare className="w-4 h-4 text-stone-900 dark:text-stone-100" />
              ) : (
                <Square className="w-4 h-4" />
              )}
            </button>

            {/* Save Heart Button */}
            <button
              type="button"
              onClick={() => onToggleSave(s.id)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isSaved
                  ? 'text-[#9E5336] bg-[#F8EFEA] dark:bg-[#281814] dark:text-[#D98E7B]'
                  : 'text-stone-400 hover:text-[#9E5336] hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isSaved ? t.savedToProfile : t.saveScholarship}
              aria-label={isSaved ? t.savedToProfile : t.saveScholarship}
            >
              <Heart
                className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                strokeWidth={1.75}
              />
            </button>
          </div>
        </div>

        {/* Name (Max 2 lines) with mandatory Type Tag */}
        <div className="mb-3.5">
          <button
            onClick={() => onSelect(s.id)}
            className="text-left font-heading font-bold text-sm md:text-base text-stone-900 dark:text-stone-100 group-hover:text-[#9E5336] dark:group-hover:text-[#D97E5E] transition-colors line-clamp-2 cursor-pointer focus:outline-none"
          >
            {s.name}
          </button>
          <div className="mt-2 flex items-center gap-2">
            <TypeTag type={s.type} lang={lang} size="sm" />
            {s.renewable && (
              <span className="text-[10px] text-stone-500 dark:text-stone-400">
                · Renewable yearly
              </span>
            )}
          </div>
        </div>

        {/* Amount & Level Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200/80 dark:border-stone-700/80 tabular-nums">
            {s.amount_text.split('+')[0].trim()}
          </span>

          {s.level.slice(0, 2).map(lvl => (
            <span
              key={lvl}
              className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              {lvl}
            </span>
          ))}
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap items-center gap-1 mb-4">
          {visibleCategories.map(cat => (
            <span
              key={cat}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-50 dark:bg-stone-850 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60"
            >
              {cat}
            </span>
          ))}
          {extraCategoriesCount > 0 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
              +{extraCategoriesCount}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Deadline + Action button */}
      <div className="pt-3.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Calendar className="w-3.5 h-3.5 shrink-0 text-stone-400" />
          <span className="truncate text-[11px]">
            {s.last_date ? formatDate(s.last_date, lang) : t.rolling}
          </span>
          {getStatusBadge()}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(s)}
              className="text-[11px] font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white px-2 py-1 rounded cursor-pointer"
            >
              Quick view
            </button>
          )}
          <button
            type="button"
            onClick={() => onSelect(s.id)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 dark:text-stone-100 hover:text-[#9E5336] dark:hover:text-[#D97E5E] group-hover:translate-x-0.5 transition-transform cursor-pointer"
          >
            <span>{t.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

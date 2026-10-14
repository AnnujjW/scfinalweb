import React from 'react';
import { Scholarship, SiteSettings } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate, formatTemplate } from '../lib/i18n';
import { TypeTag } from './TypeTag';

interface TickerProps {
  scholarships: Scholarship[];
  settings: SiteSettings;
  lang: LanguageCode;
  onSelectScholarship: (slug: string) => void;
}

export const Ticker: React.FC<TickerProps> = ({
  scholarships,
  settings,
  lang,
  onSelectScholarship
}) => {
  const t = getTranslation(lang);

  if (!settings.ticker_enabled) return null;

  // Filter scholarships with upcoming last dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingList = scholarships
    .filter(s => {
      if (!s.show_on_site || s.status === 'Closed' || !s.last_date) return false;
      const d = new Date(s.last_date);
      return !isNaN(d.getTime()) && d.getTime() >= today.getTime();
    })
    .sort((a, b) => new Date(a.last_date).getTime() - new Date(b.last_date).getTime());

  // Target 10-20 items: if fewer, supplement with active open ones
  let displayList = upcomingList;
  if (displayList.length < settings.ticker_min_items) {
    const extra = scholarships
      .filter(s => s.show_on_site && s.status !== 'Closed' && !displayList.find(x => x.id === s.id))
      .slice(0, settings.ticker_min_items - displayList.length);
    displayList = [...displayList, ...extra];
  }

  if (displayList.length === 0) return null;

  const calculateDaysLeft = (lastDateStr: string): number => {
    if (!lastDateStr) return 999;
    const target = new Date(lastDateStr);
    target.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const renderTickerItem = (s: Scholarship, index: number, isDup: boolean) => {
    const daysLeft = s.last_date ? calculateDaysLeft(s.last_date) : 999;
    const isToday = daysLeft === 0;
    const isUrgent = daysLeft <= 3;
    const isWarning = daysLeft <= 7 && daysLeft > 3;

    return (
      <button
        key={`${s.id}-${index}-${isDup ? 'dup' : 'orig'}`}
        onClick={() => onSelectScholarship(s.id)}
        className="group inline-flex items-center gap-2.5 px-4 py-1.5 text-xs hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 rounded-md"
      >
        <span className="font-semibold text-stone-900 dark:text-stone-100 group-hover:underline">
          {s.short_name || s.name}
        </span>
        <TypeTag type={s.type} lang={lang} size="sm" />
        <span className="text-stone-300 dark:text-stone-700">·</span>
        {s.last_date ? (
          <>
            <span className="text-stone-500 dark:text-stone-400">
              {formatTemplate(t.lastDateOn, { date: formatDate(s.last_date, lang) })}
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            {isToday ? (
              <span className="font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/80 px-2 py-0.5 rounded text-[11px] animate-pulse">
                {t.lastDateToday}
              </span>
            ) : (
              <span
                className={`font-medium ${
                  isUrgent
                    ? 'text-red-700 dark:text-red-400 font-semibold'
                    : isWarning
                    ? 'text-amber-800 dark:text-amber-300'
                    : 'text-stone-600 dark:text-stone-300'
                }`}
              >
                {formatTemplate(t.daysLeft, { count: daysLeft })}
              </span>
            )}
          </>
        ) : (
          <span className="text-stone-500 dark:text-stone-400">{t.rolling}</span>
        )}
        <span className="text-stone-300 dark:text-stone-700 ml-3">│</span>
      </button>
    );
  };

  return (
    <div className="w-full px-4 md:px-8 mt-2 mb-6 md:mt-3 md:mb-8 select-none">
      <div
        className="max-w-[1200px] mx-auto h-11 md:h-12 rounded-full border border-stone-200/90 dark:border-stone-800/90 bg-white/90 dark:bg-[#171615]/90 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none flex items-center overflow-hidden relative z-20"
        role="region"
        aria-label="Deadline ticker"
      >
        {/* Left fixed badge with pulsing earthy dot */}
        <div className="shrink-0 z-10 flex items-center gap-2 pl-4 pr-3.5 py-1.5 bg-stone-100/90 dark:bg-stone-800/90 border-r border-stone-200/90 dark:border-stone-800 text-stone-900 dark:text-stone-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B87C31] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B87C31] dark:bg-[#D99543]" />
          </span>
          <span className="text-[10px] md:text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
            {t.liveTickerTitle}
          </span>
        </div>

        {/* Crawl track with gradient masks */}
        <div className="relative flex-1 overflow-hidden h-full flex items-center">
          {/* Soft edge fades matching earthy surface */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-[#171615] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#171615] to-transparent pointer-events-none z-10" />

          <div className="animate-ticker">
            <div className="flex items-center">
              {displayList.map((s, idx) => renderTickerItem(s, idx, false))}
            </div>
            {/* Duplicate track for seamless infinite loop */}
            <div className="flex items-center" aria-hidden="true">
              {displayList.map((s, idx) => renderTickerItem(s, idx, true))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

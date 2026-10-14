import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Scholarship } from '../types/scholarship';
import { LanguageCode, getTranslation } from '../lib/i18n';
import { TypeTag } from '../components/TypeTag';

interface NotFoundViewProps {
  scholarships: Scholarship[];
  lang: LanguageCode;
  onNavigate: (route: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  scholarships,
  lang,
  onNavigate
}) => {
  getTranslation(lang);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onNavigate(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  const topPicks = scholarships.slice(0, 3);

  return (
    <div className="max-w-[720px] mx-auto w-full px-4 py-12 text-center space-y-8">
      <div className="space-y-3">
        <span className="text-4xl md:text-5xl font-mono font-extrabold text-[#9A5034] dark:text-[#E08264]">
          404
        </span>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-stone-900 dark:text-stone-100">
          Page Not Found
        </h1>
        <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
          The link you followed may have moved or changed, but we can help you find your scholarship right away.
        </p>
      </div>

      {/* Smart search input */}
      <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search AICTE, MahaDBT, Reliance, Pragati..."
          className="w-full h-11 pl-10 pr-24 text-xs rounded-full bg-white dark:bg-[#181716] border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 shadow-xs focus:outline-none focus:border-stone-400"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Popular Fallback Alternatives (Never a dead end) */}
      <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-4 text-left">
        <p className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider text-center">
          Popular Open Schemes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topPicks.map(s => (
            <button
              key={s.id}
              onClick={() => onNavigate(`/scholarship/${s.id}`)}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/80 dark:border-stone-800 text-left hover:border-stone-400 dark:hover:border-stone-600 transition-colors cursor-pointer space-y-1.5"
            >
              <TypeTag type={s.type} lang={lang} size="sm" />
              <p className="font-bold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">
                {s.short_name || s.name}
              </p>
              <p className="text-[11px] text-[#2C523D] dark:text-[#589A76] font-semibold truncate">
                {s.amount_text.split('+')[0]}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2 rounded-full text-xs font-bold text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer transition-colors"
        >
          Go to Home
        </button>
        <button
          onClick={() => onNavigate('/explore')}
          className="px-5 py-2 rounded-full text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white cursor-pointer transition-colors"
        >
          Explore All Scholarships
        </button>
      </div>
    </div>
  );
};

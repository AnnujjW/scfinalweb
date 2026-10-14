import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { CategoryItem } from '../types/scholarship';
import { LanguageCode, getTranslation } from '../lib/i18n';

interface CategoryFilterBarProps {
  categories: CategoryItem[];
  selectedCategories: string[];
  onToggleCategory: (code: string) => void;
  onClearAll: () => void;
  matchMode: 'any' | 'all';
  onToggleMatchMode: (mode: 'any' | 'all') => void;
  includeOpenToAll: boolean;
  onToggleIncludeOpenToAll: (include: boolean) => void;
  resultsCount: number;
  lang: LanguageCode;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearAll,
  matchMode,
  onToggleMatchMode,
  includeOpenToAll,
  onToggleIncludeOpenToAll,
  resultsCount,
  lang
}) => {
  const t = getTranslation(lang);

  const activeCategories = categories.filter(c => c.active);

  return (
    <div className="sticky top-[76px] md:top-[86px] z-30 w-full py-3 px-4 md:px-6 rounded-2xl bg-white/95 dark:bg-[#181715]/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none transition-all mb-8">
      {/* Top row: Label, toggles & count */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-stone-800 dark:text-stone-200" />
          <span className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            {t.filterByCategory}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 tabular-nums">
            {resultsCount} {t.resultsCount.replace('{count}', '').trim()}
          </span>
        </div>

        {/* Match mode & Open to all switches */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => onToggleMatchMode('any')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                matchMode === 'any'
                  ? 'bg-white dark:bg-[#181715] text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {t.filterMatchAny}
            </button>
            <button
              type="button"
              onClick={() => onToggleMatchMode('all')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                matchMode === 'all'
                  ? 'bg-white dark:bg-[#181715] text-stone-900 dark:text-stone-100 shadow-xs font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {t.filterMatchAll}
            </button>
          </div>

          <label className="hidden sm:flex items-center gap-1.5 cursor-pointer text-stone-600 dark:text-stone-300 text-[11px]">
            <input
              type="checkbox"
              checked={includeOpenToAll}
              onChange={e => onToggleIncludeOpenToAll(e.target.checked)}
              className="rounded text-stone-900 focus:ring-stone-500 w-3.5 h-3.5 cursor-pointer"
            />
            <span>Include Open-to-All</span>
          </label>

          {selectedCategories.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>{t.filterClearAll}</span>
            </button>
          )}
        </div>
      </div>

      {/* Chips Horizontal Row */}
      <div className="flex flex-wrap items-center gap-1.5 max-h-[100px] overflow-y-auto pt-1 pb-0.5">
        {activeCategories.map(cat => {
          const isSelected = selectedCategories.includes(cat.code);
          return (
            <button
              key={cat.code}
              type="button"
              onClick={() => onToggleCategory(cat.code)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer select-none border ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-950 dark:border-stone-100 font-bold shadow-xs'
                  : 'bg-stone-50 dark:bg-stone-850 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-stone-200/90 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700/60'
              }`}
            >
              <span>{cat.code}</span>
              {isSelected && <span className="ml-1 text-[10px]">✕</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

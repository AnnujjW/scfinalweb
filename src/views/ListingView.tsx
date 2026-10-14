import React, { useState, useMemo } from 'react';
import { Landmark, Briefcase, Filter, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { Scholarship, CategoryItem, ScholarshipType } from '../types/scholarship';
import { LanguageCode, getTranslation } from '../lib/i18n';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { EDUCATION_LEVELS, INDIAN_STATES } from '../data/categories';

interface ListingViewProps {
  type: ScholarshipType;
  scholarships: Scholarship[];
  categories: CategoryItem[];
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  savedIds: string[];
  comparedIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onQuickView: (s: Scholarship) => void;
}

export const ListingView: React.FC<ListingViewProps> = ({
  type,
  scholarships,
  categories,
  lang,
  onNavigate,
  savedIds,
  comparedIds,
  onToggleSave,
  onToggleCompare,
  onQuickView
}) => {
  const t = getTranslation(lang);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [matchMode, setMatchMode] = useState<'any' | 'all'>('any');
  const [includeOpenToAll, setIncludeOpenToAll] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('deadline');

  const isGov = type === 'Government';
  const pageTitle = isGov ? 'Government Scholarships' : 'Private Scholarships & Corporate CSR';
  const pageSubtitle = isGov
    ? 'Central Government, AICTE, Ministry of Education, and Maharashtra MahaDBT freeship schemes.'
    : 'Merit and need-based endowments from top foundations, banks, and technology organizations.';

  // Base list filtered by type
  const typePool = useMemo(() => {
    return scholarships.filter(s => s.type === type && s.show_on_site);
  }, [scholarships, type]);

  // Filter application
  const filteredScholarships = useMemo(() => {
    return typePool.filter(s => {
      // Category filter
      if (selectedCategories.length > 0) {
        const hasOpenToAll = includeOpenToAll && (s.categories.includes('All') || s.categories.includes('Open'));
        if (matchMode === 'any') {
          const matchesAny = selectedCategories.some(cat => s.categories.includes(cat));
          if (!matchesAny && !hasOpenToAll) return false;
        } else {
          // match all
          const matchesAll = selectedCategories.every(cat => s.categories.includes(cat));
          if (!matchesAll && !hasOpenToAll) return false;
        }
      }

      // Level filter
      if (selectedLevel !== 'All') {
        if (!s.level.includes(selectedLevel as any)) return false;
      }

      // State filter
      if (selectedState !== 'All') {
        if (!s.states.includes('All India') && !s.states.includes(selectedState)) return false;
      }

      // Status filter
      if (selectedStatus !== 'All') {
        if (s.status !== selectedStatus) return false;
      }

      return true;
    });
  }, [typePool, selectedCategories, matchMode, includeOpenToAll, selectedLevel, selectedState, selectedStatus]);

  // Sorting
  const sortedScholarships = useMemo(() => {
    const list = [...filteredScholarships];
    if (sortBy === 'deadline') {
      return list.sort((a, b) => {
        const dateA = a.last_date ? new Date(a.last_date).getTime() : 9999999999999;
        const dateB = b.last_date ? new Date(b.last_date).getTime() : 9999999999999;
        return dateA - dateB;
      });
    } else if (sortBy === 'amount') {
      return list.sort((a, b) => b.amount_value - a.amount_value);
    } else if (sortBy === 'az') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.added_on).getTime() - new Date(a.added_on).getTime());
    }
    return list;
  }, [filteredScholarships, sortBy]);

  const handleToggleCategory = (code: string) => {
    setSelectedCategories(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedLevel('All');
    setSelectedState('All');
    setSelectedStatus('All');
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {isGov ? (
            <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          {pageSubtitle}
        </p>
      </div>

      {/* Sticky Multi-select Category Filter Bar */}
      <CategoryFilterBar
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        onClearAll={() => setSelectedCategories([])}
        matchMode={matchMode}
        onToggleMatchMode={setMatchMode}
        includeOpenToAll={includeOpenToAll}
        onToggleIncludeOpenToAll={setIncludeOpenToAll}
        resultsCount={filteredScholarships.length}
        lang={lang}
      />

      {/* Secondary Filter & Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Level Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Level:</span>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Degrees</option>
              {EDUCATION_LEVELS.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">State:</span>
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-[130px]"
            >
              <option value="All">All States / UTs</option>
              {INDIAN_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closing soon">Closing Soon</option>
              <option value="Rolling">Rolling</option>
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-medium">{t.sortBy}:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="deadline">{t.sortDeadlineSoonest}</option>
            <option value="amount">{t.sortAmountHighToLow}</option>
            <option value="newest">{t.sortNewest}</option>
            <option value="az">{t.sortAlphabetical}</option>
          </select>
        </div>
      </div>

      {/* Grid or Nearest Alternatives (Section 12 rule: never a dead end) */}
      {sortedScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {sortedScholarships.map(s => (
            <ScholarshipCard
              key={s.id}
              scholarship={s}
              lang={lang}
              isSaved={savedIds.includes(s.id)}
              isCompared={comparedIds.includes(s.id)}
              onToggleSave={onToggleSave}
              onToggleCompare={onToggleCompare}
              onSelect={slug => onNavigate(`/scholarship/${slug}`)}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Never a dead end alternative card */
        <div className="p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-center space-y-4 my-6">
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              {t.noExactMatchShowingClosest}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              No exact match for selected category combination in {type} scholarships. Here are the closest alternatives open to all students:
            </p>
          </div>

          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.relaxFilters}</span>
          </button>

          {/* Show top 3 closest from pool */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
            {typePool.slice(0, 3).map(s => (
              <ScholarshipCard
                key={s.id}
                scholarship={s}
                lang={lang}
                isSaved={savedIds.includes(s.id)}
                isCompared={comparedIds.includes(s.id)}
                onToggleSave={onToggleSave}
                onToggleCompare={onToggleCompare}
                onSelect={slug => onNavigate(`/scholarship/${slug}`)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

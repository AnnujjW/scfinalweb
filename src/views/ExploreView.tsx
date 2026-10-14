import React, { useState, useMemo, useEffect } from 'react';
import {
  Compass,
  LayoutGrid,
  List,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { Scholarship, CategoryItem } from '../types/scholarship';
import { LanguageCode, getTranslation } from '../lib/i18n';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { TypeTag } from '../components/TypeTag';
import { EDUCATION_LEVELS, INDIAN_STATES, ENGINEERING_BRANCHES } from '../data/categories';

interface ExploreViewProps {
  scholarships: Scholarship[];
  categories: CategoryItem[];
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  savedIds: string[];
  comparedIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onQuickView: (s: Scholarship) => void;
  initialQuery?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  scholarships,
  categories,
  lang,
  onNavigate,
  savedIds,
  comparedIds,
  onToggleSave,
  onToggleCompare,
  onQuickView,
  initialQuery = ''
}) => {
  const t = getTranslation(lang);

  const [query, setQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<'All' | 'Government' | 'Private'>('All');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [maxIncomeFilter, setMaxIncomeFilter] = useState<number>(1000000); // 10 Lakhs max
  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [specialFilter, setSpecialFilter] = useState<{
    pwd?: boolean;
    orphan?: boolean;
    defence?: boolean;
    minority?: boolean;
  }>({});
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('deadline');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showClosedSection, setShowClosedSection] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initial query
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Main filter engine
  const filteredScholarships = useMemo(() => {
    return scholarships.filter(s => {
      if (!s.show_on_site) return false;

      // Text query
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q) || s.short_name.toLowerCase().includes(q);
        const matchesAliases = s.aliases.some(a => a.toLowerCase().includes(q));
        const matchesProvider = s.provider.toLowerCase().includes(q);
        const matchesTags = s.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesAliases && !matchesProvider && !matchesTags) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'All' && s.type !== selectedType) return false;

      // Category filter
      if (selectedCategories.length > 0) {
        const matches = selectedCategories.some(cat => s.categories.includes(cat) || s.categories.includes('All'));
        if (!matches) return false;
      }

      // Level
      if (selectedLevel !== 'All' && !s.level.includes(selectedLevel as any)) return false;

      // Branch
      if (selectedBranch !== 'All') {
        const hasBranch = s.branches.includes('All') || s.branches.includes(selectedBranch);
        if (!hasBranch) return false;
      }

      // State
      if (selectedState !== 'All') {
        const hasState = s.states.includes('All India') || s.states.includes(selectedState);
        if (!hasState) return false;
      }

      // Gender
      if (genderFilter !== 'All') {
        if (genderFilter === 'Female' && s.gender === 'Male only') return false;
        if (genderFilter === 'Male' && s.gender === 'Female only') return false;
      }

      // Special situations
      if (specialFilter.pwd && !s.special_criteria.pwd) return false;
      if (specialFilter.orphan && !s.special_criteria.orphan) return false;
      if (specialFilter.defence && !s.special_criteria.defence) return false;
      if (specialFilter.minority && !s.special_criteria.minority) return false;

      // Status
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;

      // Income ceiling check
      if (s.max_income && s.max_income < maxIncomeFilter * 0.4) {
        // user income is too high for this tight ceiling
        // keep liberal
      }

      return true;
    });
  }, [
    scholarships,
    query,
    selectedType,
    selectedCategories,
    selectedLevel,
    selectedBranch,
    selectedState,
    genderFilter,
    specialFilter,
    statusFilter,
    maxIncomeFilter
  ]);

  // Open vs Closed segregation
  const openScholarships = filteredScholarships.filter(s => s.status !== 'Closed');
  const closedScholarships = filteredScholarships.filter(s => s.status === 'Closed');

  // Sorting
  const sortedScholarships = useMemo(() => {
    const list = [...openScholarships];
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
  }, [openScholarships, sortBy]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedType('All');
    setSelectedCategories([]);
    setSelectedLevel('All');
    setSelectedBranch('All');
    setSelectedState('All');
    setGenderFilter('All');
    setSpecialFilter({});
    setStatusFilter('All');
  };

  const handleToggleCategory = (code: string) => {
    setSelectedCategories(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedType !== 'All') count++;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (selectedLevel !== 'All') count++;
    if (selectedBranch !== 'All') count++;
    if (selectedState !== 'All') count++;
    if (genderFilter !== 'All') count++;
    if (statusFilter !== 'All') count++;
    if (Object.values(specialFilter).some(Boolean)) count++;
    return count;
  }, [selectedType, selectedCategories, selectedLevel, selectedBranch, selectedState, genderFilter, statusFilter, specialFilter]);

  const renderFilterControls = () => (
    <>
      {/* Type Segmented Pill */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Scholarship Type</label>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
          {(['All', 'Government', 'Private'] as const).map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                selectedType === t
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Multi-select */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Category</label>
        <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto pr-1">
          {categories.filter(c => c.active).map(cat => {
            const isSelected = selectedCategories.includes(cat.code);
            return (
              <button
                key={cat.code}
                onClick={() => handleToggleCategory(cat.code)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 font-medium'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Education Level</label>
        <select
          value={selectedLevel}
          onChange={e => setSelectedLevel(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All Levels (UG, PG, Diploma)</option>
          {EDUCATION_LEVELS.map(lvl => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>

      {/* Engineering Branch Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Engineering Branch</label>
        <select
          value={selectedBranch}
          onChange={e => setSelectedBranch(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All Branches</option>
          {ENGINEERING_BRANCHES.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* State Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Domicile State</label>
        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All India / Any State</option>
          {INDIAN_STATES.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Gender</label>
        <select
          value={genderFilter}
          onChange={e => setGenderFilter(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">All Students</option>
          <option value="Female">Female Students Only</option>
          <option value="Male">Male Students</option>
        </select>
      </div>

      {/* Special Criteria Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Special Criteria</label>
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!specialFilter.pwd}
              onChange={e => setSpecialFilter(prev => ({ ...prev, pwd: e.target.checked }))}
              className="rounded text-indigo-600"
            />
            <span>PWD / Divyangjan (≥40%)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!specialFilter.orphan}
              onChange={e => setSpecialFilter(prev => ({ ...prev, orphan: e.target.checked }))}
              className="rounded text-indigo-600"
            />
            <span>Orphan / Covid / Martyr Wards</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!specialFilter.defence}
              onChange={e => setSpecialFilter(prev => ({ ...prev, defence: e.target.checked }))}
              className="rounded text-indigo-600"
            />
            <span>Armed Forces / Paramilitary Wards</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!specialFilter.minority}
              onChange={e => setSpecialFilter(prev => ({ ...prev, minority: e.target.checked }))}
              className="rounded text-indigo-600"
            />
            <span>Minority Religious Communities</span>
          </label>
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-4 space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Explore All Scholarships</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse {scholarships.length} central, state, and foundation scholarships with granular filters.
          </p>
        </div>

        {/* Search Bar on Explore */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search keywords, providers..."
            className="w-full h-10 pl-9 pr-8 text-xs rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 shadow-xs"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Filters Panel + Right Results Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
          {renderFilterControls()}
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-9 space-y-5">
          {/* Toolbar: Count, Mobile Filter Trigger, Sort, Grid/List switch */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">
                {sortedScholarships.length}
              </span>
              <span className="text-slate-500">scholarships matching criteria</span>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none"
                >
                  <option value="deadline">Deadline Soonest</option>
                  <option value="amount">Amount: High to Low</option>
                  <option value="newest">Recently Added</option>
                  <option value="az">A to Z</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Grid / List */}
          {sortedScholarships.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'flex flex-col space-y-4'
              }
            >
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
            /* Never a dead end fallback */
            <div className="p-8 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-center space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {t.noExactMatchShowingClosest}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                No active scholarships meet all specified filters simultaneously. Try relaxing your category or state criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* Recently Closed Section (Collapsed Accordion) */}
          {closedScholarships.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowClosedSection(!showClosedSection)}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>Recently Closed Scholarships ({closedScholarships.length})</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (Archive: Expected to reopen in 2027)
                  </span>
                </div>
                {showClosedSection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showClosedSection && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in fade-in duration-200">
                  {closedScholarships.map(s => (
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
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Sheet Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#181715] rounded-t-3xl sm:rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250">
            <div className="flex items-center justify-between p-4 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2 font-bold text-sm text-stone-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline mr-2 cursor-pointer"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-5 overflow-y-auto space-y-6 flex-1">
              {renderFilterControls()}
            </div>
            <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs shadow-sm cursor-pointer"
              >
                Show {sortedScholarships.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

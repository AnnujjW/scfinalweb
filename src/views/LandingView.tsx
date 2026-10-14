import React from 'react';
import {
  Compass,
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Scholarship, SiteSettings } from '../types/scholarship';
import { LanguageCode, getTranslation, formatTemplate } from '../lib/i18n';
import { StudentHeroAnimation } from '../components/StudentHeroAnimation';
import { ScholarshipCard } from '../components/ScholarshipCard';

interface LandingViewProps {
  scholarships: Scholarship[];
  settings: SiteSettings;
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  savedIds: string[];
  comparedIds: string[];
  onToggleSave: (id: string) => void;
  onToggleCompare: (id: string) => void;
  onQuickView: (s: Scholarship) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  scholarships,
  settings,
  lang,
  onNavigate,
  savedIds,
  comparedIds,
  onToggleSave,
  onToggleCompare,
  onQuickView
}) => {
  const t = getTranslation(lang);

  // Compute stats dynamically from dataset
  const totalCount = scholarships.filter(s => s.show_on_site).length;
  const closingThisMonthCount = scholarships.filter(s => s.status === 'Closing soon').length;
  const uniqueCategories = new Set(scholarships.flatMap(s => s.categories)).size;
  const uniqueStates = new Set(scholarships.flatMap(s => s.states)).size;

  // Featured scholarships
  const featured = scholarships.filter(s => s.show_on_site && s.featured).slice(0, 6);

  return (
    <div className="w-full flex flex-col space-y-16 md:space-y-24 pb-16">
      {/* 1. Theme Line Section */}
      <section className="text-center pt-1 pb-0 px-4">
        <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-stone-500 dark:text-stone-400">
          {settings.tagline}
        </p>
      </section>

      {/* 2. Hero Section: Student Illustration & Core Heading */}
      <section className="max-w-[1200px] mx-auto w-full px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Student Animation (Interactive 360 Head Cursor Tracking & Clickable Lamp) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <StudentHeroAnimation lang={lang} />
          </div>

          {/* Calm & authoritative copy */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2 space-y-5 max-w-[540px]">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-[44px] font-heading font-extrabold text-stone-900 dark:text-stone-50 leading-[1.15] tracking-tight">
                {settings.hero_title_1}
              </h1>
              <p className="text-base md:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {settings.hero_title_2}
              </p>
              <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                {settings.hero_subtitle}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D5843] dark:text-[#78B395] shrink-0" />
                <span>{t.freeVerifiedBadge}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D5843] dark:text-[#78B395] shrink-0" />
                <span>{t.officialLinksBadge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2B. CENTERED HERO ACTION BOXES (Below the student and heading with generous breathing space) */}
        <div className="pt-10 md:pt-14 max-w-[880px] mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* Box 1: Explore Scholarships */}
            <button
              onClick={() => onNavigate('/explore')}
              type="button"
              className="group relative flex items-center justify-between p-5 md:p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-[#271B16] dark:from-[#1E1C1A] dark:via-[#1A1816] dark:to-[#2B1B15] text-white border border-stone-800 dark:border-stone-700/80 hover:border-[#9A5034] dark:hover:border-[#E08264] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_42px_rgba(154,80,52,0.22)] dark:hover:shadow-[0_20px_42px_rgba(224,130,100,0.24)] hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer text-left overflow-hidden select-none"
            >
              {/* Subtle animated shimmer highlight */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform pointer-events-none" />

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#9A5034]/25 dark:bg-[#E08264]/20 border border-[#9A5034]/40 dark:border-[#E08264]/30 text-[#E08264] dark:text-[#FFAE96] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Compass className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-base md:text-lg text-white tracking-tight">
                      {t.heroExploreBtn}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E08264] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs md:text-sm text-stone-300 dark:text-stone-400 mt-1 font-normal">
                    {t.heroExploreSub}
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/10 dark:bg-white/5 border border-white/15 flex items-center justify-center text-white/90 group-hover:bg-[#9A5034] group-hover:border-[#9A5034] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-3">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
              </div>
            </button>

            {/* Box 2: Search Your Scholarship (Equal visual importance and matching design) */}
            <button
              onClick={() => onNavigate('/search')}
              type="button"
              className="group relative flex items-center justify-between p-5 md:p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-[#271B16] dark:from-[#1E1C1A] dark:via-[#1A1816] dark:to-[#2B1B15] text-white border border-stone-800 dark:border-stone-700/80 hover:border-[#9A5034] dark:hover:border-[#E08264] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_42px_rgba(154,80,52,0.22)] dark:hover:shadow-[0_20px_42px_rgba(224,130,100,0.24)] hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer text-left overflow-hidden select-none"
            >
              {/* Subtle animated shimmer highlight */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform pointer-events-none" />

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#9A5034]/25 dark:bg-[#E08264]/20 border border-[#9A5034]/40 dark:border-[#E08264]/30 text-[#E08264] dark:text-[#FFAE96] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Target className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-base md:text-lg text-white tracking-tight">
                      {t.heroSearchBtn}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#E08264] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs md:text-sm text-stone-300 dark:text-stone-400 mt-1 font-normal">
                    {t.heroSearchSub}
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/10 dark:bg-white/5 border border-white/15 flex items-center justify-center text-white/90 group-hover:bg-[#9A5034] group-hover:border-[#9A5034] group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-3">
                <ArrowUpRight className="w-4 h-4" strokeWidth={2.2} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Slim Stats Strip (Earthy tones) */}
      <section className="max-w-[1200px] mx-auto w-full px-4 md:px-8">
        <div className="p-6 md:p-8 rounded-[24px] bg-white dark:bg-[#181715] border border-stone-200/90 dark:border-stone-800/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100 dark:divide-stone-800">
            <div className="pt-3 md:pt-0">
              <p className="text-2xl md:text-3xl font-heading font-extrabold text-stone-900 dark:text-stone-100 tabular-nums">
                {totalCount}+
              </p>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1">
                {t.statsScholarshipsListed}
              </p>
            </div>
            <div className="pt-3 md:pt-0">
              <p className="text-2xl md:text-3xl font-heading font-extrabold text-[#C48C3A] dark:text-[#DF9F48] tabular-nums">
                {closingThisMonthCount}
              </p>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1">
                {t.statsClosingThisMonth}
              </p>
            </div>
            <div className="pt-3 md:pt-0">
              <p className="text-2xl md:text-3xl font-heading font-extrabold text-[#9E5336] dark:text-[#D97E5E] tabular-nums">
                {uniqueCategories}+
              </p>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1">
                {t.statsCategoriesCovered}
              </p>
            </div>
            <div className="pt-3 md:pt-0">
              <p className="text-2xl md:text-3xl font-heading font-extrabold text-[#2D5843] dark:text-[#78B395] tabular-nums">
                {uniqueStates}
              </p>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-1">
                {t.statsStatesCovered}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (3 Steps) with Earthy Accents */}
      <section className="max-w-[1200px] mx-auto w-full px-4 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-stone-900 dark:text-stone-100">
            {t.howItWorksTitle}
          </h2>
          <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-2">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 md:p-7 rounded-[22px] bg-white dark:bg-[#181715] border border-stone-200/90 dark:border-stone-800/90 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
              {t.howItWorksStep1Title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.howItWorksStep1Desc}
            </p>
          </div>

          <div className="p-6 md:p-7 rounded-[22px] bg-white dark:bg-[#181715] border border-stone-200/90 dark:border-stone-800/90 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#EDF4F0] dark:bg-[#16271F] text-[#224A37] dark:text-[#84BCA0] flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
              {t.howItWorksStep2Title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.howItWorksStep2Desc}
            </p>
          </div>

          <div className="p-6 md:p-7 rounded-[22px] bg-white dark:bg-[#181715] border border-stone-200/90 dark:border-stone-800/90 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#F7EFE9] dark:bg-[#2B1914] text-[#713928] dark:text-[#DC9482] flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
              {t.howItWorksStep3Title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.howItWorksStep3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Featured Scholarships Section */}
      <section className="max-w-[1200px] mx-auto w-full px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-stone-900 dark:text-stone-100">
              {t.featuredOpportunities}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              {t.featuredSubtitle}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/explore')}
            className="text-xs font-bold text-stone-900 dark:text-stone-100 hover:text-[#9E5336] dark:hover:text-[#D97E5E] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{formatTemplate(t.viewAll, { count: totalCount })}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(s => (
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
      </section>

      {/* 6. Document Awareness Callout in Warm Earthy Terracotta */}
      <section className="max-w-[1200px] mx-auto w-full px-4 md:px-8">
        <div className="p-8 md:p-10 rounded-[28px] bg-[#F7F2EB] dark:bg-[#1E1916] border border-[#E2D6C6] dark:border-[#382B24] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E5336] dark:text-[#D97E5E]">
              {t.guidanceReserved}
            </span>
            <h3 className="text-lg md:text-xl font-heading font-bold text-stone-900 dark:text-stone-100">
              {t.domicileIncomeTitle}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.domicileIncomeDesc}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/faq')}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-850 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            {t.readGuidesBtn}
          </button>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Bookmark, FileCheck, ExternalLink, Trash2, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Scholarship, TrackedApplication, ApplicationStage } from '../types/scholarship';
import { LanguageCode, getTranslation, formatDate } from '../lib/i18n';
import { TypeTag } from '../components/TypeTag';
import { ScholarshipCard } from '../components/ScholarshipCard';

interface SavedViewProps {
  scholarships: Scholarship[];
  savedIds: string[];
  applications: TrackedApplication[];
  onToggleSave: (id: string) => void;
  onUpdateAppStage: (id: string, stage: ApplicationStage, notes?: string) => void;
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  comparedIds: string[];
  onToggleCompare: (id: string) => void;
  onQuickView: (s: Scholarship) => void;
  initialTab?: 'saved' | 'applications';
}

const STAGES: ApplicationStage[] = ['Saved', 'Preparing', 'Applied', 'Result'];

export const SavedView: React.FC<SavedViewProps> = ({
  scholarships,
  savedIds,
  applications,
  onToggleSave,
  onUpdateAppStage,
  lang,
  onNavigate,
  comparedIds,
  onToggleCompare,
  onQuickView,
  initialTab = 'saved'
}) => {
  const t = getTranslation(lang);
  const [activeTab, setActiveTab] = useState<'saved' | 'applications'>(initialTab);

  const savedScholarships = scholarships.filter(s => savedIds.includes(s.id));

  return (
    <div className="max-w-[1140px] mx-auto w-full px-4 md:px-8 py-4 space-y-6">
      {/* Header with Tab switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
            {activeTab === 'saved' ? t.saved : t.applications}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Keep track of bookmarks, application submission milestones, and results in one place.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-xs font-semibold">
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedScholarships.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Tracker ({applications.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'saved' ? (
        /* Saved List Tab */
        savedScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {savedScholarships.map(s => (
              <ScholarshipCard
                key={s.id}
                scholarship={s}
                lang={lang}
                isSaved={true}
                isCompared={comparedIds.includes(s.id)}
                onToggleSave={onToggleSave}
                onToggleCompare={onToggleCompare}
                onSelect={slug => onNavigate(`/scholarship/${slug}`)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              No saved scholarships yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tap the heart icon on any scholarship card to save it for quick review and deadline tracking.
            </p>
            <button
              onClick={() => onNavigate('/explore')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-xs mt-2"
            >
              <span>Explore Scholarships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      ) : (
        /* 4-Stage Application Tracker Tab */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map(stage => {
              const inStage = applications.filter(a => a.stage === stage);
              return (
                <div
                  key={stage}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      {stage}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {inStage.length}
                    </span>
                  </div>

                  <div className="space-y-3 min-h-[160px]">
                    {inStage.map(app => {
                      const s = scholarships.find(item => item.id === app.scholarshipId);
                      if (!s) return null;
                      return (
                        <div
                          key={app.scholarshipId}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-slate-900 dark:text-white truncate">
                              {s.short_name || s.name}
                            </span>
                            <TypeTag type={s.type} lang={lang} size="sm" />
                          </div>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Deadline: {s.last_date ? formatDate(s.last_date, lang) : 'Rolling'}
                          </p>

                          {/* Stage change dropdown */}
                          <div className="pt-1 flex items-center justify-between gap-2 border-t border-slate-200/40 dark:border-slate-700/40">
                            <select
                              value={app.stage}
                              onChange={e => onUpdateAppStage(app.scholarshipId, e.target.value as ApplicationStage)}
                              className="text-[10px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5"
                            >
                              {STAGES.map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => onNavigate(`/scholarship/${s.id}`)}
                              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              Open
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {inStage.length === 0 && (
                      <div className="h-28 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                        No scholarships in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

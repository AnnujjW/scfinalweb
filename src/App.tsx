/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useTransition } from 'react';
import {
  getStoredScholarships,
  saveStoredScholarships,
  getStoredSettings,
  saveStoredSettings,
  getStoredCategories,
  getSavedScholarshipIds,
  toggleSavedScholarship,
  getTrackedApplications,
  addOrUpdateApplication,
  getComparedScholarshipIds,
  toggleComparedScholarship,
  clearComparedScholarships,
  getStoredUserProfile,
  saveStoredUserProfile,
  getStoredTheme,
  saveStoredTheme,
  getStoredLang,
  saveStoredLang,
  getAuditLogs
} from './lib/storage';
import { Scholarship, SiteSettings, UserProfile, CategoryItem, ApplicationStage } from './types/scholarship';
import { LanguageCode, getTranslation } from './lib/i18n';
import { Navbar } from './components/Navbar';
import { Ticker } from './components/Ticker';
import { Footer } from './components/Footer';
import { QuickViewDrawer } from './components/QuickViewDrawer';
import { AuthModal } from './components/AuthModal';
import { MobileBottomNav } from './components/MobileBottomNav';

// Views
import { LandingView } from './views/LandingView';
import { ListingView } from './views/ListingView';
import { ExploreView } from './views/ExploreView';
import { SearchMatchView } from './views/SearchMatchView';
import { DetailView } from './views/DetailView';
import { SavedView } from './views/SavedView';
import { CompareView } from './views/CompareView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';
import { FAQView } from './views/FAQView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { PrivacyView } from './views/PrivacyView';
import { NotFoundView } from './views/NotFoundView';

// Base path of the site: "/scfinalweb" on GitHub Pages, "" when running locally
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// Removes the base path from a URL path so the router sees "/", "/explore", etc.
const stripBase = (p: string) => {
  const out = BASE && p.startsWith(BASE) ? p.slice(BASE.length) : p;
  return out || '/';
};

export default function App() {
  const [, startTransition] = useTransition();

  // Core State
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => getStoredScholarships());
  const [settings, setSettings] = useState<SiteSettings>(() => getStoredSettings());
  const [categories, setCategories] = useState<CategoryItem[]>(() => getStoredCategories());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getStoredUserProfile());
  const [savedIds, setSavedIds] = useState<string[]>(() => getSavedScholarshipIds());
  const [comparedIds, setComparedIds] = useState<string[]>(() => getComparedScholarshipIds());
  const [applications, setApplications] = useState(() => getTrackedApplications());
  const [auditLogs, setAuditLogs] = useState(() => getAuditLogs());

  // Preferences
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => getStoredTheme());
  const [lang, setLang] = useState<LanguageCode>(() => getStoredLang());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Client-Side Routing: current route path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return stripBase(window.location.pathname) + window.location.search;
  });

  // Modal / Drawer states
  const [quickViewScholarship, setQuickViewScholarship] = useState<Scholarship | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Sync HTML title & language attributes on change
  useEffect(() => {
    saveStoredLang(lang);
  }, [lang]);

  useEffect(() => {
    saveStoredTheme(theme);
  }, [theme]);

  // Synchronize browser history / URL for client-side routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(stripBase(window.location.pathname) + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    startTransition(() => {
      window.history.pushState({}, '', BASE + path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // Saved bookmark toggle
  const handleToggleSave = (id: string) => {
    toggleSavedScholarship(id);
    setSavedIds(getSavedScholarshipIds());
    setApplications(getTrackedApplications());
  };

  // Compare toggle
  const handleToggleCompare = (id: string) => {
    const res = toggleComparedScholarship(id);
    setComparedIds(res.ids);
  };

  const handleClearCompare = () => {
    clearComparedScholarships();
    setComparedIds([]);
  };

  // Application tracker update
  const handleUpdateAppStage = (id: string, stage: ApplicationStage, notes?: string) => {
    addOrUpdateApplication(id, stage, notes);
    setApplications(getTrackedApplications());
  };

  // Update profile
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveStoredUserProfile(updated);
  };

  // Admin database save
  const handleSaveScholarships = (updated: Scholarship[], auditDetail?: string) => {
    setScholarships(updated);
    saveStoredScholarships(updated, auditDetail);
    setAuditLogs(getAuditLogs());
  };

  // Admin settings save
  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
    setAuditLogs(getAuditLogs());
  };

  // Theme toggle cycle (Dark / Night mode toggle)
  const handleThemeToggle = () => {
    const isCurrentlyDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? 'light' : 'dark';
    setTheme(nextTheme);
    saveStoredTheme(nextTheme);
  };

  // Language switch
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLang(newLang);
  };

  // Route Dispatcher
  const renderCurrentView = () => {
    const [pathOnly, queryString] = currentPath.split('?');
    const searchParams = new URLSearchParams(queryString || '');

    // 1. Landing
    if (pathOnly === '/' || pathOnly === '') {
      return (
        <LandingView
          scholarships={scholarships}
          settings={settings}
          lang={lang}
          onNavigate={navigateTo}
          savedIds={savedIds}
          comparedIds={comparedIds}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onQuickView={setQuickViewScholarship}
        />
      );
    }

    // 2. Government Scholarships
    if (pathOnly === '/government-scholarships') {
      return (
        <ListingView
          type="Government"
          scholarships={scholarships}
          categories={categories}
          lang={lang}
          onNavigate={navigateTo}
          savedIds={savedIds}
          comparedIds={comparedIds}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onQuickView={setQuickViewScholarship}
        />
      );
    }

    // 3. Private Scholarships
    if (pathOnly === '/private-scholarships') {
      return (
        <ListingView
          type="Private"
          scholarships={scholarships}
          categories={categories}
          lang={lang}
          onNavigate={navigateTo}
          savedIds={savedIds}
          comparedIds={comparedIds}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onQuickView={setQuickViewScholarship}
        />
      );
    }

    // 4. Explore
    if (pathOnly === '/explore') {
      return (
        <ExploreView
          scholarships={scholarships}
          categories={categories}
          lang={lang}
          onNavigate={navigateTo}
          savedIds={savedIds}
          comparedIds={comparedIds}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onQuickView={setQuickViewScholarship}
          initialQuery={searchParams.get('q') || ''}
        />
      );
    }

    // 5. Search Your Scholarship (Matching Engine)
    if (pathOnly === '/search') {
      return (
        <SearchMatchView
          scholarships={scholarships}
          categories={categories}
          userProfile={userProfile}
          onUpdateProfile={handleSaveProfile}
          lang={lang}
          onNavigate={navigateTo}
          savedIds={savedIds}
          comparedIds={comparedIds}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
        />
      );
    }

    // 6. Scholarship Detail (/scholarship/:slug)
    if (pathOnly.startsWith('/scholarship/')) {
      const slug = pathOnly.replace('/scholarship/', '').trim();
      const target = scholarships.find(s => s.id === slug);
      if (target) {
        return (
          <DetailView
            scholarship={target}
            allScholarships={scholarships}
            userProfile={userProfile}
            lang={lang}
            onNavigate={navigateTo}
            isSaved={savedIds.includes(target.id)}
            isCompared={comparedIds.includes(target.id)}
            onToggleSave={handleToggleSave}
            onToggleCompare={handleToggleCompare}
            onQuickView={setQuickViewScholarship}
          />
        );
      }
    }

    // 7. Saved & Application Tracker
    if (pathOnly === '/saved') {
      return (
        <SavedView
          scholarships={scholarships}
          savedIds={savedIds}
          applications={applications}
          onToggleSave={handleToggleSave}
          onUpdateAppStage={handleUpdateAppStage}
          lang={lang}
          onNavigate={navigateTo}
          comparedIds={comparedIds}
          onToggleCompare={handleToggleCompare}
          onQuickView={setQuickViewScholarship}
          initialTab={searchParams.get('tab') === 'applications' ? 'applications' : 'saved'}
        />
      );
    }

    // 8. Compare
    if (pathOnly === '/compare') {
      return (
        <CompareView
          comparedIds={comparedIds}
          scholarships={scholarships}
          onRemoveCompare={handleToggleCompare}
          onClearCompare={handleClearCompare}
          lang={lang}
          onNavigate={navigateTo}
        />
      );
    }

    // 9. Profile
    if (pathOnly === '/profile') {
      return (
        <ProfileView
          userProfile={userProfile}
          onSaveProfile={handleSaveProfile}
          categories={categories}
          lang={lang}
          onNavigate={navigateTo}
        />
      );
    }

    // 10. Admin
    if (pathOnly === '/admin') {
      return (
        <AdminView
          scholarships={scholarships}
          onSaveScholarships={handleSaveScholarships}
          settings={settings}
          onSaveSettings={handleSaveSettings}
          categories={categories}
          auditLogs={auditLogs}
          lang={lang}
          onNavigate={navigateTo}
        />
      );
    }

    // 11. FAQ & Guides
    if (pathOnly === '/faq') {
      return (
        <FAQView
          lang={lang}
          onNavigate={navigateTo}
          initialTab={searchParams.get('tab') || ''}
        />
      );
    }

    // 12. About
    if (pathOnly === '/about') {
      return <AboutView lang={lang} onNavigate={navigateTo} />;
    }

    // 13. Contact
    if (pathOnly === '/contact') {
      return (
        <ContactView
          settings={settings}
          lang={lang}
          onNavigate={navigateTo}
          initialType={searchParams.get('type') || ''}
        />
      );
    }

    // 14. Privacy
    if (pathOnly === '/privacy') {
      return <PrivacyView lang={lang} onNavigate={navigateTo} />;
    }

    // 15. Helpful 404
    return (
      <NotFoundView
        scholarships={scholarships}
        lang={lang}
        onNavigate={navigateTo}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] selection:bg-[#9A5034] selection:text-white transition-colors duration-200">
      {/* 1. Floating Pill Navbar */}
      <Navbar
        currentRoute={currentPath}
        onNavigate={navigateTo}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        scholarships={scholarships}
        settings={settings}
        userProfile={userProfile}
        isLoggedIn={isLoggedIn}
        onOpenAuth={mode => {
          setAuthModalMode(mode);
          setAuthModalOpen(true);
        }}
        onLogout={() => setIsLoggedIn(false)}
        savedCount={savedIds.length}
      />

      {/* Spacing for fixed navbar to keep comfortable distance from floating menu */}
      <div className="h-24 md:h-28" />

      {/* 2. Live Deadline Ticker (News crawl horizontal band with balanced breathing room) */}
      <Ticker
        scholarships={scholarships}
        settings={settings}
        lang={lang}
        onSelectScholarship={slug => navigateTo(`/scholarship/${slug}`)}
      />

      {/* 3. Main Page Content View with generous vertical breathing room */}
      <main className="flex-1 w-full mt-6 md:mt-8 pb-16">
        {renderCurrentView()}
      </main>

      {/* 4. Footer */}
      <Footer
        settings={settings}
        lang={lang}
        onNavigate={navigateTo}
        onLanguageChange={handleLanguageChange}
      />

      {/* Quick View Drawer */}
      <QuickViewDrawer
        scholarship={quickViewScholarship}
        onClose={() => setQuickViewScholarship(null)}
        lang={lang}
        isSaved={quickViewScholarship ? savedIds.includes(quickViewScholarship.id) : false}
        onToggleSave={handleToggleSave}
        onViewFullDetails={slug => navigateTo(`/scholarship/${slug}`)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={data => {
          setIsLoggedIn(true);
          if (data.name) {
            setUserProfile(prev => ({ ...prev, name: data.name!, email: data.email || prev.email }));
          }
        }}
        lang={lang}
      />

      {/* 5. Mobile Bottom Navigation Bar (Thumb accessible) */}
      <MobileBottomNav
        currentRoute={currentPath}
        onNavigate={navigateTo}
        savedCount={savedIds.length}
        lang={lang}
        isLoggedIn={isLoggedIn}
        onOpenAuth={mode => {
          setAuthModalMode(mode);
          setAuthModalOpen(true);
        }}
      />
    </div>
  );
}

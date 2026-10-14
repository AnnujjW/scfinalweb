import React, { useState, useEffect, useRef } from 'react';
import {
  Landmark,
  Briefcase,
  Compass,
  Target,
  Search,
  Globe,
  Sun,
  Moon,
  User,
  X,
  Menu,
  Check,
  Bookmark,
  FileCheck,
  Settings as SettingsIcon,
  LogOut,
  ShieldAlert,
  ArrowRight,
  Github
} from 'lucide-react';
import { Scholarship, SiteSettings, UserProfile } from '../types/scholarship';
import {
  LanguageCode,
  SUPPORTED_LANGUAGES,
  getTranslation,
  formatDate
} from '../lib/i18n';
import { smartSearch, SmartSearchResponse } from '../lib/search';
import { TypeTag } from './TypeTag';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  lang: LanguageCode;
  onLanguageChange: (code: LanguageCode) => void;
  theme: 'light' | 'dark' | 'system';
  onThemeToggle: () => void;
  scholarships: Scholarship[];
  settings: SiteSettings;
  userProfile: UserProfile;
  isLoggedIn: boolean;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  lang,
  onLanguageChange,
  theme,
  onThemeToggle,
  scholarships,
  settings,
  userProfile,
  isLoggedIn,
  onOpenAuth,
  onLogout,
  savedCount
}) => {
  const t = getTranslation(lang);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SmartSearchResponse | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection for lifting shadow and shrinking pill
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut '/' or 'Cmd+K' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSearchFocused(false);
        setLangMenuOpen(false);
        setProfileMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const timer = setTimeout(() => {
      const resp = smartSearch(searchQuery, scholarships);
      setSearchResults(resp);
    }, 120);
    return () => clearTimeout(timer);
  }, [searchQuery, scholarships]);

  const navLinks = [
    { label: t.navGovernment, route: '/government-scholarships', icon: Landmark },
    { label: t.navPrivate, route: '/private-scholarships', icon: Briefcase },
    { label: t.navExplore, route: '/explore', icon: Compass },
    { label: t.navFindMine, route: '/search', icon: Target },
  ];

  const handleSelectSearchItem = (slug: string) => {
    setSearchFocused(false);
    setSearchQuery('');
    onNavigate(`/scholarship/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchFocused(false);
    onNavigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const isDarkModeActive =
    theme === 'dark' ||
    (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));

  return (
    <>
      {/* Floating Pill Container */}
      <header
        className={`fixed top-3 md:top-4 inset-x-0 mx-auto w-[92%] max-w-[1080px] z-50 transition-all duration-200 select-none ${
          isScrolled ? 'scale-[0.985] -translate-y-0.5' : ''
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="relative flex items-center justify-between h-[52px] md:h-[60px] px-3.5 md:px-5 rounded-full bg-white/90 dark:bg-[#181715]/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-800 shadow-[0_6px_25px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
        >
          {/* 1. Brand: Interactive Infinity Moving Logo + Shining Gold Bachelor Cap */}
          <BrandLogo
            size={36}
            showWordmark={true}
            onNavigate={onNavigate}
            wordmarkClassName="text-base md:text-lg"
          />

          {/* 2. Desktop Primary Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 ml-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-stone-950 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 shadow-xs font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-100/70 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Search Box */}
          <div className="relative hidden md:block flex-1 max-w-[240px] xl:max-w-[320px] mx-3 transition-all">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 dark:text-stone-500 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder={t.searchPlaceholder.slice(0, 32) + '...'}
                aria-label={t.searchAriaLabel}
                className="w-full h-8 pl-8 pr-12 text-xs rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 border border-transparent focus:border-stone-400 dark:focus:border-stone-600 focus:bg-white dark:focus:bg-stone-850 focus:outline-none transition-all shadow-inner"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium text-stone-400 dark:text-stone-500 bg-white/70 dark:bg-stone-900 px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-700 pointer-events-none">
                /
              </span>
            </form>

            {/* Smart Search Dropdown Modal/Anchor */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-10 mt-1 max-h-[380px] overflow-y-auto rounded-2xl bg-white dark:bg-[#181715] border border-stone-200 dark:border-stone-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-2.5 py-1 text-[11px] font-medium text-stone-400 border-b border-stone-100 dark:border-stone-800 mb-1">
                  <span>{searchResults?.isClosestMatch ? t.closestMatchesFor.replace('{query}', searchQuery) : 'Scholarship Suggestions'}</span>
                  <button
                    type="button"
                    onClick={() => setSearchFocused(false)}
                    className="hover:text-stone-600 dark:hover:text-stone-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Did you mean banner */}
                {searchResults?.didYouMean && (
                  <div className="mx-2 my-1 px-2.5 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
                    <span>
                      {t.didYouMean.replace('{suggestion}', searchResults.didYouMean)}
                    </span>
                    <button
                      onClick={() => setSearchQuery(searchResults.didYouMean || '')}
                      className="font-bold underline text-[11px] ml-2 text-stone-900 dark:text-stone-100"
                    >
                      Use
                    </button>
                  </div>
                )}

                {/* Results list */}
                {searchResults?.results && searchResults.results.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.results.slice(0, 6).map(({ scholarship: s }) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSelectSearchItem(s.id)}
                        className="w-full text-left p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors cursor-pointer group flex flex-col gap-1 border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-xs text-stone-900 dark:text-stone-100 group-hover:text-[#9E5336] dark:group-hover:text-[#D97E5E] line-clamp-1">
                            {s.short_name || s.name}
                          </span>
                          <TypeTag type={s.type} lang={lang} size="sm" />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                          <span className="truncate max-w-[160px]">{s.provider}</span>
                          <span className="shrink-0 text-stone-400">{s.last_date ? formatDate(s.last_date, lang) : t.rolling}</span>
                        </div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchFocused(false);
                        onNavigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
                      }}
                      className="w-full mt-2 py-1.5 text-center text-xs font-semibold text-[#9E5336] dark:text-[#D97E5E] hover:bg-stone-50 dark:hover:bg-stone-800 rounded-lg cursor-pointer"
                    >
                      View all matching scholarships →
                    </button>
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-stone-500">
                    <p className="font-medium text-stone-800 dark:text-stone-200">{t.popularScholarships}</p>
                    <p className="text-[11px] mt-0.5 text-stone-400">{t.noDeadEndSubtitle}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      {scholarships.slice(0, 3).map(s => (
                        <button
                          key={s.id}
                          onClick={() => handleSelectSearchItem(s.id)}
                          className="text-left text-xs p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate text-stone-900 dark:text-stone-100">{s.short_name}</span>
                          <TypeTag type={s.type} lang={lang} size="sm" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Controls: Lang, Theme, Profile */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                title={t.languageSelect}
              >
                <Globe className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" strokeWidth={1.75} />
                <span className="uppercase text-[11px]">{lang}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 py-1.5 rounded-2xl bg-white dark:bg-[#181715] border border-stone-200 dark:border-stone-800 shadow-xl z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {t.languageSelect}
                  </div>
                  {SUPPORTED_LANGUAGES.map(item => (
                    <button
                      key={item.code}
                      onClick={() => {
                        onLanguageChange(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                        lang === item.code
                          ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.nativeName}</span>
                        <span className="text-[10px] text-stone-400">({item.name})</span>
                      </div>
                      {lang === item.code && <Check className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* GitHub Repository Link */}
            <a
              href="https://github.com/AnnujjW/Scholarconnect-1-"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
              title="GitHub Repository (AnnujjW/Scholarconnect-1-)"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4 text-stone-800 dark:text-stone-200" />
            </a>

            {/* Theme Toggle Button (Light/Dark/Night mode) */}
            <button
              type="button"
              onClick={onThemeToggle}
              className="p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all cursor-pointer border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
              title={isDarkModeActive ? 'Switch to Light Mode' : 'Switch to Dark / Night Mode'}
              aria-label={t.themeToggle}
            >
              {isDarkModeActive ? (
                <Sun className="w-4 h-4 text-amber-500 hover:rotate-45 transition-transform" strokeWidth={1.75} />
              ) : (
                <Moon className="w-4 h-4 text-stone-800 hover:-rotate-12 transition-transform" strokeWidth={1.75} />
              )}
            </button>

            {/* User Profile / Auth Button */}
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:ring-2 hover:ring-stone-400 dark:hover:ring-stone-500 transition-all cursor-pointer border border-stone-200 dark:border-stone-700"
                title="Account Menu"
              >
                {isLoggedIn ? (
                  <span className="font-bold text-xs text-[#9E5336] dark:text-[#D97E5E]">
                    {userProfile.name.slice(0, 1).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-4 h-4 text-stone-600 dark:text-stone-400" strokeWidth={1.75} />
                )}
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 py-1.5 rounded-2xl bg-white dark:bg-[#181715] border border-stone-200 dark:border-stone-800 shadow-xl z-50 animate-in fade-in duration-100">
                  {isLoggedIn ? (
                    <>
                      <div className="px-3.5 py-2 border-b border-stone-100 dark:border-stone-800">
                        <p className="text-xs font-bold text-stone-900 dark:text-white truncate">{userProfile.name}</p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{userProfile.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onNavigate('/profile');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{t.myProfile}</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('/saved');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                          <span>{t.saved}</span>
                        </div>
                        {savedCount > 0 && (
                          <span className="text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold px-1.5 py-0.5 rounded-full">
                            {savedCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('/saved?tab=applications');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                        <span>{t.applications}</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('/admin');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer font-medium"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-[#9E5336]" />
                        <span>{t.adminPortal}</span>
                      </button>
                      <div className="border-t border-stone-100 dark:border-stone-800 my-1" />
                      <button
                        onClick={() => {
                          onLogout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.logout}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-2 border-b border-stone-100 dark:border-stone-800">
                        <button
                          onClick={() => {
                            onOpenAuth('register');
                            setProfileMenuOpen(false);
                          }}
                          className="w-full py-2 px-3 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white rounded-full transition-colors text-center cursor-pointer"
                        >
                          {t.signUp}
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          onOpenAuth('login');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-left cursor-pointer"
                      >
                        {t.signIn}
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('/admin');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-xs font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-left flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldAlert className="w-3 h-3 text-[#9E5336]" />
                        <span>{t.adminPortal}</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Expanded Floating Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-white/95 dark:bg-[#181715]/95 backdrop-blur-xl border border-stone-200 dark:border-stone-800 shadow-2xl z-50 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => {
                      onNavigate(link.route);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full h-12 px-4 text-sm font-semibold rounded-2xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-850'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative mt-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full h-11 pl-10 pr-4 text-sm rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-transparent focus:border-stone-400 focus:outline-none"
              />
            </form>

            {/* Mobile Language & Theme Quick Switch */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  {t.languageSelect}
                </span>
                <button
                  type="button"
                  onClick={onThemeToggle}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 cursor-pointer"
                >
                  {isDarkModeActive ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-stone-700" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORTED_LANGUAGES.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onLanguageChange(item.code);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                      lang === item.code
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {item.nativeName}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => {
                  onNavigate('/admin');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-stone-800 dark:text-stone-200"
              >
                {t.adminPortal}
              </button>
              <a
                href="https://github.com/AnnujjW/Scholarconnect-1-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <button
                onClick={() => {
                  onNavigate('/saved');
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-stone-600 dark:text-stone-400"
              >
                {t.saved} ({savedCount})
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

import React from 'react';
import { Home, Compass, Target, Bookmark, User } from 'lucide-react';
import { LanguageCode, getTranslation } from '../lib/i18n';

interface MobileBottomNavProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  savedCount: number;
  lang: LanguageCode;
  isLoggedIn: boolean;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

const HOME_LABELS: Record<LanguageCode, string> = {
  en: 'Home',
  hi: 'होम',
  mr: 'मुख्य',
  ta: 'முகப்பு',
  ur: 'ہوم',
  ja: 'ホーム',
  zh: '首页',
  ru: 'Главная',
  es: 'Inicio',
  de: 'Start',
};

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  onNavigate,
  savedCount,
  lang,
  isLoggedIn,
  onOpenAuth,
}) => {
  const t = getTranslation(lang);

  const navItems = [
    {
      id: 'home',
      label: HOME_LABELS[lang] || 'Home',
      route: '/',
      icon: Home,
      isActive: currentRoute === '/',
    },
    {
      id: 'explore',
      label: t.navExplore,
      route: '/explore',
      icon: Compass,
      isActive: currentRoute === '/explore' || currentRoute.startsWith('/government') || currentRoute.startsWith('/private'),
    },
    {
      id: 'search',
      label: t.navFindMine,
      route: '/search',
      icon: Target,
      isActive: currentRoute === '/search',
    },
    {
      id: 'saved',
      label: t.saved,
      route: '/saved',
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : null,
      isActive: currentRoute.startsWith('/saved'),
    },
    {
      id: 'profile',
      label: isLoggedIn ? t.myProfile : t.signIn,
      route: '/profile',
      icon: User,
      isActive: currentRoute === '/profile',
      action: !isLoggedIn && onOpenAuth ? () => onOpenAuth('login') : undefined,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#161513]/95 backdrop-blur-xl border-t border-stone-200/90 dark:border-stone-800/90 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-2 py-1 safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  onNavigate(item.route);
                }
              }}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[48px] rounded-xl transition-all cursor-pointer ${
                active
                  ? 'text-[#9E5336] dark:text-[#E08264]'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 active:scale-95'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    active ? 'scale-110' : ''
                  }`}
                  strokeWidth={active ? 2.3 : 1.75}
                />
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#9E5336] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium tracking-tight truncate max-w-[64px] transition-colors ${
                  active ? 'font-bold text-[#9E5336] dark:text-[#E08264]' : ''
                }`}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-4 h-0.5 rounded-full bg-[#9E5336] dark:bg-[#E08264]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

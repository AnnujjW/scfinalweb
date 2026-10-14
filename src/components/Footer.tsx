import React from 'react';
import { ShieldCheck, AlertCircle, ArrowUp, Github } from 'lucide-react';
import { SiteSettings } from '../types/scholarship';
import { LanguageCode, getTranslation, SUPPORTED_LANGUAGES } from '../lib/i18n';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  settings: SiteSettings;
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  lang,
  onNavigate,
  onLanguageChange
}) => {
  const t = getTranslation(lang);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-20 border-t border-stone-200/90 dark:border-stone-800/90 bg-white/70 dark:bg-[#151413]/70 backdrop-blur-md select-none">
      {/* Scam Warning Banner with Earthy Ochre */}
      <div className="w-full bg-[#FAF5EE] dark:bg-[#201C17] border-b border-[#EBDDC8] dark:border-[#383126] py-3 px-4">
        <div className="max-w-[1140px] mx-auto flex items-center justify-center gap-2 text-xs font-semibold text-[#8C581E] dark:text-[#E2A65E] text-center">
          <AlertCircle className="w-4 h-4 text-[#B87C31] dark:text-[#E2A65E] shrink-0" />
          <span>{t.scamWarning}</span>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Theme Line */}
          <div className="space-y-3">
            <div className="flex items-center">
              <BrandLogo
                size={34}
                showWordmark={true}
                onNavigate={onNavigate}
                wordmarkClassName="text-base"
              />
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {settings.site_tagline} — One verified library for government and private technical education scholarships.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2C523D] dark:text-[#589A76]" />
              <span>DPDP Act (India) compliant</span>
            </div>

            <div className="pt-1">
              <a
                href="https://github.com/AnnujjW/Scholarconnect-1-"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800/80 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold border border-stone-200 dark:border-stone-700/80 transition-colors shadow-xs"
              >
                <Github className="w-4 h-4 text-stone-800 dark:text-stone-100 shrink-0" />
                <span>GitHub: AnnujjW/Scholarconnect-1-</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
              Scholarships
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('/government-scholarships')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  Government Scholarships (Central & MahaDBT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/private-scholarships')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  Private Scholarships & Foundations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/explore')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  Explore All Scholarships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/search')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  Search Your Scholarship (Match Engine)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Guides */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
              Guides & Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  Document Guides (Income, Caste, Domicile)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/faq?tab=mahadbt')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  MahaDBT & NSP Application Walkthrough
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  About ScholarConnect
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#9A5034] dark:hover:text-[#E08264] transition-colors cursor-pointer text-left"
                >
                  Contact & Helpline ({settings.helpline_number})
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Languages & Corrections */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-3">
              Languages
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SUPPORTED_LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`text-[11px] px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    lang === l.code
                      ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-950 font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
            <button
              onClick={() => onNavigate('/contact?type=correction')}
              className="text-xs text-[#9A5034] dark:text-[#E08264] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.reportIssue}</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>© {new Date().getFullYear()} ScholarConnect. {settings.site_tagline}. Free for all students.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('/admin')}
              className="hover:text-[#B87C31] dark:hover:text-[#D99543] transition-colors cursor-pointer"
            >
              Admin Dashboard
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 cursor-pointer"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

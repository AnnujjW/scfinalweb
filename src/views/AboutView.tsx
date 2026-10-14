import React from 'react';
import { ShieldCheck, Users, CheckCircle2 } from 'lucide-react';
import { LanguageCode, getTranslation } from '../lib/i18n';

interface AboutViewProps {
  lang: LanguageCode;
  onNavigate: (route: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang }) => {
  getTranslation(lang);

  return (
    <div className="max-w-[880px] mx-auto w-full px-4 md:px-8 py-4 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-heading font-extrabold text-stone-900 dark:text-stone-100">
          About ScholarConnect
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Connecting Students to Scholarships — calmly, accurately, and without commercial bias.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#181716] border border-stone-200/90 dark:border-stone-800/90 shadow-xs space-y-5 text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
        <p>
          In India, every academic admission cycle sees thousands of eligible students—especially from reserved categories (SC, ST, VJNT, OBC, SEBC), economically weaker sections (EBC), orphans, and persons with disabilities—miss out on life-changing scholarships simply because notices are scattered across hundreds of obscure PDFs and gazettes.
        </p>
        <p>
          <strong>ScholarConnect was built with one goal:</strong> To provide a single, verified, calm library where students and their parents can review eligibility rules, required documents, and exact deadlines without intrusive advertisements, commission brokers, or misleading claims.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="p-4 rounded-2xl bg-stone-100/80 dark:bg-stone-850 dark:bg-stone-800/80 text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-[#9A5034] dark:text-[#E08264] mx-auto" />
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs">100% Free Access</h3>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">Zero subscriptions, fees, or hidden application charges.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#EDF4F0] dark:bg-[#14241B] text-center space-y-1 border border-[#BDD1C6]/40 dark:border-[#274735]">
            <ShieldCheck className="w-6 h-6 text-[#2C523D] dark:text-[#589A76] mx-auto" />
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs">Verified Sources</h3>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">Directly mapped to NSP, MahaDBT, and official CSR trusts.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF5EE] dark:bg-[#201C17] text-center space-y-1 border border-[#EBDDC8]/40 dark:border-[#383126]">
            <Users className="w-6 h-6 text-[#B87C31] dark:text-[#E2A65E] mx-auto" />
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs">10 Languages</h3>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">Accessible for students and parents across vernacular scripts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { LanguageCode } from '../lib/i18n';

interface PrivacyViewProps {
  lang: LanguageCode;
  onNavigate: (route: string) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = () => {
  return (
    <div className="max-w-[840px] mx-auto w-full px-4 md:px-8 py-4 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-stone-900 dark:text-stone-100">
          Privacy Policy & DPDP Act Compliance
        </h1>
        <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Effective Date: October 2026 · Digital Personal Data Protection (DPDP) Act Compliance Notice
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#181716] border border-stone-200/90 dark:border-stone-800/90 shadow-xs space-y-6 text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-heading font-bold text-stone-900 dark:text-stone-100">
            1. Principle of Minimum Data Collection
          </h2>
          <p>
            ScholarConnect collects only the minimal data points necessary to compute eligibility matches (such as education level, social category, state of domicile, and approximate income range). We do not collect Aadhaar numbers, bank account passwords, or sensitive biometrics.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-heading font-bold text-stone-900 dark:text-stone-100">
            2. Local Browser-First Computation
          </h2>
          <p>
            The scholarship matching algorithms and questionnaire calculations run locally in your web browser. Answers to the eligibility calculator leave your device only if you explicitly choose to save them to your account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-heading font-bold text-stone-900 dark:text-stone-100">
            3. No Data Brokering or Commercial Monetization
          </h2>
          <p>
            ScholarConnect strictly never sells, leases, or trades student personal data, phone numbers, or academic marks to coaching institutes, student loan agents, or third-party marketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-heading font-bold text-stone-900 dark:text-stone-100">
            4. User Rights Under the DPDP Act
          </h2>
          <p>
            Under India's Digital Personal Data Protection Act, students retain full rights to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Review all information saved in their student profile.</li>
            <li>Export their profile data at any time via a single-click JSON download.</li>
            <li>Delete their saved bookmarks and profile data permanently.</li>
          </ul>
        </section>

        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2C523D] dark:text-[#589A76]" />
          <span>For privacy inquiries, contact privacy@scholarconnect.in</span>
        </div>
      </div>
    </div>
  );
};

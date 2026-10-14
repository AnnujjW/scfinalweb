import React, { useState } from 'react';
import { HelpCircle, FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { LanguageCode } from '../lib/i18n';

interface FAQViewProps {
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  initialTab?: string;
}

export const FAQView: React.FC<FAQViewProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guides = [
    {
      title: 'Tahsildar Income Certificate (वार्षिक उत्पन्न दाखला)',
      validity: 'Valid for current financial year (1 April to 31 March)',
      steps: [
        'Apply online on Aaple Sarkar portal (aaplesarkar.mahaonline.gov.in) or offline via nearest Maha e-Seva Kendra / Setu Kendra.',
        'Required Documents: Ration Card, Parent Salary Slip / Form 16 OR Talathi Ahwal (तलाठी अहवाल), Aadhaar Card, Electricity Bill.',
        'Ensure the certificate explicitly mentions total gross annual family income from all sources in both words and digits.',
        'MahaDBT EBC requirement: Income must be strictly ≤ ₹8,00,000.'
      ]
    },
    {
      title: 'Caste Validity Certificate (जात वैधता प्रमाणपत्र)',
      validity: 'Permanent validity once issued',
      steps: [
        'Mandatory for all SC, ST, VJNT, OBC, and SBC students taking Engineering admission via Centralized CAP rounds.',
        'Apply through CCVIS (Caste Certificate Verification Information System) portal: bartievalidity.maharashtra.gov.in.',
        'Required Documents: Original Caste Certificate, Primary school leaving certificate of student, father, and grandfather (showing caste entry prior to 1967/1961/1950 depending on category).',
        'College Principal recommendation letter / Form 16.'
      ]
    },
    {
      title: 'Non-Creamy Layer Certificate - NCL (उन्नत व प्रगत गटात मोडत नसल्याचे प्रमाणपत्र)',
      validity: 'Valid for 3 years (Check expiry date carefully)',
      steps: [
        'Mandatory for VJ/DT, NT-B, NT-C, NT-D, OBC, and SBC categories to avail fee reimbursement.',
        'Required Documents: 3 consecutive years Income Certificates from Tahsildar showing aggregate average family income ≤ ₹8,00,000.',
        'SC and ST students DO NOT require Non-Creamy Layer certificate.'
      ]
    },
    {
      title: 'Maharashtra State Domicile Certificate (अधिवास प्रमाणपत्र)',
      validity: 'Permanent validity',
      steps: [
        'Required to prove continuous 15 years residence in the State of Maharashtra.',
        'Required Documents: School Leaving Certificate showing birthplace in Maharashtra OR 15 years residential proof, Ration Card, Aadhaar Card.'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Can I apply for both a Government scholarship and a Private foundation scholarship?',
      a: 'Generally, government rules state that a student cannot avail two government tuition fee waivers simultaneously. However, many private foundations (such as Reliance Foundation, HDFC Parivartan, or Tata Capital Pankh) allow students receiving government hostel/concession allowances to apply as long as total aid does not exceed total college fees. Always verify with your college scholarship nodal officer.'
    },
    {
      q: 'What is the TFWS (Tuition Fee Waiver Scheme) supernumerary quota?',
      a: 'Under AICTE rules, every engineering college provides 5% extra seats above the sanctioned intake for students with family income under ₹8 Lakh. If allotted a TFWS seat during CAP rounds, 100% of your tuition fee is waived for all four years of engineering.'
    },
    {
      q: 'What should I do if my bank account is not Aadhaar seeded / NPCI mapped?',
      a: 'All Direct Benefit Transfer (DBT) scholarships require your active bank account to be linked to Aadhaar through NPCI mapper. Visit your bank branch and submit the "Aadhaar NPCI DBT Seeding Mandate Form". You can verify status online on the UIDAI website.'
    },
    {
      q: 'Are genuine scholarships ever applied through paid third-party agents?',
      a: 'NEVER pay anyone to apply for scholarships. Government portals (NSP, MahaDBT) and private foundation applications are 100% free of cost. Beware of fake SMS messages or consultants demanding registration charges.'
    }
  ];

  return (
    <div className="max-w-[960px] mx-auto w-full px-4 md:px-8 py-4 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#9A5034] dark:text-[#E08264]" />
          <span>Documentation & Guidelines</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-stone-900 dark:text-stone-100">
          Document Guides & Official Portals
        </h1>
        <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
          Everything you need to know about certificates, validity periods, and avoiding application rejection.
        </p>
      </div>

      {/* Guide Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#9A5034] dark:text-[#E08264]" />
          <span>Essential Certificate Guides</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((g, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#181716] border border-stone-200/90 dark:border-stone-800/90 shadow-xs space-y-3"
            >
              <div>
                <h3 className="font-heading font-bold text-sm text-stone-900 dark:text-stone-100">
                  {g.title}
                </h3>
                <span className="inline-block mt-1 text-[11px] font-semibold text-[#2C523D] dark:text-[#589A76] bg-[#EDF4F0] dark:bg-[#14241B] px-2 py-0.5 rounded-full border border-[#BDD1C6]/50 dark:border-[#274735]">
                  {g.validity}
                </span>
              </div>

              <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300 list-disc list-inside leading-relaxed">
                {g.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Official Portals Directory */}
      <section className="p-6 rounded-3xl bg-stone-100/70 dark:bg-[#151413] border border-stone-200/90 dark:border-stone-800/90 space-y-4">
        <h2 className="text-base font-heading font-bold text-stone-900 dark:text-stone-100">
          Direct Official Portal Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="https://scholarships.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/80 dark:border-stone-700 hover:border-stone-400 transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="font-bold text-stone-900 dark:text-stone-100">National Scholarship Portal</p>
              <p className="text-[11px] text-stone-400">scholarships.gov.in</p>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#9A5034] transition-colors" />
          </a>

          <a
            href="https://mahadbt.maharashtra.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/80 dark:border-stone-700 hover:border-stone-400 transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="font-bold text-stone-900 dark:text-stone-100">MahaDBT Portal</p>
              <p className="text-[11px] text-stone-400">mahadbt.maharashtra.gov.in</p>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#9A5034] transition-colors" />
          </a>

          <a
            href="https://cetcell.mahacet.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/80 dark:border-stone-700 hover:border-stone-400 transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="font-bold text-stone-900 dark:text-stone-100">State CET Cell CAP</p>
              <p className="text-[11px] text-stone-400">cetcell.mahacet.org</p>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#9A5034] transition-colors" />
          </a>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-stone-900 dark:text-stone-100">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/80 dark:border-stone-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4.5 text-left font-semibold text-xs md:text-sm text-stone-900 dark:text-stone-100 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#9A5034]" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>
                {isOpen && (
                  <div className="px-4.5 pb-4.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Mail, Phone, Check, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types/scholarship';
import { LanguageCode, getTranslation } from '../lib/i18n';

interface ContactViewProps {
  settings: SiteSettings;
  lang: LanguageCode;
  onNavigate: (route: string) => void;
  initialType?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({
  settings,
  lang,
  initialType = 'general'
}) => {
  getTranslation(lang);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialType === 'correction' ? 'Suggest a Correction / Report Data Discrepancy' : 'General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-[800px] mx-auto w-full px-4 md:px-8 py-4 space-y-8">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-stone-900 dark:text-stone-100">
          Contact & Community Feedback
        </h1>
        <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400">
          Have an updated circular or want to report a broken link? We review all feedback daily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/90 dark:border-stone-800/90 space-y-1">
          <Mail className="w-5 h-5 text-[#9A5034] dark:text-[#E08264] mb-2" />
          <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">Email Desk</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">{settings.contact_email}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/90 dark:border-stone-800/90 space-y-1">
          <Phone className="w-5 h-5 text-[#2C523D] dark:text-[#589A76] mb-2" />
          <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">National Helpline</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">{settings.helpline_number}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#181716] border border-stone-200/90 dark:border-stone-800/90 space-y-1">
          <ShieldCheck className="w-5 h-5 text-[#B87C31] dark:text-[#D99543] mb-2" />
          <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">Response Time</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">Within 24 business hours</p>
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#181716] border border-stone-200/90 dark:border-stone-800/90 shadow-xs">
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <Check className="w-10 h-10 text-[#2C523D] dark:text-[#589A76] mx-auto" />
            <h3 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100">
              Feedback Received!
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Thank you for keeping ScholarConnect accurate for thousands of students. Our editorial team will verify and update the database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Priya Deshmukh"
                  className="w-full h-10 px-3 rounded-xl bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full h-10 px-3 rounded-xl bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Message or Discrepancy Note</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Include scheme name, official gazette link, or corrected date..."
                className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white cursor-pointer shadow-xs transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { LanguageCode, getTranslation } from '../lib/i18n';
import { UserProfile } from '../types/scholarship';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (profile: Partial<UserProfile>) => void;
  lang: LanguageCode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
  lang
}) => {
  const t = getTranslation(lang);
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('Anuj Sharma');
  const [email, setEmail] = useState('anujw7226@gmail.com');
  const [password, setPassword] = useState('Scholar2026!');
  const [consentDpdp, setConsentDpdp] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name || 'Anuj Sharma',
      email: email || 'anujw7226@gmail.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-2.5">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
            {mode === 'register' ? t.signUp : t.signIn}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === 'register'
              ? 'Save scholarships, track application stages, and get match alerts.'
              : 'Access your saved scholarships and customized matching profile.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Rahul Patil"
                  className="w-full h-10 pl-9 pr-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email or Mobile Number
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com or 10-digit mobile"
                className="w-full h-10 pl-9 pr-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-10 pl-9 pr-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                required
                checked={consentDpdp}
                onChange={e => setConsentDpdp(e.target.checked)}
                className="mt-0.5 rounded text-indigo-600"
              />
              <span>
                I agree to the privacy policy under the India DPDP Act. My data will be kept private and never sold to third parties.
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-10 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors cursor-pointer shadow-sm mt-2"
          >
            {mode === 'register' ? 'Create Free Student Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
          {mode === 'register' ? (
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-slate-600 dark:text-slate-400">
              New to ScholarConnect?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

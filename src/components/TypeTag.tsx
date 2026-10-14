import React from 'react';
import { ScholarshipType } from '../types/scholarship';
import { LanguageCode, getTranslation } from '../lib/i18n';

interface TypeTagProps {
  type: ScholarshipType;
  lang?: LanguageCode;
  className?: string;
  size?: 'sm' | 'md';
}

export const TypeTag: React.FC<TypeTagProps> = ({
  type,
  lang = 'en',
  className = '',
  size = 'sm'
}) => {
  const t = getTranslation(lang);
  const isGov = type === 'Government';
  const label = isGov ? t.tagGovernment : t.tagPrivate;

  // 10-11px, small caps, pill shape, tinted earthy tones: forest olive for Government, clay sienna for Private
  const baseClasses =
    'inline-flex items-center font-semibold tracking-wider uppercase rounded-full transition-colors whitespace-nowrap select-none';
  const sizeClasses =
    size === 'sm'
      ? 'text-[10px] px-2 py-0.5 leading-tight'
      : 'text-[11px] px-2.5 py-1 leading-normal';

  const colorClasses = isGov
    ? 'bg-[#EDF4F0] text-[#224A37] border border-[#C5D8CF] dark:bg-[#16271F] dark:text-[#84BCA0] dark:border-[#2C4D3E]'
    : 'bg-[#F7EFE9] text-[#713928] border border-[#E3CBC1] dark:bg-[#2B1914] dark:text-[#DC9482] dark:border-[#573227]';

  return (
    <span
      className={`${baseClasses} ${sizeClasses} ${colorClasses} ${className}`}
      style={{ fontVariant: 'all-small-caps' }}
      title={`${type} Scholarship`}
    >
      {label}
    </span>
  );
};

import Fuse, { IFuseOptions } from 'fuse.js';
import { Scholarship } from '../types/scholarship';

export interface SearchResult {
  scholarship: Scholarship;
  score: number;
  isExactOrClose: boolean;
  highlightedName?: string;
}

export interface SmartSearchResponse {
  query: string;
  results: SearchResult[];
  didYouMean?: string;
  isClosestMatch: boolean;
  fallbackToPopular: boolean;
}

// Synonyms map for normalized domain expansion
const SYNONYMS: Record<string, string[]> = {
  girl: ['girls', 'female', 'women', 'kanya', 'pragati', 'stem stars'],
  girls: ['female', 'women', 'kanya', 'pragati', 'stem stars'],
  women: ['girls', 'female', 'kanya', 'pragati'],
  handicapped: ['pwd', 'divyang', 'saksham', 'disability', 'disabled'],
  pwd: ['divyang', 'handicapped', 'saksham', 'disability'],
  divyang: ['pwd', 'handicapped', 'saksham', 'disability'],
  orphan: ['swanath', 'covid', 'destitute', 'ananth'],
  sc: ['scheduled caste', 'social justice', 'freeship', 'post matric'],
  st: ['scheduled tribe', 'tribal', 'freeship', 'post matric'],
  obc: ['other backward class', 'vjnt', 'ebc', 'ncl'],
  ebc: ['rajarshi chhatrapati shahu maharaj', 'economically backward', 'income waiver'],
  gate: ['mtech', 'aicte pg', 'pg scholarship', 'master'],
  mtech: ['gate', 'aicte pg', 'master of engineering'],
  hostel: ['panjabrao deshmukh', 'mess allowance', 'maintenance'],
  abroad: ['chevening', 'daad', 'foreign', 'overseas', 'uk', 'germany']
};

export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0900-\u097F\u0B80-\u0BFF\u0600-\u06FF]/g, '')
    .replace(/\s+/g, ' ');
}

export function cleanFillerWords(query: string): string {
  const normalized = normalizeQuery(query);
  const fillers = ['scholarship', 'yojana', 'scheme', 'yojna', 'program', 'programme', 'foundation', 'portal', 'form', 'shishyavrutti'];
  const words = normalized.split(' ');
  const filtered = words.filter(w => !fillers.includes(w));
  return filtered.length > 0 ? filtered.join(' ') : normalized;
}

export function initSearchEngine(scholarships: Scholarship[]) {
  const options: IFuseOptions<Scholarship> = {
    keys: [
      { name: 'name', weight: 0.35 },
      { name: 'short_name', weight: 0.3 },
      { name: 'aliases', weight: 0.25 },
      { name: 'provider', weight: 0.15 },
      { name: 'tags', weight: 0.15 },
      { name: 'categories', weight: 0.1 },
      { name: 'type', weight: 0.1 },
      { name: 'courses', weight: 0.05 },
      { name: 'states', weight: 0.05 }
    ],
    threshold: 0.45, // Typo tolerance (handles 'pragti', 'swanat', 'parivrtan', 'scolarship')
    ignoreLocation: true,
    minMatchCharLength: 2,
    includeScore: true
  };

  return new Fuse(scholarships, options);
}

export function smartSearch(
  query: string,
  scholarships: Scholarship[]
): SmartSearchResponse {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      query: '',
      results: [],
      isClosestMatch: false,
      fallbackToPopular: false
    };
  }

  const fuse = initSearchEngine(scholarships);
  const cleaned = cleanFillerWords(trimmed);

  // 1. First attempt: cleaned query
  let fuseResults = fuse.search(cleaned);

  // 2. If no direct hit, try raw trimmed
  if (fuseResults.length === 0 && cleaned !== trimmed) {
    fuseResults = fuse.search(trimmed);
  }

  // 3. Synonym expansion check
  if (fuseResults.length === 0) {
    const tokens = cleaned.split(' ');
    for (const token of tokens) {
      if (SYNONYMS[token]) {
        for (const syn of SYNONYMS[token]) {
          const synHit = fuse.search(syn);
          if (synHit.length > 0) {
            fuseResults = synHit;
            break;
          }
        }
      }
      if (fuseResults.length > 0) break;
    }
  }

  // Check if we found strong matches
  const formattedResults: SearchResult[] = fuseResults.map(res => ({
    scholarship: res.item,
    score: res.score ?? 0.5,
    isExactOrClose: (res.score ?? 1) <= 0.35
  }));

  // Find top suggestion for "Did you mean"
  let didYouMean: string | undefined;
  if (formattedResults.length > 0) {
    const top = formattedResults[0].scholarship;
    const lowerQ = trimmed.toLowerCase();
    const lowerName = top.name.toLowerCase();
    const lowerShort = top.short_name.toLowerCase();
    if (!lowerName.includes(lowerQ) && !lowerShort.includes(lowerQ)) {
      didYouMean = top.short_name || top.name;
    }
  }

  // HARD RULE: Never show empty / dead end.
  // If no hits or low confidence, fallback to nearest or popular/closing soon scholarships!
  if (formattedResults.length === 0) {
    // Collect closing soon or featured
    const active = scholarships.filter(s => s.show_on_site);
    const closingSoon = active
      .filter(s => s.status === 'Closing soon' || s.status === 'Open')
      .slice(0, 6);

    const fallbackResults: SearchResult[] = (closingSoon.length > 0 ? closingSoon : active.slice(0, 6)).map(s => ({
      scholarship: s,
      score: 0.9,
      isExactOrClose: false
    }));

    return {
      query: trimmed,
      results: fallbackResults,
      didYouMean: scholarships[0]?.short_name,
      isClosestMatch: true,
      fallbackToPopular: true
    };
  }

  const isClosestMatch = formattedResults[0].score > 0.3;

  return {
    query: trimmed,
    results: formattedResults.slice(0, 10),
    didYouMean,
    isClosestMatch,
    fallbackToPopular: false
  };
}

import { Scholarship, UserProfile, MatchScoreResult } from '../types/scholarship';

export function calculateScholarshipMatch(
  profile: UserProfile,
  scholarship: Scholarship
): MatchScoreResult {
  const ineligibilityReasons: string[] = [];
  const matchStrengths: string[] = [];
  const warningChecks: string[] = [];

  let earnedPoints = 0;
  let possiblePoints = 0;

  // 1. HARD FILTERS (Immediate ineligibility flags)
  // Deadline check
  if (scholarship.status === 'Closed') {
    ineligibilityReasons.push('Application deadline has closed for the current academic session.');
  }

  // Gender check
  if (scholarship.gender === 'Female only' && profile.gender === 'Male only') {
    ineligibilityReasons.push('Exclusively reserved for female / girl students.');
  } else if (scholarship.special_criteria.girls_only && profile.gender === 'Male only') {
    ineligibilityReasons.push('Exclusively open to female students.');
  }

  // Degree Level check
  if (
    profile.current_level &&
    scholarship.level.length > 0 &&
    !scholarship.level.includes(profile.current_level)
  ) {
    ineligibilityReasons.push(
      `Open only for ${scholarship.level.join('/')} students (Your profile is ${profile.current_level}).`
    );
  }

  // State Domicile check
  const isAllIndia = scholarship.states.includes('All India');
  if (
    profile.domicile_state &&
    !isAllIndia &&
    !scholarship.states.includes(profile.domicile_state)
  ) {
    ineligibilityReasons.push(
      `Requires domicile of ${scholarship.states.join(', ')} (Your domicile is ${profile.domicile_state}).`
    );
  }

  // Category Restriction check
  const isCategoryOpenToAll =
    scholarship.categories.includes('All') ||
    scholarship.categories.includes('Open');
  if (
    profile.category &&
    !isCategoryOpenToAll &&
    !scholarship.categories.includes(profile.category)
  ) {
    ineligibilityReasons.push(
      `Reserved for ${scholarship.categories.join(', ')} categories.`
    );
  }

  // Income Cap check (with 10% soft tolerance leeway for warnings)
  if (scholarship.max_income && profile.annual_family_income !== '') {
    const userIncome = Number(profile.annual_family_income);
    if (userIncome > scholarship.max_income * 1.1) {
      ineligibilityReasons.push(
        `Family income (₹${userIncome.toLocaleString()}) exceeds the maximum ceiling of ₹${scholarship.max_income.toLocaleString()}.`
      );
    } else if (userIncome > scholarship.max_income) {
      warningChecks.push(
        `Income is slightly near the cap of ₹${scholarship.max_income.toLocaleString()}. Verify latest competent authority certificate.`
      );
    }
  }

  // Special criteria checks:
  if (scholarship.special_criteria.orphan && !profile.is_orphan) {
    ineligibilityReasons.push('Reserved for orphans / Covid-affected or martyr wards.');
  }
  if (scholarship.special_criteria.pwd && !profile.is_pwd) {
    ineligibilityReasons.push('Requires certificate of disability (Divyangjan ≥40%).');
  }
  if (scholarship.special_criteria.defence && !profile.is_defence_ward) {
    ineligibilityReasons.push('Requires parent to be an Armed Forces / Paramilitary ex-serviceman or martyr.');
  }
  if (scholarship.special_criteria.minority && !profile.is_minority) {
    ineligibilityReasons.push('Reserved for notified minority religious communities.');
  }

  // Preferred Type (Govt / Private)
  if (
    profile.preferred_type &&
    profile.preferred_type !== 'Both' &&
    profile.preferred_type !== scholarship.type
  ) {
    warningChecks.push(`This is a ${scholarship.type} scheme (Your preferred filter is ${profile.preferred_type}).`);
  }

  // 2. SOFT SCORE WEIGHTS (Max 100 points)
  // Category (25 points)
  possiblePoints += 25;
  if (profile.category && scholarship.categories.includes(profile.category)) {
    earnedPoints += 25;
    matchStrengths.push(`Directly targets your category (${profile.category}).`);
  } else if (isCategoryOpenToAll) {
    earnedPoints += 20;
    matchStrengths.push('Open to all social categories.');
  }

  // Income (20 points)
  possiblePoints += 20;
  if (scholarship.max_income) {
    if (profile.annual_family_income !== '') {
      const userIncome = Number(profile.annual_family_income);
      if (userIncome <= scholarship.max_income) {
        earnedPoints += 20;
        matchStrengths.push(`Family income is within the ₹${(scholarship.max_income / 100000).toFixed(1)} Lakh limit.`);
      }
    }
  } else {
    // No income cap = merit based
    earnedPoints += 15;
    matchStrengths.push('No strict income cap specified (merit-driven).');
  }

  // Course & Branch (15 points)
  possiblePoints += 15;
  if (scholarship.courses.includes('Engineering') || scholarship.courses.includes('All')) {
    earnedPoints += 10;
    if (scholarship.branches.includes('All') || scholarship.branches.includes(profile.branch)) {
      earnedPoints += 5;
      matchStrengths.push(`Covers your branch (${profile.branch || 'Engineering'}).`);
    } else {
      warningChecks.push('Check branch eligibility in the official notification.');
    }
  }

  // Level & Year (10 points)
  possiblePoints += 10;
  if (profile.current_level && scholarship.level.includes(profile.current_level)) {
    earnedPoints += 10;
    matchStrengths.push(`Applicable for ${profile.current_level} programs.`);
  } else if (scholarship.level.length === 0) {
    earnedPoints += 7;
  }

  // Academic Percentage (10 points)
  possiblePoints += 10;
  const userMarks = Number(profile.last_exam_percentage || profile.twelfth_percentage || 0);
  if (scholarship.min_percent) {
    if (userMarks >= scholarship.min_percent) {
      earnedPoints += 10;
      matchStrengths.push(`Marks (${userMarks}%) meet or exceed minimum requirement (${scholarship.min_percent}%).`);
    } else if (userMarks > 0) {
      warningChecks.push(`Requires minimum ${scholarship.min_percent}% (Your score is ${userMarks}%).`);
      earnedPoints += 3;
    }
  } else {
    earnedPoints += 8;
  }

  // State Domicile (10 points)
  possiblePoints += 10;
  if (isAllIndia) {
    earnedPoints += 10;
    matchStrengths.push('All India quota — open across all states.');
  } else if (profile.domicile_state && scholarship.states.includes(profile.domicile_state)) {
    earnedPoints += 10;
    matchStrengths.push(`State specific advantage for ${profile.domicile_state}.`);
  }

  // Gender (5 points)
  possiblePoints += 5;
  if (scholarship.gender === 'Female only' && profile.gender === 'Female only') {
    earnedPoints += 5;
    matchStrengths.push('Special reservation for girl students.');
  } else if (scholarship.gender === 'All') {
    earnedPoints += 5;
  }

  // Special Situation (5 points)
  possiblePoints += 5;
  if (profile.is_pwd && scholarship.special_criteria.pwd) {
    earnedPoints += 5;
    matchStrengths.push('Prioritized for PWD / Divyang students.');
  } else if (profile.is_orphan && scholarship.special_criteria.orphan) {
    earnedPoints += 5;
    matchStrengths.push('Prioritized for orphan / ward of martyr students.');
  } else if (profile.is_defence_ward && scholarship.special_criteria.defence) {
    earnedPoints += 5;
    matchStrengths.push('Prioritized for defence & paramilitary wards.');
  } else {
    earnedPoints += 3;
  }

  // Calculate percentage
  const matchScore = Math.min(100, Math.round((earnedPoints / possiblePoints) * 100));
  const isEligible = ineligibilityReasons.length === 0;

  return {
    scholarship,
    matchScore,
    isEligible,
    ineligibilityReasons,
    matchStrengths: matchStrengths.slice(0, 3), // 3 green ticks as per spec
    warningChecks: warningChecks.slice(0, 3)
  };
}

export function groupAndRankMatches(
  profile: UserProfile,
  scholarships: Scholarship[]
): {
  bestMatches: MatchScoreResult[];
  goodMatches: MatchScoreResult[];
  worthChecking: MatchScoreResult[];
  notEligible: MatchScoreResult[];
} {
  const evaluated = scholarships
    .filter(s => s.show_on_site)
    .map(s => calculateScholarshipMatch(profile, s));

  // Sort eligible by match score desc, then nearest deadline, then higher amount
  const eligible = evaluated
    .filter(r => r.isEligible)
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      // tie breaker 1: deadline
      const dateA = a.scholarship.last_date ? new Date(a.scholarship.last_date).getTime() : 9999999999999;
      const dateB = b.scholarship.last_date ? new Date(b.scholarship.last_date).getTime() : 9999999999999;
      if (dateA !== dateB) return dateA - dateB;
      // tie breaker 2: amount
      return b.scholarship.amount_value - a.scholarship.amount_value;
    });

  const notEligible = evaluated.filter(r => !r.isEligible);

  const bestMatches = eligible.filter(r => r.matchScore >= 80);
  const goodMatches = eligible.filter(r => r.matchScore >= 50 && r.matchScore < 80);
  const worthChecking = eligible.filter(r => r.matchScore < 50);

  // Spec rule: If bestMatches is empty, promote nearest good ones or worth checking so student never sees empty
  return {
    bestMatches,
    goodMatches,
    worthChecking,
    notEligible
  };
}

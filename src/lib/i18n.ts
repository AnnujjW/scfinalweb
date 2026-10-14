export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'ur' | 'ja' | 'zh' | 'ru' | 'es' | 'de';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
];

export interface TranslationDictionary {
  // Brand & Nav
  siteName: string;
  themeLine: string;
  navGovernment: string;
  navPrivate: string;
  navExplore: string;
  navFindMine: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  searchShortcut: string;
  themeToggle: string;
  languageSelect: string;
  signIn: string;
  signUp: string;
  myProfile: string;
  saved: string;
  applications: string;
  settings: string;
  logout: string;
  adminPortal: string;

  // Type Tags
  tagGovernment: string;
  tagPrivate: string;

  // Ticker
  liveTickerTitle: string;
  daysLeft: string;
  lastDateToday: string;
  lastDateOn: string;
  closed: string;
  rolling: string;
  open: string;
  closingSoon: string;

  // Hero
  heroExploreBtn: string;
  heroSearchBtn: string;
  statsScholarshipsListed: string;
  statsClosingThisMonth: string;
  statsCategoriesCovered: string;
  statsStatesCovered: string;
  howItWorksTitle: string;
  howItWorksStep1Title: string;
  howItWorksStep1Desc: string;
  howItWorksStep2Title: string;
  howItWorksStep2Desc: string;
  howItWorksStep3Title: string;
  howItWorksStep3Desc: string;

  // Filters & Common
  filterByCategory: string;
  filterByLevel: string;
  filterByState: string;
  filterMatchAny: string;
  filterMatchAll: string;
  filterClearAll: string;
  sortBy: string;
  sortBestMatch: string;
  sortDeadlineSoonest: string;
  sortAmountHighToLow: string;
  sortNewest: string;
  sortAlphabetical: string;
  resultsCount: string;
  noExactMatchShowingClosest: string;
  relaxFilters: string;
  viewDetails: string;
  applyOnOfficialSite: string;
  saveScholarship: string;
  savedToProfile: string;
  compare: string;
  checkEligibility: string;
  lastVerifiedOn: string;
  scamWarning: string;
  reportIssue: string;

  // Search Engine
  closestMatchesFor: string;
  didYouMean: string;
  popularScholarships: string;
  noDeadEndSubtitle: string;

  // Match Engine
  matchBestMatches: string;
  matchGoodMatches: string;
  matchWorthChecking: string;
  matchNotEligible: string;
  matchScore: string;
  editMyAnswers: string;
  whyItMatches: string;
  thingsToCheck: string;
  printOrSavePdf: string;
  heroExploreSub: string;
  heroSearchSub: string;
  freeVerifiedBadge: string;
  officialLinksBadge: string;
  featuredOpportunities: string;
  featuredSubtitle: string;
  viewAll: string;
  howItWorksSubtitle: string;
  guidanceReserved: string;
  domicileIncomeTitle: string;
  domicileIncomeDesc: string;
  readGuidesBtn: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    siteName: 'ScholarConnect',
    themeLine: 'Connecting Students to Scholarships',
    navGovernment: 'Government',
    navPrivate: 'Private',
    navExplore: 'Explore',
    navFindMine: 'Find Mine',
    searchPlaceholder: 'Search scholarships, AICTE, MahaDBT, Reliance...',
    searchAriaLabel: 'Search scholarships across India',
    searchShortcut: 'Press / to search',
    themeToggle: 'Toggle theme',
    languageSelect: 'Change language',
    signIn: 'Sign In',
    signUp: 'Register / Sign Up',
    myProfile: 'My Profile',
    saved: 'Saved Scholarships',
    applications: 'Applications Tracker',
    settings: 'Settings',
    logout: 'Log Out',
    adminPortal: 'Admin Console',

    tagGovernment: 'GOVERNMENT',
    tagPrivate: 'PRIVATE',

    liveTickerTitle: 'LIVE · Closing Soon',
    daysLeft: '{count} days left',
    lastDateToday: 'Last day today!',
    lastDateOn: 'Last date: {date}',
    closed: 'Closed',
    rolling: 'Rolling',
    open: 'Open',
    closingSoon: 'Closing soon',

    heroExploreBtn: 'Explore Scholarships',
    heroSearchBtn: 'Search Your Scholarship',
    statsScholarshipsListed: 'Verified Scholarships',
    statsClosingThisMonth: 'Closing This Month',
    statsCategoriesCovered: 'Categories Supported',
    statsStatesCovered: 'States & UTs Covered',
    howItWorksTitle: 'How ScholarConnect Works in 3 Steps',
    howItWorksStep1Title: '1. Tell Us Your Profile',
    howItWorksStep1Desc: 'Enter your branch, category, marks, and state in 60 seconds.',
    howItWorksStep2Title: '2. Get Matched Accurately',
    howItWorksStep2Desc: 'Our rule engine evaluates eligibility without missing hidden criteria.',
    howItWorksStep3Title: '3. Apply Directly on Official Portals',
    howItWorksStep3Desc: 'Follow clear document checklists with zero spam or third-party fees.',

    filterByCategory: 'Filter by Category',
    filterByLevel: 'Degree Level',
    filterByState: 'State of Domicile',
    filterMatchAny: 'Match Any',
    filterMatchAll: 'Match All',
    filterClearAll: 'Clear all',
    sortBy: 'Sort by',
    sortBestMatch: 'Best Match',
    sortDeadlineSoonest: 'Deadline Soonest',
    sortAmountHighToLow: 'Amount: High to Low',
    sortNewest: 'Newest Added',
    sortAlphabetical: 'A to Z',
    resultsCount: '{count} scholarships found',
    noExactMatchShowingClosest: 'No exact match found; here are the closest alternatives:',
    relaxFilters: 'Relax Filters',
    viewDetails: 'View Details',
    applyOnOfficialSite: 'Apply on Official Site',
    saveScholarship: 'Save',
    savedToProfile: 'Saved',
    compare: 'Compare',
    checkEligibility: 'Check My Eligibility',
    lastVerifiedOn: 'Last verified on {date}',
    scamWarning: 'Never pay anyone to apply. Genuine scholarships are always free and applied for on official portals.',
    reportIssue: 'Report an issue or update',

    closestMatchesFor: 'Showing closest matches for "{query}"',
    didYouMean: 'Did you mean: {suggestion}?',
    popularScholarships: 'Popular & Closing Soon Scholarships',
    noDeadEndSubtitle: 'Here are trusted schemes open for engineering and technical students.',

    matchBestMatches: 'Best Matches (80%+ Match)',
    matchGoodMatches: 'Good Matches (50% – 79%)',
    matchWorthChecking: 'Worth Checking (Under 50%)',
    matchNotEligible: 'Not Eligible (and why)',
    matchScore: '{score}% Match',
    editMyAnswers: 'Edit My Answers',
    whyItMatches: 'Why you match',
    thingsToCheck: 'Things to verify',
    printOrSavePdf: 'Print / Save as PDF',

    heroExploreSub: 'Browse 30+ verified schemes',
    heroSearchSub: 'Instant 100-point eligibility check',
    freeVerifiedBadge: '100% Free & Verified',
    officialLinksBadge: 'Official Government & Foundation Portals',
    featuredOpportunities: 'Featured Opportunities',
    featuredSubtitle: 'Top verified scholarships actively accepting applications right now.',
    viewAll: 'View all ({count})',
    howItWorksSubtitle: 'Designed to make complex government circulars and foundation criteria peaceful and straightforward.',
    guidanceReserved: 'Guidance for Reserved & Special Categories',
    domicileIncomeTitle: 'Do You Have Your Domicile & Income Certificates Ready?',
    domicileIncomeDesc: 'MahaDBT and Central Schemes require Tahsildar-issued Income Certificate for current fiscal year and Caste Validity for Engineering CAP admission. Read our complete walkthrough.',
    readGuidesBtn: 'Read Certificate Guides →'
  },

  hi: {
    siteName: 'ScholarConnect',
    themeLine: 'छात्रों को छात्रवृत्ति से जोड़ना',
    navGovernment: 'सरकारी',
    navPrivate: 'निजी',
    navExplore: 'खोजें',
    navFindMine: 'मेरी छात्रवृत्ति',
    searchPlaceholder: 'छात्रवृत्ति खोजें, AICTE, महाडीबीटी, रिलायंस...',
    searchAriaLabel: 'भारत भर में छात्रवृत्तियां खोजें',
    searchShortcut: 'खोजने के लिए / दबाएं',
    themeToggle: 'थीम बदलें',
    languageSelect: 'भाषा बदलें',
    signIn: 'साइन इन करें',
    signUp: 'पंजीकरण / साइन अप',
    myProfile: 'मेरी प्रोफाइल',
    saved: 'सहेजी गई छात्रवृत्तियां',
    applications: 'आवेदन ट्रैकर',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    adminPortal: 'एडमिन कंसोल',

    tagGovernment: 'सरकारी',
    tagPrivate: 'निजी',

    liveTickerTitle: 'लाइव · अंतिम तिथि समीप',
    daysLeft: '{count} दिन शेष',
    lastDateToday: 'आज अंतिम दिन है!',
    lastDateOn: 'अंतिम तिथि: {date}',
    closed: 'बंद',
    rolling: 'सतत चालू',
    open: 'सक्रिय',
    closingSoon: 'शीघ्र समाप्त',

    heroExploreBtn: 'सभी छात्रवृत्तियां देखें',
    heroSearchBtn: 'अपनी छात्रवृत्ति खोजें',
    statsScholarshipsListed: 'सत्यापित छात्रवृत्तियां',
    statsClosingThisMonth: 'इस माह समाप्त हो रही हैं',
    statsCategoriesCovered: 'समर्थित श्रेणियां',
    statsStatesCovered: 'कवर किए गए राज्य',
    howItWorksTitle: 'स्कॉलरकनेक्ट कैसे काम करता है',
    howItWorksStep1Title: '1. अपनी जानकारी दर्ज करें',
    howItWorksStep1Desc: 'अपनी शाखा, श्रेणी, अंक और राज्य 60 सेकंड में भरें।',
    howItWorksStep2Title: '2. सटीक मिलान प्राप्त करें',
    howItWorksStep2Desc: 'हमारा सिस्टम बिना किसी त्रुटि के पात्रता की जांच करता है।',
    howItWorksStep3Title: '3. आधिकारिक पोर्टल पर आवेदन करें',
    howItWorksStep3Desc: 'बिना किसी दलाल या शुल्क के सीधे सरकारी पोर्टल पर आवेदन करें।',

    filterByCategory: 'श्रेणी के अनुसार चुनें',
    filterByLevel: 'शिक्षा स्तर',
    filterByState: 'मूल निवास राज्य',
    filterMatchAny: 'कोई भी मेल खाए',
    filterMatchAll: 'सभी मेल खाएं',
    filterClearAll: 'सभी हटाएं',
    sortBy: 'क्रमबद्ध करें',
    sortBestMatch: 'सर्वश्रेष्ठ मिलान',
    sortDeadlineSoonest: 'अंतिम तिथि निकटतम',
    sortAmountHighToLow: 'राशि: अधिक से कम',
    sortNewest: 'नवीनतम जोड़ी गई',
    sortAlphabetical: 'वर्णमाला अनुसार',
    resultsCount: '{count} छात्रवृत्तियां उपलब्ध',
    noExactMatchShowingClosest: 'सटीक परिणाम नहीं मिला; निकटतम विकल्प प्रदर्शित हैं:',
    relaxFilters: 'फ़िल्टर ढीले करें',
    viewDetails: 'विवरण देखें',
    applyOnOfficialSite: 'आधिकारिक साइट पर आवेदन करें',
    saveScholarship: 'सहेजें',
    savedToProfile: 'सहेजा गया',
    compare: 'तुलना करें',
    checkEligibility: 'पात्रता जांचें',
    lastVerifiedOn: 'अंतिम सत्यापन {date}',
    scamWarning: 'आवेदन के लिए किसी को भी पैसे न दें। असली छात्रवृत्तियां हमेशा आधिकारिक पोर्टल पर निःशुल्क होती हैं।',
    reportIssue: 'त्रुटि बताएं',

    closestMatchesFor: '"{query}" के निकटतम परिणाम',
    didYouMean: 'क्या आपका मतलब था: {suggestion}?',
    popularScholarships: 'लोकप्रिय और शीघ्र समाप्त होने वाली छात्रवृत्तियां',
    noDeadEndSubtitle: 'इंजीनियरिंग और तकनीकी छात्रों के लिए खुली हुई प्रमुख योजनाएं।',

    matchBestMatches: 'सर्वश्रेष्ठ मिलान (80%+ मिलान)',
    matchGoodMatches: 'अच्छे मिलान (50% – 79%)',
    matchWorthChecking: 'जांच योग्य (50% से कम)',
    matchNotEligible: 'अपात्र (और कारण)',
    matchScore: '{score}% मिलान',
    editMyAnswers: 'मेरे उत्तर संपादित करें',
    whyItMatches: 'यह आपके अनुकूल क्यों है',
    thingsToCheck: 'ध्यान देने योग्य बिंदु',
    printOrSavePdf: 'पीडीएफ में सहेजें',

    heroExploreSub: '30+ सत्यापित योजनाएं देखें',
    heroSearchSub: 'त्वरित 100-अंक पात्रता जांच',
    freeVerifiedBadge: '100% निःशुल्क और सत्यापित',
    officialLinksBadge: 'आधिकारिक सरकारी और ट्रस्ट पोर्टल',
    featuredOpportunities: 'प्रमुख छात्रवृत्तियां',
    featuredSubtitle: 'वर्तमान में सक्रिय रूप से आवेदन स्वीकार करने वाली शीर्ष योजनाएं।',
    viewAll: 'सभी देखें ({count})',
    howItWorksSubtitle: 'जटिल सरकारी नियमों और पात्रता शर्तों को शांत और सरल बनाने के लिए बनाया गया।',
    guidanceReserved: 'आरक्षित और विशेष श्रेणियों के लिए मार्गदर्शन',
    domicileIncomeTitle: 'क्या आपके पास अधिवास और आय प्रमाण पत्र तैयार हैं?',
    domicileIncomeDesc: 'महाडीबीटी और केंद्रीय योजनाओं के लिए चालू वित्तीय वर्ष का तहसीलदार आय प्रमाण पत्र और इंजीनियरिंग सीएपी प्रवेश के लिए जाति वैधता अनिवार्य है। पूरा मार्गदर्शन पढ़ें।',
    readGuidesBtn: 'दस्तावेज़ मार्गदर्शिका पढ़ें →'
  },

  mr: {
    siteName: 'ScholarConnect',
    themeLine: 'विद्यार्थ्यांना शिष्यवृत्तींशी जोडणारा दुवा',
    navGovernment: 'शासकीय',
    navPrivate: 'खाजगी',
    navExplore: 'शोधा',
    navFindMine: 'माझी शिष्यवृत्ती',
    searchPlaceholder: 'शिष्यवृत्ती शोधा, AICTE, महाडीबीटी, रिलायन्स...',
    searchAriaLabel: 'महाराष्ट्रातील व भारतातील शिष्यवृत्ती शोधा',
    searchShortcut: 'शोधण्यासाठी / दाबा',
    themeToggle: 'थीम बदला',
    languageSelect: 'भाषा निवडा',
    signIn: 'साइन इन',
    signUp: 'नोंदणी / साइन अप',
    myProfile: 'माझे प्रोफाइल',
    saved: 'जतन केलेल्या शिष्यवृत्ती',
    applications: 'अर्ज ट्रॅकर',
    settings: 'सेटिंग्ज',
    logout: 'लॉग आऊट',
    adminPortal: 'अ‍ॅडमिन कन्सोल',

    tagGovernment: 'शासकीय',
    tagPrivate: 'खाजगी',

    liveTickerTitle: 'थेट · अंतिम मुदत जवळ आली आहे',
    daysLeft: '{count} दिवस शिल्लक',
    lastDateToday: 'आज शेवटचा दिवस आहे!',
    lastDateOn: 'शेवटची तारीख: {date}',
    closed: 'बंद',
    rolling: 'वर्षभर सुरू',
    open: 'सुरू',
    closingSoon: 'लवकरच संपत आहे',

    heroExploreBtn: 'सर्व शिष्यवृत्ती पहा',
    heroSearchBtn: 'तुमची शिष्यवृत्ती शोधा',
    statsScholarshipsListed: 'सत्यापित शिष्यवृत्ती',
    statsClosingThisMonth: 'या महिन्यात संपत असलेल्या',
    statsCategoriesCovered: 'समाविष्ट प्रवर्ग',
    statsStatesCovered: 'समाविष्ट राज्ये',
    howItWorksTitle: 'स्कॉलरकनेक्ट कसे कार्य करते',
    howItWorksStep1Title: '१. तुमची माहिती भरा',
    howItWorksStep1Desc: 'तुमची शाखा, जात प्रवर्ग, गुण आणि उत्पन्न ६० सेकंदात नोंदवा.',
    howItWorksStep2Title: '२. अचूक पात्रता मिळवा',
    howItWorksStep2Desc: 'आमची प्रणाली महाडीबीटी व केंद्र योजनांच्या नियमांनुसार तपासणी करते.',
    howItWorksStep3Title: '३. अधिकृत संकेतस्थळावर अर्ज करा',
    howItWorksStep3Desc: 'कोणत्याही दलालाशिवाय थेट MahaDBT किंवा NSP वर मोफत अर्ज करा.',

    filterByCategory: 'प्रवर्गानुसार निवडा',
    filterByLevel: 'शिक्षणाचा स्तर',
    filterByState: 'अधिवास राज्य',
    filterMatchAny: 'कोणताही जुळवा',
    filterMatchAll: 'सर्व जुळवा',
    filterClearAll: 'सर्व साफ करा',
    sortBy: 'क्रमवारी लावा',
    sortBestMatch: 'सर्वोत्कृष्ट जुळणी',
    sortDeadlineSoonest: 'अंतिम मुदत जवळची',
    sortAmountHighToLow: 'रक्कम: जास्त ते कमी',
    sortNewest: 'नुकतीच जोडलेली',
    sortAlphabetical: 'अ ते ज्ञ',
    resultsCount: '{count} शिष्यवृत्ती उपलब्ध',
    noExactMatchShowingClosest: 'तंतोतंत निकाल सापडला नाही; जवळचे पर्याय खालीलप्रमाणे आहेत:',
    relaxFilters: 'फिल्टर शिथिल करा',
    viewDetails: 'तपशील पहा',
    applyOnOfficialSite: 'अधिकृत संकेतस्थळावर अर्ज करा',
    saveScholarship: 'जतन करा',
    savedToProfile: 'जतन केले',
    compare: 'तुलना करा',
    checkEligibility: 'पात्रता तपासा',
    lastVerifiedOn: 'शेवटचे सत्यापन {date}',
    scamWarning: 'अर्जासाठी कोणालाही पैसे देऊ नका. खरी शिष्यवृत्ती नेहमी अधिकृत सरकारी पोर्टलवर विनामूल्य असते.',
    reportIssue: 'त्रुटी नोंदवा',

    closestMatchesFor: '"{query}" साठी जवळचे निकाल',
    didYouMean: 'तुम्हाला {suggestion} शोधायचे होते का?',
    popularScholarships: 'लोकप्रिय आणि लवकर संपणाऱ्या शिष्यवृत्ती',
    noDeadEndSubtitle: 'अभियांत्रिकी व तांत्रिक विद्यार्थ्यांसाठी सुरू असलेल्या खात्रीशीर योजना.',

    matchBestMatches: 'सर्वोत्तम जुळणी (८०%+)',
    matchGoodMatches: 'चांगली जुळणी (५०% – ७९%)',
    matchWorthChecking: 'तपासण्याजोगे (५०% पेक्षा कमी)',
    matchNotEligible: 'अपात्र (आणि कारण)',
    matchScore: '{score}% जुळणी',
    editMyAnswers: 'माझी उत्तरे बदला',
    whyItMatches: 'तुम्ही पात्र का आहात',
    thingsToCheck: 'तपासण्याच्या गोष्टी',
    printOrSavePdf: 'पीडीएफ जतन करा',

    heroExploreSub: '३०+ पडताळलेल्या योजना पहा',
    heroSearchSub: 'त्वरित १००-गुण पात्रता तपासणी',
    freeVerifiedBadge: '१००% मोफत आणि खात्रीशीर',
    officialLinksBadge: 'अधिकृत शासकीय व ट्रस्ट पोर्टल्स',
    featuredOpportunities: 'प्रमुख शिष्यवृत्ती संधी',
    featuredSubtitle: 'सध्या सक्रियपणे अर्ज स्वीकारत असलेल्या महत्त्वाच्या योजना.',
    viewAll: 'सर्व पहा ({count})',
    howItWorksSubtitle: 'किचकट सरकारी परिपत्रके आणि निकष शांतपणे व सहजतेने समजून घेण्यासाठी तयार केले.',
    guidanceReserved: 'राखीव आणि विशेष प्रवर्गांसाठी मार्गदर्शन',
    domicileIncomeTitle: 'तुमचे अधिवास आणि वार्षिक उत्पन्न दाखले तयार आहेत का?',
    domicileIncomeDesc: 'महाडीबीटी आणि केंद्रीय योजनांसाठी चालू आर्थिक वर्षाचा तहसीलदार उत्पन्न दाखला आणि अभियांत्रिकी कॅप प्रवेशासाठी जात वैधता प्रमाणपत्र आवश्यक आहे. आमचे मार्गदर्शन वाचा.',
    readGuidesBtn: 'प्रमाणपत्र मार्गदर्शक वाचा →'
  },

  ta: {
    siteName: 'ScholarConnect',
    themeLine: 'மாணவர்களை கல்வி உதவித்தொகைகளுடன் இணைக்கிறது',
    navGovernment: 'அரசு',
    navPrivate: 'தனியார்',
    navExplore: 'ஆராய்க',
    navFindMine: 'எனக்கான உதவித்தொகை',
    searchPlaceholder: 'கல்வி உதவித்தொகை தேடுக...',
    searchAriaLabel: 'இந்திய கல்வி உதவித்தொகைகளை தேடுக',
    searchShortcut: 'தேட / அழுத்தவும்',
    themeToggle: 'தோற்றம் மாற்றுக',
    languageSelect: 'மொழி தேர்ந்தெடுக்க',
    signIn: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    myProfile: 'என் சுயவிவரம்',
    saved: 'சேமிக்கப்பட்டவை',
    applications: 'விண்ணப்ப கண்காணிப்பு',
    settings: 'அமைப்புகள்',
    logout: 'வெளியேறு',
    adminPortal: 'நிர்வாக மையம்',

    tagGovernment: 'அரசு',
    tagPrivate: 'தனியார்',

    liveTickerTitle: 'நேரலை · கடைசி தேதி விரைவில்',
    daysLeft: '{count} நாட்கள் உள்ளன',
    lastDateToday: 'இன்று கடைசி நாள்!',
    lastDateOn: 'கடைசி தேதி: {date}',
    closed: 'முடிந்தது',
    rolling: 'தொடர்ந்து இயங்கும்',
    open: 'திறந்துள்ளது',
    closingSoon: 'விரைவில் முடிவடையும்',

    heroExploreBtn: 'உதவித்தொகைகளை காண்க',
    heroSearchBtn: 'தகுதியை தேடுக',
    statsScholarshipsListed: 'சரிபார்க்கப்பட்ட திட்டங்கள்',
    statsClosingThisMonth: 'இம்மாதம் முடிவடையும்',
    statsCategoriesCovered: 'பிரிவுகள்',
    statsStatesCovered: 'மாநிலங்கள்',
    howItWorksTitle: 'ScholarConnect எவ்வாறு செயல்படுகிறது',
    howItWorksStep1Title: '1. சுயவிவரம் பதிவு செய்க',
    howItWorksStep1Desc: 'உங்கள் துறை, பிரிவு, மதிப்பெண் 60 நொடிகளில் வழங்கவும்.',
    howItWorksStep2Title: '2. தகுதியை பெறுக',
    howItWorksStep2Desc: 'அரசு மற்றும் தனியார் விதிமுறைகளின்படி துல்லியமாக கணக்கிடப்படுகிறது.',
    howItWorksStep3Title: '3. நேரடியாக விண்ணப்பிக்கவும்',
    howItWorksStep3Desc: 'அதிகாரப்பூர்வ தளங்களில் எவ்வித கட்டணமும் இன்றி விண்ணப்பிக்கவும்.',

    filterByCategory: 'பிரிவு தேர்வு',
    filterByLevel: 'படிப்பு நிலை',
    filterByState: 'மாநிலம்',
    filterMatchAny: 'ஏதேனும் ஒன்று',
    filterMatchAll: 'அனைத்தும்',
    filterClearAll: 'அழி',
    sortBy: 'வரிசைப்படுத்து',
    sortBestMatch: 'சிறந்த பொருத்தம்',
    sortDeadlineSoonest: 'கடைசி தேதி விரைவில்',
    sortAmountHighToLow: 'தொகை: அதிகம் முதல் குறைவு',
    sortNewest: 'புதியது',
    sortAlphabetical: 'அகரவரிசை',
    resultsCount: '{count} உதவித்தொகைகள் உள்ளன',
    noExactMatchShowingClosest: 'துல்லியமான முடிவுகள் இல்லை; அருகிலுள்ள தேர்வுகள்:',
    relaxFilters: 'வடிகட்டிகளை தளர்த்துக',
    viewDetails: 'விவரங்களை காண்க',
    applyOnOfficialSite: 'அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்க',
    saveScholarship: 'சேமி',
    savedToProfile: 'சேமிக்கப்பட்டது',
    compare: 'ஒப்பிடு',
    checkEligibility: 'தகுதியை சரிபார்',
    lastVerifiedOn: 'கடைசியாக சரிபார்க்கப்பட்டது {date}',
    scamWarning: 'விண்ணப்பிக்க யாருக்கும் பணம் செலுத்த வேண்டாம். உண்மையான திட்டங்கள் எப்போதும் இலவசம்.',
    reportIssue: 'பிழை தெரிவிக்க',

    closestMatchesFor: '"{query}" க்கான அருகிலுள்ள முடிவுகள்',
    didYouMean: 'நீங்கள் {suggestion} தேடுகிறீர்களா?',
    popularScholarships: 'பிரபலமான உதவித்தொகைகள்',
    noDeadEndSubtitle: 'பொறியியல் மாணவர்களுக்கான திறந்த திட்டங்கள்.',

    matchBestMatches: 'சிறந்த பொருத்தம் (80%+)',
    matchGoodMatches: 'நல்ல பொருத்தம் (50% – 79%)',
    matchWorthChecking: 'பரிசீலிக்கத்தக்கவை (50% கீழ்)',
    matchNotEligible: 'தகுதியற்றவை (காரணம்)',
    matchScore: '{score}% பொருத்தம்',
    editMyAnswers: 'பதில்களை திருத்து',
    whyItMatches: 'பொருத்தத்திற்கான காரணம்',
    thingsToCheck: 'சரிபார்க்க வேண்டியவை',
    printOrSavePdf: 'PDF ஆக சேமிக்கவும்',

    heroExploreSub: '30+ சரிபார்க்கப்பட்ட திட்டங்களை உலாவவும்',
    heroSearchSub: 'உடனடி 100-புள்ளி தகுதி சோதனை',
    freeVerifiedBadge: '100% இலவசம் & சரிபார்க்கப்பட்டது',
    officialLinksBadge: 'அதிகாரப்பூர்வ அரசு & அறக்கட்டளை தளங்கள்',
    featuredOpportunities: 'முக்கிய உதவித்தொகை வாய்ப்புகள்',
    featuredSubtitle: 'தற்போது விண்ணப்பங்களை ஏற்கும் சிறந்த சரிபார்க்கப்பட்ட உதவித்தொகைகள்.',
    viewAll: 'அனைத்தையும் பார்க்கவும் ({count})',
    howItWorksSubtitle: 'அரசாங்க விதிமுறைகள் மற்றும் நிபந்தனைகளை எளிதாகவும் தெளிவாகவும் ஆக்குகிறது.',
    guidanceReserved: 'இடஒதுக்கீடு மற்றும் சிறப்பு பிரிவுகளுக்கான வழிகாட்டுதல்',
    domicileIncomeTitle: 'உங்கள் இருப்பிட மற்றும் வருமான சான்றிதழ்கள் தயாராக உள்ளதா?',
    domicileIncomeDesc: 'பொறியியல் சேர்க்கை மற்றும் உதவித்தொகைக்கு வருமான மற்றும் சாதி சான்றிதழ் அவசியம். எங்கள் முழுமையான வழிகாட்டியைப் படியுங்கள்.',
    readGuidesBtn: 'சான்றிதழ் வழிகாட்டியைப் படியுங்கள் →'
  },

  ur: {
    siteName: 'اسکالر کنیکٹ',
    themeLine: 'طلباء کو اسکالرشپس سے جوڑنا',
    navGovernment: 'سرکاری',
    navPrivate: 'نجی',
    navExplore: 'دریافت کریں',
    navFindMine: 'میری اسکالرشپ',
    searchPlaceholder: 'اسکالرشپ تلاش کریں، AICTE، مہا ڈی بی ٹی...',
    searchAriaLabel: 'ہندوستان بھر میں اسکالرشپس تلاش کریں',
    searchShortcut: 'تلاش کے لیے / دبائیں',
    themeToggle: 'تھیم تبدیل کریں',
    languageSelect: 'زبان منتخب کریں',
    signIn: 'سائن ان',
    signUp: 'رجسٹر کریں',
    myProfile: 'میرا پروفائل',
    saved: 'محفوظ کردہ اسکالرشپس',
    applications: 'درخواست ٹریکر',
    settings: 'ترتیبات',
    logout: 'لاگ آؤٹ',
    adminPortal: 'ایڈمن کنسول',

    tagGovernment: 'سرکاری',
    tagPrivate: 'نجی',

    liveTickerTitle: 'لائیو · آخری تاریخ قریب ہے',
    daysLeft: '{count} دن باقی ہیں',
    lastDateToday: 'آج آخری دن ہے!',
    lastDateOn: 'آخری تاریخ: {date}',
    closed: 'بند',
    rolling: 'جاری',
    open: 'کھلی ہے',
    closingSoon: 'جلد بند ہونے والی ہے',

    heroExploreBtn: 'تمام اسکالرشپس دیکھیں',
    heroSearchBtn: 'اپنی اسکالرشپ تلاش کریں',
    statsScholarshipsListed: 'تصدیق شدہ اسکالرشپس',
    statsClosingThisMonth: 'اس ماہ ختم ہونے والی',
    statsCategoriesCovered: 'زمرے',
    statsStatesCovered: 'ریاستیں',
    howItWorksTitle: 'اسکالر کنیکٹ کیسے کام کرتا ہے',
    howItWorksStep1Title: '1. اپنی معلومات درج کریں',
    howItWorksStep1Desc: 'اپنا شعبہ، زمرہ اور نمبر 60 سیکنڈ میں فراہم کریں۔',
    howItWorksStep2Title: '2. درست نتائج حاصل کریں',
    howItWorksStep2Desc: 'ہمارا نظام سرکاری قواعد کے مطابق اہلیت کی جانچ کرتا ہے۔',
    howItWorksStep3Title: '3. باضابطہ پورٹل پر درخواست دیں',
    howItWorksStep3Desc: 'بغیر کسی ایجنٹ یا فیس کے براہ راست پورٹل پر درخواست دیں۔',

    filterByCategory: 'زمرہ کے لحاظ سے فلٹر',
    filterByLevel: 'تعلیمی سطح',
    filterByState: 'ریاست',
    filterMatchAny: 'کوئی بھی مماثل',
    filterMatchAll: 'تمام مماثل',
    filterClearAll: 'تمام صاف کریں',
    sortBy: 'ترتیب دیں',
    sortBestMatch: 'بہترین مماثلت',
    sortDeadlineSoonest: 'قریب ترین آخری تاریخ',
    sortAmountHighToLow: 'رقم: زیادہ سے کم',
    sortNewest: 'تازہ ترین',
    sortAlphabetical: 'حروف تہجی',
    resultsCount: '{count} اسکالرشپس دستیاب ہیں',
    noExactMatchShowingClosest: 'کوئی درست نتیجہ نہیں ملا؛ قریبی متبادلات درج ذیل ہیں:',
    relaxFilters: 'فلٹرز نرم کریں',
    viewDetails: 'تفصیلات دیکھیں',
    applyOnOfficialSite: 'باضابطہ سائٹ پر درخواست دیں',
    saveScholarship: 'محفوظ کریں',
    savedToProfile: 'محفوظ ہو گیا',
    compare: 'موازنہ کریں',
    checkEligibility: 'اہلیت چیک کریں',
    lastVerifiedOn: 'آخری تصدیق {date}',
    scamWarning: 'درخواست دینے کے لیے کسی کو رقم نہ دیں۔ اصلی اسکالرشپس ہمیشہ باضابطہ پورٹل پر مفت ہوتی ہیں۔',
    reportIssue: 'مسئلہ رپورٹ کریں',

    closestMatchesFor: '"{query}" کے لیے قریبی نتائج',
    didYouMean: 'کیا آپ کا مطلب تھا: {suggestion}؟',
    popularScholarships: 'مقبول اور جلد ختم ہونے والی اسکالرشپس',
    noDeadEndSubtitle: 'انجینئرنگ اور تکنیکی طلباء کے لیے دستیاب اسکیمیں۔',

    matchBestMatches: 'بہترین مماثلت (80%+)',
    matchGoodMatches: 'اچھی مماثلت (50% – 79%)',
    matchWorthChecking: 'غور طلب (50% سے کم)',
    matchNotEligible: 'نا اہل (اور کیوں)',
    matchScore: '{score}% مماثلت',
    editMyAnswers: 'جوابات میں ترمیم کریں',
    whyItMatches: 'آپ کیوں اہل ہیں',
    thingsToCheck: 'چیک کرنے کی چیزیں',
    printOrSavePdf: 'پی ڈی ایف میں محفوظ کریں',

    heroExploreSub: '30+ تصدیق شدہ اسکیمیں دیکھیں',
    heroSearchSub: 'فوری 100 نکاتی اہلیت کی جانچ',
    freeVerifiedBadge: '100% مفت اور تصدیق شدہ',
    officialLinksBadge: 'سرکاری اور فاؤنڈیشن کے مصدقہ پورٹلز',
    featuredOpportunities: 'نمایاں وظائف کے مواقع',
    featuredSubtitle: 'فی الحال کھلی اور تصدیق شدہ اہم اسکالرشپس۔',
    viewAll: 'تمام دیکھیں ({count})',
    howItWorksSubtitle: 'پیچیدہ حکومتی نوٹسز اور شرائط کو پرامن اور آسان بنانے کے لیے ڈیزائن کیا گیا۔',
    guidanceReserved: 'محفوظ اور خصوصی زمروں کے لیے رہنمائی',
    domicileIncomeTitle: 'کیا آپ کے پاس ڈومیسائل اور انکم سرٹیفکیٹ تیار ہیں؟',
    domicileIncomeDesc: 'انجینئرنگ داخلے اور وظائف کے لیے تحصیلدار انکم سرٹیفکیٹ اور ذات کی تصدیق لازمی ہے۔ مکمل گائیڈ پڑھیں۔',
    readGuidesBtn: 'سرٹیفکیٹ گائیڈز پڑھیں ←'
  },

  ja: {
    siteName: 'ScholarConnect',
    themeLine: '学生と奨学金をつなぐプラットフォーム',
    navGovernment: '政府系',
    navPrivate: '民間',
    navExplore: '探す',
    navFindMine: '適格診断',
    searchPlaceholder: '奨学金を検索（AICTE、MahaDBT、Reliance等）...',
    searchAriaLabel: '奨学金を検索',
    searchShortcut: '/ キーで検索',
    themeToggle: 'テーマ切替',
    languageSelect: '言語を選択',
    signIn: 'ログイン',
    signUp: '会員登録',
    myProfile: 'マイプロフィール',
    saved: '保存した奨学金',
    applications: '申請トラッカー',
    settings: '設定',
    logout: 'ログアウト',
    adminPortal: '管理者コンソール',

    tagGovernment: '政府系',
    tagPrivate: '民間',

    liveTickerTitle: '速報 · 締切間近の奨学金',
    daysLeft: '残り {count} 日',
    lastDateToday: '本日締切！',
    lastDateOn: '締切日: {date}',
    closed: '受付終了',
    rolling: '随時募集',
    open: '募集中',
    closingSoon: '間もなく終了',

    heroExploreBtn: '奨学金を一覧で見る',
    heroSearchBtn: '適格奨学金を診断する',
    statsScholarshipsListed: '検証済み奨学金',
    statsClosingThisMonth: '今月締切',
    statsCategoriesCovered: '対象カテゴリ',
    statsStatesCovered: '対象州',
    howItWorksTitle: 'ScholarConnectの仕組み（3ステップ）',
    howItWorksStep1Title: '1. プロフィール入力',
    howItWorksStep1Desc: '専攻、世帯所得、成績を60秒で入力。',
    howItWorksStep2Title: '2. 正確なマッチング',
    howItWorksStep2Desc: '複雑な資格基準を自動解析し、適合する制度を抽出します。',
    howItWorksStep3Title: '3. 公式サイトで直接申請',
    howItWorksStep3Desc: '不要な仲介手数料なしで公式ポータルから安心申請。',

    filterByCategory: 'カテゴリで絞り込み',
    filterByLevel: '学位レベル',
    filterByState: '対象地域',
    filterMatchAny: 'いずれかに一致',
    filterMatchAll: 'すべてに一致',
    filterClearAll: 'リセット',
    sortBy: '並び替え',
    sortBestMatch: 'マッチ度順',
    sortDeadlineSoonest: '締切が近い順',
    sortAmountHighToLow: '支給額が高い順',
    sortNewest: '新着順',
    sortAlphabetical: '五十音順',
    resultsCount: '{count} 件の奨学金が見つかりました',
    noExactMatchShowingClosest: '完全一致は見つかりませんでした。最も近い候補を表示しています:',
    relaxFilters: '条件を緩和する',
    viewDetails: '詳細を見る',
    applyOnOfficialSite: '公式サイトで申請',
    saveScholarship: '保存',
    savedToProfile: '保存済み',
    compare: '比較する',
    checkEligibility: '資格を確認',
    lastVerifiedOn: '最終確認日: {date}',
    scamWarning: '申請のために金銭を支払わないでください。正規の奨学金は常に公式サイトで無料申請できます。',
    reportIssue: '修正を報告',

    closestMatchesFor: '「{query}」に近い検索結果',
    didYouMean: 'もしかして: {suggestion} ですか？',
    popularScholarships: '人気・締切間近の奨学金',
    noDeadEndSubtitle: '理工系学生向けの公式奨学金です。',

    matchBestMatches: '最適なマッチ（80%以上）',
    matchGoodMatches: '適合（50%〜79%）',
    matchWorthChecking: '検討可能（50%未満）',
    matchNotEligible: '対象外（理由あり）',
    matchScore: 'マッチ度 {score}%',
    editMyAnswers: '回答を編集',
    whyItMatches: '適合した理由',
    thingsToCheck: '確認すべき点',
    printOrSavePdf: 'PDFで保存',

    heroExploreSub: '30以上の確認済み奨学金を閲覧',
    heroSearchSub: '即時100点満点の資格判定',
    freeVerifiedBadge: '100% 無料・認証済み',
    officialLinksBadge: '公式政府および財団ポータル',
    featuredOpportunities: '注目の奨学金情報',
    featuredSubtitle: '現在申請を受付中の主要な検証済み奨学金。',
    viewAll: 'すべて表示 ({count})',
    howItWorksSubtitle: '複雑な政府通達や要件を分かりやすく整理。',
    guidanceReserved: '特別枠・指定カテゴリー向けガイダンス',
    domicileIncomeTitle: '居住および所得証明書の準備はお済みですか？',
    domicileIncomeDesc: '工学系入試および奨学金申請には有効な証明書が必要です。詳細ガイドをご覧ください。',
    readGuidesBtn: '証明書ガイドを読む →'
  },

  zh: {
    siteName: 'ScholarConnect',
    themeLine: '连接学子与奖学金的桥梁',
    navGovernment: '政府类',
    navPrivate: '民间类',
    navExplore: '探索',
    navFindMine: '我的匹配',
    searchPlaceholder: '搜索奖学金（AICTE、MahaDBT、Reliance等）...',
    searchAriaLabel: '搜索全印度奖学金',
    searchShortcut: '按 / 键搜索',
    themeToggle: '切换主题',
    languageSelect: '切换语言',
    signIn: '登录',
    signUp: '注册账户',
    myProfile: '个人中心',
    saved: '收藏的奖学金',
    applications: '申请进度跟踪',
    settings: '设置',
    logout: '退出登录',
    adminPortal: '管理控制台',

    tagGovernment: '政府类',
    tagPrivate: '民间类',

    liveTickerTitle: '实时 · 即将截止',
    daysLeft: '剩余 {count} 天',
    lastDateToday: '今日截止！',
    lastDateOn: '截止日期: {date}',
    closed: '已截止',
    rolling: '常年开放',
    open: '正在开放',
    closingSoon: '即将截止',

    heroExploreBtn: '浏览所有奖学金',
    heroSearchBtn: '智能匹配我的奖学金',
    statsScholarshipsListed: '官方核实项目',
    statsClosingThisMonth: '本月截止项目',
    statsCategoriesCovered: '支持分类',
    statsStatesCovered: '覆盖邦与特区',
    howItWorksTitle: 'ScholarConnect 三步运作流程',
    howItWorksStep1Title: '1. 填写基本资料',
    howItWorksStep1Desc: '60秒录入专业、类别、学业成绩和家庭收入。',
    howItWorksStep2Title: '2. 精准智能匹配',
    howItWorksStep2Desc: '系统严格依据官方标准，无遗漏地计算申请资格。',
    howItWorksStep3Title: '3. 官网直接申领',
    howItWorksStep3Desc: '依据清晰材料清单，在官方网站零费用安全申请。',

    filterByCategory: '按类别筛选',
    filterByLevel: '学历层次',
    filterByState: '户籍所在地',
    filterMatchAny: '匹配任一',
    filterMatchAll: '匹配全部',
    filterClearAll: '清空筛选',
    sortBy: '排序方式',
    sortBestMatch: '匹配度最高',
    sortDeadlineSoonest: '截止日期临近',
    sortAmountHighToLow: '金额从高到低',
    sortNewest: '最新发布',
    sortAlphabetical: '首字母排序',
    resultsCount: '找到 {count} 项奖学金',
    noExactMatchShowingClosest: '未找到完全匹配项；为您推荐最接近的项目：',
    relaxFilters: '放宽筛选条件',
    viewDetails: '查看详情',
    applyOnOfficialSite: '前往官网申请',
    saveScholarship: '收藏',
    savedToProfile: '已收藏',
    compare: '对比',
    checkEligibility: '核实资格',
    lastVerifiedOn: '最近核实于 {date}',
    scamWarning: '切勿向任何人支付中介费用。正规奖学金申请在官方门户上完全免费。',
    reportIssue: '纠错或建议',

    closestMatchesFor: '"{query}" 的相近匹配结果',
    didYouMean: '您是否要找: {suggestion}？',
    popularScholarships: '热门及即将截止的奖学金',
    noDeadEndSubtitle: '面向工科及高校学生的精选奖学金。',

    matchBestMatches: '最佳匹配（80%及以上）',
    matchGoodMatches: '良好匹配（50% – 79%）',
    matchWorthChecking: '值得关注（50%以下）',
    matchNotEligible: '暂不符合（附原因）',
    matchScore: '{score}% 匹配',
    editMyAnswers: '修改我的回答',
    whyItMatches: '匹配原因',
    thingsToCheck: '需留意的细节',
    printOrSavePdf: '打印或导出PDF',

    heroExploreSub: '浏览30多个经验证的奖学金方案',
    heroSearchSub: '即时100分资格匹配评估',
    freeVerifiedBadge: '100% 免费且经过验证',
    officialLinksBadge: '官方政府与基金会门户网站',
    featuredOpportunities: '精选奖学金机会',
    featuredSubtitle: '目前正在接受申请的高额优质奖学金。',
    viewAll: '查看全部 ({count})',
    howItWorksSubtitle: '简化复杂的政府通告与申请资格，让查找更从容。',
    guidanceReserved: '特定与专项类别申请指导',
    domicileIncomeTitle: '您的户籍与家庭收入证明准备好了吗？',
    domicileIncomeDesc: '技术工程招生及助学金需要当期有效证明材料。阅读完整指南。',
    readGuidesBtn: '查看证明办理指南 →'
  },

  ru: {
    siteName: 'ScholarConnect',
    themeLine: 'Связываем студентов со стипендиями',
    navGovernment: 'Государственные',
    navPrivate: 'Частные',
    navExplore: 'Каталог',
    navFindMine: 'Мои стипендии',
    searchPlaceholder: 'Поиск стипендий, AICTE, MahaDBT, Reliance...',
    searchAriaLabel: 'Поиск стипендий',
    searchShortcut: 'Нажмите / для поиска',
    themeToggle: 'Сменить тему',
    languageSelect: 'Выбрать язык',
    signIn: 'Войти',
    signUp: 'Регистрация',
    myProfile: 'Профиль',
    saved: 'Сохранённые',
    applications: 'Трекер заявок',
    settings: 'Настройки',
    logout: 'Выйти',
    adminPortal: 'Панель администратора',

    tagGovernment: 'ГОСУДАРСТВЕННАЯ',
    tagPrivate: 'ЧАСТНАЯ',

    liveTickerTitle: 'ОНЛАЙН · Скоро дедлайн',
    daysLeft: 'Осталось {count} дн.',
    lastDateToday: 'Последний день сегодня!',
    lastDateOn: 'Дедлайн: {date}',
    closed: 'Закрыто',
    rolling: 'Постоянный приём',
    open: 'Открыто',
    closingSoon: 'Скоро закроется',

    heroExploreBtn: 'Смотреть стипендии',
    heroSearchBtn: 'Подобрать стипендию',
    statsScholarshipsListed: 'Проверенных стипендий',
    statsClosingThisMonth: 'Закрываются в этом месяце',
    statsCategoriesCovered: 'Категорий поддержки',
    statsStatesCovered: 'Охвачено штатов',
    howItWorksTitle: 'Как работает ScholarConnect в 3 шага',
    howItWorksStep1Title: '1. Укажите ваши данные',
    howItWorksStep1Desc: 'Специальность, категория, оценки и штат за 60 секунд.',
    howItWorksStep2Title: '2. Получите точные совпадения',
    howItWorksStep2Desc: 'Алгоритм оценивает соответствие критериям без ошибок.',
    howItWorksStep3Title: '3. Подавайте заявку на официальном сайте',
    howItWorksStep3Desc: 'Бесплатная и безопасная подача на порталах без посредников.',

    filterByCategory: 'Фильтр по категориям',
    filterByLevel: 'Уровень образования',
    filterByState: 'Штат',
    filterMatchAny: 'Любое совпадение',
    filterMatchAll: 'Все совпадения',
    filterClearAll: 'Сбросить',
    sortBy: 'Сортировка',
    sortBestMatch: 'Лучшее совпадение',
    sortDeadlineSoonest: 'Ближайший дедлайн',
    sortAmountHighToLow: 'Размер: по убыванию',
    sortNewest: 'Сначала новые',
    sortAlphabetical: 'По алфавиту',
    resultsCount: 'Найдено стипендий: {count}',
    noExactMatchShowingClosest: 'Точных совпадений нет; показаны наиболее близкие варианты:',
    relaxFilters: 'Смягчить фильтры',
    viewDetails: 'Подробнее',
    applyOnOfficialSite: 'Подать на официальном сайте',
    saveScholarship: 'Сохранить',
    savedToProfile: 'Сохранено',
    compare: 'Сравнить',
    checkEligibility: 'Проверить критерии',
    lastVerifiedOn: 'Проверено {date}',
    scamWarning: 'Никогда не платите за подачу заявки. Настоящие стипендии оформляются бесплатно на официальных порталах.',
    reportIssue: 'Сообщить об ошибке',

    closestMatchesFor: 'Ближайшие результаты по запросу "{query}"',
    didYouMean: 'Возможно, вы имели в виду: {suggestion}?',
    popularScholarships: 'Популярные и срочные стипендии',
    noDeadEndSubtitle: 'Проверенные программы для инженерных и технических специальностей.',

    matchBestMatches: 'Лучшие совпадения (80%+)',
    matchGoodMatches: 'Хорошие совпадения (50% – 79%)',
    matchWorthChecking: 'Стоит проверить (менее 50%)',
    matchNotEligible: 'Не подходит (с причинами)',
    matchScore: '{score}% совпадение',
    editMyAnswers: 'Изменить ответы',
    whyItMatches: 'Почему вы подходите',
    thingsToCheck: 'Что проверить',
    printOrSavePdf: 'Печать / Сохранить в PDF',

    heroExploreSub: 'Более 30 проверенных стипендий',
    heroSearchSub: 'Мгновенная 100-балльная проверка',
    freeVerifiedBadge: '100% Бесплатно и проверено',
    officialLinksBadge: 'Официальные государственные порталы',
    featuredOpportunities: 'Рекомендуемые стипендии',
    featuredSubtitle: 'Лучшие проверенные стипендии с открытым приемом заявок.',
    viewAll: 'Посмотреть все ({count})',
    howItWorksSubtitle: 'Создан для легкого и спокойного поиска стипендий без бюрократии.',
    guidanceReserved: 'Руководство для специальных категорий',
    domicileIncomeTitle: 'Готовы ли ваши справки о доходах и месте жительства?',
    domicileIncomeDesc: 'Для подачи заявлений требуются действующие справки текущего финансового года.',
    readGuidesBtn: 'Читать руководство по документам →'
  },

  es: {
    siteName: 'ScholarConnect',
    themeLine: 'Conectando a los estudiantes con las becas',
    navGovernment: 'Pública',
    navPrivate: 'Privada',
    navExplore: 'Explorar',
    navFindMine: 'Buscar mi beca',
    searchPlaceholder: 'Buscar becas, AICTE, MahaDBT, Reliance...',
    searchAriaLabel: 'Buscar becas universitarias',
    searchShortcut: 'Pulsa / para buscar',
    themeToggle: 'Cambiar tema',
    languageSelect: 'Seleccionar idioma',
    signIn: 'Iniciar sesión',
    signUp: 'Registrarse',
    myProfile: 'Mi perfil',
    saved: 'Becas guardadas',
    applications: 'Seguimiento de solicitudes',
    settings: 'Ajustes',
    logout: 'Cerrar sesión',
    adminPortal: 'Consola de administración',

    tagGovernment: 'PÚBLICA',
    tagPrivate: 'PRIVADA',

    liveTickerTitle: 'EN DIRECTO · Plazo próximo a vencer',
    daysLeft: 'Quedan {count} días',
    lastDateToday: '¡Último día hoy!',
    lastDateOn: 'Fecha límite: {date}',
    closed: 'Cerrada',
    rolling: 'Convocatoria continua',
    open: 'Abierta',
    closingSoon: 'Próxima a cerrar',

    heroExploreBtn: 'Explorar becas',
    heroSearchBtn: 'Buscar mi beca ideal',
    statsScholarshipsListed: 'Becas verificadas',
    statsClosingThisMonth: 'Cierran este mes',
    statsCategoriesCovered: 'Categorías incluidas',
    statsStatesCovered: 'Estados cubiertos',
    howItWorksTitle: 'Cómo funciona ScholarConnect en 3 pasos',
    howItWorksStep1Title: '1. Comparte tu perfil',
    howItWorksStep1Desc: 'Indica tu especialidad, categoría, notas e ingresos en 60 segundos.',
    howItWorksStep2Title: '2. Obtén coincidencias exactas',
    howItWorksStep2Desc: 'Nuestro motor evalúa los criterios oficiales sin omisiones.',
    howItWorksStep3Title: '3. Solicita en portales oficiales',
    howItWorksStep3Desc: 'Postula de forma directa y gratuita sin intermediarios.',

    filterByCategory: 'Filtrar por categoría',
    filterByLevel: 'Nivel académico',
    filterByState: 'Estado de origen',
    filterMatchAny: 'Cualquiera coincide',
    filterMatchAll: 'Todas coinciden',
    filterClearAll: 'Borrar filtros',
    sortBy: 'Ordenar por',
    sortBestMatch: 'Mejor coincidencia',
    sortDeadlineSoonest: 'Plazo más cercano',
    sortAmountHighToLow: 'Importe: mayor a menor',
    sortNewest: 'Más recientes',
    sortAlphabetical: 'Alfabético',
    resultsCount: '{count} becas encontradas',
    noExactMatchShowingClosest: 'No hay coincidencias exactas; te mostramos las opciones más cercanas:',
    relaxFilters: 'Ampliar búsqueda',
    viewDetails: 'Ver detalles',
    applyOnOfficialSite: 'Solicitar en web oficial',
    saveScholarship: 'Guardar',
    savedToProfile: 'Guardada',
    compare: 'Comparar',
    checkEligibility: 'Comprobar requisitos',
    lastVerifiedOn: 'Verificado el {date}',
    scamWarning: 'Nunca pagues por solicitar una beca. Las becas auténticas son siempre gratuitas en los portales oficiales.',
    reportIssue: 'Informar de un error',

    closestMatchesFor: 'Resultados más cercanos para "{query}"',
    didYouMean: '¿Quisiste decir: {suggestion}?',
    popularScholarships: 'Becas populares y próximas a cerrar',
    noDeadEndSubtitle: 'Opciones verificadas para estudiantes de ingeniería y carreras técnicas.',

    matchBestMatches: 'Mejores coincidencias (80%+)',
    matchGoodMatches: 'Buenas coincidencias (50% – 79%)',
    matchWorthChecking: 'Por revisar (Menos del 50%)',
    matchNotEligible: 'No apto (y motivos)',
    matchScore: '{score}% de coincidencia',
    editMyAnswers: 'Editar mis respuestas',
    whyItMatches: 'Por qué cumples el perfil',
    thingsToCheck: 'Puntos a verificar',
    printOrSavePdf: 'Imprimir / Guardar en PDF',

    heroExploreSub: 'Explora más de 30 becas verificadas',
    heroSearchSub: 'Verificación instantánea de 100 puntos',
    freeVerifiedBadge: '100% Gratuito y Verificado',
    officialLinksBadge: 'Portales oficiales de gobierno y fundaciones',
    featuredOpportunities: 'Becas destacadas',
    featuredSubtitle: 'Las mejores becas verificadas que aceptan solicitudes ahora mismo.',
    viewAll: 'Ver todas ({count})',
    howItWorksSubtitle: 'Diseñado para hacer que los requisitos y circulares sean sencillos y claros.',
    guidanceReserved: 'Orientación para categorías especiales',
    domicileIncomeTitle: '¿Tienes listos tus certificados de ingresos y residencia?',
    domicileIncomeDesc: 'Los esquemas oficiales requieren certificados emitidos para el año fiscal actual.',
    readGuidesBtn: 'Leer guía de certificados →'
  },

  de: {
    siteName: 'ScholarConnect',
    themeLine: 'Studierende mit Stipendien verbinden',
    navGovernment: 'Staatlich',
    navPrivate: 'Privat',
    navExplore: 'Entdecken',
    navFindMine: 'Mein Stipendium',
    searchPlaceholder: 'Stipendien suchen, AICTE, MahaDBT, Reliance...',
    searchAriaLabel: 'Stipendien durchsuchen',
    searchShortcut: 'Drücke / zum Suchen',
    themeToggle: 'Design wechseln',
    languageSelect: 'Sprache wählen',
    signIn: 'Anmelden',
    signUp: 'Registrieren',
    myProfile: 'Mein Profil',
    saved: 'Gespeicherte Stipendien',
    applications: 'Bewerbungs-Tracker',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    adminPortal: 'Admin-Konsole',

    tagGovernment: 'STAATLICH',
    tagPrivate: 'PRIVAT',

    liveTickerTitle: 'LIVE · Baldige Frist',
    daysLeft: 'Noch {count} Tage',
    lastDateToday: 'Heute letzter Tag!',
    lastDateOn: 'Frist: {date}',
    closed: 'Geschlossen',
    rolling: 'Laufende Bewerbung',
    open: 'Offen',
    closingSoon: 'Schließt bald',

    heroExploreBtn: 'Stipendien entdecken',
    heroSearchBtn: 'Mein Stipendium finden',
    statsScholarshipsListed: 'Geprüfte Stipendien',
    statsClosingThisMonth: 'Endet diesen Monat',
    statsCategoriesCovered: 'Unterstützte Kategorien',
    statsStatesCovered: 'Abgedeckte Bundesstaaten',
    howItWorksTitle: 'Wie ScholarConnect in 3 Schritten funktioniert',
    howItWorksStep1Title: '1. Profil angeben',
    howItWorksStep1Desc: 'Fachrichtung, Kategorie, Noten und Region in 60 Sekunden eintragen.',
    howItWorksStep2Title: '2. Präzise Treffer erhalten',
    howItWorksStep2Desc: 'Unsere Prüfung ermittelt Ihre Förderfähigkeit lückenlos.',
    howItWorksStep3Title: '3. Direkt auf offiziellen Portalen bewerben',
    howItWorksStep3Desc: 'Bewerbung ohne Zwischengebühren auf verifizierten Regierungs- und Stiftungsseiten.',

    filterByCategory: 'Nach Kategorie filtern',
    filterByLevel: 'Studienabschluss',
    filterByState: 'Bundesstaat',
    filterMatchAny: 'Mindestens eine Übereinstimmung',
    filterMatchAll: 'Alle müssen übereinstimmen',
    filterClearAll: 'Alle Filter zurücksetzen',
    sortBy: 'Sortieren nach',
    sortBestMatch: 'Beste Übereinstimmung',
    sortDeadlineSoonest: 'Kürzeste Frist',
    sortAmountHighToLow: 'Fördersumme: Hoch nach Niedrig',
    sortNewest: 'Neueste Einträge',
    sortAlphabetical: 'A bis Z',
    resultsCount: '{count} Stipendien gefunden',
    noExactMatchShowingClosest: 'Kein exakter Treffer; hier sind die besten Alternativen:',
    relaxFilters: 'Filter lockern',
    viewDetails: 'Details anzeigen',
    applyOnOfficialSite: 'Auf offizieller Website bewerben',
    saveScholarship: 'Speichern',
    savedToProfile: 'Gespeichert',
    compare: 'Vergleichen',
    checkEligibility: 'Voraussetzungen prüfen',
    lastVerifiedOn: 'Zuletzt geprüft am {date}',
    scamWarning: 'Zahlen Sie niemals Geld für eine Stipendienbewerbung. Echte Stipendien sind immer kostenlos.',
    reportIssue: 'Fehler melden',

    closestMatchesFor: 'Nächste Übereinstimmungen für "{query}"',
    didYouMean: 'Meinten Sie: {suggestion}?',
    popularScholarships: 'Beliebte und bald endende Programme',
    noDeadEndSubtitle: 'Offizielle Förderungen für Ingenieur- und Technikstudierende.',

    matchBestMatches: 'Beste Treffer (80%+)',
    matchGoodMatches: 'Gute Treffer (50% – 79%)',
    matchWorthChecking: 'Prüfenswert (unter 50%)',
    matchNotEligible: 'Nicht qualifiziert (mit Begründung)',
    matchScore: '{score}% Übereinstimmung',
    editMyAnswers: 'Meine Angaben bearbeiten',
    whyItMatches: 'Warum Sie qualifiziert sind',
    thingsToCheck: 'Zu beachtende Punkte',
    printOrSavePdf: 'Drucken / Als PDF speichern',

    heroExploreSub: 'Über 30 verifizierte Programme durchsuchen',
    heroSearchSub: 'Sofortige 100-Punkte-Berechtigungsprüfung',
    freeVerifiedBadge: '100% Kostenlos & Verifiziert',
    officialLinksBadge: 'Offizielle Regierungs- & Stiftungsportale',
    featuredOpportunities: 'Ausgewählte Stipendien',
    featuredSubtitle: 'Top-verifizierte Stipendien mit aktuell offenen Bewerbungen.',
    viewAll: 'Alle anzeigen ({count})',
    howItWorksSubtitle: 'Entwickelt, um behördliche Kriterien ruhig und unkompliziert zu vermitteln.',
    guidanceReserved: 'Leitfaden für reservierte & spezielle Kategorien',
    domicileIncomeTitle: 'Sind Ihre Einkommens- und Wohnsitzbescheinigungen bereit?',
    domicileIncomeDesc: 'Offizielle Stipendien erfordern gültige Nachweise für das laufende Geschäftsjahr.',
    readGuidesBtn: 'Zertifikatsleitfaden lesen →'
  }
};

export function getTranslation(lang: LanguageCode): TranslationDictionary {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return { ...TRANSLATIONS.en, ...dict };
}

export function formatTemplate(template: string, vars: Record<string, string | number>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}

export function formatDate(isoDate: string, lang: LanguageCode): string {
  if (!isoDate) return '';
  try {
    const d = new Date(isoDate);
    const localeMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      ur: 'ur-IN',
      ja: 'ja-JP',
      zh: 'zh-CN',
      ru: 'ru-RU',
      es: 'es-ES',
      de: 'de-DE'
    };
    return new Intl.DateTimeFormat(localeMap[lang] || 'en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return isoDate;
  }
}

export function formatCurrencyINR(amount: number, lang: LanguageCode): string {
  try {
    const localeMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
      ur: 'ur-IN',
      ja: 'ja-JP',
      zh: 'zh-CN',
      ru: 'ru-RU',
      es: 'es-ES',
      de: 'de-DE'
    };
    return new Intl.NumberFormat(localeMap[lang] || 'en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString()}`;
  }
}

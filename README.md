# ScholarConnect — Connecting Students to Scholarships

**ScholarConnect** is a production-grade, verified scholarship discovery engine built for Indian students (Engineering, Polytechnic, UG, PG, PhD), reserved categories (SC, ST, VJ/DT, NT, OBC, SEBC, EWS, Minorities), and special categories (Orphans, PWD/Divyangjan, Defence wards).

---

## 🌟 Key Features & Architectures

1. **Floating Pill Navbar**: Fixed detached rounded pill (top: 16px desktop, 12px mobile) with logo mark, primary links, smart search field with `/` shortcut, 10-language selector, theme toggle, and account menu.
2. **Live Deadline Ticker**: News-channel style continuous 44px crawl band directly below the navbar zone displaying upcoming last dates with urgency colors (amber $\le 7$ days, red $\le 3$ days) and pause-on-hover.
3. **Mandatory Type Tag Rule**: Every scholarship name across tickers, search suggestions, cards, tables, detail pages, and comparison matrices displays a small tinted pill tag: `GOVERNMENT` (teal-green) or `PRIVATE` (violet).
4. **Calm 2-Column Hero**: Hand-built lightweight student vector illustration on the left with floating mortarboard cap, degree certificate, ₹ rupee coin, and verified checkmark.
5. **Full 10-Language i18n System**:
   - English, हिन्दी (Hindi), मराठी (Marathi), தமிழ் (Tamil), اردو (Urdu - with mirrored RTL `dir="rtl"`), 日本語 (Japanese), 中文 (Chinese Simplified), Русский (Russian), Español (Spanish), Deutsch (German).
6. **Smart Typo-Tolerant Search**:
   - Powered by Fuse.js and domain synonym expansion (`girls`, `pwd`, `handicapped`, `gate`, `mtech`, `ebc`).
   - Verified typo handling: `pragti` $\rightarrow$ AICTE Pragati, `swanat` $\rightarrow$ AICTE Swanath, `reliance scolarship` $\rightarrow$ Reliance Foundation, `hdfc parivrtan` $\rightarrow$ HDFC Parivartan, `aditya birla`.
   - Never a dead-end: automatically presents closest alternatives and popular open schemes.
7. **Deterministic Matching Engine (`/lib/match.ts`)**:
   - 100-point weighted score (Category 25, Income 20, Course & branch 15, Level & year 10, Academic % 10, State 10, Gender 5, Special situation 5).
   - Hard filters (course mismatch, income above ceiling, state restrictions, category exclusion) grouped into "Best matches" ($\ge 80\%$), "Good matches" ($50-79\%$), "Worth checking" ($<50\%$), and "Not eligible (and why)".
8. **Interactive Detail & Application Tracker**:
   - Live eligibility check comparing scholarship criteria against user profile.
   - Interactive document tick-off checklist.
   - Calendar `.ics` download for Google/Apple Calendar.
   - 4-stage Application Tracker (Saved $\rightarrow$ Preparing $\rightarrow$ Applied $\rightarrow$ Result).
9. **Admin Console (`/admin`) & Spreadsheet Backing**:
   - Data table of all scholarships with search, add, edit, duplicate, and delete.
   - Full Excel `.xlsx` export and import via SheetJS (`xlsx`).
   - Live settings editor for site tagline, ticker speed, and hero copy.
   - Audit trail of all database actions.

---

## 📊 How to Edit the Spreadsheet

There are 3 supported ways to edit scholarship data without touching code:

### Method A: Admin Dashboard (`/admin`)
1. Navigate to `/admin` in the app.
2. Search, edit, or add any scholarship directly through the form modal.
3. Click **"Export Excel (.xlsx)"** to download the master workbook anytime.
4. Changes update immediately in the application.

### Method B: Excel File Upload
1. Open the downloaded `ScholarConnect_Scholarships_Master.xlsx`.
2. Edit rows in the `Scholarships` tab:
   - Multiple items (branches, aliases, documents) must be separated by pipe `|`.
   - Dates must be ISO formatted: `YYYY-MM-DD` (e.g. `2026-10-31`).
   - Numbers must be numeric without commas.
3. In `/admin`, click **"Upload Excel / CSV"** and select the file.
4. The system validates all rows and updates the website live.

### Method C: Google Sheets Integration
1. Import `ScholarConnect_Scholarships_Master.xlsx` into Google Sheets.
2. Share as "Anyone with link can view".
3. Export as CSV / XLSX from Google Sheets and upload to the Admin panel.

---

## 🏷️ How to Change the Theme Line & Tagline

1. Go to `/admin` and click the **"Site Copy & Settings"** tab.
2. Edit:
   - **Main Tagline**: Default `"Every scholarship you deserve, in one place."`
   - **Site Tagline**: Default `"Connecting Students to Scholarships"`
   - **Hero Headline 1 & 2**
   - **Ticker Speed** and **Helpline Number**
3. Click **"Save Settings Live"**. The entire website updates instantly across all views.

---

## 🌐 How to Add a New Language

Adding a language requires only two edits in `src/lib/i18n.ts`:
1. Add the language metadata to `SUPPORTED_LANGUAGES`:
   ```ts
   { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' }
   ```
2. Add a translation object to `TRANSLATIONS`:
   ```ts
   bn: {
     siteName: 'ScholarConnect',
     themeLine: 'শিক্ষার্থীদের বৃত্তির সাথে সংযুক্ত করা',
     ...
   }
   ```

---

## 📑 Data Quality Report & Verification Notes

- **Central Government Schemes**: Verified from official AICTE guidelines and National Scholarship Portal (NSP) notifications (AICTE Pragati, Saksham, Swanath, PG GATE, CSSS, PMSS Defence, PMSSS J&K).
- **Maharashtra State Schemes**: Verified from MahaDBT DTE & Social Justice Department schedules (Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh EBC, SC/ST Freeship, Dr. Panjabrao Deshmukh Hostel allowance, TFWS).
- **Private Foundations**: Verified from corporate foundation portals (Reliance Foundation, HDFC Parivartan, Tata Capital Pankh, Aditya Birla, Kotak Kanya, Sitaram Jindal, ONGC, Infosys STEM Stars, Amazon Future Engineer, SBI Asha).
- **Discontinued Schemes**: Filtered out obsolete schemes; active schemes feature verified 2026 application windows.

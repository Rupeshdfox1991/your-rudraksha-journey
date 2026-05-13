# Rudralife® – Personalised Rudraksha Recommendation Platform

## Original Problem Statement
Build a "world-class" Rudraksha recommendation landing page inspired by rudralife.com. Features:
- Multi-step personalized recommendation form
- Admin panel to manage submissions
- WhatsApp/Email follow-up capability
- High-converting luxury spiritual landing page with Ivory/light theme, gold accents

## User Persona
Spiritual seekers globally (primarily India, UAE, USA, UK, Singapore). 98% on mobile. Audiences range from homemakers to CEOs and celebrities.

## Core Requirements
1. Hero section with Sanskrit Shloka + fade animation (Empower Yourself — dark full-page banner)
2. Stats with CountUp: 5,00,000+ Believe Clients, 90% Repeat Customers, 25+ Years, 52+ Countries
3. Product Carousel (13 items) with actual rudralife.com images
4. Trusted by Seekers dual-row client carousel (celebrities + business leaders)
5. 7 Panel Experts (Tanay→Hemlata→Saumil→Shruti→Shilpa→Madhulika→Dhruv) with flip cards
6. Video Testimonials (4 YouTube-linked thumbnails)
7. Featured section (3 media videos + Media Logos marquee)
8. FAQ Accordion (6 questions)
9. Footer with social icons (FB/IG/YT/LI), payment gateways + disclaimer + WhatsApp
10. Multi-step form: No State, Country Code dropdown, "What Are You Seeking?" pills
11. Admin dashboard to view and manage submissions
12. Intermediate form page (/start): Two-column trust+form layout

## Architecture
```
/app/
├── backend/
│   ├── server.py          FastAPI + MongoDB (port 8001)
│   └── .env               MONGO_URL, DB_NAME
└── frontend/
    └── src/
        ├── App.js          React router
        └── pages/
            ├── LandingPage.js         Full landing page
            ├── GetStartedPage.js      NEW: /start route — 2-col trust+form page
            ├── RecommendationForm.js  Legacy standalone form (/recommendation)
            ├── AdminDashboard.js      Admin panel + login
            └── ResultPage.js         (legacy)
```

## Routes
- `/` → LandingPage (full scroll landing)
- `/start` → GetStartedPage (two-column: left=trust panel, right=form)
- `/recommendation` → RecommendationForm (legacy standalone form, kept)
- `/admin` → AdminDashboard (protected)
- `/admin/login` → AdminLogin

## DB Schema (MongoDB: form_submissions)
```json
{
  "id": "uuid",
  "name": "string",
  "phone": "+91 XXXXXXXXXX",
  "email": "string",
  "dob": "string",
  "gender": "Male|Female|Other",
  "city": "string",
  "country": "string",
  "country_code": "+91",
  "primary_goal": "string",
  "goals": ["Health & Wellness", ...],
  "story": "string",
  "submitted_at": "ISO datetime",
  "status": "pending|contacted|complete"
}
```

## Key API Endpoints
- `POST /api/submissions` – Form submission
- `GET /api/submissions` – Admin: fetch all submissions
- `PATCH /api/submissions/{id}` – Admin: update status
- `POST /api/admin/login` – Admin auth
- `GET /api/health` – Health check

## Implemented Phases

### Phase 1 – Core App
- FastAPI backend, MongoDB, admin dashboard, WhatsApp button

### Phase 2 – Ivory/Light Theme + Responsive Design
- Ivory/Gold/Maroon theme, mobile responsive

### Phase 3 – MASTER PROMPT Implementation
- Stats CountUp, Product carousel, Trusted By Seekers dual-row, 7 experts, Video testimonials, Featured section, Media logos, FAQ, Footer

### Phase 4 – Dark Hero Banner + Expert Photos
- Full-page dark banner, white logo with Rudraksha brown bead (CSS glow), real expert photos, section reorder, social icons

### Phase 5 – Mobile Responsive + 4 Fixes
- Mobile hero (centered, full-width CTA), expert order, Believe Clients, social icons, logo bead color

### Phase 6 – Intermediate Form Page (/start)
- New GetStartedPage.js at `/start` route
- Left panel: mala background, all 7 expert circular photos, trust bullets, 4 stats, Shiva Purana quote
- Right panel: clean 6-step inline form card with progress bar, country code dropdown
- All landing page CTAs now route to `/start`
- Legacy `/recommendation` route kept for backward compatibility

### Phase 8 – Form Redesign + Profession Column (2026-02)
- Form reduced from 6 steps to 5: Name → Contact → Personal → Location → Story (Goals step removed)
- Step labels updated: Mobile No, Email Id (Contact); DOB + Gender + Profession (Personal)
- DOB: custom DD/MM/YYYY separate dropdown selectors (Day 1-31, Month 01-12, Year 1920-2026 descending)
- Profession: free-text input added to Personal step
- Location: Country changed from text input to dropdown with all 195 countries
- Thank you screen: "Namaste, [Name]!" + WhatsApp highlight box + info@rudralife.com clickable email + Chat on WhatsApp + Back to Home buttons
- Admin dashboard: "Areas Seeking Growth" column replaced with "Profession"
- Excel export: column also updated to "Profession"
- Backend: profession field added to SimpleSubmissionCreate model + stored in DB
- Advanced filter panel: From Date / To Date / Gender dropdown with Apply Filter button
- Clear filter (X) button with active filter tags display
- Export to Excel button with no download limit — downloads ALL filtered leads
- Excel columns: Full Name, Mobile Number, Email Address, Date of Birth, Gender, City, Country, Choose the areas where you seek alignment and growth, Your Story (optional), Submitted At, Status
- Table updated with all 11 columns matching exact user-requested field names
- Backend: new /api/admin/submissions/export endpoint (no pagination, up to 50,000 records)
- Backend: /api/admin/submissions now supports from_date, to_date, gender query params
- Detail modal updated to show all requested fields

## Prioritized Backlog

### P1 (Next up)
- Email Notification Integration (Resend/SendGrid) — notify admin on new submission
- WhatsApp API Integration — automated follow-up to submitter

### P2
- Animate hero text entrance (Framer Motion)
- A/B test for CTAs

### P3 (Backlog)
- Analytics (GA4/Hotjar)
- Multi-language support (EN + HI)
- Auto-reply email to submitter

## Test Credentials
See /app/memory/test_credentials.md

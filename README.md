# Pallavi Mehndi Artistry — Premium Website & Admin Management System

A bespoke, production-ready website and business administration management system designed for an independent luxury Mehndi artist entrepreneur.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM (SQLite / PostgreSQL ready)**, **Jose (JWT Secure Sessions)**, **Bcryptjs**, and **Three.js (WebGL 3D Hero Motif)**.

---

## 🌟 Executive Overview & Key Features

### 1. Public Creative Studio Website
- **Editorial Brand Experience**: Warm luxury palette featuring warm ivory (`#FDFBF7`), muted terracotta/rose (`#B35D4D`), deep henna plum (`#241416`), and restrained antique gold accents (`#C5A059`).
- **Interactive 3D Hero Motif (`<Hero3D />`)**: Sculptural 3D golden henna cone and sacred geometric concentric mandala rendered via Three.js. Supports pointer interaction, automatically respects `prefers-reduced-motion`, and gracefully falls back to a layered SVG ornamental motif if WebGL is unsupported or disabled. Completely non-blocking to content and booking CTAs.
- **Curated Offerings & Services (`/services`)**: Admin-managed packages (Royal Heritage Bridal, Contemporary Bridal, Sangeet & Bridesmaid Henna Lounge, Festive & Baby Shower, Bespoke Concepts) with transparent pricing guides, duration, inclusions, and venue travel notes.
- **Portfolio Showcase with Accessible Lightbox (`/portfolio`)**: Category filter (Bridal, Arabic, Traditional Rajasthani/South, Minimal, Festive, Bespoke). Keyboard-accessible lightbox modal (`ArrowLeft`, `ArrowRight`, `Escape`, touch swipe) with screen-reader descriptive alt text and client consent indicators.
- **The Artist & Organic Henna Philosophy (`/about`)**: Biography, artistic philosophy, 100% natural Rajasthani Lawsonia inermis powder, pure eucalyptus and cajeput essential oils, patch-test policy, and zero chemicals / no PPD guarantee.
- **Multi-Step Booking Enquiry System (`/enquire`)**: Mobile-first progressive form with 4 steps + review step:
  - Step 1: Event Details (Date, Event Type, City/Venue)
  - Step 2: Service Package & Estimated Scope
  - Step 3: Contact Details (Name, Phone, Email, Preferred contact method)
  - Step 4: Summary Review, explicit Privacy Consent, and anti-spam protection
  - Step 5: Confirmed submission screen with unique reference number (`PMA-2026-XXXX`), WhatsApp direct connect button with pre-assembled prefilled text, and direct studio call button.
- **Frequently Asked Questions & Studio Policies (`/faqs`)**: Natural henna oxidation & stain maturation timeline (Day 1 orange -> Day 2 deep mahogany peak -> Day 7-14 gentle fade), deposit rules, cancellation policy, destination travel policy, and client privacy notice.
- **Bilingual English & Tamil (தமிழ்) Support**: Integrated language switcher with reactive state updates without layout lock-in.

---

### 2. Protected Admin Management System (`/admin`)

Access the management system at `/admin` (or `/admin/login`).

#### 🔑 Pre-Seeded Credentials
| Role | Email Address | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Owner** | `admin@pallavimehndi.com` | `Pallavi@Mehndi2026!` | Full administrative control, team management, business settings, CSV export, audit logs |
| **Staff** | `assistant@pallavimehndi.com` | `Staff@Mehndi2026!` | View/manage enquiries, bookings, calendar, services, portfolio, content moderation |

#### Admin Capabilities:
1. **Executive Dashboard (`/admin`)**:
   - Calculated live metrics: Action Needed (New Enquiries), Confirmed Bookings, Lifetime Pipeline, and Conversion Rate.
   - Upcoming Scheduled Events table with status badges and quick management links.
   - Recent activity stream from the database `AuditLog`.
2. **Enquiries Pipeline (`/admin/enquiries`)**:
   - Status tracking pipeline: `NEW` ➔ `CONTACTED` ➔ `QUOTE_SENT` ➔ `AWAITING_REPLY` ➔ `CONVERTED` ➔ `CLOSED`.
   - Search by client name, reference number, phone, or location.
   - Comprehensive detail modal with event parameters, style notes, and timestamped internal staff notes.
   - **One-Click Convert to Booking**: Converts an enquiry directly into a booking with auto-assigned reference `BK-2026-XXXX` without re-entering data, enforcing conflict checks on the chosen date.
   - **Protected CSV Export**: Exports business records with automatic CSV formula injection sanitization (cells beginning with `=`, `+`, `-`, or `@` are safely escaped).
3. **Booking Calendar & Schedule (`/admin/bookings`)**:
   - List and Calendar agenda views with status filtering.
   - **Database-Layer Conflict Prevention**: Automated validation prevents conflicting confirmed bookings on the same date or overlapping with availability blackout blocks.
   - **Blackout & Unavailable Dates Manager**: Mark dates as unavailable (e.g. `FULLY_BOOKED`, `PERSONAL_LEAVE`, `TRAVEL`, `PUBLIC_HOLIDAY`) with custom notes.
   - Edit booking modal: Update quote amount, deposit amount, deposit status (`UNPAID`, `PAID`, `REFUNDED`, `WAIVED`), event start/end times, and cancellation reasons.
4. **Services & Pricing CMS (`/admin/services`)**:
   - Full CRUD: Create, edit, reorder, delete, and toggle published/draft state.
   - Inclusions list, duration, starting rates, and Tamil translations.
5. **Portfolio & Media Gallery (`/admin/portfolio`)**:
   - Add and update portfolio items with category, collection year, and accessibility alt text.
   - **Client Consent Management**: Records whether explicit client consent was granted, along with private internal consent/permission notes.
6. **Testimonials Moderation & FAQs (`/admin/content`)**:
   - **Owner Review Moderation**: Unapproved reviews remain strictly hidden from the public website until explicitly approved by an administrator (`isApproved: true`).
   - Add/edit/delete FAQs categorized by Booking, Henna Care, Travel, and Pricing.
7. **Business Settings & Team Administration (`/admin/settings`)**:
   - **Brand Customization**: Business name, tagline, service area label, phone, WhatsApp, email, currency symbol, and timezone.
   - **Policy Editor**: Editable cancellation, deposit, and privacy policy copy.
   - **Team Management**: Invite staff, assign roles (`OWNER` or `STAFF`), and toggle active status.
   - **Last Owner Guardrail**: System strictly prohibits deactivating or deleting the sole active Owner account.
   - **Future Growth Modules**: Configurable toggles for Workshops, Gift Cards, Online Deposits, and Multi-Artist Team Dispatch (all disabled by default).
8. **Security Audit Log (`/admin/audit`)**:
   - Tamper-evident trail of administrative events. Sanitizes passwords and session tokens from logs before storage.

---

## 🛠️ Technology Stack & Architecture Choice

- **Framework**: [Next.js](https://nextjs.org/) App Router with Server Actions.
- **Language**: TypeScript with strict mode enabled.
- **Design & UI**: Tailwind CSS, Lucide React icons, Playfair Display serif typography, and Plus Jakarta Sans body.
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/). Configured with **SQLite** for immediate zero-dependency local execution, and fully compatible with **PostgreSQL** in production by switching `DATABASE_URL` in `.env`.
- **Authentication**: Stateless, cryptographically signed HTTP-only JWT cookies using [Jose](https://github.com/panva/jose) with `HS256`, paired with [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing.
- **Validation**: [Zod](https://zod.dev/) schemas enforcing end-to-end type safety on both client-side forms and server actions.
- **3D Hero Graphics**: [Three.js](https://threejs.org/) WebGL canvas with procedural geometry, soft metallic materials, and static SVG fallback.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18+ (tested on Node v22.20.0)
- npm v9+

### 2. Installation
```bash
# Clone or navigate to the project directory
cd "c:\Users\kisho\Desktop\New folder"

# Install dependencies (already installed)
npm install
```

### 3. Database Initialization & Seeding
```bash
# Push Prisma schema to create the local SQLite database (dev.db)
npx prisma db push

# Seed initial owner, services, portfolio, blackout dates, and sample enquiries
npm run seed
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin portal.

### 5. Running Production Build
```bash
npm run build
npm run start
```

### 6. Automated System Verification
Run the verification test suite to validate all 14 core system requirements:
```bash
npx tsx scripts/verify-system.ts
```

---

## 🔒 Security & Privacy Implementation Notes

1. **Access Control**: Every privileged action calls `requireAuth()` server-side. Owner-only actions (settings updates, staff user creation/deactivation) call `requireAuth('OWNER')`.
2. **Anti-Bot & Spam Prevention**:
   - Public forms include a sliding-window IP rate limiter (maximum 5 requests per 10 minutes).
   - Admin login includes brute-force rate limiting (maximum 5 failed attempts per 15 minutes).
   - Forms include a hidden honeypot field and a submission time threshold to block automated scrapers.
3. **Double-Booking & Conflict Checks**: Checked at the database transaction layer via `checkDateAvailability()`, preventing date collisions between confirmed bookings and blackout date blocks.
4. **Data Minimization & Sanitization**:
   - Only necessary client details are collected.
   - Client consent checkboxes separate necessary booking consultation processing from optional marketing updates.
   - Business record CSV exports sanitize dangerous formula prefixes (`=`, `+`, `-`, `@`) to prevent CSV injection in spreadsheet software.
   - Passwords and auth tokens are stripped from audit log records prior to persistence.

---

## 📋 Business Facts & Credentials Owner Needs to Provide Before Launch

| Item | Status | Action Needed by Owner |
| :--- | :--- | :--- |
| **Legal Business Registration & GSTIN** | Placeholder | Enter in Admin Settings once verified |
| **Official Studio Address & Geo Coordinates** | Placeholder (`Salem, Tamil Nadu`) | Update exact studio address in Admin Settings |
| **Custom Domain & HTTPS Certificate** | Dev URL | Point domain DNS (e.g. `pallavimehndi.com`) and configure SSL |
| **Actual Client Portfolio Photos** | Curated Samples | Upload real high-res client photos with consent in Admin Portfolio |
| **Real Pricing & Service Inclusions** | Baseline Estimates | Adjust starting prices and travel surcharges in Admin Services |
| **Bank Account / UPI ID for Deposits** | Manual Verification | Add preferred deposit payment details in booking messages |
| **Payment Gateway Credentials (Razorpay/Stripe)** | Optional / Disabled | If enabling online deposit checkout, supply API keys in `.env` |
| **SMS / WhatsApp Business API Keys** | Direct Deep-links Active | Direct click-to-chat links work immediately; configure WhatsApp Cloud API if automated bot replies are desired later |

---

## 📄 License & Ownership
Copyright © 2026 Pallavi Mehndi Artistry. All rights reserved.

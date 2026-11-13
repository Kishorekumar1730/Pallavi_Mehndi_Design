# Pallavi Mehndi Artistry — Premium Website & Admin Management System

A bespoke, production-ready website and business administration management system designed for **Pallavi, an independent luxury Mehndi artist and entrepreneur based in Salem, Tamil Nadu**.

**Instagram Reference:** [https://www.instagram.com/salem_mehandi_artist_pallavi/](https://www.instagram.com/salem_mehandi_artist_pallavi/)

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM (SQLite / PostgreSQL ready)**, **Jose (JWT Secure Sessions)**, **Bcryptjs**, and **Three.js (WebGL 3D Hero Motif)**.

---

## 🌟 Executive Overview & Key Features

### 1. Public Creative Studio Website
- **Original Visual Identity**: Inspired by the artist's genuine henna work and high-end beauty atelier aesthetics. Warm, luminous pearl/ivory base (`#FDFBF7`), deep espresso text (`#241416`), restrained accents of terracotta/oxblood (`#B35D4D`, `#8F3D30`), and antique champagne gold (`#C5A059`).
- **Official Instagram Atelier Showcase (`<InstagramHeroCard />`)**: Verified studio card featuring direct links to [@salem_mehandi_artist_pallavi](https://www.instagram.com/salem_mehandi_artist_pallavi/), 100% natural organic henna certifications, verified Salem location, and live portfolio links.
- **Truthful Content & Replacement Placeholder System**:
  - In strict compliance with creative ethics, **no stock photography or AI-generated images are presented as Pallavi's actual work**.
  - All default portfolio and service items feature clean, minimalist neutral photography frames with camera icons and clear notices awaiting genuine photo upload from [@salem_mehandi_artist_pallavi](https://www.instagram.com/salem_mehandi_artist_pallavi/).
  - The artist can replace these placeholders with her genuine high-resolution client photos directly from her phone or computer using the Admin Dashboard.
- **Real Mehndi Background Theme**: Authentic photos of Pallavi's real henna work can be uploaded in Business Settings and displayed as a subtle, low-contrast, softly faded watermark behind key sections, backed by a solid backing layer to ensure 100% text readability.
- **Modern, Elevated & Lightly Floating UI**: Refined multi-stop warm shadows, layered surfaces, subtle separation from the background, gentle lift on hover/focus, and polished raised buttons with clear pressed/tap feedback.
- **English-Only**: 100% English across all public pages, navigation, booking forms, admin labels, messages, FAQs, and setup instructions.
- **Curated Offerings & Services (`/services`)**: Admin-managed packages (Royal Heritage Bridal, Contemporary Elegant Bridal, Sangeet & Bridesmaid Henna Lounge, Festive & Baby Shower, Bespoke Concepts) with transparent price type options (`STARTING_FROM`, `FIXED`, or `QUOTE_ONLY`), duration, inclusions, and travel guidelines.
- **Portfolio Showcase with Accessible Lightbox (`/portfolio`)**: Category filters (Bridal, Arabic, Traditional Rajasthani/South, Minimal, Festive, Bespoke). Keyboard-accessible lightbox modal (`ArrowLeft`, `ArrowRight`, `Escape`, touch swipe) with screen-reader descriptive alt text and explicit client consent tracking.
- **The Artist & Organic Henna Philosophy (`/about`)**: Biography, artistic philosophy, 100% natural Rajasthani Lawsonia inermis powder, pure eucalyptus and cajeput essential oils, skin patch-testing policy, and zero chemicals / no PPD guarantee. Linked directly to verified Instagram profile `@salem_mehandi_artist_pallavi`.
- **Multi-Step Booking Enquiry System (`/enquire`)**: Mobile-first progressive form with 4 steps + review step:
  - Step 1: Event Details (Date, Event Type, City/Location, Venue)
  - Step 2: Service Package, Estimated Persons/Hands, Style Notes, and **Inspiration Image File Upload** (drag & drop, max 5 MB, JPEG/PNG/WebP/AVIF validation)
  - Step 3: Contact Details (Name, Mobile Phone, Email, Preferred Contact Method)
  - Step 4: Summary Review, explicit Privacy Consent, and anti-spam protection (honeypot + submission timing threshold)
  - Step 5: Submission confirmation with dedicated reference number (`PMA-2026-XXXX`), WhatsApp direct connect button with pre-assembled prefilled text, and clear disclaimer that submitting an inquiry does NOT automatically confirm an appointment.
- **Frequently Asked Questions & Studio Policies (`/faqs`)**: Natural henna oxidation & stain maturation timeline (Hour 0 orange ➔ Hour 24 crimson ➔ Hour 48 peak mahogany burgundy), comprehensive aftercare instructions, deposit rules, cancellation policy, destination travel policy, and client privacy notice.

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
   - Comprehensive detail modal with event parameters, style notes, reference images, and timestamped internal staff notes.
   - **One-Click Convert to Booking**: Converts an enquiry directly into a booking with auto-assigned reference `BK-2026-XXXX` without re-entering data, enforcing conflict checks on the chosen date.
   - **Protected CSV Export**: Exports business records with automatic CSV formula injection sanitization (cells beginning with `=`, `+`, `-`, or `@` are safely escaped).
3. **Booking Calendar & Schedule (`/admin/bookings`)**:
   - List and Calendar agenda views with status filtering.
   - **Database-Layer Conflict Prevention**: Automated validation prevents conflicting confirmed bookings on the same date or overlapping with availability blackout blocks.
   - **Blackout & Unavailable Dates Manager**: Mark dates as unavailable (e.g. `FULLY_BOOKED`, `PERSONAL_LEAVE`, `TRAVEL`, `PUBLIC_HOLIDAY`) with custom notes.
   - Edit booking modal: Update quote amount, deposit amount, deposit status (`UNPAID`, `PAID`, `REFUNDED`, `WAIVED`), event start/end times, and cancellation reasons.
4. **Services & Pricing CMS (`/admin/services`)**:
   - Full CRUD: Create, edit, reorder, delete, and toggle published/draft state.
   - Inclusions list, duration, starting rates, price types (`STARTING_FROM`, `FIXED`, `QUOTE_ONLY`), and Tamil translations.
   - Image uploader for package feature artwork.
5. **Portfolio & Media Gallery (`/admin/portfolio`)**:
   - Full CRUD: Add, edit, reorder (display order), delete (with confirmation dialog), and toggle Live/Draft state.
   - **Integrated File Uploader (`/api/upload`)**: Drag & drop or browse photos directly from phone/laptop with instant preview, progress spinner, file validation (max 5 MB, JPEG/PNG/WebP/AVIF), and safe cryptographic file naming.
   - **Multi-Image Support**: Allows specifying additional detail shot URLs for close-up views.
   - **Client Consent Management**: Records whether explicit client consent was granted, along with private internal consent/permission notes.
6. **Testimonials Moderation & FAQs (`/admin/content`)**:
   - **Owner Review Moderation**: Unapproved reviews remain strictly hidden from the public website until explicitly approved by an administrator (`isApproved: true`). No fabricated reviews appear on the live site.
   - Add/edit/delete FAQs categorized by Booking, Henna Care, Travel, and Pricing.
7. **Business Settings & Team Administration (`/admin/settings`)**:
   - **Brand Customization**: Business name, tagline, hero headline, service area label, phone, WhatsApp number, email, currency symbol, timezone, and official Instagram handle URL.
   - **Artist Media & Portrait**: Upload genuine photo of Pallavi or her studio banner using the secure uploader.
   - **Policy & Aftercare Editor**: Editable cancellation, deposit, privacy policy, and aftercare guidance copy.
   - **Team Management**: Invite staff, assign roles (`OWNER` or `STAFF`), and toggle active status.
   - **Last Owner Guardrail**: System strictly prohibits deactivating or deleting the sole active Owner account.
   - **Future Growth Modules**: Configurable toggles for Workshops, Gift Cards, Online Deposits, and Multi-Artist Team Dispatch (all disabled by default).
8. **Security Audit Log (`/admin/audit`)**:
   - Tamper-evident trail of administrative events. Sanitizes passwords and session tokens from logs before storage.

---

## 🛠️ Technology Stack & Architecture Choice

- **Framework**: [Next.js](https://nextjs.org/) App Router with Server Actions & API Route Handlers.
- **Language**: TypeScript with strict mode enabled.
- **Design & UI**: Tailwind CSS, Lucide React icons, Playfair Display serif typography, and Plus Jakarta Sans body.
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/). Configured with **SQLite** (`dev.db`) for immediate zero-dependency local execution, and fully compatible with **PostgreSQL** in production by switching `DATABASE_URL` in `.env`.
- **Authentication**: Stateless, cryptographically signed HTTP-only JWT cookies using [Jose](https://github.com/panva/jose) with `HS256`, paired with [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing.
- **Validation**: [Zod](https://zod.dev/) schemas enforcing end-to-end type safety on client forms, file uploads, and server actions.
- **3D Hero Graphics**: [Three.js](https://threejs.org/) WebGL canvas with procedural geometry, soft metallic materials, and static SVG fallback.
- **Secure File Storage**: Server route `/api/upload` validating MIME types, enforcing size caps (5 MB), sanitizing paths, and saving non-guessable UUID filenames.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js v18+ (tested on Node v22.20.0)
- npm v9+

### 2. Installation
```bash
# Clone or navigate to the project directory
cd "c:\Users\kisho\Desktop\Pallavi_mehndi_design"

# Install dependencies (already installed)
npm install
```

### 3. Database Initialization & Seeding
```bash
# Push Prisma schema to create the local SQLite database (dev.db)
npx prisma db push

# Seed initial owner, services, honest placeholders, blackout dates, and sample enquiries
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
Run the verification test suite to validate all core system requirements:
```bash
npx tsx scripts/verify-system.ts
```

---

## 🔒 Security & Privacy Implementation Notes

1. **Access Control**: Every privileged action calls `requireAuth()` server-side. Owner-only actions (settings updates, staff user creation/deactivation) call `requireAuth('OWNER')`.
2. **File Upload Security**:
   - Strict MIME type whitelist: `image/jpeg`, `image/png`, `image/webp`, `image/avif`.
   - File size cap: 5 MB strictly enforced on client and server.
   - Non-guessable random UUID filenames (`crypto.randomUUID()`) to prevent directory traversal and overwrite attacks.
   - Public enquiry uploads rate-limited per IP address.
3. **Anti-Bot & Spam Prevention**:
   - Public forms include a sliding-window IP rate limiter (maximum 5 requests per 10 minutes).
   - Admin login includes brute-force rate limiting (maximum 5 failed attempts per 15 minutes).
   - Forms include a hidden honeypot field and a submission time threshold to block automated scrapers.
4. **Double-Booking & Conflict Checks**: Checked at the database transaction layer via `checkDateAvailability()`, preventing date collisions between confirmed bookings and blackout date blocks.
5. **Data Minimization & Sanitization**:
   - Only necessary client details are collected.
   - Client consent checkboxes separate necessary booking consultation processing from optional marketing updates.
   - Business record CSV exports sanitize dangerous formula prefixes (`=`, `+`, `-`, `@`) to prevent CSV injection in spreadsheet software.
   - Passwords and auth tokens are stripped from audit log records prior to persistence.

---

## 📋 Business Facts & Checklist for Pallavi Before Production Deployment

| Item | Status | Action Needed by Artist / Owner |
| :--- | :--- | :--- |
| **Official Instagram Profile** | Active (`@salem_mehandi_artist_pallavi`) | Verified and linked in navbar, about, footer, and settings. |
| **Artist Portrait / Studio Image** | Placeholder (`artist-portrait.svg`) | Upload genuine portrait photo in Admin Settings (`/admin/settings`). |
| **Real Portfolio Photographs** | Placeholders (`/placeholders/*.svg`) | Upload real wedding/bridal henna photos with client consent in Admin Portfolio (`/admin/portfolio`). |
| **Real Pricing & Service Inclusions** | Baseline Estimates | Adjust starting prices and travel details in Admin Services (`/admin/services`). |
| **Bank Account / UPI ID for Deposits** | Manual / Configurable | Enter preferred UPI ID or bank details in booking consultation messages. |
| **Client Testimonials** | Draft Samples (Unapproved) | Add authentic client feedback with permission in Admin Content (`/admin/content`). |
| **Custom Domain & HTTPS Certificate** | Ready for Deployment | Point domain DNS (e.g. `pallavimehndi.com`) and configure SSL on Vercel or hosting provider. |

---

## 📄 License & Ownership
Copyright © 2026 Pallavi Mehndi Artistry. All rights reserved.

# Medway Soup Kitchen - Development Sessions

## Session 1 - February 21, 2026

### Project Overview
Built a complete website for **Medway Soup Kitchen CIC** - a community interest company providing meals to individuals facing hardship across Medway, Kent.

**Company Details:**
- Company Name: MEDWAY SOUP KITCHEN CIC
- Company Number: 16849704
- Address: 4 High Street, Chatham, England, ME4 4EP
- Email: hello@medwaysoupkitchen.co.uk
- Domain: medwaysoupkitchen.co.uk

---

### Tech Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | Latest | UI components |
| Supabase | - | PostgreSQL database |
| Resend | - | Transactional emails |
| TypeScript | - | Type safety |

---

### Brand Colors
```css
--color-brand-blue: #1F82A1      /* Primary - secondary elements */
--color-brand-blue-deep: #15627A /* Hover states */
--color-brand-orange: #FF8302    /* Accent - CTAs only */
--color-brand-rust: #B13C02      /* Orange hover */
--color-brand-beige: #FFE8BB     /* Removed from most uses */
--color-brand-dark: #111827      /* Dark backgrounds */
--color-brand-gray: #4B5563      /* Body text */
```

**Color Strategy:** Applied 60-30-10 rule
- 60% White/Light Gray (backgrounds)
- 30% Brand Blue (secondary elements, icons, headings)
- 10% Brand Orange (CTAs only - Donate buttons)

---

### Website Sections
1. **Navbar** - Sticky header with logo, navigation, mobile menu, Donate CTA
2. **Hero** - Main headline "Serving our own.", team image, trust badges
3. **InfoBanner** - Dark strip with 4 key value propositions
4. **WhoWeAre** - Mission statement, features, "Why We Exist" card
5. **WhatWeDo** - 3 cards: Weekly Meal Prep, Community Outreach, Growing Our Reach
6. **Impact** - Statistics about food poverty in UK/Medway
7. **Support** - Donate Funds card, Food Supplies card, Volunteer card
8. **About** - Mission, Vision, Core Values, Transparency, Partnerships
9. **CtaBand** - Final call-to-action with contact form
10. **Footer** - Newsletter signup, quick links, contact, company details

---

### Forms & API Routes

| Form | Location | API Route | Database Table |
|------|----------|-----------|----------------|
| Volunteer | Support section | `/api/volunteer` | `volunteers` |
| Donate Pledge | Support section | `/api/donate` | `donation_pledges` |
| Contact | CtaBand section | `/api/contact` | `contact_submissions` |
| Newsletter | Footer | `/api/newsletter` | `newsletter_subscribers` |

**Form Features:**
- Client-side validation
- Loading states with spinner
- Success/error toast notifications
- Rate limiting (1 submission per minute per email)
- Admin email notifications
- User confirmation emails

---

### Database Schema (Supabase)

```sql
-- Volunteers
CREATE TABLE volunteers (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  roles TEXT[] NOT NULL,
  availability TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donation Pledges
CREATE TABLE donation_pledges (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount_tier TEXT NOT NULL,
  custom_amount DECIMAL,
  frequency TEXT DEFAULT 'one-off',
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### Email Templates (Resend)

Emails use **inline HTML templates** (not React components) for reliability.

| Email | Recipient | Trigger |
|-------|-----------|---------|
| Volunteer Welcome | Volunteer | After volunteer form submission |
| Volunteer Admin Notification | Admin | After volunteer form submission |
| Donation Thank You | Donor | After donation pledge |
| Donation Admin Notification | Admin | After donation pledge |
| Newsletter Welcome | Subscriber | After newsletter signup |
| Newsletter Admin Notification | Admin | After newsletter signup |
| Contact Admin Notification | Admin | After contact form submission |

**Email Design:**
- Logo: `Full_logo_1.png` (hosted on site)
- Header: Colored bar (blue/orange)
- Body: White card on gray background
- Footer: Company address

---

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://twjufibbmyyzrmktjyrs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# Resend
RESEND_API_KEY=re_TwvBgHMv_...

# Admin
ADMIN_EMAIL=hello@medwaysoupkitchen.co.uk
EMAIL_FROM=hello@medwaysoupkitchen.co.uk
```

---

### UI/UX Improvements Made

1. **Color Balance** - Removed excessive orange/beige, standardized to blue
2. **Section Flow** - Alternating white/gray backgrounds for visual rhythm
3. **CTA Hierarchy** - Orange only for primary Donate buttons
4. **Form Visibility** - Fixed invisible input borders on white background
5. **Card Animations** - Subtle hover lift effects
6. **Typography** - Consistent heading hierarchy
7. **Whitespace** - Added section borders for separation

---

### Files Structure

```
medway-soup-kitchen/
├── public/
│   ├── Full_logo_1.svg
│   ├── Full_logo_6.png
│   ├── team image.jpg
│   └── Favicon [1-6].jpg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   ├── donate/route.ts
│   │   │   ├── newsletter/route.ts
│   │   │   └── volunteer/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   ├── DonateForm.tsx
│   │   │   ├── NewsletterForm.tsx
│   │   │   └── VolunteerForm.tsx
│   │   ├── sections/
│   │   │   ├── About.tsx
│   │   │   ├── CtaBand.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Impact.tsx
│   │   │   ├── InfoBanner.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Support.tsx
│   │   │   ├── WhatWeDo.tsx
│   │   │   └── WhoWeAre.tsx
│   │   ├── ui/ (shadcn components)
│   │   └── RevealOnScroll.tsx
│   ├── emails/
│   │   ├── AdminNotification.tsx
│   │   ├── ContactNotification.tsx
│   │   ├── DonateThankYou.tsx
│   │   ├── NewsletterWelcome.tsx
│   │   └── VolunteerWelcome.tsx
│   └── lib/
│       ├── resend.ts
│       ├── supabase.ts
│       ├── supabase-server.ts
│       └── utils.ts
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```

---

### GitHub Repository

- **URL:** https://github.com/medwaysoupkitchen/medway-soup-kitchen
- **Account:** medwaysoupkitchen
- **Email:** medwaysoupkitchen@gmail.com

---

### Session 2 - February 21, 2026 (Deployment & Email Fixes)

**Deployed to Vercel:**
- Logged into Vercel CLI as `medwaysoupkitchen`
- Added all environment variables to production
- Deployed to https://medway-soup-kitchen.vercel.app
- Connected custom domain medwaysoupkitchen.co.uk

**Fixed Form Submission Errors:**
- Contact form: Removed `subject` column from insert (didn't exist in DB)
- Changed status from 'unread' to 'new' to match schema

**Fixed Email Delivery:**
- React email templates were failing silently
- Switched all API routes to use inline HTML templates instead
- Fixed EMAIL_FROM env variable (had newline character corrupting sender display)

**Email Template Design:**
- Logo at top: `Full_logo_1.png`
- Colored header bars (blue #1F82A1 for info, orange #FF8302 for actions)
- Light gray background (#f3f4f6) with white card content
- Orange accent border on message boxes
- Footer with company address
- "Reply" button linking to mailto

**Forms Now Working:**
- Contact form → Admin notification email
- Volunteer form → Welcome email to volunteer + Admin notification
- Donate form → Thank you email to donor + Admin notification
- Newsletter form → Welcome email to subscriber + Admin notification

---

### Deployment Details

**Vercel:**
- Account: medwaysoupkitchen (medwaysoupkitchen@gmail.com)
- Project: medway-soup-kitchen
- URL: https://medway-soup-kitchen.vercel.app

**Custom Domain:**
- Primary: https://medwaysoupkitchen.co.uk
- WWW: https://www.medwaysoupkitchen.co.uk
- DNS: A records pointing to `76.76.21.21` (configured at one.com)

**Environment Variables (Vercel Production):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `EMAIL_FROM`

**Resend Domain:**
- Status: Verified
- Region: eu-west-1
- Sending: Enabled

**Favicon:**
- Added `src/app/icon.jpg` (browser tab)
- Added `src/app/apple-icon.jpg` (Apple devices)
- Source: `public/Favicon 2.jpg`

---

### Pending Tasks

- [x] ~~Vercel Deployment~~ - Completed
- [x] ~~Domain Setup~~ - Completed (medwaysoupkitchen.co.uk)
- [x] ~~Resend Domain Verification~~ - Already verified
- [x] ~~Favicon~~ - Fixed (Session 3)
- [x] ~~Email Templates~~ - Fixed and working with logo
- [ ] **Stripe Integration** - Real payment processing for donations

---

## Session 3 - February 21, 2026 (Favicon Fix)

**Issue:** Favicon not displaying in browser tabs

**Root Cause:** The `.ico` format wasn't rendering properly in some browsers

**Solution:**
- Converted source image (`Favicon 2.jpg`) to PNG format
- Created multiple sizes for compatibility:
  - `favicon.png` (32x32)
  - `favicon-16x16.png` (16x16)
  - `apple-touch-icon.png` (180x180)
- Updated `layout.tsx` metadata to explicitly reference PNG icons
- Copied icons to `public/` folder

**Files Changed:**
- `src/app/layout.tsx` - Added explicit icons metadata
- `public/favicon.png` - New 32x32 PNG
- `public/favicon-16x16.png` - New 16x16 PNG
- `public/apple-touch-icon.png` - New 180x180 PNG for Apple devices

**Result:** Favicon now displays correctly across all browsers

---

### Commands Reference

```bash
# Development
npm run dev

# Build
npm run build

# Push to GitHub
git add . && git commit -m "message" && git push
```

---

### Notes

- **Site is LIVE** at https://medwaysoupkitchen.co.uk
- Current donation system is **pledge-based** (no real payments)
- Forms save to Supabase and send emails via Resend
- Emails send from hello@medwaysoupkitchen.co.uk (domain verified)
- Mobile responsive design with hamburger menu
- Scroll animations using Intersection Observer

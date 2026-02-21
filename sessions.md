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

| Template | Recipient | Trigger |
|----------|-----------|---------|
| `VolunteerWelcome.tsx` | Volunteer | After volunteer form submission |
| `DonateThankYou.tsx` | Donor | After donation pledge |
| `NewsletterWelcome.tsx` | Subscriber | After newsletter signup |
| `AdminNotification.tsx` | Admin | All form submissions |
| `ContactNotification.tsx` | Admin | Contact form submissions |

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

### Pending Tasks

- [ ] **Vercel Deployment** - Connect GitHub repo, add environment variables
- [ ] **Domain Setup** - Point medwaysoupkitchen.co.uk to Vercel
- [ ] **Resend Domain Verification** - Add DNS records for email sending
- [ ] **Stripe Integration** - Real payment processing for donations
- [ ] **Favicon** - Set up proper favicon from provided images

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

- Current donation system is **pledge-based** (no real payments)
- Forms save to Supabase and send emails via Resend
- All emails come from hello@medwaysoupkitchen.co.uk (requires domain verification)
- Mobile responsive design with hamburger menu
- Scroll animations using Intersection Observer

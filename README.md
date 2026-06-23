# FitGram — Landing Page (Phase 2)

Standalone, conversion-focused landing page to capture emails from personal trainers (PTs) interested in the FitGram MVP.

**Stack:** React + TypeScript + Vite + Tailwind CSS.
**Design system:** shadcn-style reusable components (the web twin of FitGram's **RNR — React Native Reusables**), using the *exact same* design tokens and brand orange (`--primary: 25 95% 53%`) as the app.
**i18n:** English 🇬🇧 / Português 🇵🇹 / Español 🇪🇸 with an in-nav language switcher (auto-detects browser language, persists to `localStorage`).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # preview the production build
```

To go live: `dist/` is a static bundle — deploy to **Netlify** (config included), **Vercel**, **Cloudflare Pages**, or GitHub Pages.

---

## Project structure

```
src/
├── main.tsx
├── App.tsx                     # composes all sections + I18nProvider
├── index.css                  # Tailwind + FitGram design tokens (from app global.css)
├── lib/utils.ts               # cn() — same helper as the app
├── i18n/
│   ├── index.tsx              # I18nProvider + useI18n() hook
│   └── translations.ts        # EN / PT / ES dictionary (typed, parity-enforced)
├── components/
│   ├── ui/                    # REUSABLE primitives (RNR/shadcn style, cva variants)
│   │   ├── button.tsx         # Button + ButtonLink, variants: default/outline/ghost/… sizes incl. pill
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── carousel.tsx       # reusable carousel: autoplay, dots, arrows, keyboard, swipe
│   ├── Logo.tsx
│   ├── LanguageSwitcher.tsx
│   └── sections/              # page sections, all driven by the i18n dictionary
│       ├── Navbar.tsx  Hero.tsx  TrustStrip.tsx  Problem.tsx
│       ├── Solution.tsx  Testimonials.tsx (carousel)  WaitlistForm.tsx  Footer.tsx
```

### Reusable components (RNR-style)
The `src/components/ui/*` files mirror FitGram's `apps/app/components/ui/*`: `cva` variant maps, the `cn()` merge helper, and the shared HSL token names (`bg-primary`, `text-muted-foreground`, `border-border`, …). Swapping the tokens in `index.css` re-themes the whole page, exactly like the app.

---

## Page structure (matches the Phase 2 spec)

1. **Hero** — headline (Variant A), subheading, animated phone mockup, primary CTA
2. **Trust strip** — what FitGram replaces
3. **Problem** — "Sound familiar?" + 3 pain points + the 15–20 client ceiling line
4. **Solution** — 3 features, each mapped to a pain point (Client Management, Workout & Diet Delivery, Coaching Inbox)
5. **Testimonials** — **carousel** of trainer quotes + animated waiting-list counter + "Built by trainers, for trainers"
6. **CTA / Lead capture form** — Email (required), PT type (required), Name (optional) + trust line + confirmation

All copy is final and fully translated — no placeholders, one consistent language at a time.

---

## Connecting the form (pick ONE)

The form works in **demo mode** out of the box (logs the payload + shows the confirmation). To collect real leads, edit `FORM_ENDPOINT` at the top of `src/components/sections/WaitlistForm.tsx`:

### Option A — Formspree / webhook
```ts
const FORM_ENDPOINT = 'https://formspree.io/f/XXXXXXX';
```
Submissions POST as JSON: `{ email, ptType, name, locale, submittedAt, source }`. Enable email notifications in Formspree and pipe to Google Sheets via Zapier/Make.

### Option B — Tally (recommended in spec)
Build the form in [Tally](https://tally.so), brand it (orange/dark + logo), connect **Google Sheets** + email notification, then either point `FORM_ENDPOINT` at the Tally webhook or replace the form card with the Tally embed.

### Option C — Google Forms
Use the form's `.../formResponse` POST URL and map `entry.XXXX` field IDs into the payload. Auto-exports to Google Sheets natively.

> **Google Sheets = single source of truth.** Columns: `Email | PT Type | Name | Locale | Timestamp`. Segment by PT type for targeted messaging; track signup date for growth.

---

## Headline variants

- **A (selected, live):** "Manage all your clients, workouts, and diets in one app — not 5 different tools."
- **B (alt):** "The all-in-one platform that replaces your spreadsheets, PDFs, and WhatsApp groups."

---

## Social media share copy

**WhatsApp / DM:** Hey! We're building an app for PTs to manage clients, workouts, and diets in one place. If you're interested, drop your email here: [LINK]

**Instagram:** Tired of managing clients across WhatsApp, Sheets, and random apps? We're building FitGram — one platform for everything. Join the waiting list: [LINK]

**LinkedIn:** We're building FitGram — a platform for personal trainers to manage clients, deliver workout and nutrition plans, and communicate in one place. Currently looking for beta testers. Interested? [LINK]

---

## Phase 2 deliverables

- [x] 2 headline variants drafted + 1 selected
- [x] Landing page with all sections (Hero, Problem, Solution, CTA)
- [x] Carousel section (testimonials) — partner request
- [x] Lead capture form (Email + PT type + optional Name) with validation + confirmation
- [x] Branded with FitGram logo + colors (shared tokens)
- [x] Built with reusable RNR/shadcn-style components + Tailwind
- [x] EN / PT / ES translations with language switcher
- [x] Complete copy for all sections (page + form + social)
- [x] OG meta for shareable link previews
- [ ] Form connected to Google Sheets — *set `FORM_ENDPOINT` or embed Tally (above)*
- [ ] Email notification on new signup — *enable in your form tool*
- [ ] Deployed + shareable link tested on mobile/WhatsApp/Instagram
- [ ] Link added to Instagram bio

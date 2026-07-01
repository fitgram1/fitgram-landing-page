# FitGram — Landing Page

Marketing & waitlist landing page for **FitGram**, the all-in-one platform for
personal trainers — it replaces scattered spreadsheets, PDFs and WhatsApp threads
with one system for clients, workout/nutrition plans, check-ins and progress.

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS (via **NativeWind** /
`react-native-web`) + lucide-react.
**Features:** i18n (English 🇬🇧 / Português 🇵🇹 / Español 🇪🇸), light/dark theme,
scroll-reveal animations, nav scroll-spy, and a beta application form that stores
leads in a Google Sheet with email deduplication and automatic confirmation emails.
**Design system:** shadcn/RNR-style reusable components using the *same* design
tokens and brand orange (`--primary: 25 95% 53%`) as the FitGram app.

> See **`ARCHITECTURE.md`** for a full breakdown of the codebase.

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
│       ├── Navbar.tsx  Hero.tsx  TrustStrip.tsx  Problem.tsx  Solution.tsx
│       ├── Offer.tsx (Founding PT)  Testimonials.tsx (carousel)
│       ├── Faq.tsx  WaitlistForm.tsx  Footer.tsx
```

### Reusable components (RNR-style)
The `src/components/ui/*` files mirror FitGram's `apps/app/components/ui/*`: `cva` variant maps, the `cn()` merge helper, and the shared HSL token names (`bg-primary`, `text-muted-foreground`, `border-border`, …). Swapping the tokens in `index.css` re-themes the whole page, exactly like the app.

---

## Page structure (matches the Phase 2 spec)

1. **Hero** — headline, subheading, animated phone mockup, primary CTA
2. **Trust strip** — what FitGram replaces
3. **Problem** — "Sound familiar?" + pain points + the 15–20 client ceiling line
4. **Solution** — 3 features, each mapped to a pain point (Client Management, Workout & Diet Delivery, Coaching Inbox)
5. **Offer** — **Founding PT**: early access, direct line to the team, 6 months free after launch, lifetime discount
6. **Testimonials** — **carousel** of trainer quotes + animated waiting-list counter + "Built by trainers, for trainers"
7. **FAQ** — accordion: availability, price, "do I change how I work?", "what do you expect from me?"
8. **CTA / Lead capture form** — Name, Email, PT type, # clients, current tools (all required) + Instagram/contact, call availability, biggest time-sink (optional) + trust line + confirmation
9. **Footer**

All copy is final and fully translated — no placeholders, one consistent language at a time.

---

## Lead capture — Google Sheets (with dedup + confirmation email)

Leads are captured **without a backend of our own**. The form
(`src/components/sections/WaitlistForm.tsx`) POSTs to a **Google Apps Script Web
App** that stores each submission in a Google Sheet, **dedupes by email**, and
emails both the team and the applicant. The Apps Script code is in
[`docs/google-apps-script.gs`](docs/google-apps-script.gs).

**Setup**

1. Create a Google Sheet (this is the leads database).
2. **Extensions → Apps Script**, paste `docs/google-apps-script.gs`, Save.
3. **Deploy → New deployment → Web app** — *Execute as:* **Me**, *Who has
   access:* **Anyone** → Deploy and authorize. Copy the URL that ends in `/exec`.
4. Paste that URL into **`SHEET_ENDPOINT`** at the top of `WaitlistForm.tsx`.
   (Set `NOTIFY_EMAIL` in the script to change/disable the team notification.)

That's it. On submit:

| Event | Result |
| ----- | ------ |
| New lead | row appended to the sheet + email to the team + confirmation email to the applicant |
| Repeat email | rejected → the UI shows a "you're already on the list" state |

Stored values are language-independent codes — `ptType`: `in-person`/`online`/`hybrid`;
`clients`: `0-5`/`6-15`/`16-30`/`30+`; `tools`: comma-joined (`whatsapp, excel, …`).

> **Notes.** The request is sent as `text/plain` so the browser skips the CORS
> preflight Apps Script can't answer. `Who has access` **must** be `Anyone`
> (not "Anyone with Google account", which returns 401). After editing the
> script, redeploy with **Deploy → Manage deployments → edit → Version: New**.
>
> **Fallback.** While `SHEET_ENDPOINT` is empty, the form falls back to
> **FormSubmit** (`LEAD_ENDPOINT`), which just emails the lead — no storage, no
> dedup.

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

- [x] Landing page with all spec sections (Hero, Problem, Solution, Offer, Testimonials, FAQ, Form)
- [x] **Offer** section — Founding PT (early access, direct contact, 6 months free, lifetime discount)
- [x] **FAQ** section — accordion with the 4 spec questions
- [x] Carousel section (testimonials) — partner request
- [x] Lead capture form — full spec fields (Name, Email, PT type, # clients, tools required; contact, call, time-sink optional) with validation
- [x] Confirmation message aligned with spec (+ "reply with one line" prompt)
- [x] Branded with FitGram logo + colors (shared tokens)
- [x] Built with reusable RNR/shadcn-style components + Tailwind
- [x] EN / PT / ES translations with language switcher
- [x] Complete copy for all sections (page + form + social)
- [x] OG meta for shareable link previews
- [x] Form wired to **Google Sheets via Apps Script** — storage, email dedup, and confirmation emails (see "Lead capture")
- [x] Email notification to the team + automatic confirmation email to the applicant
- [ ] Deployed + shareable link tested on mobile/WhatsApp/Instagram
- [ ] Link added to Instagram bio

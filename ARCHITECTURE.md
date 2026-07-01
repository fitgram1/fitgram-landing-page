# FitGram Landing — Architecture

Marketing / waitlist landing page for **FitGram** (an all‑in‑one platform for
personal trainers). Single‑page site with a lead‑capture form, i18n (EN/PT/ES),
light + dark themes, and scroll‑reveal animations.

---

## Tech stack

| Concern | Choice |
|---|---|
| Build / dev server | **Vite 5** (`vite`) |
| UI library | **React 18** + **TypeScript** |
| Styling | **Tailwind CSS** via **NativeWind** preset |
| Primitives | **react-native-web** (`View` / `Text`) styled with Tailwind classes |
| Components | shadcn/RNR‑style components (CVA variants) |
| Icons | **lucide-react** |
| Class utils | `clsx` + `tailwind-merge` (via `cn()`), `class-variance-authority` |
| i18n | Custom lightweight provider (no external lib) |
| Lead storage | Google Sheets (Apps Script) with FormSubmit email fallback |

There is **no backend** in this repo — it builds to static files. Lead capture
talks to third‑party endpoints from the browser (see *Lead capture* below).

### Why react-native-web?

The landing mirrors the design tokens and component API of the FitGram app
(which is React Native). Sections use `View`/`Text` from `react-native` so the
markup stays close to the app. `tailwind.config.ts` sets `important: '#root'` so
single‑class Tailwind utilities win over the base styles react-native-web
injects at runtime.

---

## Directory layout

```
src/
├─ App.tsx                 # Providers + section composition (page order)
├─ main.tsx                # React root (#root)
├─ index.css               # Tailwind layers, design tokens (CSS vars), utilities
│
├─ components/
│  ├─ Reveal.tsx           # Scroll-into-view fade/slide wrapper (IntersectionObserver)
│  ├─ Logo.tsx, ThemeToggle.tsx, CountUp.tsx
│  │
│  ├─ sections/            # One component per page section (see Page composition)
│  │   Navbar, Hero, TrustStrip, Problem, Solution, Showcase,
│  │   Offer, Faq, WaitlistForm, Footer, Testimonials*
│  │
│  ├─ subsections/         # Visual building blocks used inside sections
│  │   PhoneMock, FloatCard, ClientPanel, PlanPanel, ChatPanel, Tilt
│  │
│  └─ ui/                  # Reusable primitives (CVA variants)
│      badge, button, card, carousel, input, select, textarea
│
├─ i18n/
│  ├─ index.tsx            # I18nProvider + useI18n() hook, locale state
│  └─ translations.ts      # `Messages` type + en/pt/es message tables
│
├─ theme/
│  └─ index.tsx            # ThemeProvider (light/dark, toggles `.dark` on <html>)
│
├─ lib/utils.ts            # cn() = twMerge(clsx(...))
├─ types/, assets/         # shared types; mp4/png demo media
│
docs/google-apps-script.gs # Paste-in Apps Script for the Sheets lead backend
tailwind.config.ts         # Tokens mirrored from the FitGram app; important:'#root'
```

\* `Testimonials.tsx` exists but is **not currently mounted** in `App.tsx`.

---

## Page composition (`App.tsx`)

```
<ThemeProvider>
  <I18nProvider>
    <Navbar />
    <main>
      <Hero />          # headline + phone mock + CTA
      <TrustStrip />    # "replaces spreadsheets / PDFs / WhatsApp…"
      <Problem />       # radial icon diagram + 4 pain-point cards
      <Solution />      # orbital diagram (FitGram hub + feature nodes)
      <Showcase />      # vertical timeline, alternating text/visual
      <Offer />         # two columns; animated marker highlights each perk
      <Faq />           # accordion
      <WaitlistForm />  # lead capture form
    </main>
    <Footer />
  </I18nProvider>
</ThemeProvider>
```

Providers wrap everything so every section can read the current locale and theme.

---

## Cross-cutting systems

### Theming (`src/theme`)
`ThemeProvider` stores light/dark and toggles the `.dark` class on `<html>`.
Tailwind `darkMode: 'class'`. Colors are CSS variables defined in `index.css`
(`--primary`, `--background`, `--card`, …) and referenced by the Tailwind theme,
so components use semantic classes (`bg-card`, `text-primary`) that adapt per
theme. `ThemeToggle` flips the value.

### i18n (`src/i18n`)
`I18nProvider` holds the active `Locale` (`en | pt | es`). `useI18n()` returns
`{ t, locale, setLocale }`, where `t` is the strongly‑typed message tree for the
current locale. All copy lives in `translations.ts` under the `Messages`
interface — adding a field requires updating the interface **and** all three
locale tables (TypeScript enforces this).

### Scroll reveal (`components/Reveal.tsx`)
Wrapper that starts hidden (`opacity-0 translate-y-5`) and fades/slides in the
first time it enters the viewport (IntersectionObserver), with an optional
`delay` for staggering. Honors `prefers-reduced-motion`. Used across sections
for text/element entrance effects.

### Navbar scroll‑spy (`sections/Navbar.tsx`)
`useActiveSection` observes each section id; the active nav link is highlighted
and the **URL hash is kept in sync while scrolling** via `history.replaceState`
(no jump).

### Styling helper
`cn()` merges class lists with `tailwind-merge` so later classes override
earlier conflicting ones — the pattern used to override component variant
defaults via `className`.

---

## Lead capture (`sections/WaitlistForm.tsx`)

Client‑side validated form (name, email, PT type, client count, tools —
multi‑select with a free‑text "other", plus optional contact/call/pain).
On submit it POSTs to one of two third‑party endpoints (no server of our own):

1. **`SHEET_ENDPOINT`** — a Google Apps Script Web App (see
   `docs/google-apps-script.gs`). Stores each lead as a row in a Google Sheet
   and **dedupes by email**: a repeat email returns `{ error: 'duplicate' }`,
   and the UI shows a "you're already on the list" state. Sent as `text/plain`
   to dodge the CORS preflight Apps Script can't answer.
2. **`LEAD_ENDPOINT`** (fallback, used when `SHEET_ENDPOINT` is empty) —
   **FormSubmit** (`formsubmit.co`) which just **emails** the submission to
   `fitgrampt@gmail.com`. No storage, no dedup. Uses an alias token so the raw
   address isn't exposed in the client bundle.

```
Form ──POST JSON──► Google Apps Script ──► Google Sheet (dedup on email)   [primary]
Form ──POST JSON──► FormSubmit ──► email to fitgrampt@gmail.com            [fallback]
```

> ⚠️ Never connect a datastore that needs secret credentials (e.g. the app's
> MongoDB) directly from this static frontend — credentials would be exposed in
> the browser bundle. Route those through a backend/API or serverless function.

---

## Scripts

| Command | Does |
|---|---|
| `yarn dev` | Vite dev server |
| `yarn build` | `tsc -b` typecheck + `vite build` (static output in `dist/`) |
| `yarn preview` | Serve the production build locally |

---

## Extending

- **New section** → add a component in `components/sections/`, mount it in
  `App.tsx`, add its copy to all three locales in `translations.ts`, and (if it
  should appear in the nav) add a link + section id in `Navbar.tsx`.
- **New copy** → edit `Messages` in `translations.ts`; fill EN/PT/ES.
- **New brand color/token** → add the CSS var in `index.css` and map it in
  `tailwind.config.ts`.

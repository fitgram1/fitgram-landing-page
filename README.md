# FitGram — Landing Page (Phase 2)

A standalone, conversion-focused landing page to capture emails from personal trainers (PTs) interested in the FitGram MVP.

**Stack:** single static `index.html` — no build step, no dependencies. Deploy anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
**Brand:** FitGram orange `#F97316` / near-black `#0a0a0a` (matches the app theme).

---

## Quick start

```bash
# Preview locally — just open the file, or serve it:
python3 -m http.server 8080      # then visit http://localhost:8080
# or
npx serve .
```

To go live: drag this folder onto [Netlify Drop](https://app.netlify.com/drop), or run `vercel`, or push to GitHub and enable Pages.

---

## Page structure (matches the Phase 2 spec)

1. **Hero** — headline, subheading, phone mockup, primary CTA ("Join the beta — it's free")
2. **Problem** — "Sound familiar?" + 3 pain points + closing line (15–20 client ceiling)
3. **Solution** — 3 features, each mapped to a pain point (Client Management, Workout & Diet Delivery, Coaching Inbox)
4. **Social proof** — tester quote, waiting-list counter, "Built by trainers, for trainers"
5. **CTA / Lead capture form** — Email (required), PT type (required), Name (optional) + trust line

All copy is final — no placeholders, no Lorem ipsum. One consistent language (EN).

---

## Connecting the form (pick ONE)

The form works in **demo mode** out of the box (logs to console + shows the confirmation). To actually collect leads, choose an option:

### Option A — Formspree / webhook (keep this page's form)
1. Create a free form at [formspree.io](https://formspree.io) (or a Zapier/Make webhook).
2. In `index.html`, set the `FORM_ENDPOINT` constant in the `<script>` block:
   ```js
   const FORM_ENDPOINT = 'https://formspree.io/f/XXXXXXX';
   ```
3. Submissions POST as JSON: `{ email, ptType, name, submittedAt, source }`.
4. In Formspree, enable email notifications and connect Google Sheets (via Zapier/Make) for the spreadsheet source of truth.

### Option B — Tally embed (recommended in spec)
1. Build the form at [tally.so](https://tally.so): Email (required), PT type dropdown (Gym PT / Online PT / Fitness Coach / Independent PT, required), Name (optional).
2. Brand it: FitGram logo, orange/dark colors, intro text (below).
3. Integrations → connect **Google Sheets**, enable **email notification**.
4. Replace the `.form-card` block in `index.html` with the Tally embed iframe + their embed script.

### Option C — Google Forms
Use the form's `…/formResponse` POST URL and map `entry.XXXX` field IDs into the payload. Auto-exports to Google Sheets natively; enable "Get email notifications for new responses".

> **Google Sheets = single source of truth.** Columns: `Email | PT Type | Name | Timestamp`. Segment by PT type for targeted messaging; track signup date for growth.

---

## Headline variants

- **A (selected, in page):** "Manage all your clients, workouts, and diets in one app — not 5 different tools."
- **B:** "The all-in-one platform that replaces your spreadsheets, PDFs, and WhatsApp groups."

**CTA button:** "Join the beta — it's free" / "Join the waiting list"

---

## Form copy

**Intro:** Join the FitGram waiting list — We're building a platform that helps personal trainers manage clients, deliver workout and diet plans, and communicate, all in one place. Leave your email and we'll notify you when the beta is ready.

**Confirmation:** You're on the list! 🎉 Thanks for signing up. We'll reach out when FitGram is ready for beta testers. In the meantime, share this with a fellow trainer who might be interested.

---

## Social media share copy

**WhatsApp / DM:**
> Hey! We're building an app for PTs to manage clients, workouts, and diets in one place. If you're interested, drop your email here: [LINK]

**Instagram Story / Post:**
> Tired of managing clients across WhatsApp, Sheets, and random apps? We're building FitGram — one platform for everything. Join the waiting list: [LINK]

**LinkedIn:**
> We're building FitGram — a platform for personal trainers to manage clients, deliver workout and nutrition plans, and communicate in one place. Currently looking for beta testers. Interested? [LINK]

---

## Link preview (OG meta)

`index.html` includes Open Graph + Twitter meta for clean WhatsApp/Slack/LinkedIn previews. Add an `og-image.png` (1200×630) to this folder to set the preview image.

---

## Phase 2 deliverables checklist

- [x] 2 headline variants drafted
- [x] 1 final headline selected (Variant A, live in hero)
- [x] Landing page with all sections (Hero, Problem, Solution, CTA)
- [x] Lead capture form (Email + PT type + optional Name) with validation
- [x] Confirmation message configured
- [x] Branded with FitGram logo + colors
- [x] Complete copy for all sections (page + form + social)
- [x] Social media share copy ready (WhatsApp, Instagram, LinkedIn)
- [x] OG meta for shareable link previews
- [ ] Form connected to Google Sheets — *set `FORM_ENDPOINT` or embed Tally (above)*
- [ ] Email notification on new signup — *enable in your form tool*
- [ ] Deployed + shareable link tested on mobile/WhatsApp/Instagram
- [ ] Link added to Instagram bio
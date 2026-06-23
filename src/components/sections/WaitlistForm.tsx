import * as React from 'react';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';

/* ============================================================
   CONFIG — set this to collect submissions.
     • Formspree:   'https://formspree.io/f/XXXXXXX'
     • Google Form: the .../formResponse URL (see README)
     • Webhook:     Zapier / Make POST URL
   Leave as '' to run in DEMO mode (logs to console, shows success).
   ============================================================ */
const FORM_ENDPOINT = '';

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function WaitlistForm() {
  const { t, locale } = useI18n();
  const c = t.cta;

  const [email, setEmail] = React.useState('');
  const [ptType, setPtType] = React.useState('');
  const [name, setName] = React.useState('');
  const [errors, setErrors] = React.useState<{ email?: boolean; type?: boolean }>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = isValidEmail(email);
    const typeOk = ptType !== '';
    setErrors({ email: !emailOk, type: !typeOk });
    if (!emailOk || !typeOk) return;

    const payload = {
      email: email.trim(),
      ptType,
      name: name.trim(),
      locale,
      submittedAt: new Date().toISOString(),
      source: 'landing-page' as const,
    };

    setSubmitting(true);
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // eslint-disable-next-line no-console
        console.log('[FitGram demo] Captured signup:', payload);
        await new Promise((r) => setTimeout(r, 500));
      }
      setDone(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      window.alert(c.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="waitlist" className="bg-gradient-to-b from-background to-orange-50/60 py-20 md:py-24">
      <div className="container text-center">
        <span className="mb-4 inline-block text-[13px] font-bold uppercase tracking-wide text-primary">
          {c.eyebrow}
        </span>
        <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">{c.heading}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{c.lead}</p>

        <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
          {done ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="size-8" strokeWidth={3} />
              </div>
              <h3 className="mb-2.5 text-2xl font-bold">{c.successTitle}</h3>
              <p className="text-[15px] text-muted-foreground">{c.successBody}</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} noValidate className="text-left">
                <div className="mb-4">
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                    {c.emailLabel} <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={c.emailPlaceholder}
                    value={email}
                    aria-invalid={errors.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (isValidEmail(e.target.value)) setErrors((p) => ({ ...p, email: false }));
                    }}
                  />
                  {errors.email && <p className="mt-1.5 text-[13px] text-destructive">{c.emailError}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="ptType" className="mb-2 block text-sm font-semibold">
                    {c.typeLabel} <span className="text-primary">*</span>
                  </label>
                  <Select
                    id="ptType"
                    value={ptType}
                    aria-invalid={errors.type}
                    onChange={(e) => {
                      setPtType(e.target.value);
                      if (e.target.value) setErrors((p) => ({ ...p, type: false }));
                    }}
                  >
                    <option value="" disabled>
                      {c.typePlaceholder}
                    </option>
                    {c.typeOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                  {errors.type && <p className="mt-1.5 text-[13px] text-destructive">{c.typeError}</p>}
                </div>

                <div className="mb-5">
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    {c.nameLabel}{' '}
                    <span className="font-normal text-muted-foreground">{c.nameOptional}</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={c.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full shadow-lg shadow-primary/30"
                >
                  {submitting ? c.submitting : c.submit}
                </Button>
              </form>
              <p className="mt-4 text-center text-[13px] text-muted-foreground">{c.trust}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

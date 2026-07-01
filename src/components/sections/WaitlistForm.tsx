import * as React from 'react';
import {
  Check,
  User,
  Mail,
  Users,
  AtSign,
  Phone,
  PenLine,
  Lock,
  ArrowRight,
  MessageCircle,
  FileSpreadsheet,
  FileText,
  NotebookPen,
  Calendar,
  LayoutGrid,
  Brain,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/Reveal';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';

const TOOL_ICONS: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  email: Mail,
  excel: FileSpreadsheet,
  pdf: FileText,
  notes: NotebookPen,
  calendar: Calendar,
  'other-app': LayoutGrid,
  memory: Brain,
};

/* PRIMARY lead backend — a Google Sheets Apps Script Web App that stores each
   lead, dedupes by email, AND emails a notification (see docs/google-apps-script.gs).
   Paste your deployed Web App URL (ends in /exec) here. */
const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwGMUjr4eGLLVt87wo3ckK2Hq2IaMSMon8aDDRf43raM7Tpk1OGzbSnVizqjKJt0RCejQ/exec';

/* FALLBACK (used while SHEET_ENDPOINT is empty) — FormSubmit emails the lead to
   fitgrampt@gmail.com. The address was activated via the token below. No storage
   / no dedup, but it guarantees submissions are delivered right away. */
const LEAD_ENDPOINT = 'https://formsubmit.co/ajax/08e2017df2585087c21f2046e3f31609';

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

interface FormErrors {
  name?: boolean;
  email?: boolean;
  type?: boolean;
  clients?: boolean;
  tools?: boolean;
}

export function WaitlistForm() {
  const { t, locale } = useI18n();
  const c = t.cta;

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [ptType, setPtType] = React.useState('');
  const [clients, setClients] = React.useState('');
  const [tools, setTools] = React.useState<string[]>([]);
  const [otherTool, setOtherTool] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [call, setCall] = React.useState('');
  const [pain, setPain] = React.useState('');

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [duplicate, setDuplicate] = React.useState(false);

  function toggleTool(value: string) {
    setTools((prev) => {
      const next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      if (next.length) setErrors((p) => ({ ...p, tools: false }));
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: FormErrors = {
      name: name.trim() === '',
      email: !isValidEmail(email),
      type: ptType === '',
      clients: clients === '',
      tools: tools.length === 0,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      ptType,
      clients,
      tools,
      otherTool: otherTool.trim(),
      contact: contact.trim(),
      call,
      pain: pain.trim(),
      locale,
      submittedAt: new Date().toISOString(),
      source: 'landing-page' as const,
    };

    const toolsStr = payload.tools
      .map((v) =>
        v === 'other-app' && payload.otherTool ? `Outra app (${payload.otherTool})` : v,
      )
      .join(', ');

    // Localized confirmation email sent to the applicant.
    const confirmSubject = c.successTitle;
    const confirmBody = `${c.successBody}\n\n${c.successPs}`;

    setSubmitting(true);
    try {
      if (SHEET_ENDPOINT) {
        // Google Sheets via Apps Script — stores the lead, dedupes by email, and
        // emails a notification. text/plain keeps it a "simple" request so the
        // browser skips the CORS preflight Apps Script can't answer.
        const res = await fetch(SHEET_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            ptType: payload.ptType,
            clients: payload.clients,
            tools: toolsStr,
            contact: payload.contact,
            call: payload.call,
            pain: payload.pain,
            locale: payload.locale,
            confirmSubject,
            confirmBody,
          }),
        });
        const result = (await res.json().catch(() => null)) as
          | { ok?: boolean; error?: string }
          | null;
        if (result?.error === 'duplicate') {
          setDuplicate(true);
          return;
        }
        if (!result?.ok) throw new Error('Sheet endpoint error');
        setDone(true);
      } else {
        // Fallback: email the lead via FormSubmit (delivers immediately).
        const res = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: 'Nova candidatura — FitGram beta',
            _template: 'table',
            // Confirmation email sent automatically to the applicant. FormSubmit
            // routes the auto-response to the field literally named `email`.
            email: payload.email,
            _replyto: payload.email,
            _autoresponse: confirmBody,
            Nome: payload.name,
            'Tipo de PT': payload.ptType,
            'Nº de clientes': payload.clients,
            Ferramentas: toolsStr,
            Contacto: payload.contact || '—',
            'Call rápida': payload.call || '—',
            'Tarefa que faz perder tempo': payload.pain || '—',
            Idioma: payload.locale,
            Origem: payload.source,
          }),
        });
        const result = (await res.json().catch(() => null)) as
          | { success?: string; message?: string }
          | null;
        if (!res.ok || (result && result.success === 'false')) {
          throw new Error(result?.message || `Lead endpoint responded ${res.status}`);
        }
        setDone(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      window.alert(c.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="waitlist" className="relative overflow-hidden bg-background py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_0%,hsl(25_95%_50%/0.10),transparent_60%)]"
        aria-hidden
      />
      <div className="container text-center">
        <Reveal>
          <Badge className="mb-4 self-center rounded-md px-4 py-1.5 text-sm">{c.eyebrow}</Badge>
          <h2 className="text-[clamp(30px,4.6vw,52px)] font-extrabold leading-[1.05] tracking-tight">
            {c.heading.split('FitGram').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-primary">FitGram</span>}
              </React.Fragment>
            ))}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{c.lead}</p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-sm sm:p-10">
          {done || duplicate ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="size-8" strokeWidth={3} />
              </div>
              <h3 className="mb-2.5 text-2xl font-bold">
                {duplicate ? c.dupTitle : c.successTitle}
              </h3>
              <p className="text-[15px] text-muted-foreground">
                {duplicate ? c.dupBody : c.successBody}
              </p>
              {!duplicate && (
                <p className="mt-4 border-t border-border pt-4 text-[15px] text-muted-foreground">
                  {c.successPs}
                </p>
              )}
            </div>
          ) : (
            <>
              <Reveal>
              <form onSubmit={handleSubmit} noValidate className="text-left">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                      {c.nameLabel} <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
                      <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder={c.namePlaceholder}
                        value={name}
                        aria-invalid={errors.name}
                        className="pl-9"
                        onChange={(e) => {
                          setName(e.target.value);
                          if (e.target.value.trim()) setErrors((p) => ({ ...p, name: false }));
                        }}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-[13px] text-destructive">{c.nameError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                      {c.emailLabel} <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder={c.emailPlaceholder}
                        value={email}
                        aria-invalid={errors.email}
                        className="pl-9"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (isValidEmail(e.target.value)) setErrors((p) => ({ ...p, email: false }));
                        }}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-[13px] text-destructive">{c.emailError}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ptType" className="mb-2 block text-sm font-semibold">
                      {c.typeLabel} <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-primary" />
                      <Select
                        id="ptType"
                        value={ptType}
                        aria-invalid={errors.type}
                        className="pl-9"
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
                    </div>
                    {errors.type && (
                      <p className="mt-1.5 text-[13px] text-destructive">{c.typeError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="clients" className="mb-2 block text-sm font-semibold">
                      {c.clientsLabel} <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-primary" />
                      <Select
                        id="clients"
                        value={clients}
                        aria-invalid={errors.clients}
                        className="pl-9"
                        onChange={(e) => {
                          setClients(e.target.value);
                          if (e.target.value) setErrors((p) => ({ ...p, clients: false }));
                        }}
                      >
                        <option value="" disabled>
                          {c.clientsPlaceholder}
                        </option>
                        {c.clientsOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                    {errors.clients && (
                      <p className="mt-1.5 text-[13px] text-destructive">{c.clientsError}</p>
                    )}
                  </div>
                </div>

                <fieldset className="mt-4">
                  <legend className="mb-2 block text-sm font-semibold">
                    {c.toolsLabel} <span className="text-primary">*</span>
                  </legend>
                  <p className="mb-2.5 text-[13px] text-muted-foreground">{c.toolsHint}</p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {c.toolsOptions.map((o) => {
                      const checked = tools.includes(o.value);
                      const ToolIcon = TOOL_ICONS[o.value];
                      return (
                        <label
                          key={o.value}
                          className={cn(
                            'flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors',
                            checked
                              ? 'border-primary text-foreground'
                              : 'border-border hover:bg-accent',
                          )}
                        >
                          <input
                            type="checkbox"
                            className="size-4 shrink-0 accent-primary"
                            checked={checked}
                            onChange={() => toggleTool(o.value)}
                          />
                          {ToolIcon && <ToolIcon className="size-4 shrink-0 text-primary" />}
                          {o.label}
                        </label>
                      );
                    })}
                  </div>
                  {tools.includes('other-app') && (
                    <div className="relative mt-2.5">
                      <LayoutGrid className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
                      <Input
                        type="text"
                        aria-label={c.toolsOtherPlaceholder}
                        placeholder={c.toolsOtherPlaceholder}
                        value={otherTool}
                        className="pl-9"
                        onChange={(e) => setOtherTool(e.target.value)}
                      />
                    </div>
                  )}
                  {errors.tools && (
                    <p className="mt-1.5 text-[13px] text-destructive">{c.toolsError}</p>
                  )}
                </fieldset>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact" className="mb-2 block text-sm font-semibold">
                      {c.contactLabel}{' '}
                      <span className="font-normal text-muted-foreground">{c.contactOptional}</span>
                    </label>
                    <div className="relative">
                      <AtSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
                      <Input
                        id="contact"
                        type="text"
                        placeholder={c.contactPlaceholder}
                        value={contact}
                        className="pl-9"
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="call" className="mb-2 block text-sm font-semibold">
                      {c.callLabel}{' '}
                      <span className="font-normal text-muted-foreground">{c.callOptional}</span>
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-primary" />
                      <Select
                        id="call"
                        value={call}
                        className="pl-9"
                        onChange={(e) => setCall(e.target.value)}
                      >
                        <option value="" disabled>
                          {c.callPlaceholder}
                        </option>
                        {c.callOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mt-4 mb-5">
                  <label htmlFor="pain" className="mb-2 block text-sm font-semibold">
                    {c.painLabel}{' '}
                    <span className="font-normal text-muted-foreground">{c.painOptional}</span>
                  </label>
                  <div className="relative">
                    <PenLine className="pointer-events-none absolute left-3 top-3 size-4 text-primary" />
                    <Textarea
                      id="pain"
                      placeholder={c.painPlaceholder}
                      value={pain}
                      className="pl-9"
                      onChange={(e) => setPain(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full shadow-lg shadow-primary/30"
                >
                  {submitting ? (
                    c.submitting
                  ) : (
                    <>
                      {c.submit}
                      <ArrowRight className="size-5" aria-hidden />
                    </>
                  )}
                </Button>
              </form>
              </Reveal>
              <p className="mt-5 flex items-center justify-center gap-2 text-[13px] text-muted-foreground">
                <Lock className="size-3.5" aria-hidden />
                {c.trust}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

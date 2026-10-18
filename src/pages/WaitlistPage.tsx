import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowLeft, ArrowRight, AtSign, Brain, Calendar, Check, FileSpreadsheet, FileText, LayoutGrid, Lock, Mail,
  MessageCircle, NotebookPen, PenLine, Send, User, type LucideIcon,
} from 'lucide-react';
import { ChoiceChip, PublicFormField } from '@/components/public/PublicFormField';
import { PublicContainer, PublicPageLayout } from '@/components/public/PublicPageLayout';
import { PublicPageHero } from '@/components/public/PublicPageHero';
import { Button, ButtonLink } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/i18n';
import { links, routes } from '@/lib/links';
import { cn } from '@/lib/utils';

/* Backend REAL já existente: Google Apps Script que guarda a candidatura, deduplica por email e envia notificação.
   Alternativa: FormSubmit. Nenhum sucesso é simulado — só se mostra "enviado" quando o servidor o confirma. */
const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwGMUjr4eGLLVt87wo3ckK2Hq2IaMSMon8aDDRf43raM7Tpk1OGzbSnVizqjKJt0RCejQ/exec';
const LEAD_ENDPOINT = 'https://formsubmit.co/ajax/08e2017df2585087c21f2046e3f31609';

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

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

interface Values {
  name: string;
  email: string;
  ptType: string;
  clients: string;
  tools: string[];
  otherTool: string;
  contact: string;
  call: string;
  pain: string;
}
const empty: Values = { name: '', email: '', ptType: '', clients: '', tools: [], otherTool: '', contact: '', call: '', pain: '' };

const STEPS = ['Informações iniciais', 'O teu trabalho', 'Detalhes adicionais', 'Revisão e envio'] as const;

const pitch = ['Grupo pequeno de PTs na primeira versão', 'Sem cartão e sem spam', 'Falas diretamente com a equipa'];

export function WaitlistPage() {
  const { t, locale } = useI18n();
  const c = t.cta;

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  const [v, setV] = useState<Values>(empty);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [done, setDone] = useState<'ok' | 'duplicate' | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setV((p) => ({ ...p, [k]: val }));
  const touch = (...k: string[]) => setTouched((p) => ({ ...p, ...Object.fromEntries(k.map((x) => [x, true])) }));

  const errors: Record<string, string> = {
    name: v.name.trim() ? '' : c.nameError,
    email: isValidEmail(v.email) ? '' : c.emailError,
    ptType: v.ptType ? '' : c.typeError,
    clients: v.clients ? '' : c.clientsError,
    tools: v.tools.length ? '' : c.toolsError,
  };
  const stepFields: string[][] = [['name', 'email'], ['ptType', 'clients', 'tools'], [], []];
  const err = (k: string) => (touched[k] ? errors[k] : '');
  const stepValid = (s: number) => stepFields[s].every((k) => !errors[k]);

  // Foco no título do passo para leitores de ecrã e teclado (exceto na primeira apresentação).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const goTo = (n: number) => {
    setDir(n > step ? 'fwd' : 'back');
    setStep(n);
  };

  const next = (e?: FormEvent) => {
    e?.preventDefault();
    if (step < 3) {
      if (!stepValid(step)) {
        touch(...stepFields[step]);
        document.querySelector<HTMLElement>('[aria-invalid="true"], fieldset[data-invalid="true"] input')?.focus();
        return;
      }
      goTo(step + 1);
      return;
    }
    void submit();
  };

  async function submit() {
    // A revisão só avança com os obrigatórios válidos; se faltar algum, volta ao passo certo.
    const bad = [0, 1].find((s) => !stepValid(s));
    if (bad !== undefined) {
      touch(...stepFields[bad]);
      goTo(bad);
      return;
    }
    const toolsStr = v.tools.map((x) => (x === 'other-app' && v.otherTool.trim() ? `Outra app (${v.otherTool.trim()})` : x)).join(', ');
    const confirmBody = `${c.successBody}\n\n${c.successPs}`;
    setSubmitting(true);
    setSubmitError(false);
    try {
      if (SHEET_ENDPOINT) {
        const res = await fetch(SHEET_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            name: v.name.trim(),
            email: v.email.trim(),
            ptType: v.ptType,
            clients: v.clients,
            tools: toolsStr,
            contact: v.contact.trim(),
            call: v.call,
            pain: v.pain.trim(),
            locale,
            confirmSubject: c.successTitle,
            confirmBody,
          }),
        });
        const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
        if (result?.error === 'duplicate') return setDone('duplicate');
        if (!result?.ok) throw new Error('Sheet endpoint error');
        setDone('ok');
      } else {
        const res = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: 'Nova candidatura — FitGram beta',
            _template: 'table',
            email: v.email.trim(),
            _replyto: v.email.trim(),
            _autoresponse: confirmBody,
            Nome: v.name.trim(),
            'Tipo de PT': v.ptType,
            'Nº de clientes': v.clients,
            Ferramentas: toolsStr,
            Contacto: v.contact.trim() || '—',
            'Call rápida': v.call || '—',
            'Tarefa que faz perder tempo': v.pain.trim() || '—',
            Idioma: locale,
            Origem: 'landing-page',
          }),
        });
        const result = (await res.json().catch(() => null)) as { success?: string } | null;
        if (!res.ok || result?.success === 'false') throw new Error(`Lead endpoint ${res.status}`);
        setDone('ok');
      }
    } catch {
      setSubmitError(true); // os dados ficam preenchidos: o utilizador pode tentar de novo
    } finally {
      setSubmitting(false);
    }
  }

  const label = (opts: { value: string; label: string }[], val: string) => opts.find((o) => o.value === val)?.label ?? '—';
  const toolLabels = v.tools.map((x) => label(c.toolsOptions, x)).join(', ');

  return (
    <PublicPageLayout title="Candidatura à beta" description="Candidata-te à beta do FitGram: conta-nos como trabalhas hoje.">
      <PublicPageHero eyebrow="Beta fechada" title={<>Candidata-te à beta do <span className="text-primary">FitGram.</span></>} lead={c.lead} />

      <section className="py-16 md:py-20">
        <PublicContainer>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28">
              <ul className="flex flex-col gap-3">
                {pitch.map((line) => (
                  <li key={line} className="flex items-center gap-3 text-[15px] font-medium">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" strokeWidth={3} aria-hidden />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-center gap-2 text-[13px] text-muted-foreground">
                <Lock className="size-3.5 shrink-0" aria-hidden />
                {c.trust}
              </p>
            </aside>

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              {done ? (
                <div className="step-in px-6 py-14 text-center sm:px-12">
                  <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-success/15 text-success">
                    <Check className="size-8" strokeWidth={3} aria-hidden />
                  </div>
                  <h2 ref={headingRef} tabIndex={-1} className="mb-2.5 text-2xl font-bold outline-none">
                    {done === 'duplicate' ? c.dupTitle : c.successTitle}
                  </h2>
                  <p className="mx-auto max-w-md text-[15px] leading-relaxed text-muted-foreground">{done === 'duplicate' ? c.dupBody : c.successBody}</p>
                  {done === 'ok' && <p className="mx-auto mt-4 max-w-md border-t border-border pt-4 text-[15px] text-muted-foreground">{c.successPs}</p>}
                  <ButtonLink href={routes.home} variant="outline" size="lg" className="mt-8">
                    Voltar ao início
                  </ButtonLink>
                </div>
              ) : (
                <form onSubmit={next} noValidate>
                  {/* Progresso */}
                  <div className="border-b border-border px-6 pb-5 pt-6 sm:px-10">
                    <div className="flex items-baseline justify-between text-sm">
                      <p className="font-semibold">
                        Passo {step + 1} de {STEPS.length}
                      </p>
                      <p className="text-muted-foreground">{STEPS[step]}</p>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1} aria-label="Progresso da candidatura">
                      {STEPS.map((s, i) => (
                        <span key={s} className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <span className={cn('block h-full origin-left rounded-full bg-primary transition-transform duration-300 ease-out', i <= step ? 'scale-x-100' : 'scale-x-0')} />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 py-8 sm:px-10">
                    <div key={step} className={dir === 'fwd' ? 'step-in' : 'step-in-back'}>
                      <h2 ref={headingRef} tabIndex={-1} className="mb-6 text-xl font-bold tracking-tight outline-none">
                        {STEPS[step]}
                      </h2>

                      {step === 0 && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <PublicFormField id="name" label={c.nameLabel} required error={err('name')} valid={!!v.name.trim()}>
                            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                            <Input
                              id="name"
                              autoComplete="name"
                              placeholder={c.namePlaceholder}
                              value={v.name}
                              aria-invalid={!!err('name')}
                              aria-describedby={err('name') ? 'name-error' : undefined}
                              className="pl-10 pr-10"
                              onChange={(e) => set('name', e.target.value)}
                              onBlur={() => touch('name')}
                            />
                          </PublicFormField>
                          <PublicFormField id="email" label={c.emailLabel} required error={err('email')} valid={isValidEmail(v.email)}>
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                            <Input
                              id="email"
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              placeholder={c.emailPlaceholder}
                              value={v.email}
                              aria-invalid={!!err('email')}
                              aria-describedby={err('email') ? 'email-error' : undefined}
                              className="pl-10 pr-10"
                              onChange={(e) => set('email', e.target.value)}
                              onBlur={() => touch('email')}
                            />
                          </PublicFormField>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="grid gap-7">
                          <fieldset data-invalid={!!err('ptType')}>
                            <legend className="mb-2 text-sm font-semibold">
                              {c.typeLabel} <span className="text-primary">*</span>
                            </legend>
                            <div className="grid gap-2.5 sm:grid-cols-3">
                              {c.typeOptions.map((o) => (
                                <ChoiceChip key={o.value} type="radio" name="ptType" value={o.value} checked={v.ptType === o.value} onChange={() => { set('ptType', o.value); touch('ptType'); }}>
                                  {o.label}
                                </ChoiceChip>
                              ))}
                            </div>
                            {err('ptType') && <p role="alert" className="mt-2 text-[13px] font-medium text-destructive">{err('ptType')}</p>}
                          </fieldset>

                          <fieldset data-invalid={!!err('clients')}>
                            <legend className="mb-2 text-sm font-semibold">
                              {c.clientsLabel} <span className="text-primary">*</span>
                            </legend>
                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                              {c.clientsOptions.map((o) => (
                                <ChoiceChip key={o.value} type="radio" name="clients" value={o.value} checked={v.clients === o.value} onChange={() => { set('clients', o.value); touch('clients'); }}>
                                  {o.label}
                                </ChoiceChip>
                              ))}
                            </div>
                            {err('clients') && <p role="alert" className="mt-2 text-[13px] font-medium text-destructive">{err('clients')}</p>}
                          </fieldset>

                          <fieldset data-invalid={!!err('tools')}>
                            <legend className="mb-1 text-sm font-semibold">
                              {c.toolsLabel} <span className="text-primary">*</span>
                            </legend>
                            <p className="mb-2.5 text-[13px] text-muted-foreground">{c.toolsHint}</p>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                              {c.toolsOptions.map((o) => {
                                const Icon = TOOL_ICONS[o.value];
                                const on = v.tools.includes(o.value);
                                return (
                                  <ChoiceChip
                                    key={o.value}
                                    type="checkbox"
                                    name="tools"
                                    value={o.value}
                                    checked={on}
                                    icon={Icon && <Icon className="size-4 shrink-0 text-primary" aria-hidden />}
                                    onChange={() => {
                                      set('tools', on ? v.tools.filter((x) => x !== o.value) : [...v.tools, o.value]);
                                      touch('tools');
                                    }}
                                  >
                                    {o.label}
                                  </ChoiceChip>
                                );
                              })}
                            </div>
                            {v.tools.includes('other-app') && (
                              <Input aria-label={c.toolsOtherPlaceholder} placeholder={c.toolsOtherPlaceholder} value={v.otherTool} className="mt-3" onChange={(e) => set('otherTool', e.target.value)} />
                            )}
                            {err('tools') && <p role="alert" className="mt-2 text-[13px] font-medium text-destructive">{err('tools')}</p>}
                          </fieldset>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="grid gap-5">
                          <PublicFormField id="contact" label={c.contactLabel} optional hint="Só o usamos para falar contigo sobre a beta.">
                            <AtSign className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                            <Input id="contact" aria-describedby="contact-hint" placeholder={c.contactPlaceholder} value={v.contact} className="pl-10" onChange={(e) => set('contact', e.target.value)} />
                          </PublicFormField>
                          <fieldset>
                            <legend className="mb-2 text-sm font-semibold">
                              {c.callLabel} <span className="text-xs font-normal text-muted-foreground">(opcional)</span>
                            </legend>
                            <div className="grid gap-2.5 sm:grid-cols-3">
                              {c.callOptions.map((o) => (
                                <ChoiceChip key={o.value} type="radio" name="call" value={o.value} checked={v.call === o.value} onChange={() => set('call', o.value)}>
                                  {o.label}
                                </ChoiceChip>
                              ))}
                            </div>
                          </fieldset>
                          <PublicFormField id="pain" label={c.painLabel} optional>
                            <PenLine className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground" aria-hidden />
                            <Textarea id="pain" placeholder={c.painPlaceholder} value={v.pain} className="pl-10" onChange={(e) => set('pain', e.target.value)} />
                          </PublicFormField>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <dl className="divide-y divide-border rounded-2xl border border-border">
                            {[
                              { l: c.nameLabel, val: v.name, s: 0 },
                              { l: c.emailLabel, val: v.email, s: 0 },
                              { l: c.typeLabel, val: label(c.typeOptions, v.ptType), s: 1 },
                              { l: c.clientsLabel, val: label(c.clientsOptions, v.clients), s: 1 },
                              { l: c.toolsLabel, val: (toolLabels || '—') + (v.tools.includes('other-app') && v.otherTool.trim() ? ` (${v.otherTool.trim()})` : ''), s: 1 },
                              { l: c.contactLabel, val: v.contact || '—', s: 2 },
                              { l: c.callLabel, val: label(c.callOptions, v.call), s: 2 },
                              { l: c.painLabel, val: v.pain || '—', s: 2 },
                            ].map((r) => (
                              <div key={r.l} className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_1fr_auto] sm:items-baseline sm:gap-4">
                                <dt className="text-[13px] text-muted-foreground">{r.l}</dt>
                                <dd className="break-words text-[15px] font-medium">{r.val}</dd>
                                <button type="button" onClick={() => goTo(r.s)} className="justify-self-start rounded-md text-[13px] font-semibold text-primary outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:justify-self-end">
                                  Editar
                                </button>
                              </div>
                            ))}
                          </dl>
                          {submitError && (
                            <div role="alert" className="mt-5 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                              <p className="font-semibold">Não foi possível enviar a candidatura.</p>
                              <p className="mt-1 text-[13px]">
                                Os teus dados continuam aqui — tenta novamente ou escreve-nos para{' '}
                                <a className="underline" href={links.contact}>
                                  fitgrampt@gmail.com
                                </a>
                                .
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-border bg-secondary/40 px-6 py-4 sm:px-10">
                    <Button type="button" variant="ghost" onClick={() => goTo(step - 1)} className={cn(step === 0 && 'invisible')} disabled={submitting}>
                      <ArrowLeft className="size-4" aria-hidden />
                      Voltar
                    </Button>
                    <Button type="submit" size="lg" loading={submitting}>
                      {step < 3 ? (
                        <>
                          Seguinte
                          <ArrowRight className="size-5" aria-hidden />
                        </>
                      ) : submitting ? (
                        c.submitting
                      ) : (
                        <>
                          {submitError ? 'Tentar novamente' : 'Enviar candidatura'}
                          <Send className="size-4" aria-hidden />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </PublicContainer>
      </section>
    </PublicPageLayout>
  );
}

import type { ReactNode } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublicFormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  /** Mostra o indicador de confirmação quando o valor é válido. */
  valid?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Campo de formulário comum a todas as páginas públicas: etiqueta clara, texto de ajuda,
 * erro exato (ligado por aria-describedby) e confirmação discreta quando válido.
 */
export function PublicFormField({ id, label, required, optional, hint, error, valid, children, className }: PublicFormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-1.5 text-sm font-semibold">
        {label}
        {required && (
          <span className="text-primary" aria-hidden>
            *
          </span>
        )}
        {optional && <span className="text-xs font-normal text-muted-foreground">(opcional)</span>}
      </label>
      <div className="relative">
        {children}
        <span
          className={cn(
            'pointer-events-none absolute right-3.5 top-3.5 grid size-5 place-items-center rounded-full bg-success/15 text-success transition-[opacity,transform] duration-200',
            valid && !error ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
          )}
          aria-hidden
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted-foreground">
          {hint}
        </p>
      )}
      <div className={cn('grid transition-[grid-template-rows,opacity] duration-200 ease-out', error ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
        <p id={`${id}-error`} role={error ? 'alert' : undefined} className="flex items-start gap-1.5 overflow-hidden text-[13px] font-medium text-destructive">
          {error && <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden />}
          <span className="pt-1.5">{error}</span>
        </p>
      </div>
    </div>
  );
}

/** Opção de escolha (rádio ou caixa) com o mesmo aspeto em todos os formulários. */
export function ChoiceChip({ type, name, value, checked, onChange, children, icon }: { type: 'radio' | 'checkbox'; name: string; value: string; checked: boolean; onChange: () => void; children: ReactNode; icon?: ReactNode }) {
  return (
    <label
      className={cn(
        'relative flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-xl border bg-card px-4 py-2.5 text-sm font-medium transition-[border-color,background-color,transform] duration-150 active:scale-[0.98]',
        'has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50',
        checked ? 'border-primary bg-primary/[0.07]' : 'border-input hover:border-foreground/25',
      )}
    >
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          'grid size-5 shrink-0 place-items-center border transition-colors duration-150',
          type === 'radio' ? 'rounded-full' : 'rounded-md',
          checked ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background',
        )}
        aria-hidden
      >
        <Check className={cn('size-3 transition-transform duration-150', checked ? 'scale-100' : 'scale-0')} strokeWidth={3.5} />
      </span>
      {icon}
      <span>{children}</span>
    </label>
  );
}

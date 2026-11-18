import { pt, type Dict } from './locales/pt';
import { en } from './locales/en';
import { es } from './locales/es';
import { it } from './locales/it';
import { fr } from './locales/fr';
import { de } from './locales/de';

export type Locale = 'pt' | 'en' | 'es' | 'it' | 'fr' | 'de';
export type Messages = Dict;

/** Nome de cada língua na própria língua (assim qualquer pessoa encontra a sua). */
export const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

export const messages: Record<Locale, Dict> = { pt, en, es, it, fr, de };

export function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && v in messages;
}

/** Substitui `{chave}` pelos valores dados. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

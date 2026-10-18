import * as React from 'react';

/** «GET /billing/pricing» of the FitGram API (the single source of the numbers). */
export interface PricingData {
  enabled: boolean;
  currency: string;
  free: { slug: string; maxTrainees: number };
  pro: {
    slug: string;
    name: string;
    maxTrainees: number | null;
    monthlyCents: number;
    yearlyCents: number;
  };
}

/** Set VITE_API_URL (e.g. https://api.fitgram.app/api/v1). Unset → no pricing section. */
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '');

let cached: Promise<PricingData | null> | null = null;

function load(): Promise<PricingData | null> {
  if (!API_URL) return Promise.resolve(null);
  cached ??= fetch(`${API_URL}/billing/pricing`)
    .then((r) => (r.ok ? (r.json() as Promise<PricingData>) : null))
    .catch(() => null);
  return cached;
}

/**
 * The simple-pricing numbers, or null while loading, when the API is
 * unreachable, or when `simple_pricing_enabled` is off — in all three cases
 * the landing page simply shows no pricing.
 */
export function usePricingState(): { status: 'loading' | 'unavailable' | 'ready'; data: PricingData | null } {
  const [state, setState] = React.useState<{ status: 'loading' | 'unavailable' | 'ready'; data: PricingData | null }>({
    status: API_URL ? 'loading' : 'unavailable',
    data: null,
  });
  React.useEffect(() => {
    let alive = true;
    load().then((d) => alive && setState(d?.enabled ? { status: 'ready', data: d } : { status: 'unavailable', data: null }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

export function usePricing(): PricingData | null {
  return usePricingState().data;
}

export function formatPrice(cents: number, currency: string, locale: string): string {
  const tag = locale === 'pt' ? 'pt-PT' : locale === 'es' ? 'es-ES' : 'en-IE';
  return new Intl.NumberFormat(tag, {
    style: 'currency',
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

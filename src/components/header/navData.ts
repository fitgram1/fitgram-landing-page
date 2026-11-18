import {
  Dumbbell, ClipboardList, Layers, TrendingUp, Utensils, ChefHat, Scale, FileText, Camera, Ruler,
  Users, MessageCircle, Calendar, Timer, type LucideIcon,
} from 'lucide-react';
import { routes } from '@/lib/links';
import type { Messages } from '@/i18n/translations';

export interface MegaItem {
  label: string;
  hint: string;
  to: string;
  icon: LucideIcon;
}
export interface MegaCategory {
  key: string;
  title: string;
  blurb: string;
  items: MegaItem[];
}

/**
 * Só aparecem funcionalidades que o produto tem (ver secção «Por dentro» e a história).
 * Cada destino é uma cena real da página inicial ou uma página pública existente.
 */
/** Ícones e destinos (fixos); os textos vêm do dicionário da língua ativa, pela mesma ordem. */
const MEGA: { key: string; items: { to: string; icon: LucideIcon }[] }[] = [
  { key: 'treino', items: [
    { to: '/#treinadores', icon: ClipboardList }, { to: '/#modalidades', icon: Layers }, { to: '/#atletas', icon: Timer }, { to: '/#progresso', icon: TrendingUp } ] },
  { key: 'nutricao', items: [
    { to: '/#nutricao', icon: Utensils }, { to: '/#nutricao', icon: Scale }, { to: '/#nutricao', icon: ChefHat } ] },
  { key: 'acompanhamento', items: [
    { to: '/#progresso', icon: FileText }, { to: '/#progresso', icon: Camera }, { to: '/#progresso', icon: Ruler } ] },
  { key: 'gestao', items: [
    { to: '/#treinadores', icon: Users }, { to: '/#treinadores', icon: MessageCircle }, { to: '/#treinadores', icon: Calendar } ] },
];

export function getMegaCategories(t: Messages): MegaCategory[] {
  return MEGA.map((c, i) => {
    const tc = t.nav.categories[i];
    return {
      key: c.key,
      title: tc.title,
      blurb: tc.blurb,
      items: c.items.map((it, j) => ({ ...it, label: tc.items[j].label, hint: tc.items[j].hint })),
    };
  });
}

export interface NavItem {
  key: string;
  label: string;
  to?: string;
  mega?: boolean;
  icon?: LucideIcon;
}

export function getNavItems(t: Messages): NavItem[] {
  return [
    { key: 'funcionalidades', label: t.nav.features, mega: true, icon: Dumbbell },
    { key: 'modalidades', label: t.nav.sports, to: '/#modalidades' },
    { key: 'precos', label: t.nav.pricing, to: '/#precos' },
    { key: 'faq', label: t.nav.faq, to: routes.faq },
  ];
}

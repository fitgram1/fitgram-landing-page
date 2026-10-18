import {
  Dumbbell, ClipboardList, Layers, TrendingUp, Utensils, ChefHat, Scale, FileText, Camera, Ruler,
  Users, MessageCircle, Calendar, CreditCard, Timer, type LucideIcon,
} from 'lucide-react';
import { routes } from '@/lib/links';

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
export const megaCategories: MegaCategory[] = [
  {
    key: 'treino',
    title: 'Treino',
    blurb: 'Do plano ao registo de cada série: o treino ganha forma e o histórico fica guardado.',
    items: [
      { label: 'Planos de treino', hint: 'Séries, repetições e progressões', to: '/#treinadores', icon: ClipboardList },
      { label: 'Formatos e modalidades', hint: 'Força, corrida, AMRAP, EMOM, HYROX', to: '/#modalidades', icon: Layers },
      { label: 'Registo de sessões', hint: 'Cargas anteriores à vista', to: '/#atletas', icon: Timer },
      { label: 'Histórico e evolução', hint: 'Cargas e recordes num gráfico', to: '/#progresso', icon: TrendingUp },
    ],
  },
  {
    key: 'nutricao',
    title: 'Nutrição',
    blurb: 'Plano alimentar, refeições, receitas e macros no mesmo sítio.',
    items: [
      { label: 'Planos alimentares', hint: 'Macros e porções', to: '/#nutricao', icon: Utensils },
      { label: 'Refeições e macros', hint: 'Calorias, proteína, hidratos, gordura', to: '/#nutricao', icon: Scale },
      { label: 'Receitas', hint: 'Junto do plano', to: '/#nutricao', icon: ChefHat },
    ],
  },
  {
    key: 'acompanhamento',
    title: 'Acompanhamento',
    blurb: 'Os atletas enviam formulários, fotografias e métricas; tudo cai no perfil.',
    items: [
      { label: 'Formulários de check-in', hint: 'Enviados pelos atletas', to: '/#progresso', icon: FileText },
      { label: 'Fotografias de progresso', hint: 'No perfil do atleta', to: '/#progresso', icon: Camera },
      { label: 'Métricas corporais', hint: 'Evolução ao longo do tempo', to: '/#progresso', icon: Ruler },
    ],
  },
  {
    key: 'gestao',
    title: 'Gestão',
    blurb: 'Para treinadores: clientes, conversas e planos num único sistema.',
    items: [
      { label: 'Atletas e planos', hint: 'Contexto, objetivos e histórico', to: '/#treinadores', icon: Users },
      { label: 'Conversas', hint: 'Tudo num só lugar', to: '/#treinadores', icon: MessageCircle },
      { label: 'Agenda', hint: 'Sessões e compromissos', to: '/#treinadores', icon: Calendar },
      { label: 'Planos e preços', hint: 'Escalões do FitGram', to: routes.pricing, icon: CreditCard },
    ],
  },
];

export interface NavItem {
  key: string;
  label: string;
  to?: string;
  mega?: boolean;
  icon?: LucideIcon;
}

export const navItems: NavItem[] = [
  { key: 'funcionalidades', label: 'Funcionalidades', mega: true, icon: Dumbbell },
  { key: 'treinadores', label: 'Para treinadores', to: '/#treinadores' },
  { key: 'atletas', label: 'Para atletas', to: '/#atletas' },
  { key: 'modalidades', label: 'Modalidades', to: '/#modalidades' },
  { key: 'planos', label: 'Planos', to: routes.pricing },
  { key: 'faq', label: 'Perguntas frequentes', to: routes.faq },
];

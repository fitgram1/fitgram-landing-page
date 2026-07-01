import { View } from 'react-native';
import {
  MessageCircle,
  FileText,
  Clock,
  User,
  FileSpreadsheet,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/Reveal';
import { useI18n } from '@/i18n';

// Icons + orbital positions (% of the square container) for each solution node,
// in the same order as t.solution.nodes.
const NODE_ICONS: LucideIcon[] = [MessageCircle, FileText, Clock, User, FileSpreadsheet];
const NODE_POS = [
  { x: 28, y: 15 }, // conversations (top-left)
  { x: 72, y: 15 }, // plans (top-right)
  { x: 86, y: 52 }, // schedule (right)
  { x: 50, y: 82 }, // clients (bottom)
  { x: 14, y: 52 }, // documents (left)
];

export function Solution() {
  const { t } = useI18n();

  return (
    <section id="solution" className="relative overflow-hidden py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_78%_45%,hsl(25_95%_50%/0.08),transparent_60%)]"
        aria-hidden
      />

      <View className="container">
        <View className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <View>
            <Reveal>
              <Badge className="mb-5 self-start rounded-md px-4 py-1.5 text-sm">
                {t.solution.eyebrow}
              </Badge>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[clamp(30px,4.6vw,52px)] font-extrabold leading-[1.05] tracking-tight">
                {t.solution.headPre}
                <span className="text-primary">{t.solution.headHl}</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-md text-[clamp(15px,1.6vw,18px)] leading-relaxed text-muted-foreground">
                {t.solution.lead}
              </p>
            </Reveal>
          </View>

          {/* Orbital diagram (lg+) */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-xl lg:block" aria-hidden>
            {/* soft central glow (kept subtle) */}
            <div className="animate-glow-pulse pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[60px]" />

            {/* connectors from the centre to each node */}
            <svg
              className="absolute inset-0 h-full w-full text-primary/25"
              viewBox="0 0 100 100"
              fill="none"
              preserveAspectRatio="none"
            >
              {NODE_POS.map((p, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                  strokeDasharray="1 2.5"
                  className="animate-dash"
                />
              ))}
            </svg>

            {/* central FitGram mark */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary px-5 py-3 shadow-lg shadow-primary/25">
              <span className="text-xl font-extrabold tracking-tight text-primary-foreground">
                FitGram
              </span>
            </div>

            {/* nodes */}
            {t.solution.nodes.map((node, i) => {
              const Icon = NODE_ICONS[i];
              const p = NODE_POS[i];
              return (
                <div
                  key={node.title}
                  className="group absolute w-44 -translate-x-1/2 text-center"
                  style={{ left: `${p.x}%`, top: `calc(${p.y}% - 28px)` }}
                >
                  <View className="mx-auto mb-2.5 grid size-14 place-items-center rounded-2xl border border-primary/15 bg-card text-primary shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon className="size-6" />
                  </View>
                  <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                    {node.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{node.body}</p>
                </div>
              );
            })}
          </div>

          {/* Fallback grid (below lg) */}
          <View className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:hidden">
            {t.solution.nodes.map((node, i) => {
              const Icon = NODE_ICONS[i];
              return (
                <Reveal key={node.title} delay={i * 80} className="group text-center">
                  <View className="mx-auto mb-3 grid size-14 place-items-center rounded-2xl border border-primary/15 bg-card text-primary shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon className="size-6" />
                  </View>
                  <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                    {node.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{node.body}</p>
                </Reveal>
              );
            })}
          </View>
        </View>
      </View>
    </section>
  );
}
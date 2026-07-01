import { View } from "react-native";
import {
  MessageCircle,
  FileText,
  UserSearch,
  Clock,
  User,
  FileSpreadsheet,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

const CARD_ICONS: LucideIcon[] = [MessageCircle, FileText, UserSearch, Clock];

const DIAGRAM_VB = { w: 520, h: 320 };
const DIAGRAM_TILES: {
  icon: LucideIcon;
  cx: number;
  cy: number;
  center?: boolean;
}[] = [
  { icon: MessageCircle, cx: 140, cy: 70 },
  { icon: FileText, cx: 380, cy: 70 },
  { icon: User, cx: 260, cy: 160, center: true },
  { icon: FileSpreadsheet, cx: 120, cy: 250 },
  { icon: Clock, cx: 400, cy: 240 },
];
const DIAGRAM_LINKS = [
  // outer connections — wavy S-curves rather than a round ring
  "M140 70 C220 132 300 8 380 70", // whatsapp → pdf
  "M380 70 C462 120 318 192 400 240", // pdf → clock
  "M400 240 C320 302 200 186 120 250", // clock → excel
  "M120 250 C38 190 202 128 140 70", // excel → whatsapp
  // spokes to the centre
  "M260 160 C220 130 175 105 140 70", // person → whatsapp
  "M260 160 C305 130 345 105 380 70", // person → pdf
  "M260 160 C215 190 170 220 120 250", // person → excel
  "M260 160 C310 190 350 215 400 240", // person → clock
];

export function Problem() {
  const { t } = useI18n();

  return (
    <section id="problem" className="relative overflow-hidden py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-secondary/40 dark:bg-background"
        aria-hidden
      />
      <div
        className="bg-hero-mesh pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_88%_30%,hsl(25_95%_50%/0.12),transparent_60%)]"
        aria-hidden
      />

      <View className="container">
        <View className="grid items-center gap-12 md:grid-cols-2">
          <View>
            <Reveal>
              <Badge className="mb-5 rounded-md self-start px-4 py-1.5 text-sm">
                {t.problem.eyebrow}
              </Badge>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[clamp(30px,4.6vw,52px)] font-extrabold leading-[1.05] tracking-tight">
                {t.problem.headPre}
                <span className="text-primary">{t.problem.headHl}</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-md text-[clamp(15px,1.6vw,18px)] leading-relaxed text-muted-foreground">
                {t.problem.sub}
              </p>
            </Reveal>
          </View>

          <div
            className="relative mx-auto hidden aspect-[13/8] w-full max-w-md md:order-first md:block"
            aria-hidden
          >
            <div className="animate-glow-pulse pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${DIAGRAM_VB.w} ${DIAGRAM_VB.h}`}
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGradient">
                  <stop offset="0%" stopColor="#ff7a00" stopOpacity=".15" />
                  <stop offset="50%" stopColor="#ff7a00" />
                  <stop offset="100%" stopColor="#ff7a00" stopOpacity=".15" />
                </linearGradient>
              </defs>
              {DIAGRAM_LINKS.map((d) => (
                <path
                  key={d}
                  d={d}
                  stroke="url(#lineGradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="3 8"
                  className="animate-dash"
                />
              ))}
            </svg>

            {DIAGRAM_TILES.map(({ icon: Icon, cx, cy, center }, i) => (
              <div
                key={i}
                className={cn(
                  "absolute grid aspect-square w-[16%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl border border-primary/10 bg-card/80 text-primary shadow-xl shadow-primary/10 backdrop-blur-xl dark:border-white/[0.08] dark:shadow-black/40",
                  center &&
                    "scale-110 border-primary/40 shadow-[0_0_40px_rgba(255,120,0,0.18)]",
                )}
                style={{
                  left: `${(cx / DIAGRAM_VB.w) * 100}%`,
                  top: `${(cy / DIAGRAM_VB.h) * 100}%`,
                }}
              >
                <Icon className="size-[45%]" strokeWidth={2} />
              </div>
            ))}
          </div>
        </View>

        <View className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.problem.cards.map((card, i) => {
            const Icon = CARD_ICONS[i];
            return (
              <Reveal key={card.title} delay={i * 100} className="h-full">
                <Card className="h-full border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-black/30">
                  <CardContent className="flex h-full flex-col items-center p-6 text-center">
                    <View className="grid size-12 place-items-center rounded-md text-primary">
                      <Icon className="size-6" />
                    </View>
                    <h3 className="mt-5 text-[17px] font-bold leading-snug tracking-tight">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                    <View className="mt-auto pt-6">
                      <View className="h-1 w-10 rounded-full bg-primary" />
                    </View>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </View>
      </View>
    </section>
  );
}

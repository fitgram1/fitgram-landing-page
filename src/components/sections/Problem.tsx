import { MessageSquare, LayoutGrid, BellOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n';

const ICONS = [MessageSquare, LayoutGrid, BellOff];

export function Problem() {
  const { t } = useI18n();
  return (
    <section id="problem" className="bg-secondary/40 py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4">{t.problem.eyebrow}</Badge>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight">
            {t.problem.heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.problem.lead}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.problem.pains.map((pain, i) => {
            const Icon = ICONS[i];
            return (
              <Card key={pain.title} className="transition-transform hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-7">
                  <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight">{pain.title}</h3>
                  <p className="text-[15px] text-muted-foreground">{pain.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-[clamp(18px,2.4vw,24px)] font-semibold leading-snug">
          {t.problem.closePre}
          <span className="text-primary">{t.problem.closeHl}</span>
          {t.problem.closePost}
        </p>
      </div>
    </section>
  );
}

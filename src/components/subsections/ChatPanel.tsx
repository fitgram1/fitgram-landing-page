import { Phone, Video, MoreHorizontal, Plus, Send } from "lucide-react";

export function ChatPanel() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">
          JM
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">
            João Marques
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Online
          </div>
        </div>
        <div className="flex items-center gap-3.5 text-muted-foreground">
          <Phone className="size-4" />
          <Video className="size-4" />
          <MoreHorizontal className="size-4" />
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="max-w-[82%]">
          <div className="rounded-2xl rounded-bl-sm border border-border bg-background px-3.5 py-2.5 text-sm text-foreground">
            Coach, devo aumentar o peso no agachamento esta semana? 🏋️
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">10:32</div>
        </div>
        <div className="ml-auto max-w-[82%]">
          <div className="rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
            Sim! Aumenta 2.5kg e mantém o foco na técnica. 💪
          </div>
          <div className="mt-1 text-right text-[10px] text-muted-foreground">
            10:34 ✓✓
          </div>
        </div>
        <div className="max-w-[82%]">
          <div className="rounded-2xl rounded-bl-sm border border-border bg-background px-3.5 py-2.5 text-sm text-foreground">
            Perfeito, obrigado! 🙌
          </div>
          <div className="mt-1 text-[10px] text-muted-foreground">10:35</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
        <Plus className="size-4 text-muted-foreground" />
        <span className="flex-1 text-sm text-muted-foreground">
          Escrever mensagem…
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Send className="size-4" />
        </span>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { View } from "react-native";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/i18n";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join(",")]);

  return active;
}

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.links.problem, href: "#problem" },
    { label: t.nav.links.solution, href: "#solution" },
    { label: t.nav.links.offer, href: "#offer" },
    { label: t.nav.links.faq, href: "#faq" },
  ];

  const sectionIds = [
    "home",
    "problem",
    "solution",
    "offer",
    "faq",
    "waitlist",
  ];
  const activeSection = useActiveSection(sectionIds);
  const atHome = activeSection === null || activeSection === "home";

  // Keep the URL hash in sync with the section in view (without scrolling).
  useEffect(() => {
    if (!activeSection) return;
    const url =
      activeSection === "home"
        ? window.location.pathname + window.location.search
        : `#${activeSection}`;
    window.history.replaceState(null, "", url);
  }, [activeSection]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md backdrop-saturate-150">
      <View className="container flex h-16 flex-row items-center justify-between gap-4">
        <Logo active={atHome} />

        <View className="hidden flex-row items-center gap-7 lg:flex">
          {links.map((l) => {
            const isActive =
              activeSection !== null && l.href === `#${activeSection}`;
            return (
              <a
                key={l.label}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "relative inline-flex items-center text-sm font-semibold text-primary after:absolute after:-bottom-[21px] after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary"
                    : "inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {l.label}
              </a>
            );
          })}
        </View>

        <View className="flex flex-row items-center gap-3">
          <ThemeToggle />
          <ButtonLink
            href="#waitlist"
            size="sm"
            className="hidden rounded-md px-5 font-semibold shadow-sm shadow-primary/30 lg:inline-flex"
          >
            {t.nav.cta}
            <ArrowRight className="size-5" aria-hidden />
          </ButtonLink>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </View>
      </View>

      {open && (
        <View className="border-t border-border bg-background lg:hidden">
          <View className="container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                {l.label}
              </a>
            ))}
            <ButtonLink
              href="#waitlist"
              onClick={() => setOpen(false)}
              size="lg"
              className="mt-3 w-full rounded-full font-semibold shadow-sm shadow-primary/30"
            >
              {t.nav.cta}
            </ButtonLink>
          </View>
        </View>
      )}
    </nav>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Zap, Sparkles } from "lucide-react";
import { LiveMatchHeader } from "@/components/cricpulse/LiveMatchHeader";
import { FactionToggle } from "@/components/cricpulse/FactionToggle";
import { RoastCard } from "@/components/cricpulse/RoastCard";
import { InteractionBar } from "@/components/cricpulse/InteractionBar";
import { Ticker } from "@/components/cricpulse/Ticker";
import { OracleCard } from "@/components/cricpulse/OracleCard";
import { DenActivity } from "@/components/cricpulse/DenActivity";
import { INITIAL_ROASTS, NEW_ROAST_POOL } from "@/components/cricpulse/data";
import type { Faction, Roast } from "@/components/cricpulse/types";

const Index = () => {
  const [faction, setFaction] = useState<Faction>("neutral");
  const [roasts, setRoasts] = useState<Roast[]>(INITIAL_ROASTS);
  const [momentum, setMomentum] = useState(38);

  // Stream new roasts in
  useEffect(() => {
    const t = setInterval(() => {
      const seed = NEW_ROAST_POOL[Math.floor(Math.random() * NEW_ROAST_POOL.length)];
      const next: Roast = { ...seed, id: `r${Date.now()}`, timeAgo: "now" };
      setRoasts((prev) => [next, ...prev].slice(0, 12));
      setMomentum((m) => Math.max(8, Math.min(92, m + (Math.random() * 14 - 7))));
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const factionLabel = useMemo(
    () => faction === "rcb" ? "Red Army Mode" : faction === "dc" ? "Blue Brigade Mode" : "Neutral Observer",
    [faction]
  );

  const filtered = useMemo(() => {
    if (faction === "neutral") return roasts;
    // Show roasts roasting the OTHER team (your enemies' L moments)
    const enemy = faction === "rcb" ? "dc" : "rcb";
    return roasts.filter((r) => r.team === enemy || r.team === "neutral");
  }, [roasts, faction]);

  return (
    <div data-faction={faction} className="min-h-screen text-foreground">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center brutal-border"
                style={{ background: "var(--gradient-faction)" }}
              >
                <Zap className="w-4 h-4 text-background" strokeWidth={3} />
              </div>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-none">CricPulse<span className="text-faction">.</span></h1>
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Agentic Fan War Room</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary">
            <Sparkles className="w-3 h-3 text-neon-yellow" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{factionLabel}</span>
          </div>
        </div>
      </header>

      <Ticker />

      <main className="max-w-3xl mx-auto px-4 py-6 pb-32 space-y-6">
        <LiveMatchHeader momentum={momentum} />

        {/* Faction picker */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2 className="font-display text-sm font-bold">Pick Your Side</h2>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              switching = treason 🚨
            </span>
          </div>
          <FactionToggle faction={faction} onChange={setFaction} />
        </section>

        {/* Den Activity ticker */}
        <DenActivity faction={faction} />

        {/* Feed */}
        <section>
          <div className="flex items-end justify-between mb-3 px-1">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                The Sledge<span className="text-faction">Feed</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Agentic roasts dropping live. No filter. No mercy. Bas vibes.
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-neon-lime">live</span>
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((r, i) => (
              <RoastCard key={r.id} roast={r} index={i} />
            ))}
          </div>
        </section>

        {/* Footer note */}
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-4">
          Built with chai, chaos & questionable life choices.
        </p>
      </main>

      {/* Oracle Challenge — collaborative prediction layer */}
      <OracleCard />

      {/* Floating reaction bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 px-4 pb-4 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <InteractionBar />
        </div>
      </div>
    </div>
  );
};

export default Index;

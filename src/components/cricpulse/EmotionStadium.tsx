import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users2, Volume2 } from "lucide-react";
import { useSentiment } from "./sentimentBus";

interface Dot {
  id: number;
  x: number;
  y: number;
  faction: "rcb" | "dc";
  baseDelay: number;
}

// Generate stadium seating arc — two tiers of dots forming a bowl
const generateDots = (): Dot[] => {
  const dots: Dot[] = [];
  let id = 0;
  const tiers = [
    { count: 60, ry: 38, rx: 95, yOffset: 70 },
    { count: 80, ry: 50, rx: 115, yOffset: 70 },
    { count: 100, ry: 62, rx: 135, yOffset: 70 },
  ];
  tiers.forEach((tier) => {
    for (let i = 0; i < tier.count; i++) {
      // semicircle from PI to 2*PI (top half/bowl)
      const t = i / (tier.count - 1);
      const angle = Math.PI + t * Math.PI;
      const x = 150 + Math.cos(angle) * tier.rx;
      const y = tier.yOffset + Math.sin(angle) * tier.ry;
      // Split stadium left half = rcb, right half = dc
      const faction: "rcb" | "dc" = x < 150 ? "rcb" : "dc";
      dots.push({ id: id++, x, y, faction, baseDelay: Math.random() * 0.8 });
    }
  });
  return dots;
};

const eventCopy: Record<string, { rcb: string; dc: string }> = {
  SIX: { rcb: "🔥 RCB END LIT UP", dc: "💀 DC SECTION SILENT" },
  FOUR: { rcb: "👏 RCB ROAR", dc: "😶 DC quiet" },
  WICKET: { rcb: "💀 RCB STUNNED", dc: "🛡️ DC FORTRESS ROARS" },
  CATCH: { rcb: "💀 RCB GASPS", dc: "🔥 DC GOES WILD" },
  DOT: { rcb: "😬 tense", dc: "😬 tense" },
  WIDE: { rcb: "🤡 ironic clap", dc: "🤡 ironic clap" },
};

export const EmotionStadium = () => {
  const dots = useMemo(generateDots, []);
  const sentiment = useSentiment();
  const [pulseKey, setPulseKey] = useState(0);
  const [activeFaction, setActiveFaction] = useState<"rcb" | "dc" | "both" | null>(null);
  const lastBurst = useRef(0);

  // Trigger crowd reaction on new event
  useEffect(() => {
    if (sentiment.burstId === lastBurst.current) return;
    lastBurst.current = sentiment.burstId;
    if (!sentiment.lastEvent || !sentiment.lastTeam) return;

    const evt = sentiment.lastEvent;
    const team = sentiment.lastTeam;
    // Who erupts? The team that benefits.
    const isWicket = evt === "WICKET" || evt === "CATCH";
    const erupting: "rcb" | "dc" | "both" =
      isWicket ? (team === "rcb" ? "rcb" : "dc") : team;
    setActiveFaction(erupting);
    setPulseKey((k) => k + 1);
    const t = setTimeout(() => setActiveFaction(null), 2200);
    return () => clearTimeout(t);
  }, [sentiment.burstId, sentiment.lastEvent, sentiment.lastTeam]);

  const totalFans = useMemo(
    () => 12_400 + Math.floor(sentiment.burstId * 37),
    [sentiment.burstId]
  );

  const eventLine = sentiment.lastEvent && sentiment.lastTeam
    ? eventCopy[sentiment.lastEvent]
    : null;

  return (
    <section className="relative rounded-2xl brutal-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-border bg-secondary/30">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse-dot" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-neon-lime font-bold">
              live crowd · emotion stadium
            </span>
          </div>
          <h3 className="font-display text-sm font-bold mt-0.5">
            See <span className="text-faction">12,400+ fans</span> reacting in realtime
          </h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/60">
          <Users2 className="w-3 h-3 text-foreground" />
          <span className="font-mono text-[10px] font-bold tabular-nums">
            {totalFans.toLocaleString()}
          </span>
        </div>
      </div>

      {/* SVG stadium */}
      <div className="relative">
        <svg
          viewBox="0 0 300 160"
          className="w-full h-auto block"
          style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(var(--surface-elevated)) 0%, hsl(var(--background)) 70%)" }}
        >
          {/* Pitch oval */}
          <ellipse
            cx="150"
            cy="125"
            rx="55"
            ry="14"
            fill="hsl(var(--neon-lime) / 0.08)"
            stroke="hsl(var(--neon-lime) / 0.25)"
            strokeWidth="0.5"
          />
          <ellipse cx="150" cy="125" rx="20" ry="5" fill="hsl(var(--neon-yellow) / 0.15)" />

          {/* Faction split labels */}
          <text x="40" y="20" fill="hsl(var(--rcb))" fontSize="6" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="1">
            RCB END
          </text>
          <text x="225" y="20" fill="hsl(var(--dc))" fontSize="6" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="1">
            DC END
          </text>

          {/* Dots */}
          {dots.map((d) => {
            const erupting =
              activeFaction === d.faction || activeFaction === "both";
            const baseColor =
              d.faction === "rcb" ? "hsl(var(--rcb))" : "hsl(var(--dc))";
            return (
              <motion.circle
                key={d.id}
                cx={d.x}
                cy={d.y}
                r={1.1}
                fill={baseColor}
                initial={{ opacity: 0.35 }}
                animate={
                  erupting
                    ? {
                        opacity: [0.4, 1, 0.5],
                        r: [1.1, 2.2, 1.3],
                      }
                    : { opacity: 0.4, r: 1.1 }
                }
                transition={{
                  duration: 1.4,
                  delay: d.baseDelay,
                  repeat: erupting ? 1 : 0,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Burst rings on event */}
          <AnimatePresence>
            {activeFaction && (
              <motion.g key={pulseKey}>
                {(activeFaction === "rcb" || activeFaction === "both") && (
                  <motion.circle
                    cx={80}
                    cy={70}
                    initial={{ r: 5, opacity: 0.7 }}
                    animate={{ r: 60, opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    fill="none"
                    stroke="hsl(var(--rcb))"
                    strokeWidth="1.2"
                  />
                )}
                {(activeFaction === "dc" || activeFaction === "both") && (
                  <motion.circle
                    cx={220}
                    cy={70}
                    initial={{ r: 5, opacity: 0.7 }}
                    animate={{ r: 60, opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    fill="none"
                    stroke="hsl(var(--dc))"
                    strokeWidth="1.2"
                  />
                )}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Event banner overlay */}
        <AnimatePresence mode="wait">
          {eventLine && (
            <motion.div
              key={pulseKey}
              initial={{ y: -12, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm brutal-border flex items-center gap-1.5"
            >
              <Volume2 className="w-3 h-3 text-neon-yellow" strokeWidth={3} />
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
                {sentiment.lastEvent} · {sentiment.lastTeam?.toUpperCase()}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* End reactions */}
      <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
        <div className="px-3 py-2 text-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-rcb font-bold">RCB End</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`rcb-${pulseKey}`}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              className="text-xs font-bold mt-0.5 leading-tight"
            >
              {eventLine?.rcb ?? "humming…"}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="px-3 py-2 text-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-dc font-bold">DC End</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`dc-${pulseKey}`}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              className="text-xs font-bold mt-0.5 leading-tight"
            >
              {eventLine?.dc ?? "humming…"}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

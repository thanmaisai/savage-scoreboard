import { motion } from "framer-motion";
import type { Faction } from "./types";
import { Shield, Swords } from "lucide-react";

const OPTIONS: { id: Faction; label: string; tagline: string; icon: typeof Shield }[] = [
  { id: "rcb", label: "RCB Den", tagline: "Ee Sala Cup Namde 🦁", icon: Swords },
  { id: "neutral", label: "Switzerland", tagline: "Bas vibe check", icon: Shield },
  { id: "dc", label: "DC Fortress", tagline: "Roar Macha 🔵", icon: Swords },
];

export const FactionToggle = ({
  faction, onChange,
}: { faction: Faction; onChange: (f: Faction) => void }) => {
  return (
    <div className="glass rounded-2xl p-2 flex gap-1.5">
      {OPTIONS.map((opt) => {
        const active = faction === opt.id;
        const accent =
          opt.id === "rcb" ? "var(--gradient-rcb)" :
          opt.id === "dc" ? "var(--gradient-dc)" :
          "linear-gradient(135deg, hsl(0 0% 18%), hsl(0 0% 10%))";
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className="relative flex-1 px-3 py-2.5 rounded-xl text-left group"
          >
            {active && (
              <motion.div
                layoutId="faction-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: accent, boxShadow: "var(--shadow-brutal-sm)" }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
            <div className="relative flex flex-col">
              <span className={`font-display text-xs font-bold ${active ? "text-white" : "text-foreground"}`}>
                {opt.label}
              </span>
              <span className={`text-[10px] ${active ? "text-white/80" : "text-muted-foreground"}`}>
                {opt.tagline}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

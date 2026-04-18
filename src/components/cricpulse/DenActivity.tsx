import { Flame, TrendingUp } from "lucide-react";
import type { Faction } from "./types";

interface DenActivityProps {
  faction: Faction;
}

export const DenActivity = ({ faction }: DenActivityProps) => {
  const text =
    faction === "dc"
      ? "452 DC fans called the last boundary. Currently storming the RCB Den."
      : faction === "rcb"
      ? "452 RCB fans predicted the last wicket! They are currently owning the DC Fortress."
      : "452 fans nailed the last prediction. The Dens are at war.";

  return (
    <div className="relative overflow-hidden rounded-2xl brutal-border bg-card/60 backdrop-blur-sm">
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: "var(--gradient-faction)" }}
      />
      <div className="relative flex items-center gap-3 px-3.5 py-2.5">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-background/80 flex items-center justify-center brutal-border">
          <Flame className="w-4 h-4 text-faction" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-faction font-bold">
              Den Activity
            </span>
            <TrendingUp className="w-2.5 h-2.5 text-faction" />
          </div>
          <p className="text-xs leading-snug text-foreground font-medium truncate">
            🔥 {text}
          </p>
        </div>
      </div>
    </div>
  );
};

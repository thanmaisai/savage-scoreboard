import { motion } from "framer-motion";
import { Radio, TrendingUp } from "lucide-react";

interface Props {
  momentum: number; // 0 = full RCB, 100 = full DC
}

export const LiveMatchHeader = ({ momentum }: Props) => {
  const rcbPct = 100 - momentum;
  const dcPct = momentum;
  const leading = momentum < 50 ? "RCB" : "DC";

  return (
    <section className="relative overflow-hidden rounded-3xl glass p-6 md:p-8 grain">
      {/* LIVE badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-destructive animate-pulse-dot" />
            <span className="relative rounded-full bg-destructive h-2.5 w-2.5" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-destructive">Live · Over 14.3</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
          <Radio className="w-3.5 h-3.5" />
          <span>M. Chinnaswamy · BLR</span>
        </div>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <TeamBlock
          name="Royal Challengers"
          short="RCB"
          score="167/6"
          overs="(20)"
          color="rcb"
          align="left"
        />
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-xs text-muted-foreground tracking-widest">VS</span>
          <span className="font-mono text-[10px] text-neon-yellow">CHASING</span>
        </div>
        <TeamBlock
          name="Delhi Capitals"
          short="DC"
          score="142/4"
          overs="(14.3)"
          color="dc"
          align="right"
        />
      </div>

      {/* Momentum Meter */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-neon-lime" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Fan Momentum Meter
            </span>
          </div>
          <span className="font-display text-xs font-bold">
            {leading} <span className="text-muted-foreground font-normal">leading the vibe</span>
          </span>
        </div>
        <div className="relative h-3 rounded-full bg-secondary overflow-hidden border border-border">
          <motion.div
            className="absolute inset-y-0 left-0 bg-rcb"
            initial={{ width: "50%" }}
            animate={{ width: `${rcbPct}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            style={{ boxShadow: "0 0 20px hsl(var(--rcb) / 0.6)" }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-dc"
            initial={{ width: "50%" }}
            animate={{ width: `${dcPct}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            style={{ boxShadow: "0 0 20px hsl(var(--dc) / 0.6)" }}
          />
          <div className="absolute inset-y-0 left-1/2 w-px bg-background/60" />
        </div>
        <div className="flex justify-between mt-1.5 font-mono text-[10px]">
          <span className="text-rcb">{rcbPct.toFixed(0)}% RCB</span>
          <span className="text-dc">{dcPct.toFixed(0)}% DC</span>
        </div>
      </div>
    </section>
  );
};

const TeamBlock = ({
  name, short, score, overs, color, align,
}: { name: string; short: string; score: string; overs: string; color: "rcb" | "dc"; align: "left" | "right" }) => (
  <div className={`flex flex-col ${align === "right" ? "items-end text-right" : "items-start"}`}>
    <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white brutal-border`}
        style={{ background: color === "rcb" ? "var(--gradient-rcb)" : "var(--gradient-dc)" }}
      >
        {short}
      </div>
      <div className={align === "right" ? "text-right" : ""}>
        <p className="font-display text-sm text-muted-foreground">{name}</p>
        <p className="font-display text-3xl md:text-4xl font-bold tabular-nums">
          {score} <span className="text-muted-foreground text-base font-mono font-normal">{overs}</span>
        </p>
      </div>
    </div>
  </div>
);

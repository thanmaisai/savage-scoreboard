import { motion } from "framer-motion";
import { Bot, Flame, Skull, Clapperboard, Share2 } from "lucide-react";
import type { Roast } from "./types";

const TAG_COLORS: Record<string, string> = {
  WICKET: "bg-destructive text-destructive-foreground",
  SIX: "bg-neon-lime text-background",
  "DOT BALL": "bg-secondary text-foreground",
  MISFIELD: "bg-neon-yellow text-background",
  BOUNDARY: "bg-neon-pink text-background",
  REVIEW: "bg-secondary text-foreground",
  DROP: "bg-destructive text-destructive-foreground",
  CHEEKY: "bg-neon-yellow text-background",
};

export const RoastCard = ({ roast, index }: { roast: Roast; index: number }) => {
  const teamRing =
    roast.team === "rcb" ? "ring-rcb/40 hover:ring-rcb/80" :
    roast.team === "dc" ? "ring-dc/40 hover:ring-dc/80" :
    "ring-white/10 hover:ring-white/30";

  const teamGlow =
    roast.team === "rcb" ? "shadow-[0_0_30px_-10px_hsl(var(--rcb)/0.5)]" :
    roast.team === "dc" ? "shadow-[0_0_30px_-10px_hsl(var(--dc)/0.5)]" :
    "";

  return (
    <motion.article
      initial={{ opacity: 0, y: -20, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl bg-card p-5 ring-1 ${teamRing} ${teamGlow} transition-all duration-300`}
      style={{ background: "var(--gradient-card)" }}
    >
      {/* Notification header */}
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center brutal-border" style={{ borderWidth: 1.5 }}>
            <Bot className="w-4 h-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xs font-bold">{roast.source}</span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              now · {roast.timeAgo} ago
            </span>
          </div>
        </div>
        <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${TAG_COLORS[roast.tag] ?? "bg-secondary"}`}>
          {roast.tag}
        </span>
      </header>

      {/* Roast body */}
      <p className="font-display text-[17px] md:text-lg leading-snug font-medium text-balance">
        {roast.text}
      </p>

      {/* Reactions */}
      <footer className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ReactionPill icon={Flame} count={roast.reactions.fire} color="text-neon-pink" />
          <ReactionPill icon={Skull} count={roast.reactions.skull} color="text-muted-foreground" />
          <ReactionPill icon={Clapperboard} count={roast.reactions.cinema} color="text-neon-yellow" />
        </div>
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </footer>
    </motion.article>
  );
};

const ReactionPill = ({ icon: Icon, count, color }: { icon: typeof Flame; count: number; color: string }) => (
  <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-secondary transition-colors group">
    <Icon className={`w-3.5 h-3.5 ${color} group-hover:scale-125 transition-transform`} />
    <span className="font-mono text-xs tabular-nums text-muted-foreground group-hover:text-foreground">
      {count > 999 ? `${(count / 1000).toFixed(1)}k` : count}
    </span>
  </button>
);

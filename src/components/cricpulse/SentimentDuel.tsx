import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { useSentiment } from "./sentimentBus";
import type { Faction } from "./types";

interface Props {
  faction: Faction;
}

const ROASTS_TO_LOSING_DEN: Record<"rcb" | "dc", string[]> = {
  rcb: [
    "RCB Den ka morale: -78. Bhai counsellor ka number bhej dun? 🩹",
    "Ye Bengaluru ka silence stadium tak sunaayi de raha hai. Moye Moye officially. 💀",
    "Cup toh chhodo, RCB fans ka WiFi bhi disconnect ho gaya. 📵",
  ],
  dc: [
    "DC Fortress ki deewar gir gayi. Bricks bhi resign de chuke. 🧱",
    "Capitals ka graph aaj seedha submarine mode mein. 🚢⬇️",
    "Oye Dilli waalon, sentiment meter dekha? Aankh laal kyun? 😭",
  ],
};

const HYPE_TO_WINNING_DEN: Record<"rcb" | "dc", string[]> = {
  rcb: ["🔥 RCB Den is COOKING. Energy through the roof.", "👑 Red Army owning the vibe right now."],
  dc: ["🛡️ DC Fortress in beast mode. Unshakeable.", "💙 Capitals army on a heat-check."],
};

export const SentimentDuel = ({ faction }: Props) => {
  const sentiment = useSentiment();
  const [overEnded, setOverEnded] = useState(false);
  const lastBurst = useRef(0);
  const eventCount = useRef(0);

  // After every 3 events, treat as "over end" → push roast to losing side
  useEffect(() => {
    if (sentiment.burstId === lastBurst.current) return;
    lastBurst.current = sentiment.burstId;
    eventCount.current += 1;
    if (eventCount.current % 3 === 0) {
      setOverEnded(true);
      const losingTeam: "rcb" | "dc" =
        sentiment.rcbJoy < sentiment.dcJoy ? "rcb" : "dc";
      const winningTeam: "rcb" | "dc" = losingTeam === "rcb" ? "dc" : "rcb";

      // If user belongs to losing den → roast them
      if (faction === losingTeam) {
        const lines = ROASTS_TO_LOSING_DEN[losingTeam];
        toast(lines[Math.floor(Math.random() * lines.length)], {
          description: `Sentiment ${losingTeam.toUpperCase()} ${Math.round(
            losingTeam === "rcb" ? sentiment.rcbJoy : sentiment.dcJoy
          )} vs ${winningTeam.toUpperCase()} ${Math.round(
            winningTeam === "rcb" ? sentiment.rcbJoy : sentiment.dcJoy
          )}`,
        });
      } else if (faction === winningTeam) {
        const lines = HYPE_TO_WINNING_DEN[winningTeam];
        toast.success(lines[Math.floor(Math.random() * lines.length)], {
          description: "Den momentum locked in 🔒",
        });
      }
      setTimeout(() => setOverEnded(false), 1800);
    }
  }, [sentiment.burstId, sentiment.rcbJoy, sentiment.dcJoy, faction]);

  const total = sentiment.rcbJoy + sentiment.dcJoy;
  const rcbPct = (sentiment.rcbJoy / total) * 100;
  const dcPct = 100 - rcbPct;
  const lead = rcbPct - dcPct;
  const leader: "rcb" | "dc" | "tie" =
    Math.abs(lead) < 4 ? "tie" : lead > 0 ? "rcb" : "dc";

  return (
    <section className="rounded-2xl brutal-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center">
            <Swords className="w-3.5 h-3.5 text-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold leading-none">Sentiment Duel</h3>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">
              live emotional war · joy − despair
            </p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={leader}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`px-2 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest font-bold ${
              leader === "rcb"
                ? "bg-rcb text-background"
                : leader === "dc"
                ? "bg-dc text-background"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {leader === "tie" ? "neck & neck" : `${leader} leading`}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tug-of-war bar */}
      <div className="p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rcb" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">RCB</span>
            <span className="font-mono text-xs font-bold tabular-nums text-rcb">
              {Math.round(sentiment.rcbJoy)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold tabular-nums text-dc">
              {Math.round(sentiment.dcJoy)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">DC</span>
            <span className="w-2 h-2 rounded-full bg-dc" />
          </div>
        </div>

        <div className="relative h-7 rounded-full bg-background brutal-border overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ background: "var(--gradient-rcb)" }}
            animate={{ width: `${rcbPct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0"
            style={{ background: "var(--gradient-dc)" }}
            animate={{ width: `${dcPct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
          {/* Center marker */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-background/60" />
          <AnimatePresence>
            {overEnded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-background bg-foreground/90 px-2 py-0.5 rounded-full">
                  over verdict 🔔
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Delta indicators */}
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
          <div className={`flex items-center gap-1 ${leader === "rcb" ? "text-rcb" : "text-muted-foreground"}`}>
            {leader === "rcb" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{leader === "rcb" ? `+${Math.round(Math.abs(lead))} lead` : `${Math.round(lead)}`}</span>
          </div>
          <span className="text-muted-foreground">verdict every 3 events</span>
          <div className={`flex items-center gap-1 ${leader === "dc" ? "text-dc" : "text-muted-foreground"}`}>
            <span>{leader === "dc" ? `+${Math.round(Math.abs(lead))} lead` : `${Math.round(-lead)}`}</span>
            {leader === "dc" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          </div>
        </div>
      </div>
    </section>
  );
};

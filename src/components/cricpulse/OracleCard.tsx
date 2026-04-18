import { useEffect, useState } from "react";
import { Sparkles, X, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const QUESTIONS = [
  {
    q: "Will Kohli hit a boundary this over?",
    options: ["Pakka (Yes)", "No Chance", "Single le lega"],
    winner: 0,
  },
  {
    q: "Next ball outcome — bolo bolo?",
    options: ["Dot ball, watch", "SIX maarega", "Wicket gir gaya"],
    winner: 1,
  },
  {
    q: "DC ka next over runs?",
    options: ["Under 6", "6 to 12", "12+ aag lagega"],
    winner: 2,
  },
];

const LOSS_ROASTS = [
  "Arey bhai, prediction toh dhang se kar lo, batting toh wese bhi nahi ho rahi. 🤡",
  "Bhai tumhari prediction aur RCB ki top order — dono jaldi out. 💀",
  "Oracle ne dekha tumhe aur muskura diya. Galat. 🤡",
  "Itni confidence mein toh selectors team chunte hain. Aur dekho kya haal hai. 😭",
];
const WIN_ROASTS = [
  "Oye Nostradamus! Dimaag chala raha hai. 🔮✨",
  "Pakka inside source hai tumhara. Confirm karo. 👀",
  "Absolute Cinema. Oracle bowed down. 🎬",
];

export const OracleCard = () => {
  const [qIndex, setQIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [locked, setLocked] = useState<number | null>(null);
  const [pulse, setPulse] = useState(false);

  const current = QUESTIONS[qIndex];

  // Auto-resolve prediction after a few seconds
  useEffect(() => {
    if (locked === null) return;
    const t = setTimeout(() => {
      const won = locked === current.winner;
      if (won) {
        toast.success(WIN_ROASTS[Math.floor(Math.random() * WIN_ROASTS.length)], {
          description: "+50 Oracle Points · Den respect ↑",
        });
      } else {
        toast(LOSS_ROASTS[Math.floor(Math.random() * LOSS_ROASTS.length)], {
          description: `Sahi answer tha: "${current.options[current.winner]}"`,
        });
      }
      // Next question
      setTimeout(() => {
        setLocked(null);
        setQIndex((i) => (i + 1) % QUESTIONS.length);
        setPulse(true);
        setTimeout(() => setPulse(false), 1500);
      }, 800);
    }, 2600);
    return () => clearTimeout(t);
  }, [locked, current]);

  if (hidden) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 w-[min(92vw,320px)] pointer-events-auto">
      <AnimatePresence mode="wait">
        {collapsed ? (
          <motion.button
            key="collapsed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setCollapsed(false)}
            className="ml-auto flex items-center gap-2 px-3 py-2.5 rounded-full brutal-border bg-card shadow-brutal hover:scale-105 transition-transform"
            style={{ background: "var(--gradient-faction)" }}
          >
            <Sparkles className="w-4 h-4 text-background" strokeWidth={3} />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-background">
              Oracle
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="open"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              boxShadow: pulse
                ? "0 0 0 4px hsl(var(--faction) / 0.4)"
                : "0 10px 40px -10px hsl(var(--faction) / 0.3)",
            }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-2xl brutal-border bg-card overflow-hidden ml-auto"
          >
            {/* Header */}
            <div
              className="relative px-3.5 py-2.5 flex items-center justify-between"
              style={{ background: "var(--gradient-faction)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-background/90 flex items-center justify-center">
                  <span className="text-sm leading-none">🔮</span>
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-background leading-none">
                    The Oracle's Challenge
                  </p>
                  <p className="font-mono text-[8px] uppercase tracking-widest text-background/80 mt-0.5">
                    live · over 14.3
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCollapsed(true)}
                  className="w-6 h-6 rounded-md bg-background/20 hover:bg-background/40 flex items-center justify-center transition-colors"
                  aria-label="Minimize"
                >
                  <ChevronUp className="w-3.5 h-3.5 text-background rotate-180" strokeWidth={3} />
                </button>
                <button
                  onClick={() => setHidden(true)}
                  className="w-6 h-6 rounded-md bg-background/20 hover:bg-background/40 flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5 text-background" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-3.5 space-y-2.5">
              <p className="text-sm font-semibold leading-snug">{current.q}</p>

              <div className="space-y-1.5">
                {current.options.map((opt, i) => {
                  const isLocked = locked === i;
                  const isOther = locked !== null && locked !== i;
                  return (
                    <button
                      key={opt}
                      disabled={locked !== null}
                      onClick={() => setLocked(i)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold font-mono uppercase tracking-wider transition-all brutal-border ${
                        isLocked
                          ? "bg-faction text-background scale-[0.98]"
                          : isOther
                          ? "bg-secondary/40 text-muted-foreground opacity-50"
                          : "bg-secondary hover:bg-faction/20 hover:text-faction hover:translate-x-0.5"
                      }`}
                    >
                      {isLocked ? "🔒 " : "› "}
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {locked !== null ? "oracle resolving…" : "1,284 fans predicting"}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-faction font-bold">
                  +50 pts
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { REACTIONS } from "./data";

export const InteractionBar = () => {
  const [bursts, setBursts] = useState<{ id: number; emoji: string; x: number }[]>([]);

  const fire = (emoji: string) => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, emoji, x: Math.random() * 80 - 40 }]);
    setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1200);
  };

  return (
    <div className="sticky bottom-4 z-30">
      <div className="glass rounded-2xl p-2.5 flex gap-1.5 overflow-x-auto scrollbar-hidden">
        {REACTIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => fire(r.emoji)}
            className="relative shrink-0 px-3.5 py-2 rounded-xl bg-secondary hover:bg-faction hover:text-white transition-all duration-200 group"
          >
            <span className="flex items-center gap-1.5 font-display text-xs font-bold whitespace-nowrap">
              <span className="text-base group-hover:scale-125 transition-transform">{r.emoji}</span>
              {r.label}
            </span>

            <AnimatePresence>
              {bursts
                .filter((_, i) => i % REACTIONS.length === REACTIONS.findIndex((x) => x.id === r.id))
                .map((b) => (
                  <motion.span
                    key={b.id}
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -80, scale: 1.5, x: b.x }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-0 text-2xl pointer-events-none"
                  >
                    {b.emoji}
                  </motion.span>
                ))}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  );
};

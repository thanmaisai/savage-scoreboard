import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { MomentCard } from "./MomentCard";
import { INITIAL_MOMENTS, NEW_MOMENT_POOL, type MatchMoment } from "./momentsData";
import type { Faction } from "./types";

interface Props {
  faction: Faction;
}

export const LiveMoments = ({ faction }: Props) => {
  const [moments, setMoments] = useState<MatchMoment[]>(INITIAL_MOMENTS);

  // Stream a new live moment every ~9s
  useEffect(() => {
    const t = setInterval(() => {
      const seed = NEW_MOMENT_POOL[Math.floor(Math.random() * NEW_MOMENT_POOL.length)];
      const next: MatchMoment = {
        ...seed,
        id: `m${Date.now()}`,
        liveFans: 200 + Math.floor(Math.random() * 1800),
        comments: [],
      };
      setMoments((prev) => [next, ...prev].slice(0, 8));
    }, 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <section>
      <div className="flex items-end justify-between mb-3 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-3.5 h-3.5 text-neon-lime" strokeWidth={3} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-neon-lime font-bold">
              ball-by-ball · live
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Match<span className="text-faction">Moments</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            React, debate, drop hot takes — anchored to every ball.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {moments.map((m, i) => (
          <MomentCard key={m.id} moment={m} faction={faction} isLive={i === 0} />
        ))}
      </div>
    </section>
  );
};

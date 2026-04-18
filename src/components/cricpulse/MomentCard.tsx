import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Users, Send, Radio } from "lucide-react";
import { toast } from "sonner";
import type { MatchMoment, MomentComment } from "./momentsData";
import { QUICK_TAKES } from "./momentsData";
import type { Faction } from "./types";

interface Props {
  moment: MatchMoment;
  faction: Faction;
  isLive?: boolean;
}

const eventStyles: Record<MatchMoment["eventType"], { label: string; tone: string }> = {
  SIX: { label: "SIX", tone: "bg-neon-lime text-background" },
  WICKET: { label: "WICKET", tone: "bg-destructive text-destructive-foreground" },
  FOUR: { label: "FOUR", tone: "bg-neon-yellow text-background" },
  DOT: { label: "DOT", tone: "bg-secondary text-foreground" },
  WIDE: { label: "WIDE", tone: "bg-hot-pink text-background" },
  CATCH: { label: "CATCH!", tone: "bg-neon-yellow text-background" },
};

export const MomentCard = ({ moment, faction, isLive }: Props) => {
  const [reactions, setReactions] = useState(moment.reactions);
  const [tapped, setTapped] = useState<Record<string, boolean>>({});
  const [openThread, setOpenThread] = useState(false);
  const [comments, setComments] = useState<MomentComment[]>(moment.comments);
  const [draft, setDraft] = useState("");
  const [liveFans, setLiveFans] = useState(moment.liveFans);

  const teamLabel = moment.team === "rcb" ? "RCB" : "DC";
  const evt = eventStyles[moment.eventType];

  const handleReact = (idx: number) => {
    setReactions((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, count: r.count + 1 } : r))
    );
    setTapped((t) => ({ ...t, [idx]: true }));
    setLiveFans((n) => n + 1);
    setTimeout(() => setTapped((t) => ({ ...t, [idx]: false })), 600);
  };

  const handlePost = (text: string) => {
    if (!text.trim()) return;
    const newC: MomentComment = {
      id: `c${Date.now()}`,
      user: faction === "rcb" ? "you_rcb" : faction === "dc" ? "you_dc" : "you",
      faction: faction === "neutral" ? "neutral" : faction,
      text: text.trim(),
      timeAgo: "now",
    };
    setComments((prev) => [newC, ...prev]);
    setDraft("");
    toast.success("Take dropped into the moment 🔥", {
      description: `Live in ${teamLabel} thread · over ${moment.over}`,
    });
  };

  const factionDot =
    moment.team === "rcb" ? "bg-rcb" : "bg-dc";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl brutal-border bg-card overflow-hidden"
    >
      {/* Top stripe */}
      <div className="flex items-stretch">
        <div className={`w-1.5 shrink-0 ${factionDot}`} />
        <div className="flex-1 p-3.5 space-y-2.5">
          {/* Header row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider ${evt.tone}`}>
              {evt.label}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              over {moment.over} · {teamLabel}
            </span>
            {isLive && (
              <span className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-neon-lime/15">
                <Radio className="w-2.5 h-2.5 text-neon-lime" strokeWidth={3} />
                <span className="font-mono text-[9px] uppercase tracking-widest text-neon-lime font-bold">live</span>
              </span>
            )}
          </div>

          {/* Headline + commentary */}
          <div>
            <h3 className="font-display text-base font-bold leading-tight text-balance">
              {moment.headline}
            </h3>
            <p className="text-xs text-muted-foreground leading-snug mt-1">
              {moment.detail}
            </p>
          </div>

          {/* Reaction strip */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {reactions.map((r, i) => (
              <motion.button
                key={r.label}
                whileTap={{ scale: 0.88 }}
                animate={tapped[i] ? { scale: [1, 1.15, 1] } : {}}
                onClick={() => handleReact(i)}
                className="group flex items-center gap-1 px-2 py-1 rounded-full bg-secondary hover:bg-faction/20 hover:text-faction transition-colors"
              >
                <span className="text-sm leading-none">{r.emoji}</span>
                <span className="font-mono text-[10px] font-bold tabular-nums">
                  {r.count.toLocaleString()}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Footer: live fans + thread toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3 h-3" />
              <span className="font-mono text-[10px] uppercase tracking-widest">
                <span className="text-foreground font-bold tabular-nums">{liveFans.toLocaleString()}</span> reacting
              </span>
            </div>
            <button
              onClick={() => setOpenThread((o) => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary hover:bg-faction/20 hover:text-faction transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                {comments.length} takes
              </span>
            </button>
          </div>

          {/* Discussion thread */}
          <AnimatePresence initial={false}>
            {openThread && (
              <motion.div
                key="thread"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-2 space-y-2">
                  {/* Quick takes */}
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hidden -mx-1 px-1">
                    {QUICK_TAKES.map((qt) => (
                      <button
                        key={qt}
                        onClick={() => handlePost(qt)}
                        className="shrink-0 px-2.5 py-1 rounded-full bg-faction/10 text-faction font-mono text-[10px] uppercase tracking-wider font-bold hover:bg-faction hover:text-background transition-colors whitespace-nowrap brutal-border"
                      >
                        + {qt}
                      </button>
                    ))}
                  </div>

                  {/* Composer */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePost(draft);
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      maxLength={140}
                      placeholder="Drop your take on this ball…"
                      className="flex-1 bg-secondary rounded-full px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-faction/60 placeholder:text-muted-foreground"
                    />
                    <button
                      type="submit"
                      disabled={!draft.trim()}
                      className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center disabled:opacity-40 transition-opacity"
                      style={{ background: "var(--gradient-faction)" }}
                      aria-label="Post"
                    >
                      <Send className="w-3.5 h-3.5 text-background" strokeWidth={3} />
                    </button>
                  </form>

                  {/* Comments */}
                  <ul className="space-y-1.5 max-h-56 overflow-y-auto scrollbar-hidden">
                    {comments.map((c) => (
                      <motion.li
                        key={c.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 px-2 py-1.5 rounded-lg bg-secondary/50"
                      >
                        <div
                          className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                            c.faction === "rcb" ? "bg-rcb" : c.faction === "dc" ? "bg-dc" : "bg-muted-foreground"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                              @{c.user}
                            </span>
                            <span className="font-mono text-[9px] text-muted-foreground">{c.timeAgo}</span>
                          </div>
                          <p className="text-xs leading-snug">{c.text}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};

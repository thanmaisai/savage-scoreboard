export interface MomentReaction {
  emoji: string;
  label: string;
  count: number;
}

export interface MomentComment {
  id: string;
  user: string;
  faction: "rcb" | "dc" | "neutral";
  text: string;
  timeAgo: string;
}

export interface MatchMoment {
  id: string;
  over: string; // e.g. "14.3"
  eventType: "SIX" | "WICKET" | "FOUR" | "DOT" | "WIDE" | "CATCH";
  headline: string; // e.g. "Kohli SMASHES it over long-on!"
  detail: string; // commentary line
  team: "rcb" | "dc";
  liveFans: number;
  reactions: MomentReaction[];
  comments: MomentComment[];
}

export const INITIAL_MOMENTS: MatchMoment[] = [
  {
    id: "m1",
    over: "14.3",
    eventType: "SIX",
    headline: "Kohli launches it into the stands! 🚀",
    detail: "Full toss, picked up off the pads, deep midwicket — gone! RCB +6, momentum SHIFT.",
    team: "rcb",
    liveFans: 1842,
    reactions: [
      { emoji: "🔥", label: "Aag", count: 1284 },
      { emoji: "🎬", label: "Cinema", count: 942 },
      { emoji: "👑", label: "King", count: 2104 },
      { emoji: "💀", label: "Moye", count: 88 },
    ],
    comments: [
      { id: "c1", user: "rcb_diehard", faction: "rcb", text: "VIRAAAT! Maine bola tha aaj wo aag lagayega 🔥🔥", timeAgo: "8s" },
      { id: "c2", user: "dc_fortress", faction: "dc", text: "Ek shot pe mat udo bhai, abhi 6 over baaki hain.", timeAgo: "14s" },
      { id: "c3", user: "neutral_obs", faction: "neutral", text: "Bowler ka confidence -100 ho gaya 💀", timeAgo: "22s" },
    ],
  },
  {
    id: "m2",
    over: "13.5",
    eventType: "WICKET",
    headline: "GONE! Edge straight to keeper.",
    detail: "Back of a length, extra bounce, thick edge, gloves — silence in the dugout.",
    team: "dc",
    liveFans: 2104,
    reactions: [
      { emoji: "💀", label: "Moye", count: 1820 },
      { emoji: "⚰️", label: "RIP", count: 940 },
      { emoji: "🎬", label: "Cinema", count: 612 },
      { emoji: "🔥", label: "Aag", count: 1240 },
    ],
    comments: [
      { id: "c4", user: "dc_fortress", faction: "dc", text: "BOWLED OUT! DC Fortress on top 🛡️", timeAgo: "1m" },
      { id: "c5", user: "rcb_diehard", faction: "rcb", text: "Review lo bhai please 🙏", timeAgo: "1m" },
    ],
  },
  {
    id: "m3",
    over: "13.2",
    eventType: "FOUR",
    headline: "Cheeky scoop over the keeper!",
    detail: "Innovation max — 4 runs, crowd erupts.",
    team: "rcb",
    liveFans: 980,
    reactions: [
      { emoji: "🔥", label: "Aag", count: 412 },
      { emoji: "🎬", label: "Cinema", count: 880 },
      { emoji: "👑", label: "King", count: 220 },
      { emoji: "💀", label: "Moye", count: 18 },
    ],
    comments: [
      { id: "c6", user: "neutral_obs", faction: "neutral", text: "Audacity level: 9000", timeAgo: "2m" },
    ],
  },
];

export const NEW_MOMENT_POOL: Omit<MatchMoment, "id" | "liveFans" | "comments">[] = [
  {
    over: "15.1",
    eventType: "SIX",
    headline: "Slog sweep DEEP into the crowd!",
    detail: "Picked the length early, swept like a man who pays no rent.",
    team: "rcb",
    reactions: [
      { emoji: "🔥", label: "Aag", count: 12 },
      { emoji: "🎬", label: "Cinema", count: 8 },
      { emoji: "👑", label: "King", count: 14 },
      { emoji: "💀", label: "Moye", count: 1 },
    ],
  },
  {
    over: "15.2",
    eventType: "DOT",
    headline: "Dot ball. Pressure building.",
    detail: "Yorker on the money. Batter swung at fresh air.",
    team: "dc",
    reactions: [
      { emoji: "💀", label: "Moye", count: 24 },
      { emoji: "⚰️", label: "RIP", count: 6 },
      { emoji: "🎬", label: "Cinema", count: 4 },
      { emoji: "🔥", label: "Aag", count: 11 },
    ],
  },
  {
    over: "15.3",
    eventType: "CATCH",
    headline: "STUNNING grab at the boundary!",
    detail: "Diving forward, one hand, ball stuck — replay khud confused.",
    team: "dc",
    reactions: [
      { emoji: "🎬", label: "Cinema", count: 30 },
      { emoji: "🔥", label: "Aag", count: 22 },
      { emoji: "💀", label: "Moye", count: 9 },
      { emoji: "👑", label: "King", count: 4 },
    ],
  },
  {
    over: "15.4",
    eventType: "WIDE",
    headline: "Wide down leg. Free run.",
    detail: "Bowler ka GPS off ho gaya lagta hai.",
    team: "rcb",
    reactions: [
      { emoji: "💀", label: "Moye", count: 18 },
      { emoji: "🎬", label: "Cinema", count: 3 },
      { emoji: "🔥", label: "Aag", count: 5 },
      { emoji: "⚰️", label: "RIP", count: 2 },
    ],
  },
];

export const QUICK_TAKES = [
  "Ye toh aag laga di 🔥",
  "Bhai ye out tha 100%",
  "Captain ka decision peak",
  "Bowler change karo bhai",
  "Absolute cinema scenes 🎬",
  "Match ghum gaya idhar",
  "Moye moye moment 💀",
];

import type { Roast } from "./types";

export const INITIAL_ROASTS: Roast[] = [
  {
    id: "r1",
    tag: "WICKET",
    source: "Sledge.AI",
    team: "dc",
    text: "Batting lineup or a weekend plan? Both finished before they even started. RCB top order ne aaj bhi WiFi se pehle disconnect kar liya.",
    timeAgo: "12s",
    reactions: { fire: 1284, skull: 942, cinema: 410 },
  },
  {
    id: "r2",
    tag: "SIX",
    source: "AgentZero",
    team: "rcb",
    text: "Delivery faster than my 10-minute grocery order. Ball gayi parking mein, ab Blinkit waala hi dhoondhega.",
    timeAgo: "47s",
    reactions: { fire: 2104, skull: 312, cinema: 1880 },
  },
  {
    id: "r3",
    tag: "MISFIELD",
    source: "RoastBot 9000",
    team: "neutral",
    text: "Fielder ne ball ko aise dekha jaise ex ka message ho. Touch karne ka mann hi nahi tha.",
    timeAgo: "1m",
    reactions: { fire: 870, skull: 1502, cinema: 690 },
  },
  {
    id: "r4",
    tag: "DOT BALL",
    source: "MoyeMoye Bot",
    team: "dc",
    text: "Six dot balls in a row. Bro is playing Test cricket in an IPL skin. Strike rotate karna paap hai kya?",
    timeAgo: "2m",
    reactions: { fire: 540, skull: 1190, cinema: 220 },
  },
  {
    id: "r5",
    tag: "REVIEW",
    source: "AgentZero",
    team: "neutral",
    text: "DRS lagaya itne confidence se, lagta tha exam mein cheating ka chit pakda gaya. Spoiler: out tha bhai.",
    timeAgo: "3m",
    reactions: { fire: 412, skull: 988, cinema: 1340 },
  },
  {
    id: "r6",
    tag: "BOUNDARY",
    source: "Sledge.AI",
    team: "rcb",
    text: "Cover drive itni clean thi ki dadi ne bhi WhatsApp pe Good Morning bhej diya.",
    timeAgo: "4m",
    reactions: { fire: 1620, skull: 88, cinema: 2040 },
  },
];

export const NEW_ROAST_POOL: Omit<Roast, "id" | "timeAgo">[] = [
  {
    tag: "DROP",
    source: "RoastBot 9000",
    team: "rcb",
    text: "Catch chhoda aise jaise relationship — pakad sakte the, par decide kiya 'no thanks'.",
    reactions: { fire: 12, skull: 4, cinema: 8 },
  },
  {
    tag: "SIX",
    source: "AgentZero",
    team: "dc",
    text: "Ball stadium ke bahar, batsman ke ghar ka address bhi bahar. Absolute cinema mode ON.",
    reactions: { fire: 28, skull: 2, cinema: 19 },
  },
  {
    tag: "WICKET",
    source: "Sledge.AI",
    team: "dc",
    text: "Stumps gaye, sapne gaye, fantasy XI bhi gayi. Triple combo on a Tuesday.",
    reactions: { fire: 41, skull: 18, cinema: 6 },
  },
  {
    tag: "CHEEKY",
    source: "MoyeMoye Bot",
    team: "neutral",
    text: "Commentator: 'What a beautiful shot.' Replay: ball edge se gayi. Bhai chashma badlo.",
    reactions: { fire: 9, skull: 22, cinema: 5 },
  },
  {
    tag: "DOT BALL",
    source: "RoastBot 9000",
    team: "rcb",
    text: "Itne dots maar rahe ho lagta hai morse code mein 'help' bhej rahe ho.",
    reactions: { fire: 14, skull: 30, cinema: 3 },
  },
];

export const REACTIONS = [
  { id: "moye", label: "Moye Moye", emoji: "💀" },
  { id: "cinema", label: "Absolute Cinema", emoji: "🎬" },
  { id: "peak", label: "Peak RCB", emoji: "🔥" },
  { id: "rip", label: "RIP Bhai", emoji: "⚰️" },
  { id: "sasta", label: "Sasta Roast", emoji: "🥲" },
] as const;

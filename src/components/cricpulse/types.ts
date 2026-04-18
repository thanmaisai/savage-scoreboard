export type Faction = "neutral" | "rcb" | "dc";

export type RoastTag = "WICKET" | "SIX" | "DOT BALL" | "MISFIELD" | "BOUNDARY" | "REVIEW" | "DROP" | "CHEEKY";

export interface Roast {
  id: string;
  tag: RoastTag;
  source: "AgentZero" | "Sledge.AI" | "RoastBot 9000" | "MoyeMoye Bot";
  team: "rcb" | "dc" | "neutral";
  text: string;
  timeAgo: string;
  reactions: { fire: number; skull: number; cinema: number };
}

export interface FactionTheme {
  id: Faction;
  label: string;
  short: string;
  tagline: string;
}

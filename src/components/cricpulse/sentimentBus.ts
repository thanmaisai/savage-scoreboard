import { useEffect, useState } from "react";

export type Emotion = "joy" | "despair" | "shock" | "neutral";
export interface SentimentSnapshot {
  rcbJoy: number; // 0-100
  dcJoy: number; // 0-100
  lastEvent: "SIX" | "WICKET" | "FOUR" | "DOT" | "CATCH" | "WIDE" | null;
  lastTeam: "rcb" | "dc" | null;
  burstId: number; // increments on each new burst
}

const initial: SentimentSnapshot = {
  rcbJoy: 52,
  dcJoy: 48,
  lastEvent: null,
  lastTeam: null,
  burstId: 0,
};

let state: SentimentSnapshot = initial;
const listeners = new Set<(s: SentimentSnapshot) => void>();

const emit = () => listeners.forEach((l) => l(state));

export const sentimentBus = {
  get: () => state,
  subscribe: (fn: (s: SentimentSnapshot) => void) => {
    listeners.add(fn);
    fn(state);
    return () => listeners.delete(fn);
  },
  pushEvent: (
    event: NonNullable<SentimentSnapshot["lastEvent"]>,
    team: "rcb" | "dc"
  ) => {
    // Joy/despair logic: SIX/FOUR/CATCH = joy for team; WICKET = joy for opposing; DOT/WIDE small swings
    const swings: Record<string, number> = {
      SIX: 14,
      FOUR: 8,
      WICKET: 18,
      CATCH: 10,
      DOT: 3,
      WIDE: 4,
    };
    const swing = swings[event] ?? 5;

    let rcb = state.rcbJoy;
    let dc = state.dcJoy;

    const isWicket = event === "WICKET" || event === "CATCH";
    if (team === "rcb") {
      if (isWicket) {
        // RCB took a wicket against DC
        rcb += swing;
        dc -= swing;
      } else {
        rcb += swing;
        dc -= swing * 0.6;
      }
    } else {
      if (isWicket) {
        dc += swing;
        rcb -= swing;
      } else {
        dc += swing;
        rcb -= swing * 0.6;
      }
    }

    state = {
      rcbJoy: Math.max(5, Math.min(95, rcb)),
      dcJoy: Math.max(5, Math.min(95, dc)),
      lastEvent: event,
      lastTeam: team,
      burstId: state.burstId + 1,
    };
    emit();
  },
};

export const useSentiment = () => {
  const [s, setS] = useState<SentimentSnapshot>(state);
  useEffect(() => {
    const unsub = sentimentBus.subscribe(setS);
    return () => {
      unsub;
    };
  }, []);
  return s;
};

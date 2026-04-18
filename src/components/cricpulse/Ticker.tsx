const ITEMS = [
  "🏏 RCB 167/6",
  "💀 DC needs 26 off 33",
  "🔥 Top fan: @ChinnaswamyChad",
  "⚡ Roast velocity: 4.2/min",
  "🎬 Trending: 'Moye Moye'",
  "📉 Fantasy XI rage index: 92%",
  "🦁 Den population: 12,481",
  "🔵 Fortress population: 9,902",
];

export const Ticker = () => (
  <div className="ticker-mask overflow-hidden border-y border-border bg-background/60 backdrop-blur">
    <div className="flex animate-ticker w-max py-2">
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground px-6 whitespace-nowrap">
          {t} <span className="text-faction mx-2">●</span>
        </span>
      ))}
    </div>
  </div>
);

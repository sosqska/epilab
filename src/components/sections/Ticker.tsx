/** Slow, endless line of brand words between sections. Purely decorative; pauses on hover. */
export function Ticker({ words }: { words: readonly string[] }) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="px-8 font-serif text-4xl whitespace-nowrap text-ink italic md:text-5xl">{w}</span>
          <span className="text-xl text-rose">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group overflow-hidden border-y border-line/70 bg-ivory py-8" aria-hidden>
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}

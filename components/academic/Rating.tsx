import { Star } from "lucide-react";

export function Rating({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font800 text-[var(--color-text)]">
      <Star size={15} className="fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden />
      {rating.toFixed(1)}
      {typeof count === "number" ? (
        <span className="text-[var(--color-text-secondary)]">({count})</span>
      ) : null}
    </span>
  );
}

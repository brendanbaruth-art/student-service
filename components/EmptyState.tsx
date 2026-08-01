import { SearchX } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({
  title = "No students match that search",
  description = "Try a broader task, a different category, or search across all services.",
  actionLabel = "View all students",
  actionHref = "/search",
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-8 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-md bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)]">
        <SearchX size={22} aria-hidden />
      </div>
      <h2 className="mt-4 text-2xl font900 text-[var(--color-text)]">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
        {description}
      </p>
      <Button href={actionHref} className="mt-5">
        {actionLabel}
      </Button>
    </div>
  );
}

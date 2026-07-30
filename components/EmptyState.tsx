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
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-8 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-md bg-[#F8F7F3] text-[#667085]">
        <SearchX size={22} aria-hidden />
      </div>
      <h2 className="mt-4 text-2xl font900 text-[#172033]">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667085]">
        {description}
      </p>
      <Button href={actionHref} className="mt-5">
        {actionLabel}
      </Button>
    </div>
  );
}

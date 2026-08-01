import { CheckCircle2 } from "lucide-react";

export function Toast({ message }: { message: string }) {
  return (
    <div role="status" className="inline-flex items-center gap-2 rounded-md border border-[var(--color-success-border)] bg-[var(--color-success-soft)] px-3 py-2 text-sm font800 text-[var(--color-success)]">
      <CheckCircle2 size={16} aria-hidden />
      {message}
    </div>
  );
}

import { ShieldCheck } from "lucide-react";

export function VerificationBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-soft)] px-3 py-1 text-xs font800 text-[var(--color-success)]">
      <ShieldCheck size={compact ? 13 : 14} aria-hidden />
      Verified student
    </span>
  );
}

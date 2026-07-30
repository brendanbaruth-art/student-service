import { ShieldCheck } from "lucide-react";

export function VerificationBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EF] px-3 py-1 text-xs font800 text-[#26755B]">
      <ShieldCheck size={compact ? 13 : 14} aria-hidden />
      Verified student
    </span>
  );
}

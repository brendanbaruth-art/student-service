import { CheckCircle2 } from "lucide-react";

export function Toast({ message }: { message: string }) {
  return (
    <div role="status" className="inline-flex items-center gap-2 rounded-md border border-[#B7E4D3] bg-[#E8F5EF] px-3 py-2 text-sm font800 text-[#26755B]">
      <CheckCircle2 size={16} aria-hidden />
      {message}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-[#E5E7EB] bg-white p-5" aria-hidden>
      <div className="h-48 rounded-md bg-[#F2F4F7]" />
      <div className="mt-5 h-4 w-2/3 rounded bg-[#F2F4F7]" />
      <div className="mt-3 h-3 w-full rounded bg-[#F2F4F7]" />
      <div className="mt-2 h-3 w-4/5 rounded bg-[#F2F4F7]" />
    </div>
  );
}

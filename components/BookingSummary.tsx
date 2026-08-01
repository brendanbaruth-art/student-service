import type { Student } from "@/lib/data";

export function BookingSummary({ student, duration = 2 }: { student: Student; duration?: number }) {
  const fee = 4;
  const subtotal = student.startingPriceValue * duration;
  const total = subtotal + fee;

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-5">
      <h2 className="text-lg font900 text-[var(--color-text)]">Estimated price</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-text-secondary)]">Student rate</span>
          <span className="font800 text-[var(--color-text)]">{student.startingPrice}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-text-secondary)]">Estimated duration</span>
          <span className="font800 text-[var(--color-text)]">{duration} hours</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--color-text-secondary)]">Etudo service fee</span>
          <span className="font800 text-[var(--color-text)]">&euro;{fee}</span>
        </div>
        <div className="flex justify-between gap-4 border-t border-[var(--color-border)] pt-3 text-base">
          <span className="font900 text-[var(--color-text)]">Estimated total</span>
          <span className="font900 text-[var(--color-brand-dark)]">&euro;{total}</span>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--color-text-secondary)]">
        Final pricing is confirmed before the request is accepted.
      </p>
    </div>
  );
}

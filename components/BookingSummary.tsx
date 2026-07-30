import type { Student } from "@/lib/data";

export function BookingSummary({ student, duration = 2 }: { student: Student; duration?: number }) {
  const fee = 4;
  const subtotal = student.startingPriceValue * duration;
  const total = subtotal + fee;

  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-5">
      <h2 className="text-lg font900 text-[#172033]">Estimated price</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[#667085]">Student rate</span>
          <span className="font800 text-[#172033]">{student.startingPrice}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#667085]">Estimated duration</span>
          <span className="font800 text-[#172033]">{duration} hours</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#667085]">Etudo service fee</span>
          <span className="font800 text-[#172033]">€{fee}</span>
        </div>
        <div className="flex justify-between gap-4 border-t border-[#E5E7EB] pt-3 text-base">
          <span className="font900 text-[#172033]">Estimated total</span>
          <span className="font900 text-[#152238]">€{total}</span>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#667085]">
        Final pricing is confirmed before the request is accepted.
      </p>
    </div>
  );
}

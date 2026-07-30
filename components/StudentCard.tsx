import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import type { Student } from "@/lib/data";
import { getPrimaryService } from "@/lib/data";
import { Button } from "./Button";
import { VerificationBadge } from "./VerificationBadge";

type StudentCardProps = {
  student: Student;
  service?: string;
  category?: string;
};

export function StudentCard({ student, service, category }: StudentCardProps) {
  const primaryService = getPrimaryService(student, category, service);
  const bookingHref = `/booking?student=${student.id}&service=${encodeURIComponent(
    primaryService.name,
  )}`;

  return (
    <article className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(21,34,56,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(21,34,56,0.08)]">
      <Link href={`/students/${student.id}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B7CFA]">
        <div className="relative h-56 bg-[#F2F4F7]">
          <Image
            src={student.photo}
            alt={`Profile photograph of ${student.displayName}, ${student.university}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href={`/students/${student.id}`} className="text-xl font900 text-[#172033] hover:text-[#5B7CFA]">
              {student.displayName}
            </Link>
            <p className="mt-1 truncate text-sm font700 text-[#667085]">{student.university}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-sm font800 text-[#172033]" aria-label={`${student.rating.toFixed(1)} rating from ${student.reviews} reviews`}>
            <Star size={16} className="fill-[#F5B544] text-[#F5B544]" aria-hidden />
            {student.rating.toFixed(1)}
          </div>
        </div>
        <div className="mt-3">
          <VerificationBadge compact />
        </div>
        <div className="mt-4 grid gap-2 text-sm text-[#667085]">
          <p className="flex items-center gap-2">
            <MapPin size={16} aria-hidden />
            {student.area}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} aria-hidden />
            {student.availability}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {student.services.slice(0, 2).map((item) => (
            <span key={item.name} className="rounded-full bg-[#F8F7F3] px-3 py-1 text-xs font800 text-[#475467]">
              {item.name}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E5E7EB] pt-4">
          <div>
            <p className="text-sm text-[#667085]">Starts at</p>
            <p className="text-base font900 text-[#152238]">{student.startingPrice}</p>
            <p className="mt-1 text-xs font700 text-[#667085]">{student.reviews} reviews</p>
          </div>
          <Button href={bookingHref} className="px-4">
            View profile
          </Button>
        </div>
      </div>
    </article>
  );
}

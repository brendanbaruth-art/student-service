import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import type { Student } from "@/lib/data";
import { getPrimaryService } from "@/lib/data";
import { Button } from "./Button";
import { FavoriteButton } from "./FavoriteButton";
import { VerificationBadge } from "./VerificationBadge";

type StudentCardProps = {
  student: Student;
  service?: string;
  category?: string;
};

export function StudentCard({ student, service, category }: StudentCardProps) {
  const primaryService = getPrimaryService(student, category, service);
  const extraServices = Math.max(0, student.services.length - 3);

  return (
    <article className="group overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-small)] transition duration-[var(--duration-standard)] hover:-translate-y-1 hover:shadow-[var(--shadow-medium)]">
      <div className="relative h-60 overflow-hidden bg-[var(--color-surface-soft)]">
        <Link
          href={`/students/${student.id}`}
          className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]"
        >
          <Image
            src={student.photo}
            alt={`Profile photograph of ${student.displayName}, ${student.university}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-brand-dark)]/32 to-transparent" />
        </Link>
        <div className="absolute right-3 top-3">
          <FavoriteButton studentId={student.id} label={student.displayName} />
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font900 text-[var(--color-brand-dark)] shadow-[0_8px_18px_rgba(21,34,56,0.16)] backdrop-blur">
          {student.availabilityTag}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={`/students/${student.id}`}
              className="text-xl font900 text-[var(--color-text)] hover:text-[var(--color-brand)]"
            >
              {student.displayName}
            </Link>
            <p className="mt-1 truncate text-sm font700 text-[var(--color-text-secondary)]">
              {student.university}
            </p>
          </div>
          <div
            className="flex shrink-0 items-center gap-1 text-sm font800 text-[var(--color-text)]"
            aria-label={`${student.rating.toFixed(1)} rating from ${student.reviews} reviews`}
          >
            <Star size={16} className="fill-[#F5B544] text-[#F5B544]" aria-hidden />
            {student.rating.toFixed(1)}
          </div>
        </div>
        <div className="mt-3">
          {student.verified ? (
            <VerificationBadge compact />
          ) : (
            <span className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs font800 text-[var(--color-text-secondary)]">
              New on Etudo
            </span>
          )}
        </div>
        <div className="mt-4 grid gap-2 text-sm text-[var(--color-text-secondary)]">
          <p className="flex items-center gap-2">
            <MapPin size={16} aria-hidden />
            {student.area} <span aria-hidden>&middot;</span> {student.distance}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} aria-hidden />
            {student.responseTime}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {student.services.slice(0, 3).map((item) => (
            <span
              key={item.name}
              className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs font800 text-[var(--color-text-secondary)]"
            >
              {item.name}
            </span>
          ))}
          {extraServices ? (
            <span className="rounded-full bg-[var(--color-blue-soft)] px-3 py-1 text-xs font900 text-[var(--color-brand)]">
              +{extraServices}
            </span>
          ) : null}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <div>
            <p className="text-sm text-[var(--color-text-secondary)]">Starts at</p>
            <p className="text-base font900 text-[var(--color-brand-dark)]">{primaryService.price}</p>
            <p className="mt-1 text-xs font700 text-[var(--color-text-secondary)]">
              {student.newOnEtudo ? "New on Etudo" : `${student.reviews} reviews`}
            </p>
          </div>
          <Button href={`/students/${student.id}`} className="px-4">
            View profile
          </Button>
        </div>
      </div>
    </article>
  );
}

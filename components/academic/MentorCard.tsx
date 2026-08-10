import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, GraduationCap, MapPin, Monitor, Star } from "lucide-react";
import type { MentorProfile } from "@/lib/academic";
import { formatCourseContext } from "@/lib/academic";

export function MentorCard({ mentor, courseId, compact = false }: { mentor: MentorProfile; courseId?: string; compact?: boolean }) {
  const highlight = mentor.courseHighlights.find((item) => item.courseId === courseId) || mentor.courseHighlights[0];
  const { course, professor, university } = formatCourseContext(highlight.courseId, highlight.professorId);

  return (
    <article className={`grid gap-4 rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-small)] transition hover:-translate-y-1 hover:border-[var(--color-brand)] hover:shadow-[var(--shadow-medium)] ${compact ? "sm:grid-cols-[132px_1fr]" : "sm:grid-cols-[160px_1fr]"}`}>
      <div className={`relative overflow-hidden rounded-md bg-[var(--color-surface-soft)] ${compact ? "h-40 sm:h-full" : "h-48 sm:h-full"}`}>
        <Image src={mentor.photo} alt={`Profile photograph of ${mentor.displayName}`} fill sizes={compact ? "180px" : "240px"} className="object-cover" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font900 text-[var(--color-brand-dark)]">{mentor.displayName}</h3>
              <span className="inline-flex items-center gap-1 text-sm font900 text-[var(--color-brand-dark)]">
                <Star size={15} className="fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden />
                {mentor.rating.toFixed(1)}
              </span>
              {mentor.verified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-soft)] px-2.5 py-1 text-xs font900 text-[var(--color-success)]">
                  <BadgeCheck size={14} aria-hidden /> Verified
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm font800 text-[var(--color-text-secondary)]">{university?.name}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font900 text-[var(--color-text-secondary)]">
              <MapPin size={13} aria-hidden /> {mentor.area}
              <span aria-hidden>&middot;</span>
              {mentor.distance}
            </p>
          </div>
          <div className="shrink-0 sm:text-right">
            <p className="text-2xl font900 text-[var(--color-brand-dark)]">&euro;{mentor.hourlyRate}/hour</p>
            <p className="mt-1 text-xs font800 text-[var(--color-text-secondary)]">{mentor.reviews} reviews</p>
          </div>
        </div>

        <div className="mt-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3">
          <p className="text-xs font900 uppercase tracking-[0.14em] text-[var(--color-brand)]">{course?.subject}</p>
          <p className="mt-1 text-base font900 text-[var(--color-brand-dark)]">{course?.title}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{professor?.name}</p>
          {highlight.verified ? (
            <p className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font900 text-[var(--color-brand)]">
              Course verified - Grade {highlight.grade}
            </p>
          ) : null}
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[var(--color-text-secondary)]">{mentor.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font900 text-[var(--color-text-secondary)]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-blue-soft)] px-3 py-1">
            <Clock size={13} aria-hidden /> {mentor.nextAvailable}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-blue-soft)] px-3 py-1">
            <GraduationCap size={13} aria-hidden /> {mentor.completedSessions} sessions
          </span>
          {mentor.modes.includes("Online") ? <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-blue-soft)] px-3 py-1"><Monitor size={13} aria-hidden /> Online</span> : null}
          {mentor.modes.includes("In person") ? <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-blue-soft)] px-3 py-1"><MapPin size={13} aria-hidden /> In person</span> : null}
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link href={`/students/${mentor.id}`} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--color-brand)] px-4 text-sm font900 text-white transition hover:bg-[#1D4ED8]">
            View profile
          </Link>
          <Link href={`/booking?student=${mentor.id}&course=${highlight.courseId}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--color-border)] bg-white px-4 text-sm font900 text-[var(--color-brand-dark)] transition hover:border-[var(--color-brand)]">
            Book session
          </Link>
        </div>
      </div>
    </article>
  );
}

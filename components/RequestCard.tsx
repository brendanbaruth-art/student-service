import { CalendarClock, Clock, MapPin, Star, Users } from "lucide-react";
import type { OpenRequest } from "@/lib/data";
import { Button } from "./Button";

export function RequestCard({ request }: { request: OpenRequest }) {
  return (
    <article className="rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_1px_2px_rgba(21,34,56,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(21,34,56,0.08)]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <span className="inline-flex rounded-full bg-[var(--color-blue-soft)] px-3 py-1 text-xs font900 text-[var(--color-brand)]">
            {request.category}
          </span>
          <h3 className="mt-3 text-xl font900 text-[var(--color-brand-dark)]">{request.title}</h3>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font700 text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <MapPin size={15} aria-hidden /> {request.area}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarClock size={15} aria-hidden /> {request.timing}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} aria-hidden /> {request.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={15} aria-hidden /> {request.interested} interested
            </span>
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            Posted by <span className="font900 text-[var(--color-text)]">{request.postedBy}</span>{" "}
            <span className="inline-flex items-center gap-1">
              <Star size={13} className="fill-[#F5B544] text-[#F5B544]" aria-hidden /> {request.posterRating.toFixed(1)}
            </span>{" "}
            · {request.postedAgo} · {request.mode}
          </p>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="text-2xl font900 text-[var(--color-brand-dark)]">{request.budget}</p>
          <p className="mt-1 text-xs font800 uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">Budget</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 border-t border-[var(--color-border)] pt-4 sm:flex-row sm:justify-end">
        <Button href={`/requests/${request.id}`} variant="secondary">
          View request
        </Button>
        <Button href={`/messages?request=${request.id}`}>
          I&apos;m interested
        </Button>
      </div>
    </article>
  );
}

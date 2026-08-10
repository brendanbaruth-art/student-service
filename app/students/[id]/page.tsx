import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BadgeCheck, CalendarDays, GraduationCap, MapPin, MessageCircle, Monitor, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/Button";
import { NoteCard } from "@/components/academic/NoteCard";
import { Rating } from "@/components/academic/Rating";
import { PageShell } from "@/components/PageShell";
import { formatCourseContext, getMentor, mentors, noteListings } from "@/lib/academic";

type MentorProfileProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return mentors.map((mentor) => ({ id: mentor.id }));
}

export async function generateMetadata({ params }: MentorProfileProps) {
  const { id } = await params;
  const mentor = getMentor(id);
  return {
    title: mentor ? `${mentor.displayName} mentor profile` : "Mentor profile",
    description: mentor?.bio || "View a verified course mentor on Etudo.",
  };
}

export default async function MentorProfilePage({ params }: MentorProfileProps) {
  const { id } = await params;
  const mentor = getMentor(id);
  if (!mentor) notFound();

  const primary = mentor.courseHighlights[0];
  const primaryContext = formatCourseContext(primary.courseId, primary.professorId);
  const mentorNotes = noteListings.filter((note) => mentor.courseIds.includes(note.courseId)).slice(0, 3);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <div className="relative h-[420px] overflow-hidden rounded-[var(--radius-medium)] bg-[var(--color-surface-soft)]">
            <Image src={mentor.photo} alt={`Profile photograph of ${mentor.displayName}`} fill priority sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
          </div>
          <div className="self-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-success-soft)] px-3 py-1 text-sm font900 text-[var(--color-success)]">
              <BadgeCheck size={16} aria-hidden /> Verified student mentor
            </span>
            <h1 className="mt-5 text-5xl font900 tracking-tight text-[var(--color-brand-dark)]">{mentor.displayName}</h1>
            <p className="mt-3 text-lg font800 text-[var(--color-text-secondary)]">
              {primaryContext.university?.name} - {mentor.program} - {mentor.year}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font700 text-[var(--color-text-secondary)]">
              <Rating rating={mentor.rating} count={mentor.reviews} />
              <span className="flex items-center gap-2"><MessageCircle size={17} aria-hidden /> {mentor.responseTime}</span>
              <span className="flex items-center gap-2"><MapPin size={17} aria-hidden /> {mentor.area} - {mentor.distance}</span>
              <span className="flex items-center gap-2"><GraduationCap size={17} aria-hidden /> {mentor.completedSessions} sessions</span>
              <span className="flex items-center gap-2"><CalendarDays size={17} aria-hidden /> {mentor.nextAvailable}</span>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">{mentor.bio}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={`/booking?student=${mentor.id}&course=${primary.courseId}`}>Book Session</Button>
              <Button href="/browse" variant="secondary">Back to mentors</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="grid gap-8">
          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6">
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">About</h2>
            <p className="mt-4 max-w-3xl leading-7 text-[var(--color-text-secondary)]">{mentor.bio}</p>
          </section>

          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6">
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Courses completed</h2>
            <div className="mt-5 grid gap-4">
              {mentor.courseHighlights.map((highlight) => {
                const context = formatCourseContext(highlight.courseId, highlight.professorId);
                return (
                  <div key={highlight.courseId} className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-xs font900 uppercase tracking-[0.14em] text-[var(--color-brand)]">Previously completed</p>
                        <h3 className="mt-1 text-xl font900 text-[var(--color-brand-dark)]">{context.course?.title}</h3>
                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{context.professor?.name} - {context.university?.name}</p>
                        <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{highlight.note}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-[var(--color-yellow-soft)] px-3 py-1 text-sm font900 text-[var(--color-brand-dark)]">
                        Course verified - {highlight.grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Academic verification</h2>
              <div className="mt-5 grid gap-3 text-sm font800 text-[var(--color-text)]">
                {["Student email verified", "Student ID reviewed", "Course completion checked", "Grades privately reviewed where available"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md bg-[var(--color-surface-soft)] p-3">
                    <ShieldCheck size={16} className="text-[var(--color-success)]" aria-hidden /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Availability</h2>
              <div className="mt-5 grid gap-2 text-sm">
                {["Today 18:30", "Tomorrow 10:00", "Friday 14:00", "Weekend by request"].map((slot) => (
                  <div key={slot} className="flex items-center justify-between rounded-md bg-[var(--color-surface-soft)] px-3 py-3">
                    <span className="font900 text-[var(--color-text)]">{slot}</span>
                    <span className="font800 text-[var(--color-brand)]">Available</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6">
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Skills and session format</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoPill icon={<Monitor size={16} aria-hidden />} label={mentor.modes.join(" / ")} />
              <InfoPill icon={<MapPin size={16} aria-hidden />} label={`${mentor.area} - ${mentor.distance}`} />
              <InfoPill icon={<Users size={16} aria-hidden />} label={`${mentor.completedSessions} completed sessions`} />
              <InfoPill icon={<MessageCircle size={16} aria-hidden />} label={mentor.responseTime} />
            </div>
          </section>

          {mentorNotes.length ? (
            <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6">
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Notes from related courses</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {mentorNotes.map((note) => <NoteCard key={note.id} note={note} />)}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-medium)] lg:sticky lg:top-24">
          <p className="text-sm text-[var(--color-text-secondary)]">Mentoring rate</p>
          <p className="mt-1 text-4xl font900 text-[var(--color-brand-dark)]">&euro;{mentor.hourlyRate}/hour</p>
          <div className="mt-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
            <p className="text-sm font900 text-[var(--color-brand-dark)]">{primaryContext.course?.title}</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{primaryContext.professor?.name}</p>
          </div>
          <Button href={`/booking?student=${mentor.id}&course=${primary.courseId}`} className="mt-5 w-full">Book Session</Button>
          <p className="mt-4 text-xs leading-5 text-[var(--color-text-secondary)]">
            Etudo plans to take a 7% commission from completed tutoring bookings.
          </p>
        </aside>
      </section>
    </PageShell>
  );
}

function InfoPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-[var(--color-surface-soft)] px-3 py-3 text-sm font800 text-[var(--color-text)]">
      <span className="text-[var(--color-brand)]">{icon}</span>
      {label}
    </div>
  );
}

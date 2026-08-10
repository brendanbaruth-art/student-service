import { MentorCard } from "@/components/academic/MentorCard";
import { NoteCard } from "@/components/academic/NoteCard";
import { PageShell } from "@/components/PageShell";
import { mentors, noteListings } from "@/lib/academic";

export const metadata = {
  title: "Saved academic resources",
  description: "View saved Etudo mentors and notes.",
};

export default function SavedPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Saved
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
            Saved mentors and notes
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Keep track of mentors and study materials you may want to use for your next exam.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Mentors</h2>
          <div className="mt-5 grid gap-5">
            {mentors.slice(0, 2).map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Notes</h2>
          <div className="mt-5 grid gap-5">
            {noteListings.slice(0, 3).map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

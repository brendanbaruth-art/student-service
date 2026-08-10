import { AcademicSearch } from "@/components/academic/AcademicSearch";
import { NoteCard } from "@/components/academic/NoteCard";
import { PageShell } from "@/components/PageShell";
import { noteListings, subjects } from "@/lib/academic";

export const metadata = {
  title: "Notes Marketplace",
  description: "Study materials created by students who already took your course.",
};

export default function NotesMarketplacePage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Notes Marketplace</p>
          <h1 className="mt-3 max-w-4xl text-page-heading font900 text-[var(--color-brand-dark)]">
            Study materials created by students who already took your course.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Browse notes by university, course, professor, and subject. Preview selected pages before buying.
          </p>
          <div className="mt-8">
            <AcademicSearch compact />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          {subjects.map((subject) => (
            <a key={subject} href={`#${subject.toLowerCase().replaceAll(" ", "-")}`} className="shrink-0 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font800 text-[var(--color-text-secondary)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
              {subject}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">{noteListings.length} academic note packs</h2>
            <p className="mt-1 text-sm font700 text-[var(--color-text-secondary)]">Organized by course, professor, and university</p>
          </div>
          <a href="/sell-notes" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--color-brand)] px-5 text-sm font900 text-white">
            Sell Notes
          </a>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {noteListings.map((note) => <NoteCard key={note.id} note={note} />)}
        </div>
      </section>
    </PageShell>
  );
}

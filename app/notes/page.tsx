import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { AcademicSearch } from "@/components/academic/AcademicSearch";
import { NoteCard } from "@/components/academic/NoteCard";
import { NoteFilters } from "@/components/academic/NoteFilters";
import { PageShell } from "@/components/PageShell";
import { filterNotes, subjects, type NoteFilterInput } from "@/lib/academic";

type NotesPageProps = {
  searchParams?: Promise<NoteFilterInput>;
};

export const metadata = {
  title: "Notes Marketplace",
  description: "Study materials created by students who already took your course.",
};

export default async function NotesMarketplacePage({ searchParams }: NotesPageProps) {
  const params = (await searchParams) || {};
  const notes = filterNotes(params);
  const activeSubject = params.subject && params.subject !== "all" ? params.subject : "";

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Notes Marketplace</p>
          <h1 className="mt-3 max-w-4xl text-page-heading font900 text-[var(--color-brand-dark)]">
            Study materials created by students who already took your course.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Search by university, course, professor, subject, title, or seller. Preview selected pages before buying.
          </p>
          <div className="mt-8">
            <AcademicSearch action="/notes" compact defaultQuery={params.q || params.course || ""} defaultUniversity={params.university || "all"} defaultProfessor={params.professor || ""} />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/notes" className={`shrink-0 rounded-full border px-4 py-2 text-sm font800 transition ${!activeSubject ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"}`}>
            All Notes
          </Link>
          {subjects.map((subject) => (
            <Link key={subject} href={`/notes?subject=${encodeURIComponent(subject)}`} className={`shrink-0 rounded-full border px-4 py-2 text-sm font800 transition ${activeSubject === subject ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"}`}>
              {subject}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <div className="lg:hidden">
          <details className="rounded-[var(--radius-small)] border border-[var(--color-border)] bg-white">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font900 text-[var(--color-text)]">
              Filters
              <SlidersHorizontal size={18} aria-hidden />
            </summary>
            <div className="border-t border-[var(--color-border)] p-4">
              <NoteFilters values={params} />
            </div>
          </details>
        </div>
        <div className="hidden lg:block">
          <NoteFilters values={params} />
        </div>
        <div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">
                {notes.length} {activeSubject ? `${activeSubject} ` : "academic "}note packs
              </h2>
              <p className="mt-1 text-sm font700 text-[var(--color-text-secondary)]">Organized by course, professor, university, and seller quality</p>
            </div>
            <a href="/sell-notes" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--color-brand)] px-5 text-sm font900 text-white">
              Sell Notes
            </a>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {notes.map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import type { ReactNode } from "react";
import { AcademicSearch } from "@/components/academic/AcademicSearch";
import { CourseCard } from "@/components/academic/CourseCard";
import { MentorCard } from "@/components/academic/MentorCard";
import { NoteCard } from "@/components/academic/NoteCard";
import { PageShell } from "@/components/PageShell";
import { searchAcademic } from "@/lib/academic";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export const metadata = {
  title: "Search",
  description: "Search Etudo by course, professor, mentor, university, and student notes.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q || "";
  const results = searchAcademic(query);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Academic search</p>
          <h1 className="mt-3 text-page-heading font900 text-[var(--color-brand-dark)]">
            {query ? `Results for "${query}"` : "Search courses, mentors, professors, and notes."}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Etudo prioritizes course pages first, then mentors and notes connected to the same academic context.
          </p>
          <div className="mt-8">
            <AcademicSearch defaultQuery={query} compact />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:px-8">
        <ResultSection title="Courses" count={results.courses.length}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.courses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </ResultSection>
        <ResultSection title="Mentors" count={results.mentors.length}>
          <div className="grid gap-5">
            {results.mentors.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)}
          </div>
        </ResultSection>
        <ResultSection title="Notes" count={results.notes.length}>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.notes.map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
        </ResultSection>
      </section>
    </PageShell>
  );
}

function ResultSection({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">{title}</p>
          <h2 className="mt-2 text-2xl font900 text-[var(--color-brand-dark)]">{count} found</h2>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

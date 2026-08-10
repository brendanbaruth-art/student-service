import { Grid2X2, List, Map, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { AcademicSearch } from "@/components/academic/AcademicSearch";
import { CourseCard } from "@/components/academic/CourseCard";
import { MentorCard } from "@/components/academic/MentorCard";
import { SearchFilters } from "@/components/academic/SearchFilters";
import { MapClient } from "@/components/map/MapClient";
import { PageShell } from "@/components/PageShell";
import { courses, filterMentors, mentorsToMapStudents, subjects, type MentorFilterInput } from "@/lib/academic";

type BrowsePageProps = {
  searchParams?: Promise<MentorFilterInput & {
    view?: string;
  }>;
};

export const metadata = {
  title: "Find a Mentor",
  description: "Find verified student mentors by university, course, professor, price, rating, distance, and availability.",
};

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = (await searchParams) || {};
  const view = params.view === "map" || params.view === "split" ? params.view : "list";
  const activeCourse = courses.find((course) => course.id === params.course || course.slug === params.course);
  const mentorResults = filterMentors(params);
  const mapStudents = mentorsToMapStudents(mentorResults);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Find a Mentor</p>
          <h1 className="mt-3 max-w-4xl text-page-heading font900 text-[var(--color-brand-dark)]">
            Compare mentors who already took your course.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Search by university, course, professor, subject, distance, price, and availability.
          </p>
          <div className="mt-8">
            <AcademicSearch action="/browse" compact defaultQuery={params.q || params.course || ""} defaultUniversity={params.university || "all"} defaultProfessor={params.professor || ""} />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          <a href="/browse" className="shrink-0 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font800 text-[var(--color-text-secondary)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
            All mentors
          </a>
          {subjects.map((subject) => (
            <a
              key={subject}
              href={`/browse?subject=${encodeURIComponent(subject)}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font800 transition ${
                params.subject === subject
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              }`}
            >
              {subject}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <div className="lg:hidden">
          <details className="rounded-[var(--radius-small)] border border-[var(--color-border)] bg-white">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font900 text-[var(--color-text)]">
              Filters
              <SlidersHorizontal size={18} aria-hidden />
            </summary>
            <div className="border-t border-[var(--color-border)] p-4">
              <SearchFilters values={{ ...params, view }} />
            </div>
          </details>
        </div>
        <div className="hidden lg:block">
          <SearchFilters values={{ ...params, view }} />
        </div>
        <div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">
                {mentorResults.length} {mentorResults.length === 1 ? "mentor" : "verified mentors"}
              </h2>
              <p className="mt-1 text-sm font700 text-[var(--color-text-secondary)]">
                {activeCourse ? `Filtered to ${activeCourse.title}` : "Sorted by course relevance, rating, distance, and availability"}
              </p>
            </div>
            <div className="flex rounded-md border border-[var(--color-border)] bg-white p-1">
              <ToggleLink href={withView(params, "list")} active={view === "list"} icon={<List size={16} aria-hidden />} label="List" />
              <ToggleLink href={withView(params, "map")} active={view === "map"} icon={<Map size={16} aria-hidden />} label="Map" />
              <ToggleLink href={withView(params, "split")} active={view === "split"} icon={<Grid2X2 size={16} aria-hidden />} label="Split" />
            </div>
          </div>

          {view === "map" ? (
            <div className="mt-6 overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-3 shadow-[var(--shadow-medium)]">
              <MapClient students={mapStudents} title="Mentors near university areas" variant="marketplace" searchQuery={params.q || params.course || params.subject || "Academic mentors"} />
            </div>
          ) : view === "split" ? (
            <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.95fr]">
              <div className="grid gap-4">
                {mentorResults.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} courseId={activeCourse?.id} />)}
              </div>
              <div className="overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-3 shadow-[var(--shadow-medium)] xl:sticky xl:top-24 xl:h-fit">
                <MapClient students={mapStudents} title="Mentors near university areas" variant="marketplace" searchQuery={params.q || params.course || params.subject || "Academic mentors"} />
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {mentorResults.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} courseId={activeCourse?.id} compact />)}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Course pages</p>
              <h2 className="mt-3 text-section-heading font900 text-[var(--color-brand-dark)]">Mentors and notes connect through courses.</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function ToggleLink({ href, active, icon, label }: { href: string; active: boolean; icon: ReactNode; label: string }) {
  return (
    <a href={href} className={`inline-flex min-h-9 items-center gap-1 rounded px-3 text-xs font900 transition ${active ? "bg-[var(--color-brand)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)]"}`}>
      {icon}
      {label}
    </a>
  );
}

function withView(params: MentorFilterInput & { view?: string }, view: string) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== "view") search.set(key, value);
  });
  search.set("view", view);
  return `/browse?${search.toString()}`;
}

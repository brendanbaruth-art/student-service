import { SlidersHorizontal } from "lucide-react";
import { AcademicSearch } from "@/components/academic/AcademicSearch";
import { CourseCard } from "@/components/academic/CourseCard";
import { MentorCard } from "@/components/academic/MentorCard";
import { SearchFilters } from "@/components/academic/SearchFilters";
import { PageShell } from "@/components/PageShell";
import { courses, mentors } from "@/lib/academic";

type BrowsePageProps = {
  searchParams?: Promise<{
    q?: string;
    course?: string;
  }>;
};

export const metadata = {
  title: "Find a Mentor",
  description: "Find verified student mentors by university, course, professor, price, rating, and availability.",
};

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  const query = params?.q || "";
  const activeCourse = courses.find((course) => course.id === params?.course || course.slug === params?.course);
  const mentorResults = activeCourse ? mentors.filter((mentor) => mentor.courseIds.includes(activeCourse.id)) : mentors;

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Find a Mentor</p>
          <h1 className="mt-3 max-w-4xl text-page-heading font900 text-[var(--color-brand-dark)]">
            Compare mentors who already took your course.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Search by university, course, and professor. See verified course history, ratings, pricing, and next availability.
          </p>
          <div className="mt-8">
            <AcademicSearch compact defaultQuery={query} />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          {courses.map((course) => (
            <a
              key={course.id}
              href={`/browse?course=${course.slug}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font800 transition ${
                activeCourse?.id === course.id
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-text)]"
              }`}
            >
              {course.title}
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
              <SearchFilters />
            </div>
          </details>
        </div>
        <div className="hidden lg:block">
          <SearchFilters />
        </div>
        <div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">
                {mentorResults.length} verified mentors
              </h2>
              <p className="mt-1 text-sm font700 text-[var(--color-text-secondary)]">
                Sorted by course relevance, rating, and availability
              </p>
            </div>
            <a href="/offer" className="text-sm font900 text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]">
              Become a mentor
            </a>
          </div>
          <div className="mt-6 grid gap-5">
            {mentorResults.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} courseId={activeCourse?.id} />
            ))}
          </div>
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

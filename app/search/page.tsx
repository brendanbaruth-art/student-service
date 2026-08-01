import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { FilterControls } from "@/components/FilterControls";
import { FindHelpResults } from "@/components/FindHelpResults";
import { PageShell } from "@/components/PageShell";
import { RecentSearches } from "@/components/RecentSearches";
import { SearchBox } from "@/components/SearchBox";
import { categories, correctSearchQuery, findCategory, searchStudents } from "@/lib/data";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    view?: string;
    areas?: string;
  }>;
};

export const metadata = {
  title: "Search results",
  description: "Search verified students by task, service category, price, and availability.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q || "";
  const category = params?.category || "";
  const initialView = params?.view === "map" ? "map" : "list";
  const initialAreas = parseAreas(params?.areas);
  const correctedQuery = correctSearchQuery(query);
  const activeCategory = findCategory(category);
  const results = searchStudents(query, category);
  const title = query
    ? `Results for "${query}"`
    : activeCategory
      ? activeCategory.name
      : "Students available to help in Paris";
  const corrected = query && correctedQuery.toLowerCase() !== query.trim().toLowerCase();

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Find help
          </p>
          <h1 className="mt-3 text-page-heading font900 text-[var(--color-brand-dark)]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Compare students by services, price, rating, response time, and availability.
          </p>
          {corrected ? (
            <p className="mt-4 inline-flex rounded-full bg-[var(--color-success-soft)] px-3 py-2 text-sm font900 text-[var(--color-success)]">
              Showing results for &quot;{correctedQuery}&quot;
            </p>
          ) : null}
          <div className="mt-8">
            <SearchBox defaultValue={query} compact />
          </div>
          <RecentSearches />
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/search"
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font800 ${
              !category
                ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)]"
            }`}
          >
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/search?category=${item.slug}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font800 transition ${
                item.slug === category
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-text)]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <div className="lg:hidden">
          <details className="rounded-[var(--radius-small)] border border-[var(--color-border)] bg-white">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font900 text-[var(--color-text)]">
              Filters and sort
              <SlidersHorizontal size={18} aria-hidden />
            </summary>
            <div className="border-t border-[var(--color-border)] p-4">
              <FilterControls category={category} />
            </div>
          </details>
        </div>
        <div className="hidden lg:block">
          <FilterControls category={category} />
        </div>

        <div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">
                {results.length} {results.length === 1 ? "student" : "students"} found
              </h2>
              <p className="mt-1 text-sm font700 text-[var(--color-text-secondary)]">
                Sorted by Recommended <span aria-hidden>&middot;</span> Paris
              </p>
            </div>
          </div>
          {results.length ? (
            <div className="mt-6">
              <FindHelpResults
                students={results}
                category={category}
                service={correctedQuery || activeCategory?.name}
                initialView={initialView}
                initialAreas={initialAreas}
              />
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState />
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function parseAreas(value?: string) {
  return (value || "")
    .split(",")
    .map((item) => Number(item))
    .filter((item) => Number.isInteger(item) && item >= 1 && item <= 20);
}

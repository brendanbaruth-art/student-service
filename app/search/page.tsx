import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { FilterControls } from "@/components/FilterControls";
import { PageShell } from "@/components/PageShell";
import { SearchBox } from "@/components/SearchBox";
import { StudentCard } from "@/components/StudentCard";
import { categories, findCategory, searchStudents } from "@/lib/data";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
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
  const activeCategory = findCategory(category);
  const results = searchStudents(query, category);
  const title = query
    ? `Results for "${query}"`
    : activeCategory
      ? activeCategory.name
      : "Students available to help in Paris";

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
            Find help
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#667085]">
            Compare students by services, price, rating, response time, and availability.
          </p>
          <div className="mt-8">
            <SearchBox defaultValue={query} compact />
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#F8F7F3]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/search"
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font800 ${
              !category
                ? "border-[#5B7CFA] bg-[#5B7CFA] text-white"
                : "border-[#E5E7EB] bg-white text-[#667085]"
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
                  ? "border-[#5B7CFA] bg-[#5B7CFA] text-white"
                  : "border-[#E5E7EB] bg-white text-[#667085] hover:border-[#5B7CFA] hover:text-[#172033]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <div className="lg:hidden">
          <details className="rounded-lg border border-[#E5E7EB] bg-white">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font900 text-[#172033]">
              Filters and sort
              <SlidersHorizontal size={18} aria-hidden />
            </summary>
            <div className="border-t border-[#E5E7EB] p-4">
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
              <h2 className="text-2xl font900 text-[#152238]">
                {results.length} {results.length === 1 ? "student" : "students"} found
              </h2>
              <p className="mt-1 text-sm font700 text-[#667085]">
                Sorted by Recommended · Paris
              </p>
            </div>
          </div>
          {results.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  category={category}
                  service={query || activeCategory?.name}
                />
              ))}
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

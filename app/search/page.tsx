import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SearchBox } from "@/components/SearchBox";
import { StudentCard } from "@/components/StudentCard";
import { categories, searchStudents } from "@/lib/data";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
  }>;
};

export const metadata = {
  title: "Search Results | CampusLift",
  description: "Search student helpers by task, category, and skill.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q || "";
  const category = params?.category || "";
  const results = searchStudents(query, category);
  const activeCategory = categories.find((item) => item.slug === category);
  const title = query
    ? `Results for "${query}"`
    : activeCategory
      ? activeCategory.name
      : "Search student helpers";

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
            Search results
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Compare student helpers by verified status, skills, prices, reviews, and availability.
          </p>
          <div className="mt-8">
            <SearchBox defaultValue={query} compact />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
          <p className="font-black text-slate-950">Categories</p>
          <div className="mt-4 grid gap-2">
            <Link
              href="/search"
              className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
            >
              All categories
            </Link>
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/search?category=${item.slug}`}
                className={`rounded-lg px-3 py-2 text-sm font-bold ${
                  item.slug === category
                    ? "bg-teal-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-500">{results.length} matching students</p>
            <p className="text-sm font-bold text-slate-500">Sorted by relevance</p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((student) => (
              <StudentCard key={student.id} student={student} service={query || activeCategory?.name} />
            ))}
          </div>
          {results.length === 0 ? (
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-8 text-center">
              <h2 className="text-2xl font-black text-slate-950">No mock helpers yet</h2>
              <p className="mt-3 text-slate-600">
                Try searching for moving, tutoring, photography, cleaning, or tech help.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}

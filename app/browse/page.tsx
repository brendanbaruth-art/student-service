import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { FilterControls } from "@/components/FilterControls";
import { FindHelpResults } from "@/components/FindHelpResults";
import { PageShell } from "@/components/PageShell";
import { RequestCard } from "@/components/RequestCard";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { categories, openRequests, popularCategories, students } from "@/lib/data";

export const metadata = {
  title: "Find help",
  description: "Find verified student help across Paris with Etudo.",
};

export default function BrowsePage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
            Find help
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
            Students available to help in Paris.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#667085]">
            Search by task, compare verified helpers, and choose the right person for your schedule.
          </p>
          <div className="mt-8">
            <SearchBox compact />
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#F8F7F3]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/search"
              className="shrink-0 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font800 text-[#172033]"
            >
              All services
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/search?category=${category.slug}`}
                className="shrink-0 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font800 text-[#667085] transition hover:border-[#5B7CFA] hover:text-[#172033]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <div className="lg:hidden">
          <details className="rounded-lg border border-[#E5E7EB] bg-white">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font900 text-[#172033]">
              Filters
              <SlidersHorizontal size={18} aria-hidden />
            </summary>
            <div className="border-t border-[#E5E7EB] p-4">
              <FilterControls />
            </div>
          </details>
        </div>
        <div className="hidden lg:block">
          <FilterControls />
        </div>
        <div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font900 text-[#152238]">
                Students available to help in Paris
              </h2>
              <p className="mt-1 text-sm font700 text-[#667085]">
                {students.length} results · Recommended first
              </p>
            </div>
            <Link href="/offer" className="inline-flex items-center gap-1 text-sm font900 text-[#5B7CFA] hover:text-[#152238]">
              Want to offer help? <ChevronRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="mt-6">
            <FindHelpResults students={students} />
          </div>
          {students.length === 0 ? <EmptyState /> : null}
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#EEF3FF]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
                Open requests
              </p>
              <h2 className="mt-3 text-3xl font900 text-[#152238]">
                Students looking for help right now.
              </h2>
            </div>
            <Link href="/requests" className="text-sm font900 text-[#5B7CFA] hover:text-[#152238]">
              Browse all requests
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {openRequests.slice(0, 4).map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
                Popular categories
              </p>
              <h2 className="mt-3 text-3xl font900 text-[#152238]">
                Start with a common task.
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularCategories.map((category) => (
              <ServiceCard key={category.slug} category={category} compact />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

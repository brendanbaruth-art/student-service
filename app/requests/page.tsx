import { PageShell } from "@/components/PageShell";
import { RequestCard } from "@/components/RequestCard";
import { SearchBox } from "@/components/SearchBox";
import { openRequests } from "@/lib/data";

export const metadata = {
  title: "Browse requests",
  description: "Browse active student requests around Paris on Etudo.",
};

export default function RequestsPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
            Browse requests
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
            Students are posting tasks across Paris.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#667085]">
            Find requests that match your skills, schedule, and preferred Paris areas.
          </p>
          <div className="mt-8">
            <SearchBox compact />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        {openRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </section>
    </PageShell>
  );
}

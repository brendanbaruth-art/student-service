import { notFound } from "next/navigation";
import { CalendarClock, Clock, MapPin, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { openRequests, students } from "@/lib/data";

type RequestPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return openRequests.map((request) => ({ id: request.id }));
}

export async function generateMetadata({ params }: RequestPageProps) {
  const { id } = await params;
  const request = openRequests.find((item) => item.id === id);
  return {
    title: request ? request.title : "Request",
    description: request ? `View ${request.title} on Etudo.` : "View a student request on Etudo.",
  };
}

export default async function RequestDetailPage({ params }: RequestPageProps) {
  const { id } = await params;
  const request = openRequests.find((item) => item.id === id);

  if (!request) notFound();

  const matches = students
    .filter((student) => student.services.some((service) => service.name.toLowerCase().includes(request.category.split(" ")[0].toLowerCase())) || student.skills.join(" ").toLowerCase().includes(request.category.split(" ")[0].toLowerCase()))
    .slice(0, 3);

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_35px_rgba(21,34,56,0.06)]">
          <span className="inline-flex rounded-full bg-[var(--color-blue-soft)] px-3 py-1 text-xs font900 text-[var(--color-brand)]">
            {request.category}
          </span>
          <h1 className="mt-4 text-4xl font900 tracking-tight text-[var(--color-brand-dark)]">
            {request.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            This request only shows approximate areas. Exact location details are shared after a booking request is accepted.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              [MapPin, request.area],
              [CalendarClock, request.timing],
              [Clock, request.duration],
              [Users, `${request.interested} interested helpers`],
            ].map(([Icon, text]) => (
              <div key={text as string} className="flex items-center gap-3 rounded-md bg-[var(--color-surface-soft)] p-4 text-sm font900 text-[var(--color-text)]">
                <Icon size={17} className="text-[var(--color-brand)]" aria-hidden />
                {text as string}
              </div>
            ))}
          </div>
          <section className="mt-8 rounded-lg bg-[var(--color-surface-soft)] p-5">
            <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Task details</h2>
            <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
              The student is looking for help with {request.title.toLowerCase()} around {request.area}. Timing is {request.timing.toLowerCase()} and the estimated duration is {request.duration.toLowerCase()}.
            </p>
          </section>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={`/messages?request=${request.id}`}>I&apos;m interested</Button>
            <Button href="/requests" variant="secondary">Back to requests</Button>
          </div>
        </div>
        <aside className="h-fit rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)] lg:sticky lg:top-24">
          <p className="text-sm font900 uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">Budget</p>
          <p className="mt-2 text-3xl font900 text-[var(--color-brand-dark)]">{request.budget}</p>
          <div className="mt-5 grid gap-3 text-sm font800 text-[var(--color-text-secondary)]">
            <p>Posted by {request.postedBy} · {request.posterRating.toFixed(1)} rating</p>
            <p>{request.postedAgo}</p>
            <p>{request.mode}</p>
          </div>
          <div className="mt-6 rounded-md bg-[var(--color-success-soft)] p-4 text-sm leading-6 text-[var(--color-success)]">
            <ShieldCheck size={18} className="mb-2" aria-hidden />
            Helpers only see approximate areas until the student shares booking details.
          </div>
          {matches.length ? (
            <div className="mt-6">
              <p className="text-sm font900 text-[var(--color-brand-dark)]">Suggested helpers</p>
              <div className="mt-3 grid gap-2">
                {matches.map((student) => (
                  <Button key={student.id} href={`/students/${student.id}`} variant="secondary" className="justify-start">
                    {student.displayName}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>
    </PageShell>
  );
}

import { PageShell } from "./PageShell";

export function InfoPage({
  eyebrow,
  title,
  body,
  items,
}: {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
}) {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#667085]">{body}</p>
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <div key={item} className="rounded-lg border border-[#E5E7EB] bg-white p-5 text-sm leading-6 text-[#667085]">
              {item}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

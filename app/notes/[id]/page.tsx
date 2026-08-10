import { notFound } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { Rating } from "@/components/academic/Rating";
import { formatCourseContext, getNote, noteListings } from "@/lib/academic";

type NotePreviewPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return noteListings.map((note) => ({ id: note.id }));
}

export async function generateMetadata({ params }: NotePreviewPageProps) {
  const { id } = await params;
  const note = getNote(id);
  return {
    title: note ? note.title : "Notes preview",
    description: note?.description || "Preview student notes on Etudo.",
  };
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const { id } = await params;
  const note = getNote(id);
  if (!note) notFound();
  const { course, professor, university } = formatCourseContext(note.courseId, note.professorId);
  const pages = Array.from({ length: Math.min(note.pageCount, 4) }, (_, index) => index + 1);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Notes preview</p>
            <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">{note.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">{note.description}</p>
            <div className="mt-6 grid gap-3 text-sm font800 text-[var(--color-text-secondary)] sm:grid-cols-2">
              <p>{university?.name}</p>
              <p>{course?.title}</p>
              <p>{professor?.name}</p>
              <p>{note.pageCount} pages - {note.fileType} - Updated {note.lastUpdated}</p>
            </div>
          </div>
          <aside className="h-fit rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-medium)]">
            <p className="text-sm font800 text-[var(--color-text-secondary)]">Price</p>
            <p className="mt-1 text-4xl font900 text-[var(--color-brand-dark)]">{note.price}</p>
            <div className="mt-3"><Rating rating={note.rating} count={note.purchases} /></div>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">Sold by {note.sellerName} - seller rating {note.sellerRating.toFixed(1)}</p>
            <Button href="/signin" className="mt-5 w-full">Buy Notes</Button>
            <p className="mt-3 flex items-center gap-2 text-xs font800 text-[var(--color-text-secondary)]">
              <ShieldCheck size={14} className="text-[var(--color-success)]" aria-hidden /> Secure note delivery after purchase
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Document preview</h2>
            <p className="mt-1 text-sm font800 text-[var(--color-text-secondary)]">
              Preview {note.previewPages.length} of {note.pageCount} pages
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {pages.map((page) => {
            const unlocked = note.previewPages.includes(page);
            return (
              <div key={page} className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-small)]">
                <p className="text-xs font900 uppercase tracking-[0.14em] text-[var(--color-brand)]">Page {page}</p>
                <div className={`mt-6 grid gap-3 text-sm leading-6 text-[var(--color-text-secondary)] ${unlocked ? "" : "blur-[3px]"}`}>
                  <p className="font900 text-[var(--color-brand-dark)]">{course?.title}: exam framework</p>
                  <p>Key definitions, professor-specific emphasis, common mistakes, and worked examples appear in this page preview.</p>
                  <p>Use these notes to understand how the course is structured before deciding whether to buy the full file.</p>
                </div>
                {!unlocked ? (
                  <div className="absolute inset-0 grid place-items-center bg-white/72">
                    <div className="rounded-full bg-[var(--color-brand-dark)] px-4 py-2 text-sm font900 text-white">
                      <Lock size={15} className="mr-1 inline" aria-hidden /> Locked after purchase
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { BadgeCheck, BookOpen, Lock, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { formatCourseContext, getMentor, getNote, noteListings } from "@/lib/academic";

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
  const seller = getMentor(note.sellerId);
  const pages = [1, 2, 3, 4, 5, 6];

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Notes detail</p>
            <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">{note.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">{note.description}</p>
            <div className="mt-6 grid gap-3 text-sm font800 text-[var(--color-text-secondary)] sm:grid-cols-2">
              <p>{university?.name}</p>
              <p>{course?.title}</p>
              <p>{professor?.name}</p>
              <p>{note.academicYear} - {note.semester}</p>
            </div>
          </div>
          <aside className="h-fit rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-medium)]">
            <p className="text-sm font800 text-[var(--color-text-secondary)]">Price</p>
            <p className="mt-1 text-4xl font900 text-[var(--color-brand-dark)]">{note.price}</p>
            <p className="mt-3 flex items-center gap-1 text-sm font900 text-[var(--color-brand-dark)]">
              <Star size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden />
              {note.rating.toFixed(1)} ({note.ratingCount} reviews)
            </p>
            <div className="mt-5 grid gap-2 rounded-md bg-[var(--color-surface-soft)] p-4 text-sm font800 text-[var(--color-text-secondary)]">
              <p>{note.pageCount} pages</p>
              <p>{note.fileType}</p>
              <p>{note.purchases} purchases</p>
              <p>Updated {note.lastUpdated}</p>
            </div>
            <Button href="/signin" className="mt-5 w-full">Buy Notes</Button>
            <p className="mt-3 flex items-center gap-2 text-xs font800 text-[var(--color-text-secondary)]">
              <ShieldCheck size={14} className="text-[var(--color-success)]" aria-hidden /> Secure note delivery after purchase
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Document preview</h2>
              <p className="mt-1 text-sm font800 text-[var(--color-text-secondary)]">
                Preview {note.previewPages.length} of {note.pageCount} pages
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {pages.map((page, index) => {
              const unlocked = note.previewPages.includes(page);
              const content = note.previewContent[index % note.previewContent.length];
              return (
                <div key={page} className="relative min-h-[420px] overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-small)]">
                  <div className={`min-h-[340px] rounded-md border border-[var(--color-border)] bg-[linear-gradient(180deg,#FFFFFF,#F8FAFC)] p-5 ${unlocked ? "" : "blur-[3px]"}`}>
                    <p className="text-xs font900 uppercase tracking-[0.14em] text-[var(--color-brand)]">Page {page}</p>
                    <h3 className="mt-6 text-xl font900 text-[var(--color-brand-dark)]">{content.heading}</h3>
                    {content.formula ? <p className="mt-5 rounded-md bg-[var(--color-yellow-soft)] px-3 py-2 text-sm font900 text-[var(--color-brand-dark)]">{content.formula}</p> : null}
                    <div className="mt-5 grid gap-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {content.body.map((line) => (
                        <p key={line} className="rounded-md border border-[var(--color-border)] bg-white px-3 py-2">{line}</p>
                      ))}
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <span className="h-16 rounded bg-[var(--color-blue-soft)]" />
                      <span className="h-16 rounded bg-[var(--color-surface-soft)]" />
                      <span className="h-16 rounded bg-[var(--color-yellow-soft)]" />
                    </div>
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
        </div>

        <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
            <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Seller</h2>
            <div className="mt-4 flex gap-4">
              <div className="relative size-16 overflow-hidden rounded-full bg-[var(--color-surface-soft)]">
                <Image src={note.sellerAvatar} alt={`Profile photograph of ${note.sellerName}`} fill sizes="64px" className="object-cover" />
              </div>
              <div>
                <p className="text-lg font900 text-[var(--color-brand-dark)]">{note.sellerName}</p>
                <p className="text-sm font800 text-[var(--color-text-secondary)]">{university?.name}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs font900 text-[var(--color-success)]">
                  <BadgeCheck size={13} aria-hidden /> Verified student
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-md bg-[var(--color-surface-soft)] p-4 text-sm">
              <p className="font900 text-[var(--color-brand-dark)]">Completed:</p>
              <p className="mt-1 text-[var(--color-text-secondary)]">{course?.title}</p>
              <p className="text-[var(--color-text-secondary)]">{professor?.name}</p>
              <p className="mt-3 font900 text-[var(--color-brand-dark)]">Grade: {note.sellerGrade}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs font900 text-[var(--color-success)]">
                <BadgeCheck size={13} aria-hidden /> Course completion verified
              </p>
            </div>
            <div className="mt-5 grid gap-2 text-sm font800 text-[var(--color-text-secondary)]">
              <p>{note.sellerRating.toFixed(1)} seller rating</p>
              <p>{note.sellerSales} notes sold</p>
              {seller ? <p>{seller.completedSessions} mentoring sessions</p> : null}
              {seller ? <p>Joined Etudo {seller.joinedAt}</p> : null}
            </div>
          </section>

          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
            <h2 className="text-xl font900 text-[var(--color-brand-dark)]">What&apos;s included</h2>
            <div className="mt-4 grid gap-2">
              {note.included.map((item) => (
                <p key={item} className="flex items-center gap-2 rounded-md bg-[var(--color-surface-soft)] px-3 py-2 text-sm font800 text-[var(--color-text-secondary)]">
                  <BookOpen size={14} className="text-[var(--color-brand)]" aria-hidden /> {item}
                </p>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </PageShell>
  );
}

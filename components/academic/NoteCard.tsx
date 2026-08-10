import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Eye, FileText, Star } from "lucide-react";
import type { NoteListing } from "@/lib/academic";
import { formatCourseContext } from "@/lib/academic";

export function NoteCard({ note }: { note: NoteListing }) {
  const { course, professor, university } = formatCourseContext(note.courseId, note.professorId);
  const preview = note.previewContent[0];

  return (
    <article className="group overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-small)] transition hover:-translate-y-1 hover:border-[var(--color-brand)] hover:shadow-[var(--shadow-medium)]">
      <div className="border-b border-[var(--color-border)] bg-[linear-gradient(135deg,#EEF5FF,#FFFFFF)] p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-md bg-white text-[var(--color-brand)] shadow-[var(--shadow-small)]">
            <FileText size={22} aria-hidden />
          </span>
          <span className="rounded-full bg-[var(--color-yellow-soft)] px-3 py-1 text-xs font900 text-[var(--color-brand-dark)]">
            {note.price}
          </span>
        </div>
        <div className="mt-6 min-h-36 rounded-md border border-[var(--color-brand)]/20 bg-white p-4 text-xs shadow-inner">
          <p className="font900 uppercase tracking-[0.12em] text-[var(--color-brand)]">{preview?.heading || course?.title}</p>
          {preview?.formula ? <p className="mt-3 rounded bg-[var(--color-yellow-soft)] px-2 py-1 font900 text-[var(--color-brand-dark)]">{preview.formula}</p> : null}
          <ul className="mt-3 grid gap-1.5 text-[var(--color-text-secondary)]">
            {(preview?.body || []).slice(0, 3).map((line) => <li key={line}>- {line}</li>)}
          </ul>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font900 text-[var(--color-brand-dark)]">{note.title}</h3>
        <p className="mt-2 text-sm font800 text-[var(--color-text-secondary)]">{university?.name}</p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{course?.title} - {professor?.name}</p>

        <div className="mt-4 flex items-center gap-3 rounded-md bg-[var(--color-surface-soft)] p-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-white">
            <Image src={note.sellerAvatar} alt={`Profile photograph of ${note.sellerName}`} fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font900 text-[var(--color-brand-dark)]">Sold by {note.sellerName}</p>
            <p className="text-xs font800 text-[var(--color-text-secondary)]">Grade received: {note.sellerGrade}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font900 text-[var(--color-text-secondary)]">
          <span className="rounded-full bg-[var(--color-surface-soft)] px-3 py-1">{note.pageCount} pages</span>
          <span className="rounded-full bg-[var(--color-surface-soft)] px-3 py-1">{note.fileType}</span>
          <span className="rounded-full bg-[var(--color-surface-soft)] px-3 py-1">{note.purchases} purchases</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-soft)] px-3 py-1 text-[var(--color-success)]">
            <BadgeCheck size={13} aria-hidden /> Course verified
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-sm font900 text-[var(--color-brand-dark)]">
            <Star size={15} className="fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden />
            {note.rating.toFixed(1)} ({note.ratingCount})
          </span>
          <span className="text-sm font800 text-[var(--color-text-secondary)]">Updated {note.lastUpdated}</span>
        </div>
        <Link href={`/notes/${note.id}`} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-brand)] px-4 text-sm font900 text-white transition hover:bg-[#1D4ED8]">
          <Eye size={16} aria-hidden /> Preview notes
        </Link>
      </div>
    </article>
  );
}

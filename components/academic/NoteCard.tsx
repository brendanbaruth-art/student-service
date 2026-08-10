import Link from "next/link";
import { Eye, FileText } from "lucide-react";
import type { NoteListing } from "@/lib/academic";
import { formatCourseContext } from "@/lib/academic";
import { Rating } from "./Rating";

export function NoteCard({ note }: { note: NoteListing }) {
  const { course, professor, university } = formatCourseContext(note.courseId, note.professorId);

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
        <div className="mt-8 h-24 rounded-md border border-dashed border-[var(--color-brand)]/30 bg-white/70 p-3 text-xs font800 text-[var(--color-text-secondary)]">
          Preview pages {note.previewPages.join(", ")} of {note.pageCount}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font900 text-[var(--color-brand-dark)]">{note.title}</h3>
        <p className="mt-2 text-sm font800 text-[var(--color-text-secondary)]">{university?.name}</p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{course?.title} - {professor?.name}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font900 text-[var(--color-text-secondary)]">
          <span className="rounded-full bg-[var(--color-surface-soft)] px-3 py-1">{note.pageCount} pages</span>
          <span className="rounded-full bg-[var(--color-surface-soft)] px-3 py-1">{note.fileType}</span>
          <span className="rounded-full bg-[var(--color-surface-soft)] px-3 py-1">{note.purchases} purchases</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <Rating rating={note.rating} />
          <span className="text-sm font800 text-[var(--color-text-secondary)]">by {note.sellerName}</span>
        </div>
        <Link href={`/notes/${note.id}`} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[var(--color-brand)] px-4 text-sm font900 text-white transition hover:bg-[#1D4ED8]">
          <Eye size={16} aria-hidden /> Preview notes
        </Link>
      </div>
    </article>
  );
}

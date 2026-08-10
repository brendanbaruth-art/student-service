import Link from "next/link";
import { BookOpen, Users } from "lucide-react";
import type { Course } from "@/lib/academic";
import { formatCourseContext, mentorsForCourse, notesForCourse } from "@/lib/academic";

export function CourseCard({ course }: { course: Course }) {
  const { professor, university } = formatCourseContext(course.id);

  return (
    <Link
      href={`/universities/${course.universityId}/courses/${course.slug}`}
      className="group block rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)] transition hover:-translate-y-1 hover:border-[var(--color-brand)] hover:shadow-[var(--shadow-medium)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-md bg-[var(--color-blue-soft)] text-[var(--color-brand)]">
          <BookOpen size={20} aria-hidden />
        </span>
        <span className="rounded-full bg-[var(--color-yellow-soft)] px-3 py-1 text-xs font900 text-[var(--color-brand-dark)]">
          {course.subject}
        </span>
      </div>
      <h3 className="mt-5 text-xl font900 text-[var(--color-brand-dark)]">{course.title}</h3>
      <p className="mt-2 text-sm font800 text-[var(--color-text-secondary)]">{university?.name}</p>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{professor?.name}</p>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">{course.description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font900 text-[var(--color-brand)]">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-surface-soft)] px-3 py-1">
          <Users size={13} aria-hidden /> {mentorsForCourse(course.id).length} mentors
        </span>
        <span className="rounded-full bg-[var(--color-surface-soft)] px-3 py-1">{notesForCourse(course.id).length} note packs</span>
      </div>
    </Link>
  );
}

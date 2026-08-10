import { Search } from "lucide-react";
import { courses, professors, universities } from "@/lib/academic";

type AcademicSearchProps = {
  action?: string;
  compact?: boolean;
  defaultQuery?: string;
  defaultProfessor?: string;
  defaultUniversity?: string;
};

export function AcademicSearch({
  action = "/search",
  compact = false,
  defaultQuery = "",
  defaultProfessor = "",
  defaultUniversity = "all",
}: AcademicSearchProps) {
  return (
    <form
      action={action}
      className={`grid gap-2 rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-2 shadow-[var(--shadow-medium)] focus-within:border-[var(--color-brand)] focus-within:ring-4 focus-within:ring-[var(--color-brand)]/10 ${
        compact ? "lg:grid-cols-[1fr_1fr_1fr_auto]" : "lg:grid-cols-[1fr_1fr_1fr_auto]"
      }`}
    >
      <label className="grid gap-1 px-3 py-2 text-xs font900 uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
        University
        <select name="university" defaultValue={defaultUniversity} className="min-h-10 bg-transparent text-base font800 normal-case tracking-normal text-[var(--color-text)] outline-none">
          <option value="all">Any university</option>
          {universities.map((university) => (
            <option key={university.id} value={university.id}>
              {university.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 px-3 py-2 text-xs font900 uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
        Course
        <input
          name="q"
          defaultValue={defaultQuery}
          placeholder={courses[0].title}
          list="etudo-course-list"
          className="min-h-10 bg-transparent text-base font800 normal-case tracking-normal text-[var(--color-text)] outline-none placeholder:text-[#8AA0B5]"
        />
      </label>
      <label className="grid gap-1 px-3 py-2 text-xs font900 uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
        Professor
        <input
          name="professor"
          defaultValue={defaultProfessor}
          placeholder={professors[0].name}
          list="etudo-professor-list"
          className="min-h-10 bg-transparent text-base font800 normal-case tracking-normal text-[var(--color-text)] outline-none placeholder:text-[#8AA0B5]"
        />
      </label>
      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--color-brand)] px-5 text-sm font900 text-white transition hover:bg-[#1D4ED8]" type="submit">
        <Search size={18} aria-hidden />
        Search
      </button>
      <datalist id="etudo-course-list">
        {courses.map((course) => (
          <option key={course.id} value={course.title} />
        ))}
      </datalist>
      <datalist id="etudo-professor-list">
        {professors.map((professor) => (
          <option key={professor.id} value={professor.name} />
        ))}
      </datalist>
    </form>
  );
}

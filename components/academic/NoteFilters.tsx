import Link from "next/link";
import { academicYears, courses, professors, subjects, universities, type NoteFilterInput } from "@/lib/academic";

export function NoteFilters({ values = {} }: { values?: NoteFilterInput }) {
  return (
    <form action="/notes" className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font900 text-[var(--color-brand-dark)]">Filters</h2>
        <Link href="/notes" className="text-xs font900 text-[var(--color-brand)]">Reset</Link>
      </div>
      <div className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Search
          <input name="q" defaultValue={values.q || ""} placeholder="Course, professor, seller" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          University
          <select name="university" defaultValue={values.university || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any university</option>
            {universities.map((university) => <option key={university.id} value={university.id}>{university.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Subject
          <select name="subject" defaultValue={values.subject || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any subject</option>
            {subjects.map((subject) => <option key={subject}>{subject}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Course
          <input name="course" defaultValue={values.course || ""} list="note-course-options" placeholder="Financial Accounting" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Professor
          <input name="professor" defaultValue={values.professor || ""} list="note-professor-options" placeholder="Dupont" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Price
          <select name="price" defaultValue={values.price || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any price</option>
            <option value="under8">Under €8</option>
            <option value="8to11">€8-€11</option>
            <option value="over11">€11+</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Rating
          <select name="rating" defaultValue={values.rating || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any rating</option>
            <option value="4.8">4.8+</option>
            <option value="4.7">4.7+</option>
            <option value="4.6">4.6+</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Academic year
          <select name="academicYear" defaultValue={values.academicYear || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any year</option>
            {academicYears.map((year) => <option key={year}>{year}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          File type
          <select name="fileType" defaultValue={values.fileType || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any file</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="Slides">Slides</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Sort
          <select name="sort" defaultValue={values.sort || "recommended"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="recommended">Recommended</option>
            <option value="highest-rated">Highest rated</option>
            <option value="most-purchased">Most purchased</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price low to high</option>
            <option value="price-high">Price high to low</option>
          </select>
        </label>
        <button className="min-h-11 rounded-md bg-[var(--color-brand)] px-4 text-sm font900 text-white" type="submit">
          Apply filters
        </button>
      </div>
      <datalist id="note-course-options">
        {courses.map((course) => <option key={course.id} value={course.title} />)}
      </datalist>
      <datalist id="note-professor-options">
        {professors.map((professor) => <option key={professor.id} value={professor.name} />)}
      </datalist>
    </form>
  );
}

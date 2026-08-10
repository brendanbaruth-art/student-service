import { courses, professors, subjects, universities, type MentorFilterInput } from "@/lib/academic";

type SearchFilterValues = MentorFilterInput & {
  view?: string;
};

export function SearchFilters({ values = {} }: { values?: SearchFilterValues }) {
  return (
    <form action="/browse" className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-4 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font900 text-[var(--color-brand-dark)]">Filters</h2>
        <a href="/browse" className="text-xs font900 text-[var(--color-brand)]">Reset</a>
      </div>
      <input type="hidden" name="view" value={values.view || "list"} />
      <div className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Search
          <input name="q" defaultValue={values.q || ""} placeholder="Course, professor, university" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3" />
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
          <input name="course" defaultValue={values.course || ""} list="mentor-course-options" placeholder="Financial Accounting" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Professor
          <input name="professor" defaultValue={values.professor || ""} list="mentor-professor-options" placeholder="Dupont" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Price
          <select name="price" defaultValue={values.price || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any price</option>
            <option value="under25">Under €25/hour</option>
            <option value="25to30">€25-€30/hour</option>
            <option value="over30">€30+/hour</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Availability
          <select name="availability" defaultValue={values.availability || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any time</option>
            <option value="Today">Available today</option>
            <option value="This week">This week</option>
            <option value="Weekend">Weekend</option>
            <option value="Online">Online soon</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Distance
          <select name="distance" defaultValue={values.distance || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any distance</option>
            <option value="under1">Under 1 km</option>
            <option value="under3">Under 3 km</option>
            <option value="over3">3 km+</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Rating
          <select name="rating" defaultValue={values.rating || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Any rating</option>
            <option value="4.9">4.9+</option>
            <option value="4.8">4.8+</option>
            <option value="4.7">4.7+</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Format
          <select name="mode" defaultValue={values.mode || "all"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="all">Online or in person</option>
            <option value="Online">Online</option>
            <option value="In person">In person</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Sort
          <select name="sort" defaultValue={values.sort || "recommended"} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option value="recommended">Recommended</option>
            <option value="highest-rated">Highest rated</option>
            <option value="lowest-price">Lowest price</option>
            <option value="nearest">Nearest</option>
            <option value="most-sessions">Most sessions</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-3 rounded-md border border-[var(--color-border)] px-3 text-sm font800">
          <input type="checkbox" name="verified" value="true" defaultChecked={values.verified === "true"} className="size-4 accent-[var(--color-brand)]" />
          Course verified
        </label>
        <button className="min-h-11 rounded-md bg-[var(--color-brand)] px-4 text-sm font900 text-white" type="submit">
          Apply filters
        </button>
      </div>
      <datalist id="mentor-course-options">
        {courses.map((course) => <option key={course.id} value={course.title} />)}
      </datalist>
      <datalist id="mentor-professor-options">
        {professors.map((professor) => <option key={professor.id} value={professor.name} />)}
      </datalist>
    </form>
  );
}

import { subjects, universities } from "@/lib/academic";

export function SearchFilters() {
  return (
    <aside className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-4 lg:sticky lg:top-24">
      <h2 className="text-base font900 text-[var(--color-brand-dark)]">Filters</h2>
      <div className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          University
          <select className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option>Any university</option>
            {universities.map((university) => <option key={university.id}>{university.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Subject
          <select className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option>Any subject</option>
            {subjects.map((subject) => <option key={subject}>{subject}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Price
          <select className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option>Any price</option>
            <option>Under €20/hour</option>
            <option>€20-€30/hour</option>
            <option>€30+/hour</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]">
          Availability
          <select className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3">
            <option>Any time</option>
            <option>Available today</option>
            <option>This week</option>
            <option>Online</option>
            <option>In person</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-3 rounded-md border border-[var(--color-border)] px-3 text-sm font800">
          <input type="checkbox" defaultChecked className="size-4 accent-[var(--color-brand)]" />
          Course verified
        </label>
      </div>
    </aside>
  );
}

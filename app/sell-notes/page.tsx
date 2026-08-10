import { Upload } from "lucide-react";
import { Button } from "@/components/Button";
import { SelectField, TextAreaField, TextInput } from "@/components/FormField";
import { PageShell } from "@/components/PageShell";
import { courses, professors, subjects, universities } from "@/lib/academic";

export const metadata = {
  title: "Sell Notes",
  description: "Create a student notes listing connected to a university course on Etudo.",
};

export default function SellNotesPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Sell Notes</p>
          <h1 className="mt-3 max-w-4xl text-page-heading font900 text-[var(--color-brand-dark)]">
            Publish study materials for a course you already completed.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Connect your notes to the right university, course, and professor so students can find them before exams.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <form className="grid gap-5 rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-small)]">
          <TextInput id="title" label="Title" placeholder="Financial Accounting Final Exam Notes" />
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField id="university" label="University">
              {universities.map((university) => <option key={university.id}>{university.name}</option>)}
            </SelectField>
            <SelectField id="course" label="Course">
              {courses.map((course) => <option key={course.id}>{course.title}</option>)}
            </SelectField>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField id="professor" label="Professor">
              {professors.map((professor) => <option key={professor.id}>{professor.name}</option>)}
            </SelectField>
            <SelectField id="subject" label="Subject">
              {subjects.map((subject) => <option key={subject}>{subject}</option>)}
            </SelectField>
          </div>
          <TextAreaField id="description" label="Description" placeholder="Describe what the notes include, how they are structured, and which exam or assignment they help with." />
          <div className="grid gap-5 md:grid-cols-3">
            <TextInput id="price" label="Price" placeholder="€8.99" />
            <TextInput id="year" label="Academic year" placeholder="2025-2026" />
            <TextInput id="semester" label="Semester" placeholder="Spring" />
          </div>
          <label className="grid min-h-40 cursor-pointer place-items-center rounded-md border border-dashed border-[var(--color-brand)] bg-[var(--color-blue-soft)] p-6 text-center">
            <Upload size={26} className="text-[var(--color-brand)]" aria-hidden />
            <span className="mt-3 block font900 text-[var(--color-brand-dark)]">Upload document</span>
            <span className="mt-1 block text-sm text-[var(--color-text-secondary)]">PDF, DOCX, or slides</span>
            <input type="file" className="sr-only" />
          </label>
          <TextInput id="preview-pages" label="Preview pages" placeholder="1, 2, 4" />
          <Button href="/notes" className="w-full">Preview listing</Button>
        </form>
        <aside className="h-fit rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
          <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Seller checklist</h2>
          <div className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)]">
            <p>Connect notes to the exact course and professor.</p>
            <p>Choose preview pages that show quality without giving away the full file.</p>
            <p>Etudo can verify course completion before highlighting the listing.</p>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

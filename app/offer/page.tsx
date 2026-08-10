import { BookOpenCheck, Calendar, FileCheck2, GraduationCap, ShieldCheck, Star } from "lucide-react";
import { ActionNoticeButton } from "@/components/ActionNoticeButton";
import { PageShell } from "@/components/PageShell";
import { SelectField, TextAreaField, TextInput } from "@/components/FormField";
import { courses, professors, subjects, universities } from "@/lib/academic";

export const metadata = {
  title: "Become a Mentor",
  description: "Earn money on Etudo by mentoring students in courses you have already completed.",
};

const benefits = [
  ["Mentor courses you have already completed", GraduationCap],
  ["Set your own hourly rate", Star],
  ["Offer online or in-person sessions", Calendar],
  ["Build academic reputation", BookOpenCheck],
  ["Verify course history privately", ShieldCheck],
];

export default function OfferPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="min-w-0">
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
              Become a Mentor
            </p>
            <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
              Earn by helping students pass courses you already know.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
              Add the courses you completed, show the professor context, set your price, and mentor around your studies.
            </p>
            <div className="mt-8 grid gap-3">
              {benefits.map(([benefit, Icon]) => (
                <div key={benefit as string} className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <Icon size={19} className="text-[var(--color-brand)]" aria-hidden />
                  <span className="text-sm font800 text-[var(--color-text)]">{benefit as string}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="min-w-0 rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)] sm:p-6">
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Create your mentor profile</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Start with one course. You can add more courses and note listings from your dashboard later.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <TextInput id="headline" label="Profile headline" placeholder="Financial Accounting mentor for ESCP students" required />
              <SelectField id="university" label="University" required>
                {universities.map((university) => (
                  <option key={university.id}>{university.name}</option>
                ))}
              </SelectField>
              <SelectField id="course" label="Course completed" required>
                {courses.map((course) => (
                  <option key={course.id}>{course.title}</option>
                ))}
              </SelectField>
              <SelectField id="professor" label="Professor" required>
                {professors.map((professor) => (
                  <option key={professor.id}>{professor.name}</option>
                ))}
              </SelectField>
              <SelectField id="subject" label="Subject">
                {subjects.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </SelectField>
              <TextInput id="grade" label="Grade or result" placeholder="17/20, A, distinction" />
              <TextAreaField id="description" label="How you can help" placeholder="Explain the exam, assignments, professor expectations, and topics you can mentor." />
              <TextInput id="price-amount" label="Hourly rate" placeholder="€28/hour" required />
              <TextInput id="available-days" label="Available days" placeholder="Monday, Wednesday, Saturday" />
              <TextInput id="available-times" label="Available times" placeholder="18:00-21:00" />
              <SelectField id="format" label="Session format">
                <option>Online and in person</option>
                <option>Online only</option>
                <option>In person near campus</option>
              </SelectField>
              <TextInput id="languages" label="Languages" placeholder="French, English" />
            </div>
            <div className="mt-6 rounded-lg bg-[var(--color-surface-soft)] p-4">
              <div className="flex items-start gap-3">
                <FileCheck2 size={20} className="mt-1 text-[var(--color-brand)]" aria-hidden />
                <div>
                  <h3 className="font900 text-[var(--color-text)]">Course verification</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    Etudo may review student status, transcript details, or proof of course completion before displaying course-verified badges.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <ActionNoticeButton variant="secondary" message="Your mentor draft is ready to continue." className="sm:w-auto">
                Save draft
              </ActionNoticeButton>
              <ActionNoticeButton message="Your mentor profile preview is ready." className="sm:w-auto">
                Preview profile
              </ActionNoticeButton>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, Monitor, Star } from "lucide-react";
import { ActionNoticeButton } from "@/components/ActionNoticeButton";
import { BookingSummary } from "@/components/BookingSummary";
import { PageShell } from "@/components/PageShell";
import { SelectField, TextAreaField, TextInput } from "@/components/FormField";
import { formatCourseContext, getCourse, getMentor, mentors } from "@/lib/academic";

type BookingPageProps = {
  searchParams?: Promise<{
    student?: string;
    course?: string;
  }>;
};

export const metadata = {
  title: "Book a tutoring session",
  description: "Request a course-specific mentoring session on Etudo.",
};

const steps = [
  "Select course",
  "Choose date and time",
  "Add study goals",
  "Choose session format",
  "Review request",
  "Confirmation",
];

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  const mentor = getMentor(params?.student || "") || mentors[0];
  const course = getCourse(params?.course || mentor.courseIds[0]) || getCourse(mentor.courseIds[0]);
  const context = formatCourseContext(course?.id || mentor.courseIds[0]);

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Tutoring request
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
            Request a session with {mentor.displayName}.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Share your course, professor, study goals, and preferred format. You will review the estimated total before sending the request.
          </p>

          <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step} className={`rounded-lg border p-4 ${index <= 1 ? "border-[var(--color-brand)] bg-white" : "border-[var(--color-border)] bg-white/70"}`}>
                <p className="text-xs font900 uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">Step {index + 1}</p>
                <p className="mt-2 text-sm font900 text-[var(--color-text)]">{step}</p>
              </li>
            ))}
          </ol>

          <form className="mt-8 rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)] sm:p-6">
            <div className="grid gap-8">
              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">1. Select course</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <SelectField id="course" label="Course" defaultValue={course?.title}>
                    {mentor.courseIds.map((courseId) => {
                      const mentorCourse = getCourse(courseId);
                      return mentorCourse ? <option key={mentorCourse.id}>{mentorCourse.title}</option> : null;
                    })}
                  </SelectField>
                  <SelectField id="duration" label="Estimated duration" defaultValue="2 hours">
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                    <option>Exam preparation block</option>
                  </SelectField>
                </div>
              </section>

              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">2. Choose date and time</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <TextInput id="date" label="Date" type="date" required />
                  <TextInput id="time" label="Time" type="time" required />
                </div>
              </section>

              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">3. Study goals</h2>
                <div className="mt-4 grid gap-4">
                  <TextAreaField id="study-goals" label="What do you want to work on?" placeholder="Exam revision, assignment feedback, problem set walkthrough, or professor-specific questions." required />
                  <TextInput id="topic" label="Topics involved" placeholder="Consolidation entries, WACC, proofs, case law" />
                  <TextAreaField id="notes" label="Additional context" placeholder="Share deadline, exam date, current level, or materials you want to review." />
                </div>
              </section>

              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">4. Session format</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <SelectField id="format" label="Format" defaultValue={mentor.modes[0]}>
                    {mentor.modes.map((mode) => <option key={mode}>{mode}</option>)}
                  </SelectField>
                  <TextInput id="location" label="Campus, district, or video link preference" placeholder="Online, ESCP campus, 75011" />
                </div>
              </section>

              <section className="rounded-lg bg-[var(--color-surface-soft)] p-5">
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">5. Review request</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  Confirm the mentor, course, time, format, and estimated total before sending your request.
                </p>
                <div className="mt-4 grid gap-3 text-sm">
                  <p className="flex items-center gap-2 font800 text-[var(--color-text)]">
                    <CheckCircle2 size={17} className="text-[var(--color-success)]" aria-hidden />
                    Confirmation appears after the mentor accepts.
                  </p>
                </div>
              </section>
            </div>
            <ActionNoticeButton message="Your tutoring request is ready to send." className="mt-6">
              Send tutoring request
            </ActionNoticeButton>
          </form>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)]">
            <div className="flex gap-4">
              <div className="relative size-20 overflow-hidden rounded-lg bg-[#F2F4F7]">
                <Image src={mentor.photo} alt={`Profile photograph of ${mentor.displayName}`} fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <p className="text-xl font900 text-[var(--color-brand-dark)]">{mentor.displayName}</p>
                <p className="mt-1 text-sm font700 text-[var(--color-text-secondary)]">{context.university?.name}</p>
                <p className="mt-2 flex items-center gap-1 text-sm font800 text-[var(--color-text)]">
                  <Star size={15} className="fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden />
                  {mentor.rating.toFixed(1)} - {mentor.reviews} reviews
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Monitor size={16} aria-hidden />
                {mentor.modes.join(" / ")}
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Clock size={16} aria-hidden />
                {mentor.responseTime}
              </div>
            </div>
            <div className="mt-5 rounded-md bg-[var(--color-surface-soft)] p-3 text-sm">
              <p className="font900 text-[var(--color-brand-dark)]">{context.course?.title}</p>
              <p className="mt-1 text-[var(--color-text-secondary)]">{context.professor?.name}</p>
            </div>
            <Link href={`/students/${mentor.id}`} className="mt-5 inline-flex text-sm font900 text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]">
              View profile
            </Link>
          </div>
          <div className="mt-5">
            <BookingSummary hourlyRate={mentor.hourlyRate} duration={2} />
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

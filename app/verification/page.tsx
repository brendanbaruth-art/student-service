import { BadgeCheck, FileCheck2, LockKeyhole, MailCheck, ShieldCheck } from "lucide-react";
import { ActionNoticeButton } from "@/components/ActionNoticeButton";
import { PageShell } from "@/components/PageShell";
import { TextInput } from "@/components/FormField";

export const metadata = {
  title: "Student verification",
  description: "How Etudo verifies student affiliation and supports trust in Paris.",
};

const steps = [
  ["University email", "Confirm access to a university email address.", MailCheck],
  ["Student document review", "Provide proof of current student status when needed.", FileCheck2],
  ["Trusted profile", "Verified profiles display a clear student badge.", BadgeCheck],
] as const;

export default function VerificationPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Student verification
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
            A safer marketplace starts with student affiliation.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            Etudo&apos;s verification process is designed to help students book and offer services
            with greater confidence.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([title, body, Icon], index) => (
            <div key={title} className="rounded-lg border border-[var(--color-border)] bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-md bg-[var(--color-success-soft)] text-[var(--color-success)]">
                  <Icon size={21} aria-hidden />
                </span>
                <span className="text-sm font900 text-[var(--color-brand)]">0{index + 1}</span>
              </div>
              <h2 className="mt-5 text-xl font900 text-[var(--color-brand-dark)]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <form className="rounded-lg border border-[var(--color-border)] p-6">
            <h2 className="text-2xl font900 text-[var(--color-brand-dark)]">Verify your student status</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Start with your university email. Etudo may request a student document for additional confirmation.
            </p>
            <div className="mt-6 grid gap-4">
              <TextInput id="verification-email" label="University email" type="email" placeholder="name@university.fr" required />
              <TextInput id="student-id" label="Student ID number" placeholder="Optional during review" />
              <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="student-document">
                Student document
                <span className="flex min-h-28 cursor-pointer items-center justify-center rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 text-center text-sm font700 text-[var(--color-text-secondary)]">
                  Upload student card or enrollment certificate
                </span>
                <input id="student-document" type="file" className="sr-only" />
              </label>
            </div>
            <ActionNoticeButton message="Your verification details are ready for review." className="mt-6">
              Submit for review
            </ActionNoticeButton>
          </form>

          <div className="rounded-lg bg-[var(--color-brand-dark)] p-6 text-white">
            <ShieldCheck size={32} className="text-[var(--color-success)]" aria-hidden />
            <h2 className="mt-5 text-2xl font900">What Etudo checks</h2>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-white/74">
              <p>University affiliation helps keep the network focused on students.</p>
              <p>Profile badges make verification status visible before a booking request.</p>
              <p>Clear service details, reviews, and reporting tools support safer decisions.</p>
            </div>
            <div className="mt-8 rounded-lg border border-white/12 bg-white/6 p-4">
              <div className="flex items-center gap-3">
                <LockKeyhole size={18} className="text-[var(--color-success)]" aria-hidden />
                <p className="text-sm font800">Sensitive information is handled with care.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

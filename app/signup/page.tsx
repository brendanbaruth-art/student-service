import { PageShell } from "@/components/PageShell";
import { SignupFlow } from "@/components/SignupFlow";

export const metadata = {
  title: "Get started",
  description: "Create an Etudo account to find course mentors, buy notes, or offer academic support.",
};

export default function SignupPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Get started
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
            Join Etudo&apos;s academic marketplace.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            Create one account to book course mentors, buy study notes, sell your own materials, or offer academic support.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              "Find mentors who already took your course",
              "Buy notes connected to your professor and university",
              "Use one profile for learning, mentoring, and selling notes",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-[var(--color-border)] bg-white p-4 text-sm font800 text-[var(--color-text)]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <SignupFlow />
      </section>
    </PageShell>
  );
}

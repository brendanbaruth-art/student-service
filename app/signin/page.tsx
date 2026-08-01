import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { TextInput } from "@/components/FormField";

export const metadata = {
  title: "Sign in",
  description: "Sign in to Etudo.",
};

export default function SignInPage() {
  return (
    <PageShell>
      <section className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Sign in
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
            Welcome back to Etudo.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Continue booking student help or managing the services you offer around Paris.
          </p>
        </div>
        <form className="rounded-lg border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_35px_rgba(21,34,56,0.06)]">
          <div className="grid gap-4">
            <TextInput id="email" label="Email" type="email" placeholder="name@university.fr" required />
            <TextInput id="password" label="Password" type="password" placeholder="Your password" required />
          </div>
          <Button type="button" className="mt-6 w-full">Sign in</Button>
          <p className="mt-4 text-center text-sm text-[var(--color-text-secondary)]">
            New to Etudo? <a href="/signup" className="font900 text-[var(--color-brand)]">Get started</a>
          </p>
        </form>
      </section>
    </PageShell>
  );
}

import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Signup | CampusLift",
  description: "Create a CampusLift mock account.",
};

export default function SignupPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
            Signup
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Join with your student community.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Create a mock account as someone looking for help, offering services, or both.
            Student verification is previewed in the next step.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-5">
              <p className="font-black text-teal-900">I need help</p>
              <p className="mt-2 text-sm leading-6 text-teal-900/75">Search and book verified students.</p>
            </div>
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-5">
              <p className="font-black text-rose-900">I offer help</p>
              <p className="mt-2 text-sm leading-6 text-rose-900/75">Create a profile and list services.</p>
            </div>
          </div>
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Full name
              <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Camille Martin" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              University email
              <input type="email" className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="name@university.fr" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              University
              <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Sorbonne Universite" />
            </label>
            <fieldset>
              <legend className="text-sm font-black text-slate-950">Account type</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {["Need help", "Offer help", "Both"].map((option) => (
                  <label key={option} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">
                    <input name="role" type="radio" className="accent-teal-600" />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <Link href="/verification" className="mt-6 block rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-teal-700">
            Continue to verification
          </Link>
        </form>
      </section>
    </PageShell>
  );
}

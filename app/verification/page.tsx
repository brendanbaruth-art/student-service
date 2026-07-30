import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata = {
  title: "Student Verification | CampusLift",
  description: "Preview the CampusLift student verification flow.",
};

const steps = [
  ["University email", "Confirm access to a school-issued email address."],
  ["Student ID review", "Upload a student card or certificate for manual review."],
  ["Profile badge", "Verified students receive a visible badge before accepting bookings."],
];

export default function VerificationPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
          Student verification
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Trust starts with confirming who belongs on campus.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          This is a non-functional preview. Real ID verification, document storage,
          and fraud checks would be added later with secure infrastructure.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([title, body], index) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-sm font-black text-rose-600">0{index + 1}</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <form className="rounded-lg border border-slate-200 p-6">
            <h2 className="text-2xl font-black text-slate-950">Verification form</h2>
            <div className="mt-5 grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                University email
                <input type="email" className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="name@sciencespo.fr" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Student ID number
                <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Preview only" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Upload student document
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm font-bold text-slate-500">
                  Upload disabled in front-end MVP
                </div>
              </label>
            </div>
            <button type="button" className="mt-6 w-full rounded-full bg-teal-600 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-700">
              Submit preview
            </button>
          </form>
          <div className="rounded-lg bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">What production needs later</h2>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-slate-300">
              <p>Secure uploads, encrypted storage, manual review tools, audit logs, and deletion controls.</p>
              <p>University domain rules for Paris schools plus fallback manual proof for exchange students.</p>
              <p>Clear privacy copy explaining how student IDs are reviewed and retained.</p>
            </div>
            <Link href="/offer" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950">
              Create a service profile
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

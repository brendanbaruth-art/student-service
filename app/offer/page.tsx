import { PageShell } from "@/components/PageShell";
import { categories } from "@/lib/data";

export const metadata = {
  title: "Offer a Service | CampusLift",
  description: "Create a mock student service listing.",
};

export default function OfferPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
            Offer a service
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Turn your student skills into flexible work.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            This MVP form previews how student helpers can create a listing, set prices,
            choose categories, and show availability. Submissions are not stored yet.
          </p>
          <div className="mt-8 rounded-lg bg-slate-950 p-6 text-white">
            <p className="text-2xl font-black">Listing checklist</p>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-300">
              <span>Student profile and university</span>
              <span>At least one service category</span>
              <span>Clear hourly or flat-rate price</span>
              <span>Verification before public booking</span>
            </div>
          </div>
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Display name
              <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Lea Moreau" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              University
              <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Sciences Po Paris" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
              Short bio
              <textarea className="min-h-28 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Tell students what you are great at and when you can help." />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Price
              <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="25 EUR/hr" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Availability
              <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Weekday evenings" />
            </label>
          </div>
          <fieldset className="mt-6">
            <legend className="text-sm font-black text-slate-950">Categories</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {categories.slice(0, 8).map((category) => (
                <label key={category.slug} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">
                  <input type="checkbox" className="size-4 accent-teal-600" />
                  {category.name}
                </label>
              ))}
            </div>
          </fieldset>
          <button type="button" className="mt-6 w-full rounded-full bg-teal-600 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-700">
            Preview listing
          </button>
        </form>
      </section>
    </PageShell>
  );
}

import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { findStudent, students } from "@/lib/data";

type BookingPageProps = {
  searchParams?: Promise<{
    student?: string;
    service?: string;
  }>;
};

export const metadata = {
  title: "Booking Flow | CampusLift",
  description: "Preview booking a student helper on CampusLift.",
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  const student = findStudent(params?.student || "") || students[0];
  const service = params?.service || student.services[0];

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
            Booking flow
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Request {service.toLowerCase()} from {student.name}.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            This front-end flow collects task details and confirms the request. Payments,
            calendar sync, messaging, and deposits are intentionally left out for the MVP.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Task details", "Time and place", "Review request"].map((step, index) => (
              <div key={step} className={`rounded-lg p-4 ${index === 0 ? "bg-teal-600 text-white" : "bg-white text-slate-700"}`}>
                <p className="text-sm font-black">Step {index + 1}</p>
                <p className="mt-2 font-black">{step}</p>
              </div>
            ))}
          </div>

          <form className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Service
                <input defaultValue={service} className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Estimated duration
                <select className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600">
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>Half day</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Date
                <input type="date" className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Paris location
                <input className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="75005, Latin Quarter" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
                Task notes
                <textarea className="min-h-32 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-600" placeholder="Example: moving 8 boxes and a desk from a 3rd floor apartment, no lift." />
              </label>
            </div>
            <button type="button" className="mt-6 w-full rounded-full bg-teal-600 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-700">
              Send booking request
            </button>
          </form>
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex gap-4">
            <img src={student.photo} alt={`${student.name} profile photo`} className="size-20 rounded-lg object-cover" />
            <div>
              <p className="text-xl font-black text-slate-950">{student.name}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{student.university}</p>
              <p className="mt-2 text-sm font-black text-teal-700">{student.price}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm">
            <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-500">Rating</span>
              <span className="font-black text-slate-950">{student.rating.toFixed(1)} from {student.reviews}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-500">Availability</span>
              <span className="max-w-44 text-right font-black text-slate-950">{student.availability}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-500">Status</span>
              <span className="font-black text-teal-700">Verified</span>
            </div>
          </div>
          <Link href={`/students/${student.id}`} className="mt-6 block rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:border-slate-950">
            View profile
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}

import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { StudentCard } from "@/components/StudentCard";
import { categories, students } from "@/lib/data";

const stats = [
  ["300+", "mock student helpers"],
  ["24 min", "median response"],
  ["11", "service categories"],
];

export default function Home() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=80"
            alt="Paris city view"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>
        <div className="relative mx-auto grid min-h-[640px] max-w-7xl content-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-200">
              Student help across Paris
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Find a verified student for the task you need done.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              CampusLift connects university students who need practical help with
              nearby students offering trusted services, from moving boxes to maths tutoring.
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
          </div>
          <div className="self-end rounded-lg border border-white/20 bg-white/95 p-5 shadow-2xl shadow-slate-950/30">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
              Featured helper
            </p>
            <div className="mt-4 flex gap-4">
              <img
                src={students[0].photo}
                alt={`${students[0].name} profile photo`}
                className="size-24 rounded-lg object-cover"
              />
              <div>
                <p className="text-2xl font-black text-slate-950">{students[0].name}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{students[0].university}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {students[0].services.join(", ")}
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-lg bg-slate-100 p-3">
                  <p className="text-xl font-black text-slate-950">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
              Popular services
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Everyday student help, built for city life.
            </h2>
          </div>
          <Link href="/browse" className="text-sm font-black text-teal-700 hover:text-teal-900">
            Browse all services
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <ServiceCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-600">
                Mock verified profiles
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Meet students ready to help this week.
              </h2>
            </div>
            <Link href="/search?q=tutoring" className="text-sm font-black text-teal-700 hover:text-teal-900">
              Try a search
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {students.slice(0, 3).map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          ["Search by task", "Describe what you need in plain language and compare students by skill, price, location, and availability."],
          ["Verify student status", "The MVP shows the intended verification journey with university email and student ID review placeholders."],
          ["Book without payments", "Pick a time, location, and task details. The screen is front-end only, ready for real payments later."],
        ].map(([title, body], index) => (
          <div key={title} className="rounded-lg bg-slate-950 p-6 text-white">
            <p className="text-sm font-black text-teal-300">Step {index + 1}</p>
            <h3 className="mt-3 text-2xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{body}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

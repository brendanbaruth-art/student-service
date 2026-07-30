import { PageShell } from "@/components/PageShell";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { StudentCard } from "@/components/StudentCard";
import { categories, students } from "@/lib/data";

export const metadata = {
  title: "Browse Services | CampusLift",
  description: "Browse student services available across Paris.",
};

export default function BrowsePage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">
            Browse services
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Find student help for moving, tutoring, errands, events, and more.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Explore mock service categories with realistic pricing and Paris student profiles.
          </p>
          <div className="mt-8">
            <SearchBox compact />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <ServiceCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            Available this week
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

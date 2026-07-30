import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { StudentCard } from "@/components/StudentCard";
import { findStudent, students } from "@/lib/data";

type StudentProfileProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return students.map((student) => ({ id: student.id }));
}

export async function generateMetadata({ params }: StudentProfileProps) {
  const { id } = await params;
  const student = findStudent(id);

  return {
    title: student ? `${student.name} | CampusLift` : "Student profile | CampusLift",
    description: student?.bio || "Student helper profile on CampusLift.",
  };
}

export default async function StudentProfilePage({ params }: StudentProfileProps) {
  const { id } = await params;
  const student = findStudent(id);

  if (!student) {
    notFound();
  }

  const similarStudents = students
    .filter((item) => item.id !== student.id && item.categories.some((category) => student.categories.includes(category)))
    .slice(0, 3);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <img src={student.photo} alt={`${student.name} profile photo`} className="h-full min-h-[440px] w-full object-cover" />
          </div>
          <div className="self-center">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
                Verified student
              </span>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">
                {student.neighborhood}
              </span>
            </div>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950">{student.name}</h1>
            <p className="mt-3 text-lg font-bold text-slate-500">{student.university}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{student.bio}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-100 p-4">
                <p className="text-2xl font-black text-slate-950">{student.rating.toFixed(1)}</p>
                <p className="text-sm font-bold text-slate-500">{student.reviews} reviews</p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <p className="text-2xl font-black text-slate-950">{student.price}</p>
                <p className="text-sm font-bold text-slate-500">starting price</p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <p className="text-2xl font-black text-slate-950">Fast</p>
                <p className="text-sm font-bold text-slate-500">{student.responseTime}</p>
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/booking?student=${student.id}&service=${encodeURIComponent(student.services[0])}`}
                className="rounded-full bg-teal-600 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-teal-700"
              >
                Request booking
              </Link>
              <Link
                href="/search?q=help+moving"
                className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-black text-slate-950 transition hover:border-slate-950"
              >
                Back to results
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-950">Services offered</h2>
          <div className="mt-5 grid gap-3">
            {student.services.map((service) => (
              <div key={service} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-4">
                <div>
                  <p className="font-black text-slate-950">{service}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{student.availability}</p>
                </div>
                <p className="shrink-0 text-sm font-black text-teal-700">{student.price}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-8 text-2xl font-black text-slate-950">Skills and languages</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {[...student.skills, ...student.languages].map((item) => (
              <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-950">Availability</h2>
          <p className="mt-3 leading-7 text-slate-600">{student.availability}</p>
          <div className="mt-6 rounded-lg bg-teal-50 p-4">
            <p className="font-black text-teal-900">Verification preview</p>
            <p className="mt-2 text-sm leading-6 text-teal-900/80">
              This mock profile shows verified status. The production app would check student
              email, school, and ID review before bookings.
            </p>
          </div>
        </aside>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Similar students</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {similarStudents.map((item) => (
              <StudentCard key={item.id} student={item} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

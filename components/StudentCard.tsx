import Link from "next/link";
import type { Student } from "@/lib/data";

type StudentCardProps = {
  student: Student;
  service?: string;
};

export function StudentCard({ student, service }: StudentCardProps) {
  const bookingHref = `/booking?student=${student.id}&service=${encodeURIComponent(
    service || student.services[0],
  )}`;

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
      <Link href={`/students/${student.id}`} className="block">
        <div className="relative h-56 bg-slate-100">
          <img
            src={student.photo}
            alt={`${student.name} profile photo`}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-teal-700 shadow-sm">
            {student.verified ? "Verified student" : "Pending verification"}
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/students/${student.id}`} className="text-xl font-black text-slate-950">
              {student.name}
            </Link>
            <p className="mt-1 text-sm font-semibold text-slate-500">{student.university}</p>
          </div>
          <div className="text-right">
            <p className="font-black text-slate-950">{student.rating.toFixed(1)}</p>
            <p className="text-xs font-semibold text-slate-500">{student.reviews} reviews</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{student.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {student.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-sm font-black text-slate-950">{student.price}</p>
            <p className="text-xs font-semibold text-slate-500">{student.responseTime}</p>
          </div>
          <Link
            href={bookingHref}
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-black text-white transition hover:bg-teal-700"
          >
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}

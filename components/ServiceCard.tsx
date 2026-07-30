import Link from "next/link";
import type { ServiceCategory } from "@/lib/data";

export function ServiceCard({ category }: { category: ServiceCategory }) {
  return (
    <Link
      href={`/search?category=${category.slug}`}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-950/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-black text-slate-950">{category.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-teal-50 text-sm font-black text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
          +
        </span>
      </div>
      <p className="mt-4 text-sm font-black text-slate-950">{category.avgPrice}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {category.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

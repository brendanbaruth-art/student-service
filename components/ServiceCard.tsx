import Link from "next/link";
import {
  BookOpen,
  Camera,
  Cat,
  Code2,
  Hammer,
  Languages,
  PackageCheck,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategory } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  "moving-help": Truck,
  tutoring: BookOpen,
  assembly: Hammer,
  "tech-help": Code2,
  "pet-sitting": Cat,
  errands: PackageCheck,
  photography: Camera,
  "language-help": Languages,
  "event-help": PartyPopper,
  cleaning: Sparkles,
  "furniture-transport": RotateCcw,
};

export function ServiceCard({ category, compact = false }: { category: ServiceCategory; compact?: boolean }) {
  const Icon = icons[category.slug] || PackageCheck;

  return (
    <Link
      href={`/search?category=${category.slug}`}
      className={`group block rounded-lg border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(21,34,56,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#C7D2FE] hover:shadow-[0_20px_42px_rgba(21,34,56,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B7CFA] ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-[#EEF2FF] text-[#5B7CFA] transition duration-300 group-hover:bg-[#5B7CFA] group-hover:text-white">
          <Icon size={20} aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font900 text-[#172033]">{category.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[#667085]">{category.description}</p>
          <p className="mt-4 text-sm font800 text-[#152238]">{category.startingPrice}</p>
        </div>
      </div>
    </Link>
  );
}

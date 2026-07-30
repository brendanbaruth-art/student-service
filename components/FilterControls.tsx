import { SlidersHorizontal } from "lucide-react";
import { availabilityOptions, categories, priceOptions, sortOptions } from "@/lib/data";

type FilterControlsProps = {
  category?: string;
};

export function FilterControls({ category = "" }: FilterControlsProps) {
  return (
    <aside className="rounded-lg border border-[#E5E7EB] bg-white p-4 lg:sticky lg:top-24 lg:h-fit">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font900 text-[#172033]">Filters</h2>
        <SlidersHorizontal size={18} className="text-[#667085]" aria-hidden />
      </div>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="category">
          Category
          <select id="category" name="category" defaultValue={category} className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            <option value="">All services</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="price">
          Price range
          <select id="price" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            {priceOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="availability">
          Availability
          <select id="availability" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            {availabilityOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-3 rounded-md border border-[#D0D5DD] px-3 text-sm font800 text-[#172033]">
          <input type="checkbox" className="size-4 accent-[#4FAE8A]" defaultChecked />
          Verified students
        </label>
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="sort">
          Sort by
          <select id="sort" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            {sortOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
}

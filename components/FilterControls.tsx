import { SlidersHorizontal } from "lucide-react";
import {
  availabilityOptions,
  categories,
  languageOptions,
  priceOptions,
  sortOptions,
  universityOptions,
} from "@/lib/data";

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
      <div className="mt-4 flex flex-wrap gap-2">
        {["Available now", "Under €20/hour", "Near me", "Top rated", "Online"].map((chip) => (
          <button
            key={chip}
            type="button"
            className="rounded-full border border-[#E5E7EB] bg-[#F8F7F3] px-3 py-1.5 text-xs font900 text-[#475467] transition hover:border-[#5B7CFA] hover:bg-white hover:text-[#152238]"
          >
            {chip}
          </button>
        ))}
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
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="distance">
          Distance
          <select id="distance" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            <option>Any distance</option>
            <option>Under 1 km</option>
            <option>Under 3 km</option>
            <option>Under 5 km</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="rating">
          Rating
          <select id="rating" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            <option>Any rating</option>
            <option>4.8+</option>
            <option>4.6+</option>
            <option>New on Etudo</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="university">
          University
          <select id="university" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            {universityOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="language">
          Language
          <select id="language" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            {languageOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor="mode">
          Online / in-person
          <select id="mode" className="min-h-11 rounded-md border border-[#D0D5DD] bg-white px-3 text-sm">
            <option>Any mode</option>
            <option>In person</option>
            <option>Online</option>
            <option>Hybrid</option>
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

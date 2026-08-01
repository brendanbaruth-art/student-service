"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
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
  const [activeChips, setActiveChips] = useState<string[]>([]);

  function toggleChip(chip: string) {
    setActiveChips((current) =>
      current.includes(chip) ? current.filter((item) => item !== chip) : [...current, chip],
    );
  }

  return (
    <aside className="rounded-lg border border-[var(--color-border)] bg-white p-4 lg:sticky lg:top-24 lg:h-fit">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font900 text-[var(--color-text)]">Filters</h2>
        <SlidersHorizontal size={18} className="text-[var(--color-text-secondary)]" aria-hidden />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Available now", "Under €30/hour", "Near me", "Top rated", "Online"].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => toggleChip(chip)}
            aria-pressed={activeChips.includes(chip)}
            className={`rounded-full border px-3 py-1.5 text-xs font900 transition ${
              activeChips.includes(chip)
                ? "border-[var(--color-brand)] bg-[var(--color-blue-soft)] text-[var(--color-brand-dark)]"
                : "border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:bg-white hover:text-[var(--color-brand-dark)]"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="category">
          Category
          <select id="category" name="category" defaultValue={category} className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            <option value="">All services</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="price">
          Price range
          <select id="price" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            {priceOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="availability">
          Availability
          <select id="availability" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            {availabilityOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="distance">
          Distance
          <select id="distance" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            <option>Any distance</option>
            <option>Under 1 km</option>
            <option>Under 3 km</option>
            <option>Under 5 km</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="rating">
          Rating
          <select id="rating" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            <option>Any rating</option>
            <option>4.8+</option>
            <option>4.6+</option>
            <option>New on Etudo</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="university">
          University
          <select id="university" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            {universityOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="language">
          Language
          <select id="language" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            {languageOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="mode">
          Online / in-person
          <select id="mode" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            <option>Any mode</option>
            <option>In person</option>
            <option>Online</option>
            <option>Hybrid</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-3 rounded-md border border-[var(--color-border)] px-3 text-sm font800 text-[var(--color-text)]">
          <input type="checkbox" className="size-4 accent-[var(--color-success)]" defaultChecked />
          Verified students
        </label>
        <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor="sort">
          Sort by
          <select id="sort" className="min-h-11 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm">
            {sortOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
}

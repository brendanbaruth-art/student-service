"use client";

import { MapPin, Search } from "lucide-react";
import { searchSuggestions } from "@/lib/data";
import { Button } from "./Button";

type SearchBoxProps = {
  defaultValue?: string;
  compact?: boolean;
  variant?: "default" | "hero";
};

export function SearchBox({ defaultValue = "", compact = false, variant = "default" }: SearchBoxProps) {
  const hero = variant === "hero";

  function saveSearch(formData: FormData) {
    const query = String(formData.get("q") || "").trim();
    if (!query || typeof window === "undefined") return;
    const key = "etudo.recentSearches";
    const current = JSON.parse(window.localStorage.getItem(key) || "[]") as string[];
    window.localStorage.setItem(key, JSON.stringify([query, ...current.filter((item) => item !== query)].slice(0, 6)));
  }

  return (
    <form
      action="/search"
      onSubmit={(event) => saveSearch(new FormData(event.currentTarget))}
      className={`grid w-full gap-2 rounded-lg border p-2 transition md:grid-cols-[1fr_150px_auto] ${
        hero
          ? "border-white/45 bg-white/95 shadow-[0_24px_70px_rgba(16,42,67,0.28)] backdrop-blur focus-within:border-[var(--color-accent)]"
          : "border-[var(--color-border)] bg-white shadow-[var(--shadow-medium)] focus-within:border-[var(--color-brand)] focus-within:ring-4 focus-within:ring-[var(--color-brand)]/10"
      } ${
        compact ? "max-w-4xl" : "max-w-5xl"
      }`}
    >
      <label className="flex min-h-12 items-center gap-3 rounded-md px-3 text-[var(--color-text-secondary)]" htmlFor="q">
        <Search size={18} aria-hidden />
        <span className="sr-only">Search for help</span>
        <input
          id="q"
          name="q"
          defaultValue={defaultValue}
          placeholder="What do you need help with?"
          list="etudo-search-suggestions"
          className="min-w-0 flex-1 bg-transparent text-base font600 text-[var(--color-text)] outline-none placeholder:text-[#8AA0B5]"
        />
        <datalist id="etudo-search-suggestions">
          {searchSuggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
      </label>
      <label className="flex min-h-12 items-center gap-2 rounded-md border border-[var(--color-border)] px-3 text-sm font700 text-[var(--color-text)]" htmlFor="location">
        <MapPin size={17} className="text-[var(--color-text-secondary)]" aria-hidden />
        <span className="sr-only">Location</span>
        <select id="location" name="location" defaultValue="Paris" className="w-full bg-transparent outline-none">
          <option>Paris</option>
        </select>
      </label>
      <Button type="submit" className="w-full md:w-auto">
        Search
      </Button>
    </form>
  );
}

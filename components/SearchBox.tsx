import { MapPin, Search } from "lucide-react";
import { Button } from "./Button";

type SearchBoxProps = {
  defaultValue?: string;
  compact?: boolean;
  variant?: "default" | "hero";
};

export function SearchBox({ defaultValue = "", compact = false, variant = "default" }: SearchBoxProps) {
  const hero = variant === "hero";

  return (
    <form
      action="/search"
      className={`grid w-full gap-2 rounded-lg border p-2 transition md:grid-cols-[1fr_150px_auto] ${
        hero
          ? "border-white/45 bg-white/95 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur"
          : "border-[#E5E7EB] bg-white shadow-[0_18px_45px_rgba(21,34,56,0.12)]"
      } ${
        compact ? "max-w-4xl" : "max-w-5xl"
      }`}
    >
      <label className="flex min-h-12 items-center gap-3 rounded-md px-3 text-[#667085]" htmlFor="q">
        <Search size={18} aria-hidden />
        <span className="sr-only">Search for help</span>
        <input
          id="q"
          name="q"
          defaultValue={defaultValue}
          placeholder="What do you need help with?"
          className="min-w-0 flex-1 bg-transparent text-base font600 text-[#172033] outline-none placeholder:text-[#98A2B3]"
        />
      </label>
      <label className="flex min-h-12 items-center gap-2 rounded-md border border-[#E5E7EB] px-3 text-sm font700 text-[#172033]" htmlFor="location">
        <MapPin size={17} className="text-[#667085]" aria-hidden />
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

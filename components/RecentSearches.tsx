"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

const key = "etudo.recentSearches";

export function RecentSearches() {
  const [items, setItems] = useState<string[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      return JSON.parse(window.localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  });

  if (!items.length) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="text-sm font900 text-[#667085]">Recent searches</span>
      {items.map((item) => (
        <Link
          key={item}
          href={`/search?q=${encodeURIComponent(item)}`}
          className="rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm font800 text-[#475467] transition hover:border-[#5B7CFA] hover:text-[#152238]"
        >
          {item}
        </Link>
      ))}
      <button
        type="button"
        onClick={() => {
          window.localStorage.removeItem(key);
          setItems([]);
        }}
        className="inline-flex min-h-9 items-center gap-1 rounded-full px-3 text-sm font900 text-[#667085] hover:bg-white hover:text-[#152238]"
      >
        <X size={14} aria-hidden /> Clear
      </button>
    </div>
  );
}

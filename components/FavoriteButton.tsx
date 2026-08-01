"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

type FavoriteButtonProps = {
  studentId: string;
  label: string;
};

const storageKey = "etudo.savedStudents";

function readSaved() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) || "[]") as string[];
  } catch {
    return [];
  }
}

export function FavoriteButton({ studentId, label }: FavoriteButtonProps) {
  const [saved, setSaved] = useState(() => readSaved().includes(studentId));
  const [message, setMessage] = useState("");

  function toggleFavorite() {
    const current = readSaved();
    const next = current.includes(studentId)
      ? current.filter((id) => id !== studentId)
      : [...current, studentId];
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSaved(next.includes(studentId));
    setMessage(next.includes(studentId) ? `Added ${label} to Saved` : `Removed ${label} from Saved`);
    window.setTimeout(() => setMessage(""), 1800);
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleFavorite}
        className="grid size-10 place-items-center rounded-full border border-white/70 bg-white/92 text-[var(--color-brand-dark)] shadow-[0_10px_24px_rgba(21,34,56,0.18)] transition hover:scale-105 hover:text-[var(--color-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]"
        aria-label={saved ? `Remove ${label} from saved students` : `Save ${label}`}
      >
        <Heart size={18} className={saved ? "fill-[var(--color-brand)] text-[var(--color-brand)]" : ""} aria-hidden />
      </button>
      {message ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-md bg-[var(--color-brand-dark)] px-4 py-3 text-sm font800 text-white shadow-[0_18px_45px_rgba(21,34,56,0.2)]">
          {message}
        </div>
      ) : null}
    </>
  );
}

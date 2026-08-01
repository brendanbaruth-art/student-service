"use client";

import dynamic from "next/dynamic";
import { List, Map } from "lucide-react";
import { useEffect, useState } from "react";
import type { Student } from "@/lib/data";
import { StudentCard } from "./StudentCard";

const ParisMapPreview = dynamic(
  () => import("./ParisMapPreview").then((module) => module.ParisMapPreview),
  {
    ssr: false,
    loading: () => (
      <div className="grid min-h-[520px] place-items-center rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white text-sm font800 text-[var(--color-text-secondary)]">
        Loading the Paris map
      </div>
    ),
  },
);

export function FindHelpResults({
  students,
  category,
  service,
  initialView = "list",
  initialAreas = [],
}: {
  students: Student[];
  category?: string;
  service?: string;
  initialView?: "list" | "map";
  initialAreas?: number[];
}) {
  const [view, setView] = useState<"list" | "map">(initialView);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.replaceState(null, "", url);
  }, [view]);

  function updateAreasInUrl(areas: number[]) {
    const url = new URL(window.location.href);
    if (areas.length) {
      url.searchParams.set("areas", areas.join(","));
    } else {
      url.searchParams.delete("areas");
    }
    window.history.replaceState(null, "", url);
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {[
          ["list", List, "List"],
          ["map", Map, "Map"],
        ].map(([value, Icon, label]) => (
          <button
            key={value as string}
            type="button"
            onClick={() => setView(value as "list" | "map")}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font900 transition ${
              view === value
                ? "border-[var(--color-brand-dark)] bg-[var(--color-brand-dark)] text-white"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:text-[var(--color-brand-dark)]"
            }`}
          >
            <Icon size={16} aria-hidden />
            {label as string}
          </button>
        ))}
      </div>
      {view === "list" ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              category={category}
              service={service}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <ParisMapPreview
            students={students}
            title={service ? `${service} in Paris` : "Students in Paris"}
            initialAreas={initialAreas}
            onAreasChange={updateAreasInUrl}
          />
        </div>
      )}
    </div>
  );
}

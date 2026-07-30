"use client";

import { List, Map } from "lucide-react";
import { useState } from "react";
import type { Student } from "@/lib/data";
import { ParisMapPreview } from "./ParisMapPreview";
import { StudentCard } from "./StudentCard";

export function FindHelpResults({
  students,
  category,
  service,
}: {
  students: Student[];
  category?: string;
  service?: string;
}) {
  const [view, setView] = useState<"list" | "map">("list");

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
            className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-4 text-sm font900 transition ${
              view === value
                ? "border-[#152238] bg-[#152238] text-white"
                : "border-[#E5E7EB] bg-white text-[#667085] hover:text-[#152238]"
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
          <ParisMapPreview students={students} title={service ? `${service} in Paris` : "Students in Paris"} />
        </div>
      )}
    </div>
  );
}

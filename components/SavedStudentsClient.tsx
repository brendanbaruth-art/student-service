"use client";

import { useState } from "react";
import { EmptyState } from "./EmptyState";
import { StudentCard } from "./StudentCard";
import type { Student } from "@/lib/data";

export function SavedStudentsClient({ students }: { students: Student[] }) {
  const [savedIds] = useState<string[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      return JSON.parse(window.localStorage.getItem("etudo.savedStudents") || "[]");
    } catch {
      return [];
    }
  });

  const saved = students.filter((student) => savedIds.includes(student.id));

  if (!saved.length) {
    return (
      <EmptyState
        title="No saved students yet"
        description="Tap the heart on any student card to save them here for later."
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {saved.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

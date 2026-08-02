"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { List, Map, PanelLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Student } from "@/lib/data";
import { getPrimaryService } from "@/lib/data";
import { MapLoadingState } from "./map/MapLoadingState";
import { StudentCard } from "./StudentCard";

const ParisMapPreview = dynamic(
  () => import("./map/MapClient").then((module) => module.MapClient),
  {
    ssr: false,
    loading: () => <MapLoadingState />,
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
  initialView?: "list" | "map" | "split";
  initialAreas?: number[];
}) {
  const [view, setView] = useState<"list" | "map" | "split">(initialView);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "");
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

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

  function selectStudent(studentId: string) {
    setSelectedStudentId(studentId);
    const url = new URL(window.location.href);
    url.searchParams.set("student", studentId);
    window.history.replaceState(null, "", url);
    cardRefs.current[studentId]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  const mapTitle = service ? `${service} in Paris` : "Students in Paris";

  return (
    <div>
      <div className="flex items-center gap-2">
        {[
          ["list", List, "List"],
          ["map", Map, "Map"],
          ["split", PanelLeft, "Split"],
        ].map(([value, Icon, label]) => (
          <button
            key={value as string}
            type="button"
            onClick={() => setView(value as "list" | "map" | "split")}
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
      ) : view === "map" ? (
        <div className="mt-6">
          <ParisMapPreview
            students={students}
            title={mapTitle}
            initialAreas={initialAreas}
            onAreasChange={updateAreasInUrl}
            searchQuery={service}
            selectedStudentId={selectedStudentId}
            onStudentSelect={selectStudent}
          />
        </div>
      ) : (
        <div className="mt-6 grid min-w-0 gap-4 lg:grid-cols-[minmax(260px,38%)_minmax(0,1fr)]">
          <div className="min-w-0 max-h-[min(760px,calc(100dvh-120px))] overflow-y-auto pr-1">
            <div className="grid gap-3">
              {students.map((student) => (
                <MapResultCard
                  key={student.id}
                  refCallback={(element) => {
                    cardRefs.current[student.id] = element;
                  }}
                  student={student}
                  service={service}
                  selected={selectedStudentId === student.id}
                  onSelect={() => selectStudent(student.id)}
                />
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <ParisMapPreview
              students={students}
              title={mapTitle}
              initialAreas={initialAreas}
              onAreasChange={updateAreasInUrl}
              searchQuery={service}
              selectedStudentId={selectedStudentId}
              onStudentSelect={selectStudent}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MapResultCard({
  student,
  service,
  selected,
  onSelect,
  refCallback,
}: {
  student: Student;
  service?: string;
  selected: boolean;
  onSelect: () => void;
  refCallback: (element: HTMLElement | null) => void;
}) {
  const primaryService = getPrimaryService(student, undefined, service);

  return (
    <article
      ref={refCallback}
      className={`group grid gap-3 rounded-[var(--radius-medium)] border bg-white p-3 text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-medium)] ${
        selected
          ? "border-[var(--color-brand)] ring-4 ring-[var(--color-brand)]/10"
          : "border-[var(--color-border)]"
      }`}
    >
      <button type="button" onClick={onSelect} className="flex gap-3 text-left">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-[var(--radius-small)] bg-[var(--color-surface-soft)]">
          <Image src={student.photo} alt="" fill sizes="64px" className="object-cover transition group-hover:scale-[1.03]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-3">
            <span className="truncate text-base font900 text-[var(--color-brand-dark)]">{student.displayName}</span>
            <span className="shrink-0 text-sm font900 text-[var(--color-brand-dark)]">{primaryService.price}</span>
          </span>
          <span className="mt-1 block truncate text-sm font800 text-[var(--color-text-secondary)]">{student.university}</span>
          <span className="mt-2 block text-sm font900 text-[var(--color-brand)]">{primaryService.name}</span>
        </span>
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font800 text-[var(--color-text-secondary)]">
        <span>{student.area} · {student.distance}</span>
        <Link
          href={`/students/${student.id}`}
          className="rounded-full bg-[var(--color-feature-dark)] px-3 py-1.5 text-xs font900 text-white"
        >
          View profile
        </Link>
      </div>
    </article>
  );
}

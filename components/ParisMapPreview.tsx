"use client";

import Image from "next/image";
import { LocateFixed, MapPin, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  arrondissements,
  countStudentsByArrondissement,
  studentServesArrondissement,
  type Student,
} from "@/lib/data";
import { Button } from "./Button";

type ParisMapPreviewProps = {
  students: Student[];
  title?: string;
};

export function ParisMapPreview({ students, title = "Students in Paris" }: ParisMapPreviewProps) {
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [activeStudentId, setActiveStudentId] = useState(students[0]?.id || "");
  const [locationNote, setLocationNote] = useState("");

  const counts = useMemo(() => countStudentsByArrondissement(students), [students]);
  const visibleStudents = selectedAreas.length
    ? students.filter((student) => selectedAreas.some((area) => studentServesArrondissement(student, area)))
    : students;
  const activeStudent = visibleStudents.find((student) => student.id === activeStudentId) || visibleStudents[0];
  const maxCount = Math.max(1, ...Object.values(counts));

  function toggleArea(number: number) {
    setSelectedAreas((current) =>
      current.includes(number) ? current.filter((item) => item !== number) : [...current, number].sort((a, b) => a - b),
    );
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setLocationNote("Location is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocationNote("Using your approximate browser location for this session."),
      () => setLocationNote("Location permission was denied. Showing all Paris instead."),
      { enableHighAccuracy: false, timeout: 6000 },
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
      <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_18px_45px_rgba(21,34,56,0.08)]">
        <div className="border-b border-[#E5E7EB] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font900 text-[#152238]">{title}</p>
              <p className="mt-1 text-sm text-[#667085]">
                {selectedAreas.length ? selectedAreas.map((area) => `${area}e`).join(" + ") : "All Paris"} · {visibleStudents.length} students available
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedAreas([])}
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#E5E7EB] px-3 text-sm font900 text-[#667085] hover:text-[#152238]"
              >
                <X size={15} aria-hidden /> All Paris
              </button>
              <button
                type="button"
                onClick={useLocation}
                className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#152238] px-3 text-sm font900 text-white hover:bg-[#243650]"
              >
                <LocateFixed size={15} aria-hidden /> Use my location
              </button>
            </div>
          </div>
          {selectedAreas.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedAreas.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArea(area)}
                  className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font900 text-[#5B7CFA]"
                >
                  {area}e ×
                </button>
              ))}
            </div>
          ) : null}
          {locationNote ? <p className="mt-3 text-sm font800 text-[#26755B]">{locationNote}</p> : null}
        </div>

        <div className="relative min-h-[560px] bg-[#EEF3FF] p-3 sm:p-5">
          <svg viewBox="0 0 630 560" role="img" aria-label="Interactive map of Paris arrondissements" className="h-[520px] w-full">
            {arrondissements.map((area) => {
              const selected = selectedAreas.includes(area.number);
              const count = counts[area.number] || 0;
              const intensity = 0.14 + (count / maxCount) * 0.42;
              const labelPoint = getPathCenter(area.svgPath);
              return (
                <g key={area.number}>
                  <path
                    d={area.svgPath}
                    fill={selected ? "#5B7CFA" : `rgba(91,124,250,${intensity})`}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    className="cursor-pointer transition hover:opacity-90"
                    onClick={() => toggleArea(area.number)}
                  />
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    className="pointer-events-none select-none fill-[#152238] text-[13px] font-black"
                  >
                    {area.label}
                    <tspan x={labelPoint.x} dy="16" className="text-[12px] font-bold">
                      {count}
                    </tspan>
                  </text>
                </g>
              );
            })}
          </svg>

          {visibleStudents.slice(0, 12).map((student, index) => {
            const area = arrondissements.find((item) => item.number === student.baseArrondissement) || arrondissements[index % arrondissements.length];
            const left = `${18 + ((area.number * 19 + index * 7) % 65)}%`;
            const top = `${16 + ((area.number * 23 + index * 5) % 66)}%`;
            const active = activeStudent?.id === student.id;
            return (
              <button
                key={student.id}
                type="button"
                onClick={() => setActiveStudentId(student.id)}
                className={`absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border-2 shadow-[0_12px_26px_rgba(21,34,56,0.2)] transition hover:scale-105 ${
                  active ? "border-[#152238] ring-4 ring-[#5B7CFA]/25" : "border-white"
                }`}
                style={{ left, top }}
                aria-label={`Preview ${student.displayName}`}
              >
                <Image src={student.photo} alt="" fill sizes="48px" className="object-cover" />
              </button>
            );
          })}
        </div>
      </div>

      <aside className="grid max-h-[720px] gap-4 overflow-y-auto pr-1">
        {activeStudent ? (
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.08)]">
            <div className="flex gap-4">
              <div className="relative size-20 overflow-hidden rounded-lg bg-[#F2F4F7]">
                <Image src={activeStudent.photo} alt={`Profile photograph of ${activeStudent.displayName}`} fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <p className="text-xl font900 text-[#152238]">{activeStudent.displayName}</p>
                <p className="text-sm font800 text-[#667085]">{activeStudent.university}</p>
                <p className="mt-2 flex items-center gap-1 text-sm font900 text-[#172033]">
                  ★ {activeStudent.rating.toFixed(1)} · {activeStudent.reviews} reviews
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeStudent.capabilities.slice(0, 4).map((capability) => (
                <span key={capability.service} className="rounded-full bg-[#F8F7F3] px-3 py-1 text-xs font900 text-[#475467]">
                  {capability.service}
                </span>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm font800 text-[#667085]">
              <MapPin size={15} aria-hidden /> {activeStudent.area} · {activeStudent.distance}
            </p>
            <p className="mt-2 text-sm font900 text-[#152238]">
              {activeStudent.availabilityTag} · {activeStudent.startingPrice}
            </p>
            <Button href={`/students/${activeStudent.id}`} className="mt-5 w-full">
              View profile
            </Button>
          </div>
        ) : null}

        <div className="grid gap-3">
          {visibleStudents.slice(0, 8).map((student) => (
            <button
              key={student.id}
              type="button"
              onClick={() => setActiveStudentId(student.id)}
              className={`flex items-center gap-3 rounded-lg border bg-white p-3 text-left transition hover:border-[#5B7CFA] ${
                activeStudent?.id === student.id ? "border-[#5B7CFA] ring-4 ring-[#5B7CFA]/10" : "border-[#E5E7EB]"
              }`}
            >
              <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-[#F2F4F7]">
                <Image src={student.photo} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <span className="min-w-0">
                <span className="block font900 text-[#152238]">{student.displayName}</span>
                <span className="block truncate text-sm font700 text-[#667085]">{student.area} · {student.startingPrice}</span>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

function getPathCenter(path: string) {
  const numbers = path.match(/\d+/g)?.map(Number) || [0, 0];
  const points = [];
  for (let index = 0; index < numbers.length; index += 2) {
    points.push({ x: numbers[index], y: numbers[index + 1] || 0 });
  }
  return {
    x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
    y: points.reduce((sum, point) => sum + point.y, 0) / points.length,
  };
}

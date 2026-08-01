"use client";

import Image from "next/image";
import { Expand, LocateFixed, MapPin, Minimize2, RotateCcw, X } from "lucide-react";
import type { Map as MapLibreMap } from "maplibre-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  initialAreas?: number[];
  onAreasChange?: (areas: number[]) => void;
};

type ParisFeature = {
  type: "Feature";
  properties: {
    c_ar?: number | string;
    l_ar?: string;
    l_aroff?: string;
    label?: string;
    selected?: boolean;
    studentCount?: number;
  };
  geometry: {
    type: string;
    coordinates: unknown;
  };
};

type ParisFeatureCollection = {
  type: "FeatureCollection";
  features: ParisFeature[];
};

type MarkerHandle = {
  remove: () => void;
};

const PARIS_BOUNDS = [
  [2.2241, 48.8156],
  [2.4699, 48.9022],
] as [[number, number], [number, number]];

const AREA_SOURCE_ID = "paris-arrondissements";
const AREA_FILL_ID = "paris-arrondissement-fill";
const AREA_LINE_ID = "paris-arrondissement-line";
const AREA_LABEL_ID = "paris-arrondissement-label";

export function ParisMapPreview({
  students,
  title = "Students in Paris",
  initialAreas = [],
  onAreasChange,
}: ParisMapPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const mapLibRef = useRef<typeof import("maplibre-gl") | null>(null);
  const markersRef = useRef<MarkerHandle[]>([]);
  const selectedAreasRef = useRef<number[]>(initialAreas);
  const [geoJson, setGeoJson] = useState<ParisFeatureCollection | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<number[]>(initialAreas);
  const [activeStudentId, setActiveStudentId] = useState(students[0]?.id || "");
  const [locationNote, setLocationNote] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [mapError, setMapError] = useState("");

  const counts = useMemo(() => countStudentsByArrondissement(students), [students]);
  const visibleStudents = useMemo(
    () =>
      selectedAreas.length
        ? students.filter((student) =>
            selectedAreas.some((area) => studentServesArrondissement(student, area)),
          )
        : students,
    [selectedAreas, students],
  );
  const activeStudent =
    visibleStudents.find((student) => student.id === activeStudentId) || visibleStudents[0];

  const enrichGeoJson = useCallback(
    (source: ParisFeatureCollection) => ({
      ...source,
      features: source.features.map((feature) => {
        const areaNumber = Number(feature.properties.c_ar);
        const area = arrondissements.find((item) => item.number === areaNumber);
        return {
          ...feature,
          properties: {
            ...feature.properties,
            label: area?.label || `${areaNumber}e`,
            studentCount: counts[areaNumber] || 0,
            selected: selectedAreasRef.current.includes(areaNumber),
          },
        };
      }),
    }),
    [counts],
  );

  const updateSelectedAreas = useCallback(
    (next: number[]) => {
      const sorted = [...next].sort((a, b) => a - b);
      selectedAreasRef.current = sorted;
      setSelectedAreas(sorted);
      onAreasChange?.(sorted);
    },
    [onAreasChange],
  );

  const toggleArea = useCallback(
    (areaNumber: number) => {
      updateSelectedAreas(
        selectedAreasRef.current.includes(areaNumber)
          ? selectedAreasRef.current.filter((item) => item !== areaNumber)
          : [...selectedAreasRef.current, areaNumber],
      );
    },
    [updateSelectedAreas],
  );

  const fitToParis = useCallback(() => {
    mapRef.current?.fitBounds(PARIS_BOUNDS, { padding: 42, duration: 700 });
  }, []);

  const fitSelectedAreas = useCallback(() => {
    if (!mapRef.current || !geoJson || selectedAreasRef.current.length === 0) {
      fitToParis();
      return;
    }

    const selectedFeatures = geoJson.features.filter((feature) =>
      selectedAreasRef.current.includes(Number(feature.properties.c_ar)),
    );
    const bounds = getFeatureBounds(selectedFeatures);
    if (bounds) {
      mapRef.current.fitBounds(bounds, { padding: 64, duration: 700 });
    }
  }, [fitToParis, geoJson]);

  function useLocation() {
    if (!navigator.geolocation) {
      setLocationNote("Location is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationNote("Using your approximate browser location for this session.");
        mapRef.current?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 13,
          duration: 800,
        });
      },
      () => setLocationNote("Location permission was denied. Showing all Paris instead."),
      { enableHighAccuracy: false, timeout: 6000 },
    );
  }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    let cancelled = false;

    async function initialiseMap() {
      try {
        const maplibregl = await import("maplibre-gl");
        const response = await fetch("/paris-arrondissements.geojson");
        if (!response.ok) {
          throw new Error("Unable to load Paris boundaries.");
        }
        const parisGeoJson = (await response.json()) as ParisFeatureCollection;

        if (cancelled || !containerRef.current) {
          return;
        }

        mapLibRef.current = maplibregl;
        setGeoJson(parisGeoJson);

        const map = new maplibregl.Map({
          container: containerRef.current,
          style: "https://demotiles.maplibre.org/style.json",
          center: [2.3488, 48.8566],
          zoom: 11.25,
          minZoom: 10.3,
          maxZoom: 15,
          attributionControl: false,
        });

        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");
        map.addControl(new maplibregl.FullscreenControl(), "top-right");
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

        map.once("load", () => {
          if (!map.getSource(AREA_SOURCE_ID)) {
            map.addSource(AREA_SOURCE_ID, {
              type: "geojson",
              data: enrichGeoJson(parisGeoJson),
            } as never);
          }

          map.addLayer({
            id: AREA_FILL_ID,
            type: "fill",
            source: AREA_SOURCE_ID,
            paint: {
              "fill-color": [
                "case",
                ["==", ["get", "selected"], true],
                "#5B7CFA",
                [
                  "interpolate",
                  ["linear"],
                  ["get", "studentCount"],
                  0,
                  "#F7F9FF",
                  3,
                  "#DDE5FF",
                  7,
                  "#9FB0FF",
                ],
              ],
              "fill-opacity": ["case", ["==", ["get", "selected"], true], 0.72, 0.58],
            },
          });

          map.addLayer({
            id: AREA_LINE_ID,
            type: "line",
            source: AREA_SOURCE_ID,
            paint: {
              "line-color": "#FFFFFF",
              "line-width": 2.2,
            },
          });

          map.addLayer({
            id: AREA_LABEL_ID,
            type: "symbol",
            source: AREA_SOURCE_ID,
            layout: {
              "text-field": ["concat", ["get", "label"], "\n", ["to-string", ["get", "studentCount"]]],
              "text-size": 12,
              "text-font": ["Open Sans Bold"],
              "text-allow-overlap": false,
            },
            paint: {
              "text-color": "#152238",
              "text-halo-color": "#FFFFFF",
              "text-halo-width": 1.2,
            },
          });

          map.on("click", AREA_FILL_ID, (event) => {
            const feature = event.features?.[0] as ParisFeature | undefined;
            const areaNumber = Number(feature?.properties?.c_ar);
            if (areaNumber) {
              toggleArea(areaNumber);
            }
          });

          map.on("mouseenter", AREA_FILL_ID, () => {
            map.getCanvas().style.cursor = "pointer";
          });
          map.on("mouseleave", AREA_FILL_ID, () => {
            map.getCanvas().style.cursor = "";
          });

          fitToParis();
        });
      } catch {
        if (!cancelled) {
          setMapError("The interactive map could not load. You can still browse the students below.");
        }
      }
    }

    initialiseMap();

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [enrichGeoJson, fitToParis, toggleArea]);

  useEffect(() => {
    if (!mapRef.current || !geoJson || !mapRef.current.getSource(AREA_SOURCE_ID)) {
      return;
    }

    const source = mapRef.current.getSource(AREA_SOURCE_ID) as
      | { setData: (data: ParisFeatureCollection) => void }
      | undefined;
    source?.setData(enrichGeoJson(geoJson));
  }, [enrichGeoJson, geoJson, selectedAreas]);

  useEffect(() => {
    const maplibregl = mapLibRef.current;
    const map = mapRef.current;
    if (!maplibregl || !map) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const grouped = new Map<number, Student[]>();
    visibleStudents.forEach((student) => {
      if (!student.baseArrondissement || !student.approximateLatitude || !student.approximateLongitude) {
        return;
      }
      const current = grouped.get(student.baseArrondissement) || [];
      grouped.set(student.baseArrondissement, [...current, student]);
    });

    grouped.forEach((group, areaNumber) => {
      const area = arrondissements.find((item) => item.number === areaNumber);
      if (!area) {
        return;
      }

      if (group.length > 2) {
        const markerElement = document.createElement("button");
        markerElement.type = "button";
        markerElement.className =
          "grid min-h-11 min-w-11 place-items-center rounded-full border border-white bg-[#152238] px-3 text-sm font900 text-white shadow-[0_18px_34px_rgba(21,34,56,0.28)] transition hover:scale-105";
        markerElement.textContent = `${group.length}`;
        markerElement.setAttribute("aria-label", `${group.length} students in ${area.name}`);
        markerElement.addEventListener("click", () => {
          updateSelectedAreas([areaNumber]);
          map.flyTo({ center: [area.center.longitude, area.center.latitude], zoom: 12.7, duration: 700 });
        });

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat([area.center.longitude, area.center.latitude])
          .addTo(map);
        markersRef.current.push(marker);
        return;
      }

      group.forEach((student, index) => {
        const markerElement = document.createElement("button");
        markerElement.type = "button";
        markerElement.className =
          "relative grid size-12 place-items-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_14px_28px_rgba(21,34,56,0.24)] transition hover:scale-105";
        markerElement.setAttribute("aria-label", `Preview ${student.displayName}`);

        const img = document.createElement("img");
        img.src = student.photo;
        img.alt = "";
        img.className = "h-full w-full object-cover";
        markerElement.appendChild(img);
        markerElement.addEventListener("click", () => {
          setActiveStudentId(student.id);
          map.flyTo({
            center: [
              (student.approximateLongitude || area.center.longitude) + index * 0.0008,
              (student.approximateLatitude || area.center.latitude) + index * 0.0008,
            ],
            zoom: 13,
            duration: 550,
          });
        });

        const marker = new maplibregl.Marker({ element: markerElement, anchor: "center" })
          .setLngLat([
            (student.approximateLongitude || area.center.longitude) + index * 0.0008,
            (student.approximateLatitude || area.center.latitude) + index * 0.0008,
          ])
          .addTo(map);
        markersRef.current.push(marker);
      });
    });
  }, [updateSelectedAreas, visibleStudents]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    }

    if (expanded) {
      window.addEventListener("keydown", onKeyDown);
      setTimeout(() => mapRef.current?.resize(), 0);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  return (
    <section
      className={
        expanded
          ? "fixed inset-0 z-[80] grid grid-rows-[auto_1fr] gap-4 overflow-hidden bg-[var(--color-background)] p-3 sm:p-5"
          : "grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]"
      }
      aria-label="Interactive Paris student map"
    >
      <div
        className={
          expanded
            ? "rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white/90 p-3 shadow-[var(--shadow-small)] backdrop-blur-xl"
            : "hidden"
        }
      >
        <MapToolbar
          title={title}
          visibleCount={visibleStudents.length}
          selectedAreas={selectedAreas}
          onClear={() => updateSelectedAreas([])}
          onUseLocation={useLocation}
          onFitSelected={fitSelectedAreas}
          onToggleExpanded={() => setExpanded(false)}
          expanded
        />
      </div>

      <div
        className={
          expanded
            ? "grid min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]"
            : "grid gap-5 lg:contents"
        }
      >
        <div className="overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-medium)]">
          {!expanded ? (
            <div className="border-b border-[var(--color-border)] p-4">
              <MapToolbar
                title={title}
                visibleCount={visibleStudents.length}
                selectedAreas={selectedAreas}
                onClear={() => updateSelectedAreas([])}
                onUseLocation={useLocation}
                onFitSelected={fitSelectedAreas}
                onToggleExpanded={() => setExpanded(true)}
              />
              {locationNote ? (
                <p className="mt-3 text-sm font800 text-[#26755B]">{locationNote}</p>
              ) : null}
            </div>
          ) : null}

          {selectedAreas.length ? (
            <div className="flex gap-2 overflow-x-auto border-b border-[var(--color-border)] px-4 py-3">
              {selectedAreas.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArea(area)}
                  className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full bg-[var(--color-blue-soft)] px-3 text-xs font900 text-[var(--color-brand)]"
                >
                  {area}e
                  <X size={13} aria-hidden />
                </button>
              ))}
            </div>
          ) : null}

          <div
            className={`relative bg-[#EFF3F8] ${expanded ? "h-full min-h-[420px]" : "h-[520px] min-h-[520px]"}`}
          >
            <div ref={containerRef} className="absolute inset-0" />
            {mapError ? (
              <div className="absolute inset-x-4 top-4 rounded-[var(--radius-small)] border border-[var(--color-border)] bg-white/92 p-4 text-sm font800 text-[var(--color-text-secondary)] shadow-[var(--shadow-small)] backdrop-blur">
                {mapError}
              </div>
            ) : null}
            <div className="pointer-events-none absolute inset-x-3 bottom-3 lg:hidden">
              <div className="pointer-events-auto max-h-56 overflow-y-auto rounded-[var(--radius-medium)] border border-white/60 bg-white/90 p-3 shadow-[var(--shadow-medium)] backdrop-blur-xl">
                <StudentMiniList
                  students={visibleStudents.slice(0, 5)}
                  activeStudentId={activeStudent?.id}
                  onSelect={setActiveStudentId}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="hidden max-h-full min-h-0 overflow-y-auto pr-1 lg:block">
          <StudentMapSidebar
            activeStudent={activeStudent}
            students={visibleStudents}
            onSelect={setActiveStudentId}
          />
        </aside>
      </div>
    </section>
  );
}

function MapToolbar({
  title,
  visibleCount,
  selectedAreas,
  onClear,
  onUseLocation,
  onFitSelected,
  onToggleExpanded,
  expanded = false,
}: {
  title: string;
  visibleCount: number;
  selectedAreas: number[];
  onClear: () => void;
  onUseLocation: () => void;
  onFitSelected: () => void;
  onToggleExpanded: () => void;
  expanded?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font900 text-[var(--color-brand-dark)]">{title}</p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {selectedAreas.length ? selectedAreas.map((area) => `${area}e`).join(" + ") : "All Paris"}{" "}
          <span aria-hidden>&middot;</span> {visibleCount} students available
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 text-sm font900 text-[var(--color-text-secondary)] transition hover:text-[var(--color-brand-dark)]"
        >
          <X size={15} aria-hidden /> All Paris
        </button>
        <button
          type="button"
          onClick={onFitSelected}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 text-sm font900 text-[var(--color-text-secondary)] transition hover:text-[var(--color-brand-dark)]"
        >
          <RotateCcw size={15} aria-hidden /> Fit
        </button>
        <button
          type="button"
          onClick={onUseLocation}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--color-brand-dark)] px-3 text-sm font900 text-white transition hover:bg-[#243650]"
        >
          <LocateFixed size={15} aria-hidden /> Use my location
        </button>
        <button
          type="button"
          onClick={onToggleExpanded}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 text-sm font900 text-[var(--color-brand-dark)] transition hover:border-[var(--color-brand)]"
        >
          {expanded ? <Minimize2 size={15} aria-hidden /> : <Expand size={15} aria-hidden />}
          {expanded ? "Exit map" : "Full map"}
        </button>
      </div>
    </div>
  );
}

function StudentMapSidebar({
  activeStudent,
  students,
  onSelect,
}: {
  activeStudent?: Student;
  students: Student[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-4">
      {activeStudent ? (
        <div className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
          <div className="flex gap-4">
            <div className="relative size-20 overflow-hidden rounded-[var(--radius-small)] bg-[var(--color-surface-soft)]">
              <Image
                src={activeStudent.photo}
                alt={`Profile photograph of ${activeStudent.displayName}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xl font900 text-[var(--color-brand-dark)]">{activeStudent.displayName}</p>
              <p className="text-sm font800 text-[var(--color-text-secondary)]">{activeStudent.university}</p>
              <p className="mt-2 text-sm font900 text-[var(--color-text)]">
                {activeStudent.rating.toFixed(1)} <span aria-hidden>&middot;</span> {activeStudent.reviews} reviews
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeStudent.capabilities.slice(0, 4).map((capability) => (
              <span
                key={capability.service}
                className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs font900 text-[#475467]"
              >
                {capability.service}
              </span>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font800 text-[var(--color-text-secondary)]">
            <MapPin size={15} aria-hidden /> {activeStudent.area} <span aria-hidden>&middot;</span>{" "}
            {activeStudent.distance}
          </p>
          <p className="mt-2 text-sm font900 text-[var(--color-brand-dark)]">
            {activeStudent.availabilityTag} <span aria-hidden>&middot;</span> {activeStudent.startingPrice}
          </p>
          <Button href={`/students/${activeStudent.id}`} className="mt-5 w-full">
            View profile
          </Button>
        </div>
      ) : null}

      <StudentMiniList students={students.slice(0, 8)} activeStudentId={activeStudent?.id} onSelect={onSelect} />
    </div>
  );
}

function StudentMiniList({
  students,
  activeStudentId,
  onSelect,
}: {
  students: Student[];
  activeStudentId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-2">
      {students.map((student) => (
        <button
          key={student.id}
          type="button"
          onClick={() => onSelect(student.id)}
          className={`flex items-center gap-3 rounded-[var(--radius-small)] border bg-white p-3 text-left transition hover:border-[var(--color-brand)] ${
            activeStudentId === student.id
              ? "border-[var(--color-brand)] ring-4 ring-[var(--color-brand)]/10"
              : "border-[var(--color-border)]"
          }`}
        >
          <span className="relative size-14 shrink-0 overflow-hidden rounded-[var(--radius-small)] bg-[var(--color-surface-soft)]">
            <Image src={student.photo} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="min-w-0">
            <span className="block font900 text-[var(--color-brand-dark)]">{student.displayName}</span>
            <span className="block truncate text-sm font700 text-[var(--color-text-secondary)]">
              {student.area} <span aria-hidden>&middot;</span> {student.startingPrice}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function getFeatureBounds(features: ParisFeature[]) {
  let minLng = Number.POSITIVE_INFINITY;
  let minLat = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;

  function visitCoordinates(value: unknown) {
    if (!Array.isArray(value)) {
      return;
    }

    if (typeof value[0] === "number" && typeof value[1] === "number") {
      const lng = value[0];
      const lat = value[1];
      minLng = Math.min(minLng, lng);
      minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng);
      maxLat = Math.max(maxLat, lat);
      return;
    }

    value.forEach(visitCoordinates);
  }

  features.forEach((feature) => visitCoordinates(feature.geometry.coordinates));

  if (!Number.isFinite(minLng) || !Number.isFinite(minLat)) {
    return null;
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ] as [[number, number], [number, number]];
}

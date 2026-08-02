"use client";

import dynamic from "next/dynamic";
import type { Student } from "@/lib/data";
import type { EtudoParisMapProps, GuidedMapFocus } from "./EtudoParisMap";
import { MapLoadingState } from "./MapLoadingState";

const InteractiveParisMap = dynamic(
  () => import("./EtudoParisMap").then((module) => module.EtudoParisMap),
  {
    ssr: false,
    loading: () => <MapLoadingState />,
  },
);

export type MapClientProps = {
  students: Student[];
  title?: string;
  initialAreas?: number[];
  onAreasChange?: (areas: number[]) => void;
  variant?: "marketplace" | "story";
  guidedFocus?: GuidedMapFocus;
} & Pick<EtudoParisMapProps, "searchQuery" | "selectedStudentId" | "onStudentSelect" | "onMapStateChange">;

export function MapClient(props: MapClientProps) {
  return <InteractiveParisMap {...props} />;
}

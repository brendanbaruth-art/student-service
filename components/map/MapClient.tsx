"use client";

import dynamic from "next/dynamic";
import type { Student } from "@/lib/data";
import type { GuidedMapFocus } from "./InteractiveParisMap";
import { MapLoadingState } from "./MapLoadingState";

const InteractiveParisMap = dynamic(
  () => import("./InteractiveParisMap").then((module) => module.InteractiveParisMap),
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
};

export function MapClient(props: MapClientProps) {
  return <InteractiveParisMap {...props} />;
}

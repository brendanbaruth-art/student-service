"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

type HeroVideoProps = {
  poster: string;
  desktopSrc: string;
  mobileSrc: string;
  scale?: MotionValue<number>;
  play?: boolean;
};

export function HeroVideo({ poster, desktopSrc, mobileSrc, scale, play = true }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [loopMask, setLoopMask] = useState(false);
  const [saveData] = useState(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    return Boolean(connection?.saveData);
  });
  const shouldShowVideo = play && !saveData && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldShowVideo) {
      return;
    }

    function configurePlayback() {
      if (!video) {
        return;
      }
      video.playbackRate = 0.7;
    }

    function maskLoopPoint() {
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }
      setLoopMask(video.duration - video.currentTime < 0.85);
    }

    function onVisibilityChange() {
      const currentVideo = videoRef.current;
      if (!currentVideo) {
        return;
      }
      if (document.hidden) {
        currentVideo.pause();
      } else {
        void currentVideo.play().catch(() => setVideoFailed(true));
      }
    }

    configurePlayback();
    video.addEventListener("loadedmetadata", configurePlayback);
    video.addEventListener("timeupdate", maskLoopPoint);
    video.addEventListener("seeked", maskLoopPoint);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      video.removeEventListener("loadedmetadata", configurePlayback);
      video.removeEventListener("timeupdate", maskLoopPoint);
      video.removeEventListener("seeked", maskLoopPoint);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [shouldShowVideo]);

  return (
    <motion.div style={{ scale }} className="pointer-events-none absolute inset-0">
      <Image
        src={poster}
        alt="Paris street scene used as the Etudo video fallback poster"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center]"
      />
      {shouldShowVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          <source src={mobileSrc} type="video/webm" media="(max-width: 767px)" />
          <source src={desktopSrc} type="video/webm" media="(min-width: 768px)" />
        </video>
      ) : null}
      <div
        className={`pointer-events-none absolute inset-0 bg-[var(--color-feature-dark)] transition-opacity duration-700 ${
          loopMask ? "opacity-55" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </motion.div>
  );
}

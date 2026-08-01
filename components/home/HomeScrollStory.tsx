"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { SearchBox } from "@/components/SearchBox";
import { MapClient } from "@/components/map/MapClient";
import { MapLoadingState } from "@/components/map/MapLoadingState";
import { homepageRequests, heroSearchExamples, parisMotionMoments, pulseItems, skillMoments } from "@/lib/homeStory";
import { openRequests, students, type Student } from "@/lib/data";

const heroPoster = "/etudo-paris-eiffel-hero.jpg";
const desktopVideo = "/etudo-paris-motion.webm";
const mobileVideo = "/etudo-paris-motion-mobile.webm";

export function HomeScrollStory() {
  return (
    <div className="overflow-x-clip bg-[var(--color-background)] text-[var(--color-text)]">
      <CinematicVideoHero />
      <PurposeSearchScene />
      <StudentSkillsReveal />
      <ParisMotionScene />
      <BookEarningScene />
      <PulseAndRequests />
      <TrustFinale />
    </div>
  );
}

function CinematicVideoHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const [loopMask, setLoopMask] = useState(false);
  const [saveData] = useState(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    return Boolean(connection?.saveData);
  });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const videoScale = useTransform(smooth, [0, 1], reduceMotion ? [1, 1] : [1, 1.045]);
  const headlineOpacity = useTransform(smooth, [0, 0.48, 0.72], [1, 0.85, 0]);
  const lightWash = useTransform(smooth, [0.25, 1], [0, 0.72]);
  const shouldShowVideo = !reduceMotion && !saveData && !videoFailed;

  useEffect(() => {
    function onVisibilityChange() {
      if (!videoRef.current) {
        return;
      }
      if (document.hidden) {
        videoRef.current.pause();
      } else if (shouldShowVideo) {
        void videoRef.current.play().catch(() => setVideoFailed(true));
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [shouldShowVideo]);

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
      const remaining = video.duration - video.currentTime;
      setLoopMask(remaining < 0.85);
    }

    configurePlayback();
    video.addEventListener("loadedmetadata", configurePlayback);
    video.addEventListener("timeupdate", maskLoopPoint);
    video.addEventListener("seeked", maskLoopPoint);

    return () => {
      video.removeEventListener("loadedmetadata", configurePlayback);
      video.removeEventListener("timeupdate", maskLoopPoint);
      video.removeEventListener("seeked", maskLoopPoint);
    };
  }, [shouldShowVideo]);

  return (
    <section ref={sectionRef} data-etudo-section="hero" className="relative h-[125dvh] bg-[var(--color-feature-dark)] text-white max-sm:h-[118dvh]">
      <div className="sticky top-0 min-h-[100dvh] overflow-hidden">
        <motion.div style={{ scale: videoScale }} className="pointer-events-none absolute inset-0">
          <Image
            src={heroPoster}
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
              poster={heroPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              onError={() => setVideoFailed(true)}
            >
              <source src={mobileVideo} type="video/webm" media="(max-width: 767px)" />
              <source src={desktopVideo} type="video/webm" media="(min-width: 768px)" />
            </video>
          ) : null}
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,67,0.9),rgba(16,42,67,0.66)_48%,rgba(16,42,67,0.28))]" />
        <motion.div
          style={{ opacity: lightWash }}
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(234,246,255,0.08),rgba(234,246,255,0.88))]"
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-[var(--color-feature-dark)] transition-opacity duration-700 ${
            loopMask ? "opacity-55" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <div className="relative z-[var(--z-content)] mx-auto flex min-h-[100dvh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.div style={{ opacity: headlineOpacity }} className="w-full min-w-0 max-w-4xl">
            <p className="max-w-[24ch] text-xs font900 uppercase leading-5 tracking-[0.1em] text-[var(--color-yellow-soft)] sm:max-w-full sm:text-sm sm:tracking-[0.2em]">
              Student life, moving together.
            </p>
            <h1 className="mt-4 max-w-[9ch] text-hero font900 sm:mt-5 sm:max-w-[13ch]">
              A city of students.
              <span className="block">A network of skills.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Find help nearby, share what you know, and make life in Paris easier.
            </p>
            <div className="relative mt-8 max-w-5xl">
              <SearchBox variant="hero" />
            </div>
            <div className="relative z-[var(--z-content)] mt-4 grid grid-cols-2 gap-3 sm:flex sm:flex-row">
              <Button href="/browse" className="w-full px-3 bg-[var(--color-accent)] text-[var(--color-brand-dark)] hover:bg-[var(--color-yellow-soft)]">
                Find help
              </Button>
              <Button
                href="/offer"
                variant="secondary"
                className="w-full border-white/38 bg-white/12 px-3 text-white hover:border-white hover:bg-white/20 hover:text-white"
              >
                Start earning
              </Button>
            </div>
            <div className="mt-4 flex min-w-0 items-center gap-3 overflow-x-auto pb-2">
                <span className="shrink-0 text-sm font900 text-white/72">Popular searches:</span>
                {heroSearchExamples.map((item) => (
                  <Link
                    key={item}
                    href={`/search?q=${encodeURIComponent(item)}&location=Paris`}
                    className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-white/28 bg-white/12 px-3 text-sm font900 text-white/88 backdrop-blur transition hover:border-white/60 hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item}
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PurposeSearchScene() {
  return (
    <section id="how-it-works" className="bg-[var(--color-background)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Built for ordinary Paris days
          </p>
          <h2 className="mt-4 text-page-heading font900 text-[var(--color-brand-dark)]">
            Whatever today needs,
            <span className="block">there is probably a student for it.</span>
          </h2>
        </div>
        <div className="rounded-[var(--radius-large)] border border-white/70 bg-white/76 p-5 shadow-[var(--shadow-medium)] backdrop-blur-xl">
          <p className="text-base leading-7 text-[var(--color-text-secondary)]">
            Etudo is not just tutoring. It is the small network that helps a move go smoothly, a laptop get fixed, a pet get walked, and a new skill find paid work between classes.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Moving", "Excel", "Pets", "Photos", "Languages", "Tech"].map((item) => (
              <Link
                key={item}
                href={`/search?q=${encodeURIComponent(item)}`}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-2 text-sm font900 text-[var(--color-brand-dark)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentSkillsReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const storyStudents = useMemo(
    () => skillMoments.map((moment) => students.find((student) => student.id === moment.studentId)).filter(Boolean),
    [],
  );

  return (
    <section ref={sectionRef} className="relative bg-[var(--color-surface-soft)]">
      <div className="flex min-h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Student skills</p>
            <h2 className="mt-4 text-section-heading font900 text-[var(--color-brand-dark)]">
              Everyday help, moving through the city.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-[var(--color-text-secondary)]">
              A few moments from the Etudo network, shaped around classes, Metro rides, and spare evenings.
            </p>
            <div className="mt-8">
              <Button href="/browse">Explore students</Button>
            </div>
          </div>
          <div className="relative min-h-[680px] max-md:grid max-md:min-h-0 max-md:gap-4">
            {skillMoments.map((moment, index) => {
              const student = storyStudents[index];
              return (
                <SkillMomentCard
                  key={moment.service}
                  index={index}
                  moment={moment}
                  student={student}
                  progress={progress}
                  reduceMotion={Boolean(reduceMotion)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillMomentCard({
  index,
  moment,
  student,
  progress,
  reduceMotion,
}: {
  index: number;
  moment: (typeof skillMoments)[number];
  student?: Student;
  progress: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
}) {
  const y = useTransform(progress, [0.08 + index * 0.12, 0.28 + index * 0.12], reduceMotion ? [0, 0] : [110, 0]);
  const opacity = useTransform(progress, [0.08 + index * 0.12, 0.23 + index * 0.12], [0, 1]);
  const positions = [
    "top-0 left-0",
    "top-28 right-0",
    "top-[19rem] left-8",
    "top-[30rem] right-10",
  ];

  return (
    <motion.article
      style={{ y, opacity }}
      className={`absolute w-[min(100%,390px)] rounded-[var(--radius-large)] border border-white/80 bg-white p-4 shadow-[var(--shadow-large)] max-md:static max-md:w-full ${positions[index]}`}
    >
      <div className="flex gap-4">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-[var(--radius-medium)] bg-[var(--color-blue-soft)]">
          {student ? (
            <Image src={student.photo} alt={`Profile photograph of ${moment.name}`} fill sizes="96px" className="object-cover" />
          ) : null}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font900 text-[var(--color-brand-dark)]">{moment.name}</h3>
            <span className="rounded-full bg-[var(--color-accent)] px-2 py-1 text-xs font900 text-[var(--color-brand-dark)]">
              {moment.area}
            </span>
          </div>
          <p className="mt-1 text-sm font900 text-[var(--color-brand)]">{moment.service}</p>
          <p className="mt-2 text-sm font700 text-[var(--color-text-secondary)]">{moment.university}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <span className="rounded-xl bg-[var(--color-surface-soft)] p-3 font800 text-[var(--color-brand-dark)]">{moment.availability}</span>
        <span className="rounded-xl bg-[var(--color-surface-soft)] p-3 font800 text-[var(--color-brand-dark)]">{moment.travel}</span>
        <span className="rounded-xl bg-[var(--color-yellow-soft)] p-3 font900 text-[var(--color-brand-dark)]">{moment.price}</span>
      </div>
    </motion.article>
  );
}

function ParisMotionScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const reduceMotion = useReducedMotion();
  const lineOpacity = useTransform(scrollYProgress, [0.78, 1], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.78, 1], reduceMotion ? [1, 1] : [0.86, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(parisMotionMoments.length - 1, Math.max(0, Math.floor(latest * parisMotionMoments.length)));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeMoment = parisMotionMoments[activeIndex];
  const storyStudents = students.slice(0, 12);

  return (
    <section ref={sectionRef} data-etudo-section="map" className="relative bg-[var(--color-background)]">
      <div className="flex min-h-[100dvh] items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity: lineOpacity, scaleX: lineScale }}
          className="pointer-events-none absolute inset-x-[12%] bottom-0 h-px origin-center bg-[var(--color-brand-dark)]/20"
          aria-hidden="true"
        />
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <div>
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Paris in motion</p>
            <h2 className="mt-4 text-page-heading font900 text-[var(--color-brand-dark)]">Paris in motion.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
              See what students can help with across the city, right now.
            </p>
            <div className="mt-8 rounded-[var(--radius-large)] border border-white/80 bg-white/82 p-5 shadow-[var(--shadow-medium)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-sm font900 text-[var(--color-brand-dark)]">
                  {activeMoment.time}
                </span>
                <span className="text-sm font900 text-[var(--color-brand)]">{activeMoment.area}</span>
              </div>
              <h3 className="mt-4 text-2xl font900 text-[var(--color-brand-dark)]">{activeMoment.task}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{activeMoment.preview}</p>
              <p className="mt-4 text-xs font900 uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                {activeMoment.detail}
              </p>
            </div>
          </div>
          <DeferredStoryMap
            students={storyStudents}
            activeMoment={activeMoment}
          />
        </div>
      </div>
    </section>
  );
}

function DeferredStoryMap({
  students: storyStudents,
  activeMoment,
}: {
  students: Student[];
  activeMoment: (typeof parisMotionMoments)[number];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-[28px] border border-white/80 bg-white p-3 shadow-[var(--shadow-large)]">
      {shouldRender ? (
        <MapClient
          students={storyStudents}
          title="A typical Etudo day"
          variant="story"
          guidedFocus={{
            areaNumber: activeMoment.areaNumber,
            center: activeMoment.center,
            zoom: activeMoment.zoom,
            studentId: activeMoment.studentId,
          }}
        />
      ) : (
        <MapLoadingState />
      )}
    </div>
  );
}

function BookEarningScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const coverRotate = useTransform(scrollYProgress, [0.2, 0.65], reduceMotion ? [-158, -158] : [0, -158]);
  const spreadOpacity = useTransform(scrollYProgress, [0.48, 0.7], [reduceMotion ? 1 : 0.18, 1]);
  const actionsOpacity = useTransform(scrollYProgress, [0.72, 0.86], [reduceMotion ? 1 : 0, 1]);
  const actionsPointerEvents = useTransform(scrollYProgress, (value) => (reduceMotion || value >= 0.72 ? "auto" : "none"));
  const bookScale = useTransform(scrollYProgress, [0, 0.18, 1], reduceMotion ? [1, 1, 1] : [0.94, 1, 1]);

  return (
    <section ref={sectionRef} data-etudo-section="book" className="relative h-[190dvh] bg-[var(--color-surface-soft)] max-sm:h-[155dvh]">
      <div className="sticky top-0 grid min-h-[100dvh] place-items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale: bookScale }}
          className="relative mx-auto w-full max-w-[960px] [perspective:1800px]"
        >
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[900px] max-sm:aspect-[5/7] max-sm:max-w-[330px]">
            <div
              className="pointer-events-none absolute inset-x-[7%] bottom-[-4%] h-16 rounded-[999px] bg-[rgba(16,42,67,0.22)] blur-2xl"
              aria-hidden="true"
            />
            <div className="absolute inset-0 rounded-[28px] bg-[var(--color-feature-dark)] shadow-[0_48px_110px_rgba(16,42,67,0.22)]" />
            <motion.div
              style={{ opacity: spreadOpacity }}
              className="absolute inset-0 grid overflow-hidden rounded-[28px] border border-[#EEE5CF] bg-[#FFFDF4] shadow-inner [transform-style:preserve-3d] sm:grid-cols-2"
            >
              <BookPage eyebrow="Open left page" title="Your time has value.">
                Between lectures, work and evenings, your schedule can still create something useful.
              </BookPage>
              <BookPage eyebrow="Open right page" title="Earn with what you already know." right>
                <span className="block">Teach a subject.</span>
                <span className="block">Share a language.</span>
                <span className="block">Take photos.</span>
                <span className="block">Fix a laptop.</span>
                <span className="block">Help someone move.</span>
                <span className="mt-4 block text-sm font800 leading-6 text-[var(--color-text-secondary)] sm:text-base">
                  Choose your services, set your own price and work around university.
                </span>
              </BookPage>
            </motion.div>
            <motion.div
              style={{ rotateY: coverRotate, transformOrigin: "left center" }}
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] bg-[var(--color-feature-dark)] p-8 text-white shadow-[0_40px_90px_rgba(16,42,67,0.32)] [backface-visibility:hidden] [transform-style:preserve-3d] sm:p-12"
              aria-hidden="true"
            >
              <div className="pointer-events-none absolute left-0 top-0 h-full w-3 bg-[var(--color-accent)]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%)]" aria-hidden="true" />
              <span className="relative grid size-12 place-items-center rounded-[10px] border border-white/18">
                <Sparkles size={20} aria-hidden />
              </span>
              <p className="relative mt-20 text-xl font900 text-white/76 max-sm:mt-16">Etudo</p>
              <h2 className="relative mt-4 max-w-xl text-[clamp(2.2rem,6vw,5rem)] font900 leading-[0.96]">
                Your skills have a next chapter.
              </h2>
              <div className="absolute bottom-8 left-8 size-3 rounded-full bg-[var(--color-accent)] sm:left-12" />
            </motion.div>
            <motion.div
              style={{ opacity: actionsOpacity, pointerEvents: actionsPointerEvents }}
              className="absolute inset-x-5 bottom-5 z-[var(--z-content)] flex flex-col gap-3 sm:left-auto sm:right-8 sm:w-[calc(50%-4rem)] sm:flex-row"
            >
              <Button href="/offer" className="bg-[var(--color-accent)] text-[var(--color-brand-dark)] hover:bg-[var(--color-yellow-soft)]">
                Start earning
              </Button>
              <Button href="/offer?category=tutoring" variant="ghost" className="bg-white/88">
                Become a tutor
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BookPage({
  eyebrow,
  title,
  children,
  right = false,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  right?: boolean;
}) {
  return (
    <div className={`relative min-h-0 p-6 sm:p-8 lg:p-10 ${right ? "pb-36 sm:pb-24" : "border-b border-[#EFE4C8] sm:border-b-0 sm:border-r"}`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,var(--color-brand-dark)_1px,transparent_0)] [background-size:16px_16px]" aria-hidden="true" />
      <div className="relative max-w-sm">
        <p className="text-xs font900 uppercase tracking-[0.16em] text-[var(--color-brand)]">{eyebrow}</p>
        <h3 className="mt-4 text-[clamp(1.55rem,3vw,2.65rem)] font900 leading-tight text-[var(--color-brand-dark)]">
          {title}
        </h3>
        <p className="mt-5 text-base font800 leading-7 text-[var(--color-brand-dark)] sm:text-lg">
          {children}
        </p>
      </div>
      <div className="absolute bottom-6 left-8 right-8 h-px bg-[#EFE4C8]" />
    </div>
  );
}

function PulseAndRequests() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="rounded-[var(--radius-large)] bg-[var(--color-feature-dark)] p-6 text-white shadow-[var(--shadow-large)]">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-accent)]">Etudo Pulse</p>
          <h2 className="mt-3 text-3xl font900">Happening around Paris</h2>
          <div className="mt-6 grid gap-3">
            {pulseItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="flex items-start gap-3 rounded-[var(--radius-medium)] border border-white/10 bg-white/8 p-3"
              >
                <span className="mt-1 size-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                <p className="text-sm font800 leading-6 text-white/82">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Open requests</p>
              <h2 className="mt-3 text-section-heading font900 text-[var(--color-brand-dark)]">
                Three ways to help today.
              </h2>
            </div>
            <Link href="/requests" className="inline-flex items-center gap-2 text-sm font900 text-[var(--color-brand)]">
              See open requests <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="mt-8 grid gap-4">
            {homepageRequests.map((request, index) => {
              const existingRequest = openRequests[index];
              return (
                <Link
                  key={request.title}
                  href={existingRequest ? `/requests/${existingRequest.id}` : "/requests"}
                  className="group grid gap-4 rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-[var(--shadow-medium)] sm:grid-cols-[1fr_auto]"
                >
                  <span>
                    <span className="block text-2xl font900 text-[var(--color-brand-dark)]">{request.title}</span>
                    <span className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font800 text-[var(--color-text-secondary)]">
                      <span>{request.area}</span>
                      <span aria-hidden>&middot;</span>
                      <span>{request.timing}</span>
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="rounded-full bg-[var(--color-accent)] px-3 py-2 text-lg font900 text-[var(--color-brand-dark)]">{request.budget}</span>
                    <ArrowRight size={20} className="text-[var(--color-brand)] transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustFinale() {
  const items = [
    ["University affiliation", BadgeCheck],
    ["Clear booking details", CalendarCheck],
    ["Ratings and reviews", Star],
    ["Reporting and support", ShieldCheck],
  ] as const;

  return (
    <section className="bg-[var(--color-feature-dark)] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-accent)]">Built around trust</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-page-heading font900">
          Need help, or ready to earn?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/72">
          Etudo helps students find trusted help and earn money by offering their skills across Paris.
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([item, Icon]) => (
            <div key={item} className="rounded-2xl border border-white/12 bg-white/6 p-4 text-left">
              <Icon size={20} className="text-[var(--color-accent)]" aria-hidden />
              <p className="mt-4 font900">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/browse" className="bg-[var(--color-accent)] text-[var(--color-brand-dark)] hover:bg-[var(--color-yellow-soft)]">
            Find student help
          </Button>
          <Button href="/offer" variant="secondary" className="border-white/28 bg-white/10 text-white hover:border-white hover:bg-white/18 hover:text-white">
            Become a helper
          </Button>
        </div>
        <div className="mt-10 inline-flex items-center gap-2 text-sm font900 text-white/70">
          <CheckCircle2 size={16} className="text-[var(--color-accent)]" aria-hidden />
          Student-to-student help, built for life in Paris.
        </div>
      </div>
    </section>
  );
}

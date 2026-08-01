"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/Button";
import { SearchBox } from "@/components/SearchBox";
import { arrondissements, openRequests, students } from "@/lib/data";

const heroImage = "/etudo-paris-eiffel-hero.jpg";

const storyStudents = students.slice(0, 3);
const mapStudents = students.slice(0, 5);

export function HomeScrollStory() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <CinematicHero />
      <StudentDiscovery />
      <BookSequence />
      <MapStory />
      <RequestsScene />
      <TrustFinale />
    </div>
  );
}

function CinematicHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.08]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.46, 0.68], [1, 0.4, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.38, 0.62, 1], [0, 1, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.88]);

  return (
    <section ref={sectionRef} className="relative h-[190dvh] bg-[var(--color-brand-dark)] text-white">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Paris street scene with the Eiffel Tower visible beyond a student neighborhood"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_center] sm:object-center"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,34,56,0.9)_0%,rgba(21,34,56,0.72)_48%,rgba(21,34,56,0.2)_100%)]"
        />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <motion.div style={{ opacity: copyOpacity }} className="max-w-3xl">
            <p className="text-sm font900 uppercase tracking-[0.2em] text-[#C8D2FF]">
              Student-to-student help in Paris
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font900 leading-[0.98] sm:text-7xl lg:text-8xl">
              Need a hand?
              <span className="block">There&apos;s a student for that.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Find trusted students nearby for everyday help, tutoring, creative skills, and more.
            </p>
            <div className="mt-8 max-w-4xl">
              <SearchBox variant="hero" />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/browse" className="bg-white text-[#152238] hover:bg-[#F8F7F3]">
                Find help
              </Button>
              <Button
                href="/offer"
                variant="secondary"
                className="border-white/38 bg-white/10 text-white hover:border-white hover:bg-white/18"
              >
                Earn with Etudo
              </Button>
            </div>
          </motion.div>
          <motion.div
            style={{ opacity: secondOpacity }}
            className="pointer-events-none absolute inset-x-4 bottom-[18dvh] max-w-7xl sm:inset-x-6 lg:inset-x-8"
          >
            <p className="max-w-2xl text-4xl font900 leading-none sm:text-6xl lg:text-7xl">
              Help is closer than you think.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StudentDiscovery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.35 });
  const yOne = useTransform(progress, [0.1, 0.35], reduceMotion ? [0, 0] : [120, 0]);
  const yTwo = useTransform(progress, [0.28, 0.55], reduceMotion ? [0, 0] : [140, 0]);
  const yThree = useTransform(progress, [0.46, 0.75], reduceMotion ? [0, 0] : [160, 0]);
  const opacityOne = useTransform(progress, [0.1, 0.32], [0, 1]);
  const opacityTwo = useTransform(progress, [0.28, 0.5], [0, 1]);
  const opacityThree = useTransform(progress, [0.46, 0.68], [0, 1]);
  const cardMotion = [
    { y: yOne, opacity: opacityOne },
    { y: yTwo, opacity: opacityTwo },
    { y: yThree, opacity: opacityThree },
  ];
  const cardPosition = [
    "top-4 lg:left-4 lg:right-auto",
    "top-48 lg:left-auto lg:right-12",
    "top-[23rem] lg:left-24 lg:right-auto",
  ];

  return (
    <section ref={sectionRef} className="relative h-[210dvh] bg-white">
      <div className="sticky top-0 flex min-h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Etudo people</p>
            <h2 className="mt-4 text-page-heading font900 text-[var(--color-brand-dark)]">
              Real skills.
              <span className="block">Real students.</span>
              <span className="block">Right around Paris.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--color-text-secondary)]">
              Compare nearby helpers by university, distance, rating, availability, and price.
            </p>
            <div className="mt-8">
              <Button href="/browse">Explore students</Button>
            </div>
          </div>
          <div className="relative min-h-[640px]">
            {storyStudents.map((student, index) => (
              <motion.article
                key={student.id}
                style={cardMotion[index]}
                className={`absolute left-0 right-0 mx-auto w-[min(100%,360px)] overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white shadow-[0_34px_80px_rgba(21,34,56,0.16)] ${cardPosition[index]}`}
              >
                <div className="relative h-56">
                  <Image src={student.photo} alt={`Profile photograph of ${student.displayName}`} fill sizes="360px" className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font900 text-[var(--color-brand-dark)]">{student.displayName}</h3>
                      <p className="mt-1 text-sm font800 text-[var(--color-text-secondary)]">{student.university}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font900 text-[var(--color-text)]">
                      <Star size={15} className="fill-[#F5B544] text-[#F5B544]" aria-hidden />
                      {student.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font800 text-[var(--color-text-secondary)]">
                    <MapPin size={15} aria-hidden />
                    {student.area} <span aria-hidden>&middot;</span> {student.distance}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {student.services.slice(0, 2).map((service) => (
                      <span key={service.name} className="rounded-full bg-[var(--color-background)] px-3 py-1 text-xs font900 text-[#475467]">
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BookSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const coverRotate = useTransform(scrollYProgress, [0.15, 0.35], reduceMotion ? [0, 0] : [0, -148]);
  const pageRotate = useTransform(scrollYProgress, [0.35, 0.58], reduceMotion ? [0, 0] : [0, -122]);
  const bookScale = useTransform(scrollYProgress, [0, 0.2, 0.9], reduceMotion ? [1, 1, 1] : [0.86, 1, 1.04]);
  const finalOpacity = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.75, 0.9], [0.94, 1]);

  return (
    <section ref={sectionRef} className="relative h-[330dvh] bg-[linear-gradient(180deg,#fff_0%,#F8F7F3_45%,#EEF3FF_100%)] max-sm:h-[245dvh]">
      <div className="sticky top-0 grid min-h-[100dvh] place-items-center overflow-hidden px-4 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div style={{ scale: bookScale }} className="relative mx-auto h-[420px] w-full max-w-[760px] [perspective:1800px] max-sm:h-[520px]">
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-[#D7D1C4] shadow-[0_50px_120px_rgba(21,34,56,0.22)] max-sm:h-[440px] max-sm:w-[300px]" />
            <div className="absolute left-1/2 top-1/2 flex h-[340px] w-[620px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] bg-[#FBF7EA] shadow-inner [transform-style:preserve-3d] max-sm:h-[420px] max-sm:w-[280px] max-sm:flex-col">
              <div className="relative flex-1 border-r border-[#E8DEC8] p-8 max-sm:border-b max-sm:border-r-0">
                <p className="text-sm font900 uppercase tracking-[0.16em] text-[var(--color-brand)]">Your time has value.</p>
                <p className="mt-8 max-w-xs text-3xl font900 leading-tight text-[var(--color-brand-dark)]">
                  Share what you know, when your schedule allows.
                </p>
                <div className="absolute bottom-6 left-8 right-8 h-px bg-[#E6DCC7]" />
              </div>
              <div className="relative flex-1 p-8">
                <p className="text-sm font900 uppercase tracking-[0.16em] text-[var(--color-brand)]">Your skills can help someone.</p>
                <p className="mt-8 max-w-xs text-3xl font900 leading-tight text-[var(--color-brand-dark)]">
                  Teach what you know. Earn around your schedule.
                </p>
                <div className="absolute bottom-6 left-8 right-8 h-px bg-[#E6DCC7]" />
              </div>
            </div>
            <motion.div
              style={{ rotateY: coverRotate, transformOrigin: "left center" }}
              className="absolute left-1/2 top-1/2 h-[360px] w-[320px] -translate-y-1/2 rounded-r-[24px] bg-[var(--color-brand-dark)] p-8 text-white shadow-[0_40px_90px_rgba(21,34,56,0.28)] [backface-visibility:hidden] max-sm:left-[calc(50%-140px)] max-sm:h-[420px] max-sm:w-[280px] max-sm:rounded-[24px]"
            >
              <span className="grid size-12 place-items-center rounded-[10px] border border-white/18">
                <Sparkles size={20} aria-hidden />
              </span>
              <p className="mt-24 text-5xl font900">Etudo</p>
              <p className="mt-4 text-xl font800 text-white/72">Share what you know.</p>
            </motion.div>
            <motion.div
              style={{ rotateY: pageRotate, transformOrigin: "left center" }}
              className="absolute left-1/2 top-1/2 h-[336px] w-[306px] -translate-y-1/2 rounded-r-[20px] bg-[#FFFDF6] p-8 shadow-[0_24px_70px_rgba(21,34,56,0.16)] [backface-visibility:hidden] max-sm:h-[392px] max-sm:w-[264px]"
            >
              <p className="text-sm font900 uppercase tracking-[0.16em] text-[var(--color-brand)]">First page</p>
              <p className="mt-10 text-3xl font900 leading-tight text-[var(--color-brand-dark)]">
                A skill you already have can solve someone&apos;s week.
              </p>
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: finalOpacity, scale: ctaScale }} className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font900 text-[var(--color-brand-dark)] shadow-[var(--shadow-small)]">
              <BookOpen size={16} className="text-[var(--color-brand)]" aria-hidden />
              Tutor and helper onboarding
            </div>
            <h2 className="mt-5 text-page-heading font900 text-[var(--color-brand-dark)]">
              Teach what you know.
              <span className="block">Earn around your schedule.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
              Tutor a subject, teach a language, share a creative skill, or offer practical help between classes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/offer">Become a tutor</Button>
              <Button href="/offer" variant="ghost">Offer another skill</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MapStory() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-blue-soft)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Paris discovery</p>
          <h2 className="mt-4 text-page-heading font900 text-[var(--color-brand-dark)]">
            See who can help nearby.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Search by skill, arrondissement, availability, and distance.
          </p>
          <div className="mt-8">
            <Button href="/browse?view=map">Open interactive map</Button>
          </div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_38px_90px_rgba(21,34,56,0.14)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,124,250,0.22),transparent_32%),linear-gradient(135deg,#F8F7F3,#EEF3FF)]" />
          <div className="absolute inset-8 grid grid-cols-5 grid-rows-5 gap-2 opacity-80">
            {arrondissements.slice(0, 20).map((area, index) => (
              <Link
                key={area.number}
                href={`/browse?view=map&areas=${area.number}`}
                className={`grid place-items-center rounded-2xl border border-white bg-white/70 text-xs font900 text-[var(--color-brand-dark)] shadow-[0_10px_22px_rgba(21,34,56,0.08)] backdrop-blur transition hover:-translate-y-1 hover:bg-white ${
                  index === 16 ? "ring-4 ring-[var(--color-brand)]/20" : ""
                }`}
              >
                {area.label}
              </Link>
            ))}
          </div>
          {mapStudents.map((student, index) => (
            <Link
              key={student.id}
              href={`/students/${student.id}`}
              className="absolute grid size-14 place-items-center overflow-hidden rounded-full border-2 border-white shadow-[0_18px_34px_rgba(21,34,56,0.24)] transition hover:scale-105"
              style={{ left: `${18 + index * 15}%`, top: `${24 + ((index * 17) % 46)}%` }}
              aria-label={`View ${student.displayName}`}
            >
              <Image src={student.photo} alt="" fill sizes="56px" className="object-cover" />
            </Link>
          ))}
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/88 p-4 shadow-[var(--shadow-medium)] backdrop-blur">
            <p className="text-sm font900 text-[var(--color-brand-dark)]">17e selected</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Moving help, tutoring, and pet care near Batignolles.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestsScene() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Earn nearby</p>
          <h2 className="mt-4 text-section-heading font900 text-[var(--color-brand-dark)]">
            Open requests become flexible work.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            Students post clear tasks. Helpers choose the work that fits.
          </p>
          <div className="mt-8">
            <Button href="/requests">Browse requests</Button>
          </div>
        </div>
        <div className="grid gap-4">
          {openRequests.slice(0, 4).map((request) => (
            <Link
              key={request.id}
              href={`/requests/${request.id}`}
              className="group grid gap-4 rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-[var(--color-background)] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-[var(--shadow-medium)] sm:grid-cols-[1fr_auto]"
            >
              <span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font900 text-[var(--color-brand)]">
                  {request.category}
                </span>
                <span className="mt-3 block text-2xl font900 text-[var(--color-brand-dark)]">{request.title}</span>
                <span className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font800 text-[var(--color-text-secondary)]">
                  <span>{request.area}</span>
                  <span aria-hidden>&middot;</span>
                  <span>{request.timing}</span>
                  <span aria-hidden>&middot;</span>
                  <span>{request.duration}</span>
                </span>
              </span>
              <span className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="text-2xl font900 text-[var(--color-brand-dark)]">{request.budget}</span>
                <ArrowRight size={20} className="text-[var(--color-brand)] transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
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
    <section className="bg-[var(--color-brand-dark)] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font900 uppercase tracking-[0.18em] text-[#AEBBFF]">Built around trust</p>
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
          <Button href="/browse" className="bg-white text-[var(--color-brand-dark)] hover:bg-[var(--color-background)]">
            Find student help
          </Button>
          <Button href="/offer" variant="secondary" className="border-white/28 bg-white/10 text-white hover:border-white hover:bg-white/18">
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

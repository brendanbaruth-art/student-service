import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeCheck, BookOpen, CalendarClock, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { AcademicSearch } from "./AcademicSearch";
import { CourseCard } from "./CourseCard";
import { MentorCard } from "./MentorCard";
import { NoteCard } from "./NoteCard";
import { courses, mentors, noteListings } from "@/lib/academic";

const trustItems = [
  ["Verified Students", "Mentors confirm student status and academic history."],
  ["Course Specific Mentors", "Match by university, course, and professor."],
  ["Flexible Pricing", "Compare hourly rates before booking."],
  ["University Focused", "Built around real courses, not generic subjects."],
];

export function AcademicHome() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <p className="inline-flex rounded-full bg-[var(--color-blue-soft)] px-3 py-1 text-sm font900 text-[var(--color-brand)]">
              University-specific academic marketplace
            </p>
            <h1 className="mt-6 text-5xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-6xl lg:text-7xl">
              Learn from students who already passed your course.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
              Find verified student mentors who know your course, professor, grading style, exams, and assignments.
            </p>
            <div className="mt-8">
              <AcademicSearch />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/browse" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--color-brand)] px-6 text-sm font900 text-white transition hover:bg-[#1D4ED8]">
                Find a Mentor
              </Link>
              <Link href="/offer" className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--color-border)] bg-white px-6 text-sm font900 text-[var(--color-brand-dark)] transition hover:border-[var(--color-brand)]">
                Become a Mentor
              </Link>
            </div>
          </div>
          <div className="rounded-[var(--radius-large)] border border-[var(--color-border)] bg-[linear-gradient(145deg,#EFF6FF,#FFFFFF)] p-5 shadow-[var(--shadow-large)]">
            <div className="rounded-[var(--radius-medium)] bg-white p-5 shadow-[var(--shadow-small)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font900 uppercase tracking-[0.14em] text-[var(--color-brand)]">Course match</p>
                  <h2 className="mt-2 text-2xl font900 text-[var(--color-brand-dark)]">Financial Accounting</h2>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">ESCP Business School - Professor Claire Dupont</p>
                </div>
                <span className="rounded-full bg-[var(--color-yellow-soft)] px-3 py-1 text-xs font900 text-[var(--color-brand-dark)]">
                  Popular
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {mentors.slice(0, 3).map((mentor) => (
                  <div key={mentor.id} className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] p-3">
                    <div>
                      <p className="font900 text-[var(--color-brand-dark)]">{mentor.displayName}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">Completed this course - &euro;{mentor.hourlyRate}/hour</p>
                    </div>
                    <BadgeCheck size={20} className="text-[var(--color-brand)]" aria-hidden />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-[var(--radius-medium)] bg-[var(--color-brand)] p-5 text-white">
                <BookOpen size={22} aria-hidden />
                <p className="mt-4 text-2xl font900">{noteListings.length}</p>
                <p className="text-sm text-white/80">course note packs</p>
              </div>
              <div className="rounded-[var(--radius-medium)] bg-[var(--color-brand-dark)] p-5 text-white">
                <GraduationCap size={22} aria-hidden />
                <p className="mt-4 text-2xl font900">{mentors.length}</p>
                <p className="text-sm text-white/80">verified mentors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustItems.map(([title, text]) => (
            <div key={title} className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-4">
              <ShieldCheck size={18} className="text-[var(--color-brand)]" aria-hidden />
              <p className="mt-3 font900 text-[var(--color-brand-dark)]">{title}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">How it works</p>
              <h2 className="mt-3 text-section-heading font900 text-[var(--color-brand-dark)]">Two connected academic marketplaces.</h2>
              <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
                Courses connect everything: mentors who completed them, professors they studied under, and notes made for the same class.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FlowCard title="Mentoring" icon={<CalendarClock size={22} aria-hidden />} steps={["Search your course", "Compare verified mentors", "Choose a time", "Book your session", "Learn from someone who already took it"]} />
              <FlowCard title="Notes" icon={<BookOpen size={22} aria-hidden />} steps={["Find your course", "Preview selected pages", "Check professor context", "Buy study materials", "Revise with course-specific notes"]} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Courses</p>
              <h2 className="mt-3 text-section-heading font900 text-[var(--color-brand-dark)]">Start with the course.</h2>
            </div>
            <Link href="/search" className="text-sm font900 text-[var(--color-brand)]">Search all courses</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Featured mentors</p>
              <h2 className="mt-3 text-section-heading font900 text-[var(--color-brand-dark)]">Course-specific help from verified students.</h2>
              <div className="mt-8 grid gap-5">
                {mentors.slice(0, 2).map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)}
              </div>
            </div>
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Notes marketplace</p>
              <h2 className="mt-3 text-section-heading font900 text-[var(--color-brand-dark)]">Study materials made for your exact class.</h2>
              <div className="mt-8 grid gap-5">
                {noteListings.slice(0, 2).map((note) => <NoteCard key={note.id} note={note} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-brand)]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-14 text-white sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <Sparkles size={24} className="text-[var(--color-accent)]" aria-hidden />
            <h2 className="mt-4 text-3xl font900">Find a mentor or buy notes for your next exam.</h2>
            <p className="mt-2 text-white/78">Etudo is built around the course, professor, and university you actually have.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/browse" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-sm font900 text-[var(--color-brand)]">
              Find a Mentor
            </Link>
            <Link href="/notes" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/40 px-6 text-sm font900 text-white">
              Browse Notes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FlowCard({ title, icon, steps }: { title: string; icon: ReactNode; steps: string[] }) {
  return (
    <div className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
      <div className="flex items-center gap-3 text-[var(--color-brand)]">
        {icon}
        <h3 className="text-xl font900 text-[var(--color-brand-dark)]">{title}</h3>
      </div>
      <ol className="mt-5 grid gap-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm font800 text-[var(--color-text-secondary)]">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--color-blue-soft)] text-xs font900 text-[var(--color-brand)]">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

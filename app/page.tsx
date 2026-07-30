import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  MailCheck,
  MessageSquareWarning,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { StudentCard } from "@/components/StudentCard";
import { Toast } from "@/components/Toast";
import { popularCategories, students } from "@/lib/data";

const examples = [
  { label: "Help moving", href: "/search?q=help+moving" },
  { label: "Maths tutor", href: "/search?q=maths+tutoring" },
  { label: "Furniture assembly", href: "/search?category=assembly" },
  { label: "Pet sitting", href: "/search?category=pet-sitting" },
];

const trustItems = [
  { icon: ShieldCheck, title: "Student status verified" },
  { icon: CreditCard, title: "Clear prices" },
  { icon: CalendarCheck, title: "Secure booking" },
];

const customerSteps = [
  "Describe your task",
  "Compare verified students",
  "Book the right person",
];

const helperSteps = [
  "Create your profile",
  "List your skills and price",
  "Accept work around your schedule",
];

const safetyItems = [
  ["University email verification", MailCheck],
  ["Student ID review", BadgeCheck],
  ["Ratings and reviews", Star],
  ["Clear booking details", CalendarCheck],
  ["Reporting and support", MessageSquareWarning],
] as const;

export default function Home() {
  return (
    <PageShell>
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <Toast message="Launching first in Paris" />
            <p className="mt-8 text-sm font900 uppercase tracking-[0.2em] text-[#5B7CFA]">
              Student-to-student help in Paris
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font900 leading-[1.04] tracking-tight text-[#152238] sm:text-6xl lg:text-7xl">
              Get help from students you can trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#667085]">
              Find verified students for moving, tutoring, errands, tech support,
              pet care, and everyday tasks across Paris.
            </p>
            <div className="mt-8">
              <SearchBox />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <Link
                  key={example.label}
                  href={example.href}
                  className="rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm font800 text-[#475467] transition hover:border-[#5B7CFA] hover:text-[#152238]"
                >
                  {example.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/browse">Find help</Button>
              <Button href="/offer" variant="secondary">
                Offer a service
              </Button>
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-[#F8F7F3]">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85"
              alt="Students working together at a table in Paris"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/60 bg-white/92 p-5 shadow-[0_18px_45px_rgba(21,34,56,0.18)] backdrop-blur">
              <p className="text-sm font900 text-[#152238]">Book trusted help in minutes</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["Moving", "Tutoring", "Errands"].map((item) => (
                  <div key={item} className="rounded-md bg-[#F8F7F3] px-3 py-3">
                    <p className="text-sm font800 text-[#172033]">{item}</p>
                    <p className="mt-1 text-xs text-[#667085]">Available in Paris</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#F8F7F3]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3 lg:px-8">
          {trustItems.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-white text-[#4FAE8A]">
                <Icon size={19} aria-hidden />
              </span>
              <span className="text-sm font900 text-[#172033]">{title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
              Popular services
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font900 tracking-tight text-[#152238] sm:text-4xl">
              Everyday help, designed for Paris student life.
            </h2>
          </div>
          <Button href="/browse" variant="ghost" className="justify-start px-0 sm:justify-center">
            View all services <ChevronRight size={17} aria-hidden />
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularCategories.map((category) => (
            <ServiceCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
              How Etudo works
            </p>
            <h2 className="mt-3 text-3xl font900 tracking-tight text-[#152238] sm:text-4xl">
              Two simple paths, one trusted network.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {[
              ["I need help", customerSteps],
              ["I want to earn", helperSteps],
            ].map(([title, steps]) => (
              <div key={title as string} className="rounded-lg border border-[#E5E7EB] bg-[#F8F7F3] p-6">
                <h3 className="text-2xl font900 text-[#152238]">{title as string}</h3>
                <div className="mt-6 grid gap-4">
                  {(steps as string[]).map((step, index) => (
                    <div key={step} className="flex items-start gap-4">
                      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-white text-sm font900 text-[#5B7CFA]">
                        {index + 1}
                      </span>
                      <p className="pt-1.5 text-base font800 text-[#172033]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
              Featured students
            </p>
            <h2 className="mt-3 text-3xl font900 tracking-tight text-[#152238] sm:text-4xl">
              Reliable help from university peers.
            </h2>
          </div>
          <Button href="/search" variant="ghost" className="justify-start px-0 sm:justify-center">
            Search students <ChevronRight size={17} aria-hidden />
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {students.slice(0, 4).map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </section>

      <section className="bg-[#152238] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[#9FB0FF]">
              Safety
            </p>
            <h2 className="mt-3 text-3xl font900 tracking-tight sm:text-4xl">
              Built around student trust
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              Etudo’s trust model is designed around university affiliation,
              transparent booking details, and accountable marketplace behavior.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {safetyItems.map(([item, Icon]) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/6 p-4">
                <Icon size={20} className="text-[#4FAE8A]" aria-hidden />
                <span className="font800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <CheckCircle2 className="mx-auto text-[#4FAE8A]" size={34} aria-hidden />
          <h2 className="mt-4 text-4xl font900 tracking-tight text-[#152238]">
            Need help, or ready to earn?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#667085]">
            Join Etudo to find trusted student help or offer your skills around your studies.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/browse">Find student help</Button>
            <Button href="/offer" variant="secondary">
              Become a helper
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

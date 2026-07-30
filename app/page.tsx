import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Coffee,
  CreditCard,
  MailCheck,
  MapPin,
  MessageSquareWarning,
  ShieldCheck,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { SearchBox } from "@/components/SearchBox";
import { ServiceCard } from "@/components/ServiceCard";
import { StudentCard } from "@/components/StudentCard";
import { popularCategories, students } from "@/lib/data";

const heroImage =
  "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=82";

const lifestyleImage =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=82";

const earnImage =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=82";

const safetyImage =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=82";

const examples = [
  { label: "Help moving", href: "/search?q=help+moving" },
  { label: "Maths tutor", href: "/search?q=maths+tutoring" },
  { label: "Furniture assembly", href: "/search?category=assembly" },
  { label: "Pet sitting", href: "/search?category=pet-sitting" },
];

const trustItems = [
  { icon: ShieldCheck, title: "Student status verified", text: "University affiliation is part of the trust model." },
  { icon: CreditCard, title: "Clear prices", text: "See hourly or fixed rates before you request help." },
  { icon: CalendarCheck, title: "Secure booking", text: "Share the task, place, and time before confirming." },
];

const customerSteps = [
  "Describe what you need",
  "Compare verified students",
  "Book the right person",
];

const helperSteps = [
  "Create your profile",
  "Set your services and price",
  "Accept work around your schedule",
];

const pathCards: Array<{ title: string; steps: string[]; icon: LucideIcon }> = [
  { title: "I need help", steps: customerSteps, icon: Users },
  { title: "I want to earn", steps: helperSteps, icon: Bike },
];

const openRequests = [
  { task: "Carry boxes to a new studio", area: "11e - Bastille", price: "Est. €44", tag: "Moving" },
  { task: "Maths prep before exams", area: "16e - Dauphine", price: "€30/hour", tag: "Tutoring" },
  { task: "Assemble a desk and shelves", area: "13e - Bibliothèque", price: "€25/hour", tag: "Assembly" },
];

const earnBenefits = [
  "Work between classes",
  "Choose the jobs you want",
  "Build reviews in your student community",
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
      <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-[#152238] text-white">
        <Image
          src={heroImage}
          alt="Warm Paris street scene with cafes, Haussmann buildings, and people walking in the evening"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,34,56,0.88)_0%,rgba(21,34,56,0.72)_42%,rgba(21,34,56,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(91,124,250,0.24),transparent_30%),linear-gradient(180deg,rgba(21,34,56,0.1),rgba(21,34,56,0.55))]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="animate-rise inline-flex items-center gap-2 rounded-md border border-white/22 bg-white/12 px-3 py-2 text-sm font900 backdrop-blur">
              <span className="grid size-6 place-items-center rounded bg-white text-[#152238]">E</span>
              Etudo
            </div>
            <p className="animate-rise animate-rise-delay-1 mt-8 text-sm font900 uppercase tracking-[0.2em] text-[#C8D2FF]">
              Student-to-student help in Paris
            </p>
            <h1 className="animate-rise animate-rise-delay-1 mt-4 max-w-3xl text-4xl font900 leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Need a hand? There&apos;s a student for that.
            </h1>
            <p className="animate-rise animate-rise-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              Find verified students for moving, tutoring, errands, tech support,
              pet care, and everyday tasks across Paris.
            </p>
            <div className="animate-rise animate-rise-delay-2 mt-8">
              <SearchBox variant="hero" />
            </div>
            <div className="animate-rise animate-rise-delay-3 mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <Link
                  key={example.label}
                  href={example.href}
                  className="rounded-full border border-white/24 bg-white/12 px-3 py-2 text-sm font800 text-white transition hover:bg-white hover:text-[#152238] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {example.label}
                </Link>
              ))}
            </div>
            <div className="animate-rise animate-rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/browse" className="bg-white text-[#152238] hover:bg-[#F8F7F3]">
                Find help
              </Button>
              <Button href="/offer" variant="secondary" className="border-white/38 bg-white/10 text-white hover:border-white hover:bg-white/18">
                Earn with Etudo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3 lg:px-8">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-[#E8F5EF] text-[#4FAE8A]">
                <Icon size={19} aria-hidden />
              </span>
              <span>
                <span className="block text-sm font900 text-[#172033]">{title}</span>
                <span className="mt-1 block text-sm leading-6 text-[#667085]">{text}</span>
              </span>
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
              Practical help for everyday student life.
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
                Available students
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
        </div>
      </section>

      <section className="bg-[#EEF3FF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
                Open requests
              </p>
              <h2 className="mt-3 text-3xl font900 tracking-tight text-[#152238] sm:text-4xl">
                Tasks happening around Paris.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#667085]">
                From a quick bookshelf build in the 13e to exam help near Dauphine,
                Etudo is shaped around real student routines.
              </p>
            </div>
            <div className="grid gap-3">
              {openRequests.map((request) => (
                <Link
                  key={request.task}
                  href="/browse"
                  className="group grid gap-4 rounded-lg border border-white/80 bg-white/82 p-4 shadow-[0_12px_28px_rgba(21,34,56,0.06)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_40px_rgba(21,34,56,0.1)] sm:grid-cols-[1fr_auto]"
                >
                  <span>
                    <span className="inline-flex rounded-full bg-[#F8F7F3] px-2.5 py-1 text-xs font900 text-[#5B7CFA]">
                      {request.tag}
                    </span>
                    <span className="mt-3 block text-base font900 text-[#152238]">{request.task}</span>
                    <span className="mt-1 flex items-center gap-2 text-sm font700 text-[#667085]">
                      <MapPin size={15} aria-hidden /> {request.area}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="text-base font900 text-[#152238]">{request.price}</span>
                    <ArrowRight size={18} className="text-[#5B7CFA] transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#F8F7F3]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-[#E5E7EB] shadow-[0_24px_50px_rgba(21,34,56,0.12)]">
            <Image
              src={lifestyleImage}
              alt="Students spending time together outdoors between classes"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#152238]/50 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/24 bg-white/90 p-4 backdrop-blur">
              <p className="text-sm font900 text-[#152238]">Made for Paris schedules</p>
              <p className="mt-1 text-sm leading-6 text-[#667085]">
                Quick help between lectures, part-time work, and weekend plans.
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
              How Etudo works
            </p>
            <h2 className="mt-3 text-3xl font900 tracking-tight text-[#152238] sm:text-4xl">
              Two simple paths, one trusted network.
            </h2>
            <div className="mt-8 grid gap-5">
              {pathCards.map(({ title, steps, icon: Icon }) => (
                <div key={title} className="rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(21,34,56,0.04)]">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-md bg-[#EEF2FF] text-[#5B7CFA]">
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className="text-2xl font900 text-[#152238]">{title}</h3>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {steps.map((step, index) => (
                      <div key={step} className="rounded-md bg-[#F8F7F3] p-4">
                        <span className="text-sm font900 text-[#5B7CFA]">0{index + 1}</span>
                        <p className="mt-2 text-sm font900 leading-6 text-[#172033]">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
              Earn with Etudo
            </p>
            <h2 className="mt-3 text-3xl font900 tracking-tight text-[#152238] sm:text-4xl">
              Turn your skills into flexible work around Paris.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#667085]">
              Offer moving help, tutoring, pet care, photography, tech support, or
              practical errands. Set your own rates and choose work that fits your week.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {earnBenefits.map((item) => (
                <div key={item} className="rounded-lg border border-[#E5E7EB] bg-[#F8F7F3] p-4">
                  <CheckCircle2 size={18} className="text-[#4FAE8A]" aria-hidden />
                  <p className="mt-3 text-sm font900 leading-6 text-[#172033]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/offer">Start offering services</Button>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-[#F8F7F3] shadow-[0_24px_50px_rgba(21,34,56,0.12)]">
            <Image
              src={earnImage}
              alt="Students collaborating around a table in a warm cafe-like study space"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-md bg-white/92 px-3 py-2 text-sm font900 text-[#152238] shadow-[0_12px_30px_rgba(21,34,56,0.16)] backdrop-blur">
              <Coffee size={16} className="text-[#5B7CFA]" aria-hidden />
              Flexible work, Paris pace
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#152238] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-white/10 lg:order-2">
            <Image
              src={safetyImage}
              alt="Students studying together in a bright university setting"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#152238]/72 to-transparent" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font900 uppercase tracking-[0.18em] text-[#9FB0FF]">
              Trust
            </p>
            <h2 className="mt-3 text-3xl font900 tracking-tight sm:text-4xl">
              Built around student trust.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              Etudo&apos;s trust model is designed around university affiliation,
              transparent booking details, and accountable marketplace behavior.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {safetyItems.map(([item, Icon]) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/6 p-4">
                  <Icon size={20} className="text-[#4FAE8A]" aria-hidden />
                  <span className="font800">{item}</span>
                </div>
              ))}
            </div>
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

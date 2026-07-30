import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Flag, Languages, MapPin, MessageCircle, ShieldCheck, Sparkles, Star } from "lucide-react";
import { BookingSummary } from "@/components/BookingSummary";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { SelectField, TextInput } from "@/components/FormField";
import { StudentCard } from "@/components/StudentCard";
import { VerificationBadge } from "@/components/VerificationBadge";
import { findStudent, students } from "@/lib/data";

type StudentProfileProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return students.map((student) => ({ id: student.id }));
}

export async function generateMetadata({ params }: StudentProfileProps) {
  const { id } = await params;
  const student = findStudent(id);

  return {
    title: student ? `${student.displayName} profile` : "Student profile",
    description: student?.bio || "View a student helper profile on Etudo.",
  };
}

export default async function StudentProfilePage({ params }: StudentProfileProps) {
  const { id } = await params;
  const student = findStudent(id);

  if (!student) notFound();

  const similarStudents = students
    .filter(
      (item) =>
        item.id !== student.id &&
        item.capabilities.some((capability) =>
          student.capabilities.some((other) => other.category === capability.category),
        ),
    )
    .slice(0, 3);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <div className="relative h-[420px] overflow-hidden rounded-lg bg-[#F2F4F7]">
            <Image
              src={student.photo}
              alt={`Profile photograph of ${student.displayName}, ${student.university}`}
              fill
              priority
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="self-center">
            {student.verified ? <VerificationBadge /> : <span className="rounded-full bg-[#F8F7F3] px-3 py-1 text-sm font900 text-[#667085]">New on Etudo</span>}
            <h1 className="mt-5 text-5xl font900 tracking-tight text-[#152238]">
              {student.displayName}
            </h1>
            <p className="mt-3 text-lg font800 text-[#667085]">{student.university}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font700 text-[#667085]">
              <span className="flex items-center gap-2">
                <MapPin size={17} aria-hidden />
                {student.area} · {student.distance}
              </span>
              <span className="flex items-center gap-2">
                <Star size={17} className="fill-[#F5B544] text-[#F5B544]" aria-hidden />
                {student.rating.toFixed(1)} · {student.reviews} reviews
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle size={17} aria-hidden />
                {student.responseTime}
              </span>
              <span className="flex items-center gap-2">
                <Languages size={17} aria-hidden />
                {student.languages.join(", ")}
              </span>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#667085]">{student.bio}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {[
                student.responseRate || "New on Etudo",
                student.completedTasks ? `${student.completedTasks} tasks completed` : "Building history",
                student.repeatBookings ? `${student.repeatBookings} repeat bookings` : "Open to first booking",
                `Member since ${student.memberSince}`,
              ].map((item) => (
                <div key={item} className="rounded-lg border border-[#E5E7EB] bg-[#F8F7F3] p-4">
                  <p className="text-sm font900 text-[#152238]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(student.capabilities[0].service)}`}>
                Request booking
              </Button>
              <Button href="/search" variant="secondary">
                Back to results
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="grid gap-8">
          <section className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-2xl font900 text-[#152238]">About me</h2>
            <p className="mt-4 max-w-3xl leading-7 text-[#667085]">{student.bio}</p>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-2xl font900 text-[#152238]">What I can help with</h2>
            <p className="mt-2 text-sm leading-6 text-[#667085]">
              Each service has its own price and availability.
            </p>
            <div className="mt-5 grid gap-4">
              {student.capabilities.map((capability) => (
                <div key={capability.service} className="rounded-lg border border-[#E5E7EB] p-4">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font900 text-[#172033]">
                        <Sparkles size={18} className="text-[#5B7CFA]" aria-hidden />
                        {capability.service}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                        {capability.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font800 text-[#667085]">
                        <span className="rounded-full bg-[#F8F7F3] px-3 py-1">{capability.availability}</span>
                        <span className="rounded-full bg-[#F8F7F3] px-3 py-1">
                          {capability.pricingType === "hourly" ? "Hourly" : capability.pricingType === "fixed-from" ? "Fixed from" : "Fixed price"}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 md:text-right">
                      <p className="text-lg font900 text-[#152238]">
                        {capability.pricingType === "hourly" ? `€${capability.price}/hour` : capability.pricingType === "fixed-from" ? `From €${capability.price}` : `€${capability.price} fixed`}
                      </p>
                      <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(capability.service)}`} variant="secondary" className="mt-3">
                        Book this service
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <h2 className="flex items-center gap-2 text-2xl font900 text-[#152238]">
                <CalendarDays size={22} aria-hidden />
                Availability
              </h2>
              <div className="mt-5 grid gap-2 text-sm">
                {student.weeklyAvailability?.map((item) => (
                  <div key={item.day} className="flex items-center justify-between rounded-md bg-[#F8F7F3] px-3 py-3">
                    <span className="font900 text-[#172033]">{item.day}</span>
                    <span className="font800 text-[#667085]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <h2 className="text-2xl font900 text-[#152238]">Languages</h2>
              <div className="mt-5 grid gap-2 text-sm">
                {student.languageLevels?.map((item) => (
                  <div key={item.language} className="flex items-center justify-between rounded-md bg-[#F8F7F3] px-3 py-3">
                    <span className="font900 text-[#172033]">{item.language}</span>
                    <span className="font800 text-[#667085]">{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-2xl font900 text-[#152238]">Where I can help</h2>
            <p className="mt-3 text-sm leading-6 text-[#667085]">
              Based in: {student.baseArrondissement ? `${student.baseArrondissement}e arrondissement` : student.area}. Exact addresses are never shown publicly.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {student.serviceAreas.map((area) => (
                <span key={area} className="rounded-full bg-[#EEF2FF] px-3 py-1 text-sm font900 text-[#5B7CFA]">
                  {area}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm font800 text-[#667085]">{student.travelNote}</p>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-2xl font900 text-[#152238]">Reviews</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {student.reviewSnippets.map((review) => (
                <article key={review.author} className="rounded-lg bg-[#F8F7F3] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font900 text-[#172033]">{review.author}</p>
                    <span className="flex items-center gap-1 text-sm font800 text-[#172033]">
                      <Star size={15} className="fill-[#F5B544] text-[#F5B544]" aria-hidden />
                      {review.rating}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#667085]">{review.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-2xl font900 text-[#152238]">Safety and verification</h2>
            <p className="mt-3 text-sm leading-6 text-[#667085]">
              Etudo Verified represents the intended verification model: student status,
              university affiliation, identity review, and email confirmation.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Student status", "University affiliation", "Identity verification", "Email verification"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-[#F8F7F3] p-3 text-sm font800 text-[#172033]">
                  <ShieldCheck size={16} className="text-[#4FAE8A]" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/safety" className="inline-flex items-center gap-2 text-sm font900 text-[#5B7CFA] hover:text-[#152238]">
                <ShieldCheck size={16} aria-hidden /> Safety
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 text-sm font900 text-[#667085] hover:text-[#152238]">
                <Flag size={16} aria-hidden /> Report profile
              </a>
            </div>
          </section>
        </div>

        <aside className="hidden h-fit rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.08)] lg:sticky lg:top-24 lg:block">
          <p className="text-sm text-[#667085]">Starting at</p>
          <p className="mt-1 text-3xl font900 text-[#152238]">{student.startingPrice}</p>
          <div className="mt-5 grid gap-4">
            <SelectField id="service" label="Service" defaultValue={student.capabilities[0].service}>
              {student.capabilities.map((capability) => (
                <option key={capability.service}>{capability.service}</option>
              ))}
            </SelectField>
            <TextInput id="date" label="Date" type="date" />
            <TextInput id="time" label="Time" type="time" />
            <TextInput id="district" label="District or postcode" placeholder="75017" />
            <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(student.capabilities[0].service)}`} className="w-full">
              Continue
            </Button>
          </div>
          <div className="mt-5">
            <BookingSummary student={student} />
          </div>
        </aside>
      </section>

      <section className="bg-white pb-24 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font900 tracking-tight text-[#152238]">Similar students</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {similarStudents.map((item) => (
              <StudentCard key={item.id} student={item} />
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E7EB] bg-white p-3 shadow-[0_-12px_30px_rgba(21,34,56,0.12)] lg:hidden">
        <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(student.capabilities[0].service)}`} className="w-full">
          Book {student.displayName} from {student.startingPrice}
        </Button>
      </div>
    </PageShell>
  );
}

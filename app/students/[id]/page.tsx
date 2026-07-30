import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Languages, MapPin, MessageCircle, Star } from "lucide-react";
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

  if (!student) {
    notFound();
  }

  const similarStudents = students
    .filter(
      (item) =>
        item.id !== student.id &&
        item.categories.some((category) => student.categories.includes(category)),
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
            <VerificationBadge />
            <h1 className="mt-5 text-5xl font900 tracking-tight text-[#152238]">
              {student.displayName}
            </h1>
            <p className="mt-3 text-lg font800 text-[#667085]">{student.university}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font700 text-[#667085]">
              <span className="flex items-center gap-2">
                <MapPin size={17} aria-hidden />
                {student.area}
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
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(student.services[0].name)}`}>
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
            <h2 className="text-2xl font900 text-[#152238]">About</h2>
            <p className="mt-4 leading-7 text-[#667085]">{student.bio}</p>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-2xl font900 text-[#152238]">Services</h2>
            <div className="mt-5 grid gap-4">
              {student.services.map((service) => (
                <div key={service.name} className="rounded-lg border border-[#E5E7EB] p-4">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-lg font900 text-[#172033]">{service.name}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
                        {service.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font800 text-[#667085]">
                        <span className="rounded-full bg-[#F8F7F3] px-3 py-1">{service.availability}</span>
                        <span className="rounded-full bg-[#F8F7F3] px-3 py-1">
                          {service.pricingType === "hourly" ? "Hourly" : "Fixed price"}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 md:text-right">
                      <p className="text-lg font900 text-[#152238]">{service.price}</p>
                      <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(service.name)}`} variant="secondary" className="mt-3">
                        Select
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
              <p className="mt-4 leading-7 text-[#667085]">{student.availability}</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font800 text-[#667085]">
                {["Mon", "Wed", "Sat"].map((day) => (
                  <span key={day} className="rounded-md bg-[#F8F7F3] px-2 py-3">{day}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
              <h2 className="text-2xl font900 text-[#152238]">Skills and languages</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {[...student.skills, ...student.languages].map((item) => (
                  <span key={item} className="rounded-full bg-[#F8F7F3] px-3 py-1 text-sm font800 text-[#475467]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
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
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["University email checked", "Student ID review", "Clear booking details", "Support and reporting"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-[#F8F7F3] p-3 text-sm font800 text-[#172033]">
                  <Clock size={16} className="text-[#4FAE8A]" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden h-fit rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.08)] lg:sticky lg:top-24 lg:block">
          <p className="text-sm text-[#667085]">Starting at</p>
          <p className="mt-1 text-3xl font900 text-[#152238]">{student.startingPrice}</p>
          <div className="mt-5 grid gap-4">
            <SelectField id="service" label="Service" defaultValue={student.services[0].name}>
              {student.services.map((service) => (
                <option key={service.name}>{service.name}</option>
              ))}
            </SelectField>
            <TextInput id="date" label="Date" type="date" />
            <TextInput id="time" label="Time" type="time" />
            <TextInput id="district" label="District or postcode" placeholder="75005" />
            <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(student.services[0].name)}`} className="w-full">
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
        <Button href={`/booking?student=${student.id}&service=${encodeURIComponent(student.services[0].name)}`} className="w-full">
          Book {student.displayName} from {student.startingPrice}
        </Button>
      </div>
    </PageShell>
  );
}

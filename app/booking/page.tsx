import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, MapPin, Star } from "lucide-react";
import { BookingSummary } from "@/components/BookingSummary";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { SelectField, TextAreaField, TextInput } from "@/components/FormField";
import { findStudent, students } from "@/lib/data";

type BookingPageProps = {
  searchParams?: Promise<{
    student?: string;
    service?: string;
  }>;
};

export const metadata = {
  title: "Request a booking",
  description: "Request student help through Etudo.",
};

const steps = [
  "Select service",
  "Choose date and time",
  "Enter task details",
  "Add location",
  "Review request",
  "Confirmation",
];

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  const student = findStudent(params?.student || "") || students[0];
  const service = params?.service || student.services[0].name;

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">
        <div>
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">
            Booking request
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">
            Request {service.toLowerCase()} from {student.displayName}.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Share the details of your task. You will review the estimated total before sending the request.
          </p>

          <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step} className={`rounded-lg border p-4 ${index <= 1 ? "border-[var(--color-brand)] bg-white" : "border-[var(--color-border)] bg-white/70"}`}>
                <p className="text-xs font900 uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">Step {index + 1}</p>
                <p className="mt-2 text-sm font900 text-[var(--color-text)]">{step}</p>
              </li>
            ))}
          </ol>

          <form className="mt-8 rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)] sm:p-6">
            <div className="grid gap-8">
              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">1. Select service</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <SelectField id="service" label="Service" defaultValue={service}>
                    {student.services.map((item) => (
                      <option key={item.name}>{item.name}</option>
                    ))}
                  </SelectField>
                  <SelectField id="duration" label="Estimated duration" defaultValue="2 hours">
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                    <option>Half day</option>
                  </SelectField>
                </div>
              </section>

              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">2. Choose date and time</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <TextInput id="date" label="Date" type="date" required />
                  <TextInput id="time" label="Time" type="time" required />
                </div>
              </section>

              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">3. Task details</h2>
                <div className="mt-4 grid gap-4">
                  <TextAreaField id="help-needed" label="What help is needed?" placeholder="Describe the task clearly." required />
                  <TextInput id="items" label="Items involved" placeholder="Boxes, desk, pet food, laptop, documents" />
                  <TextAreaField id="notes" label="Additional notes" placeholder="Anything the student should know before accepting." />
                </div>
              </section>

              <section>
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">4. Location</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <TextInput id="address" label="Address or approximate location" placeholder="Street or district" required />
                  <TextInput id="postcode" label="District or postcode" placeholder="75005" />
                  <TextInput id="access" label="Access information" placeholder="Floor, lift, entry code, meeting point" />
                </div>
              </section>

              <section className="rounded-lg bg-[var(--color-surface-soft)] p-5">
                <h2 className="text-xl font900 text-[var(--color-brand-dark)]">5. Review request</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  Confirm the service, time, location, and estimated total before sending your request.
                </p>
                <div className="mt-4 grid gap-3 text-sm">
                  <p className="flex items-center gap-2 font800 text-[var(--color-text)]">
                    <CheckCircle2 size={17} className="text-[var(--color-success)]" aria-hidden />
                    Confirmation appears after the request is sent.
                  </p>
                </div>
              </section>
            </div>
            <Button type="button" className="mt-6 w-full">Send booking request</Button>
          </form>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)]">
            <div className="flex gap-4">
              <div className="relative size-20 overflow-hidden rounded-lg bg-[#F2F4F7]">
                <Image src={student.photo} alt={`Profile photograph of ${student.displayName}`} fill sizes="80px" className="object-cover" />
              </div>
              <div>
                <p className="text-xl font900 text-[var(--color-brand-dark)]">{student.displayName}</p>
                <p className="mt-1 text-sm font700 text-[var(--color-text-secondary)]">{student.university}</p>
                <p className="mt-2 flex items-center gap-1 text-sm font800 text-[var(--color-text)]">
                  <Star size={15} className="fill-[#F5B544] text-[#F5B544]" aria-hidden />
                  {student.rating.toFixed(1)} · {student.reviews} reviews
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <MapPin size={16} aria-hidden />
                {student.area}
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Clock size={16} aria-hidden />
                {student.responseTime}
              </div>
            </div>
            <Link href={`/students/${student.id}`} className="mt-5 inline-flex text-sm font900 text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]">
              View profile
            </Link>
          </div>
          <div className="mt-5">
            <BookingSummary student={student} duration={2} />
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

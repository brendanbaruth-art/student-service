import Image from "next/image";
import { Banknote, CalendarCheck, MessageCircle, Star, Users } from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";
import { RequestCard } from "@/components/RequestCard";
import { StudentCard } from "@/components/StudentCard";
import { bookingHistory, conversations, openRequests, students } from "@/lib/data";

export const metadata = {
  title: "Dashboard",
  description: "Etudo sample dashboard.",
};

export default function DashboardPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">
            Demo dashboard
          </p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[#152238] sm:text-5xl">
            Welcome back, Alex.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#667085]">
            A sample signed-in view showing bookings, saved students, messages, and helper activity.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [CalendarCheck, "Upcoming booking", "Camille M. tomorrow at 18:00"],
              [Users, "Open request", "3 students interested in moving help"],
              [Banknote, "Helper earnings", "€142 sample month"],
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(21,34,56,0.04)]">
                <Icon size={22} className="text-[#5B7CFA]" aria-hidden />
                <p className="mt-4 text-sm font900 uppercase tracking-[0.12em] text-[#667085]">{title as string}</p>
                <p className="mt-2 text-lg font900 text-[#152238]">{text as string}</p>
              </div>
            ))}
          </div>

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">Current request</p>
                <h2 className="mt-2 text-2xl font900 text-[#152238]">Your open task</h2>
              </div>
              <Button href="/requests" variant="ghost">Browse requests</Button>
            </div>
            <div className="mt-5">
              <RequestCard request={openRequests[1]} />
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font900 uppercase tracking-[0.18em] text-[#5B7CFA]">Saved students</p>
                <h2 className="mt-2 text-2xl font900 text-[#152238]">Book again or compare</h2>
              </div>
              <Button href="/saved" variant="ghost">View saved</Button>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {students.slice(0, 3).map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </section>
        </div>

        <aside className="grid h-fit gap-6 lg:sticky lg:top-24">
          <section className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)]">
            <h2 className="text-xl font900 text-[#152238]">Recent messages</h2>
            <div className="mt-4 grid gap-3">
              {conversations.map((conversation) => (
                <Button key={conversation.id} href={`/messages?thread=${conversation.id}`} variant="secondary" className="justify-start">
                  <MessageCircle size={16} aria-hidden /> {conversation.name}
                </Button>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_35px_rgba(21,34,56,0.06)]">
            <h2 className="text-xl font900 text-[#152238]">Past bookings</h2>
            <div className="mt-4 grid gap-4">
              {bookingHistory.map((booking) => (
                <div key={`${booking.student.id}-${booking.date}`} className="flex items-center gap-3 rounded-md bg-[#F8F7F3] p-3">
                  <div className="relative size-12 overflow-hidden rounded-md bg-[#E5E7EB]">
                    <Image src={booking.student.photo} alt={`Profile photograph of ${booking.student.displayName}`} fill sizes="48px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font900 text-[#152238]">{booking.student.displayName}</p>
                    <p className="text-sm text-[#667085]">{booking.service} · {booking.date}</p>
                  </div>
                  <Button href={`/booking?student=${booking.student.id}&service=${encodeURIComponent(booking.service)}`} variant="secondary" className="px-3">
                    Book again
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-[#152238] p-5 text-white shadow-[0_18px_35px_rgba(21,34,56,0.12)]">
            <Star size={20} className="fill-[#F5B544] text-[#F5B544]" aria-hidden />
            <h2 className="mt-3 text-xl font900">New requests matching your skills</h2>
            <p className="mt-2 text-sm leading-6 text-white/72">
              Moving help, dog walking, and presentation design requests are active today.
            </p>
          </section>
        </aside>
      </section>
    </PageShell>
  );
}

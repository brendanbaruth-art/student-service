import { Banknote, BookOpen, CalendarCheck, MessageCircle, Star, Users } from "lucide-react";
import { Button } from "@/components/Button";
import { MentorCard } from "@/components/academic/MentorCard";
import { NoteCard } from "@/components/academic/NoteCard";
import { PageShell } from "@/components/PageShell";
import { mentors, noteListings } from "@/lib/academic";

export const metadata = {
  title: "Dashboard",
  description: "Manage tutoring sessions, saved mentors, purchased notes, and seller activity on Etudo.",
};

export default function DashboardPage() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Dashboard</p>
          <h1 className="mt-3 text-4xl font900 tracking-tight text-[var(--color-brand-dark)] sm:text-5xl">Welcome back, Alex.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Manage tutoring sessions, saved mentors, purchased notes, notes listings, messages, and earnings in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="grid gap-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [CalendarCheck, "Upcoming session", "Financial Accounting tomorrow at 18:30"],
              [BookOpen, "Purchased notes", "3 note packs ready for revision"],
              [Banknote, "Mentor earnings", "€214 this month"],
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
                <Icon size={22} className="text-[var(--color-brand)]" aria-hidden />
                <p className="mt-4 text-sm font900 uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">{title as string}</p>
                <p className="mt-2 text-lg font900 text-[var(--color-brand-dark)]">{text as string}</p>
              </div>
            ))}
          </div>

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Saved mentors</p>
                <h2 className="mt-2 text-2xl font900 text-[var(--color-brand-dark)]">Book again or compare</h2>
              </div>
              <Button href="/browse" variant="ghost">Find mentors</Button>
            </div>
            <div className="mt-5 grid gap-5">
              {mentors.slice(0, 2).map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)}
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font900 uppercase tracking-[0.18em] text-[var(--color-brand)]">Purchased notes</p>
                <h2 className="mt-2 text-2xl font900 text-[var(--color-brand-dark)]">Ready for your next exam</h2>
              </div>
              <Button href="/notes" variant="ghost">Browse notes</Button>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {noteListings.slice(0, 2).map((note) => <NoteCard key={note.id} note={note} />)}
            </div>
          </section>
        </div>

        <aside className="grid h-fit gap-6 lg:sticky lg:top-24">
          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
            <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Messages</h2>
            <div className="mt-4 grid gap-3">
              {["Camille M. · Financial Accounting", "Amina D. · Data Structures", "Etudo verification"].map((message) => (
                <Button key={message} href="/messages" variant="secondary" className="justify-start">
                  <MessageCircle size={16} aria-hidden /> {message}
                </Button>
              ))}
            </div>
          </section>

          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-small)]">
            <h2 className="text-xl font900 text-[var(--color-brand-dark)]">Mentor dashboard</h2>
            <div className="mt-4 grid gap-3 text-sm text-[var(--color-text-secondary)]">
              <p><Users size={15} className="mr-2 inline text-[var(--color-brand)]" aria-hidden /> 4 upcoming sessions</p>
              <p><Star size={15} className="mr-2 inline fill-[var(--color-accent)] text-[var(--color-accent)]" aria-hidden /> 4.9 average review</p>
              <p><Banknote size={15} className="mr-2 inline text-[var(--color-brand)]" aria-hidden /> 7% Etudo commission shown after completed bookings</p>
            </div>
          </section>

          <section className="rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-[var(--color-brand-dark)] p-5 text-white shadow-[var(--shadow-medium)]">
            <BookOpen size={20} className="text-[var(--color-accent)]" aria-hidden />
            <h2 className="mt-3 text-xl font900">Seller activity</h2>
            <p className="mt-2 text-sm leading-6 text-white/72">
              Your Financial Accounting notes received 18 views and 3 purchases this week.
            </p>
            <Button href="/sell-notes" className="mt-4 bg-white text-[var(--color-brand-dark)] hover:bg-white/90">Sell more notes</Button>
          </section>
        </aside>
      </section>
    </PageShell>
  );
}

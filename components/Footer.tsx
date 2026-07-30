import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-black text-slate-950">CampusLift</p>
          <p className="mt-3 max-w-md leading-6">
            A front-end MVP for a student-to-student services marketplace in Paris,
            built with mock profiles, listings, verification screens, and booking flow.
          </p>
        </div>
        <div>
          <p className="font-bold text-slate-950">Explore</p>
          <div className="mt-3 grid gap-2">
            <Link href="/browse">Browse services</Link>
            <Link href="/offer">Offer a service</Link>
            <Link href="/booking">Book help</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-slate-950">Trust</p>
          <div className="mt-3 grid gap-2">
            <Link href="/verification">Student verification</Link>
            <Link href="/signup">Create account</Link>
            <span>No real payments or ID checks yet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

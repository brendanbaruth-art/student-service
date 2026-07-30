import Link from "next/link";

const navItems = [
  { href: "/browse", label: "Browse" },
  { href: "/search?q=help+moving", label: "Search" },
  { href: "/offer", label: "Offer a service" },
  { href: "/verification", label: "Verify" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CampusLift home">
          <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white">
            CL
          </span>
          <span>
            <span className="block text-base font-black tracking-tight text-slate-950">
              CampusLift
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 sm:block">
              Paris students
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/signup"
          className="rounded-full bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-teal-900/10 transition hover:bg-teal-700"
        >
          Join
        </Link>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/browse", label: "Find help" },
      { href: "/offer", label: "Offer a service" },
      { href: "/#how-it-works", label: "How it works" },
    ],
  },
  {
    title: "Trust",
    links: [
      { href: "/verification", label: "Student verification" },
      { href: "/safety", label: "Safety" },
      { href: "/help", label: "Help centre" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_2fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#667085]">
            Student-to-student help, built for life in Paris.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#667085]">
            <span>Paris, France</span>
            <span aria-hidden>·</span>
            <span>English / Français</span>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font800 text-[#152238]">{column.title}</h2>
              <div className="mt-4 grid gap-3 text-sm text-[#667085]">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:text-[#152238]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#E5E7EB] px-4 py-5 text-center text-sm text-[#667085]">
        © 2026 Etudo
      </div>
    </footer>
  );
}

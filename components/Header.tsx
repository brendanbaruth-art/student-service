"use client";

import Link from "next/link";
import { Bell, Heart, Menu, MessageCircle, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { notifications } from "@/lib/data";

const navItems = [
  { href: "/browse", label: "Find help" },
  { href: "/requests", label: "Browse requests" },
  { href: "/offer", label: "Earn with Etudo" },
  { href: "/#how-it-works", label: "How it works" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/92 shadow-[0_1px_0_rgba(21,34,56,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#667085] lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#152238] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B7CFA]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/messages" className="grid size-11 place-items-center rounded-md text-[#667085] transition hover:bg-[#F8F7F3] hover:text-[#152238]" aria-label="Messages">
            <MessageCircle size={19} aria-hidden />
          </Link>
          <Link href="/saved" className="grid size-11 place-items-center rounded-md text-[#667085] transition hover:bg-[#F8F7F3] hover:text-[#152238]" aria-label="Saved students">
            <Heart size={19} aria-hidden />
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((value) => !value)}
              className="relative grid size-11 place-items-center rounded-md text-[#667085] transition hover:bg-[#F8F7F3] hover:text-[#152238]"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell size={19} aria-hidden />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-[#4FAE8A]" />
            </button>
            {notificationsOpen ? (
              <div className="absolute right-0 top-12 w-80 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-[0_20px_45px_rgba(21,34,56,0.16)]">
                <p className="px-2 py-1 text-sm font900 text-[#152238]">Notifications</p>
                <div className="mt-2 grid gap-1">
                  {notifications.map((item) => (
                    <Link key={item} href="/dashboard" className="rounded-md px-2 py-3 text-sm font700 text-[#667085] hover:bg-[#F8F7F3] hover:text-[#152238]">
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              className="flex min-h-11 items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-2 pr-3 text-sm font900 text-[#152238] hover:border-[#C7D2FE]"
              aria-label="Open sample profile menu"
              aria-expanded={profileOpen}
            >
              <span className="grid size-8 place-items-center rounded-full bg-[#152238] text-xs text-white">AB</span>
              Alex
            </button>
            {profileOpen ? (
              <div className="absolute right-0 top-12 w-56 rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-[0_20px_45px_rgba(21,34,56,0.16)]">
                {[
                  ["Profile", "/dashboard"],
                  ["Bookings", "/dashboard"],
                  ["Saved students", "/saved"],
                  ["Messages", "/messages"],
                  ["My requests", "/requests"],
                  ["Settings", "/dashboard"],
                ].map(([label, href]) => (
                  <Link key={label} href={href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font800 text-[#667085] hover:bg-[#F8F7F3] hover:text-[#152238]">
                    <UserRound size={15} aria-hidden /> {label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-[#E5E7EB] text-[#152238] lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[#E5E7EB] bg-white px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-semibold text-[#172033] hover:bg-[#F8F7F3]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/messages"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-[#172033] hover:bg-[#F8F7F3]"
            >
              Messages
            </Link>
            <Link
              href="/saved"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-[#172033] hover:bg-[#F8F7F3]"
            >
              Saved
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md bg-[#152238] px-5 text-sm font800 text-white"
            >
              Demo dashboard
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

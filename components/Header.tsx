"use client";

import Link from "next/link";
import { Bell, BookOpen, Menu, MessageCircle, Search, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";
import { notifications } from "@/lib/data";

const navItems = [
  { href: "/browse", label: "Find a Mentor" },
  { href: "/notes", label: "Notes Marketplace" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/offer", label: "Become a Mentor" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setProfileOpen(false);
        setNotificationsOpen(false);
        menuButtonRef.current?.focus();
      }

      if (event.key === "Tab" && open && mobileMenuRef.current) {
        const focusable = Array.from(
          mobileMenuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      mobileMenuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-[var(--z-navigation)] border-b border-[var(--color-border)] bg-white/82 shadow-[0_1px_0_rgba(16,42,67,0.05)] backdrop-blur-xl transition">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="etudo-main-nav hidden items-center gap-1 text-[13px] font-semibold text-[var(--color-text-secondary)] lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-[var(--color-blue-soft)] hover:text-[var(--color-brand-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)] ${
                pathname === item.href.split("?")[0] ? "bg-[var(--color-blue-soft)] text-[var(--color-brand-dark)]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher compact className="flex xl:hidden" />
          <LanguageSwitcher className="hidden xl:flex" />
          <Link href="/search" className="grid size-9 place-items-center rounded-full text-[var(--color-text-secondary)] transition hover:bg-[var(--color-blue-soft)] hover:text-[var(--color-brand-dark)]" aria-label="Search">
            <Search size={18} aria-hidden />
          </Link>
          <Link href="/messages" className="grid size-9 place-items-center rounded-full text-[var(--color-text-secondary)] transition hover:bg-[var(--color-blue-soft)] hover:text-[var(--color-brand-dark)]" aria-label="Messages">
            <MessageCircle size={19} aria-hidden />
          </Link>
          <Link href="/notes" className="grid size-9 place-items-center rounded-full text-[var(--color-text-secondary)] transition hover:bg-[var(--color-blue-soft)] hover:text-[var(--color-brand-dark)]" aria-label="Notes marketplace">
            <BookOpen size={19} aria-hidden />
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((value) => !value)}
              className="relative grid size-9 place-items-center rounded-full text-[var(--color-text-secondary)] transition hover:bg-[var(--color-blue-soft)] hover:text-[var(--color-brand-dark)]"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell size={19} aria-hidden />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-[var(--color-accent)]" />
            </button>
            {notificationsOpen ? (
              <div className="absolute right-0 top-11 w-80 rounded-2xl border border-[var(--color-border)] bg-white/92 p-3 shadow-[0_20px_45px_rgba(16,42,67,0.16)] backdrop-blur-xl">
                <p className="px-2 py-1 text-sm font900 text-[var(--color-brand-dark)]">Notifications</p>
                <div className="mt-2 grid gap-1">
                  {notifications.map((item) => (
                    <Link key={item} href="/dashboard" className="rounded-md px-2 py-3 text-sm font700 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-brand-dark)]">
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
              className="flex min-h-9 items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/72 px-1.5 pr-3 text-sm font800 text-[var(--color-brand-dark)] hover:border-[var(--color-brand)]"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
            >
              <span className="grid size-8 place-items-center rounded-full bg-[var(--color-brand-dark)] text-xs text-white">AB</span>
              Alex
            </button>
            {profileOpen ? (
              <div className="absolute right-0 top-11 w-56 rounded-2xl border border-[var(--color-border)] bg-white/92 p-2 shadow-[0_20px_45px_rgba(16,42,67,0.16)] backdrop-blur-xl">
                {[
                  ["Profile", "/dashboard"],
                  ["Tutoring sessions", "/dashboard"],
                  ["Purchased notes", "/dashboard"],
                  ["Messages", "/messages"],
                  ["Sell notes", "/sell-notes"],
                  ["Settings", "/dashboard"],
                ].map(([label, href]) => (
                  <Link key={label} href={href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font800 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-brand-dark)]">
                    <UserRound size={15} aria-hidden /> {label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-brand-dark)] lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>
      {open ? (
        <div
          ref={mobileMenuRef}
          className="border-t border-[var(--color-border)] bg-white/96 px-4 py-4 shadow-[0_18px_36px_rgba(16,42,67,0.1)] backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Mobile navigation">
            <LanguageSwitcher className="mb-2 flex w-fit" />
            <div className="grid grid-cols-3 gap-2">
              <Link href="/search" onClick={() => setOpen(false)} className="grid min-h-12 place-items-center rounded-xl bg-[var(--color-blue-soft)] text-sm font800 text-[var(--color-brand-dark)]">
                <Search size={17} aria-hidden /> Search
              </Link>
              <Link href="/notes" onClick={() => setOpen(false)} className="grid min-h-12 place-items-center rounded-xl bg-[var(--color-blue-soft)] text-sm font800 text-[var(--color-brand-dark)]">
                <BookOpen size={17} aria-hidden /> Notes
              </Link>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="grid min-h-12 place-items-center rounded-xl bg-[var(--color-blue-soft)] text-sm font800 text-[var(--color-brand-dark)]">
                <UserRound size={17} aria-hidden /> Profile
              </Link>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-brand-dark)] hover:bg-[var(--color-surface-soft)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/messages"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-brand-dark)] hover:bg-[var(--color-surface-soft)]"
            >
              Messages
            </Link>
            <Link
              href="/saved"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-[var(--color-brand-dark)] hover:bg-[var(--color-surface-soft)]"
            >
              Saved notes
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--color-feature-dark)] px-5 text-sm font800 text-white"
            >
              Account
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

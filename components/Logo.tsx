import Link from "next/link";

export function BrandMark() {
  return (
    <span className="relative grid size-10 place-items-center rounded-md bg-[var(--color-brand-dark)] text-white shadow-[0_12px_24px_rgba(16,42,67,0.18)]">
      <span className="absolute left-2 top-2 size-2 rounded-full bg-[var(--color-brand)]" />
      <span className="absolute bottom-2 right-2 size-2 rounded-full bg-[var(--color-accent)]" />
      <span className="h-px w-5 rotate-[-28deg] bg-white/75" />
    </span>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]" aria-label="Etudo home">
      <BrandMark />
      <span className="text-xl font900 tracking-tight text-[var(--color-brand-dark)]">Etudo</span>
    </Link>
  );
}

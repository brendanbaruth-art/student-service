import Link from "next/link";

export function BrandMark() {
  return (
    <span className="relative grid size-10 place-items-center rounded-md bg-[#152238] text-white">
      <span className="absolute left-2 top-2 size-2 rounded-full bg-[#5B7CFA]" />
      <span className="absolute bottom-2 right-2 size-2 rounded-full bg-[#4FAE8A]" />
      <span className="h-px w-5 rotate-[-28deg] bg-white/75" />
    </span>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B7CFA]" aria-label="Etudo home">
      <BrandMark />
      <span className="text-xl font900 tracking-tight text-[#152238]">Etudo</span>
    </Link>
  );
}

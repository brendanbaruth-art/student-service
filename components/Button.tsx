import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-[#152238] text-white hover:bg-[#243650]",
  secondary: "border border-[#D0D5DD] bg-white text-[#152238] hover:border-[#152238]",
  ghost: "bg-transparent text-[#152238] hover:bg-[#F8F7F3]",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font800 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B7CFA]";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  children: ReactNode;
  variant?: Variant;
};

export function Button({ variant = "primary", className = "", ...props }: LinkButtonProps | NativeButtonProps) {
  const classes = `${base} ${styles[variant]} ${className}`;

  if ("href" in props && typeof props.href === "string") {
    const { href, children, ...rest } = props as LinkButtonProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, ...rest } = props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

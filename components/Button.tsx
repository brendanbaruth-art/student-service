import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-[var(--color-feature-dark)] text-white hover:bg-[#173A5E]",
  secondary: "border border-[var(--color-border)] bg-white text-[var(--color-brand-dark)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]",
  ghost: "bg-transparent text-[var(--color-brand-dark)] hover:bg-[var(--color-surface-soft)]",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font800 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)]";

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

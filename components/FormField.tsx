import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  children?: ReactNode;
};

const fieldClass =
  "min-h-11 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-brand)] focus:ring-4 focus:ring-[var(--color-brand)]/10";

export function TextInput({ label, id, hint, error, ...props }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor={id}>
      {label}
      <input id={id} className={fieldClass} aria-invalid={error ? true : undefined} aria-describedby={hint || error ? `${id}-note` : undefined} {...props} />
      {hint || error ? (
        <span id={`${id}-note`} className={`text-xs font600 ${error ? "text-[var(--color-danger)]" : "text-[var(--color-text-secondary)]"}`}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}

export function SelectField({ label, id, hint, error, children, ...props }: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor={id}>
      {label}
      <select id={id} className={fieldClass} aria-invalid={error ? true : undefined} aria-describedby={hint || error ? `${id}-note` : undefined} {...props}>
        {children}
      </select>
      {hint || error ? (
        <span id={`${id}-note`} className={`text-xs font600 ${error ? "text-[var(--color-danger)]" : "text-[var(--color-text-secondary)]"}`}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}

export function TextAreaField({ label, id, hint, error, ...props }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="grid gap-2 text-sm font800 text-[var(--color-text)]" htmlFor={id}>
      {label}
      <textarea id={id} className={`${fieldClass} min-h-28 resize-y`} aria-invalid={error ? true : undefined} aria-describedby={hint || error ? `${id}-note` : undefined} {...props} />
      {hint || error ? (
        <span id={`${id}-note`} className={`text-xs font600 ${error ? "text-[var(--color-danger)]" : "text-[var(--color-text-secondary)]"}`}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}

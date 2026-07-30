import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  children?: ReactNode;
};

const fieldClass =
  "min-h-11 w-full rounded-md border border-[#D0D5DD] bg-white px-3 py-2 text-sm text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#5B7CFA] focus:ring-4 focus:ring-[#5B7CFA]/10";

export function TextInput({ label, id, hint, error, ...props }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor={id}>
      {label}
      <input id={id} className={fieldClass} aria-invalid={error ? true : undefined} aria-describedby={hint || error ? `${id}-note` : undefined} {...props} />
      {hint || error ? (
        <span id={`${id}-note`} className={`text-xs font600 ${error ? "text-[#B42318]" : "text-[#667085]"}`}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}

export function SelectField({ label, id, hint, error, children, ...props }: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor={id}>
      {label}
      <select id={id} className={fieldClass} aria-invalid={error ? true : undefined} aria-describedby={hint || error ? `${id}-note` : undefined} {...props}>
        {children}
      </select>
      {hint || error ? (
        <span id={`${id}-note`} className={`text-xs font600 ${error ? "text-[#B42318]" : "text-[#667085]"}`}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}

export function TextAreaField({ label, id, hint, error, ...props }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="grid gap-2 text-sm font800 text-[#172033]" htmlFor={id}>
      {label}
      <textarea id={id} className={`${fieldClass} min-h-28 resize-y`} aria-invalid={error ? true : undefined} aria-describedby={hint || error ? `${id}-note` : undefined} {...props} />
      {hint || error ? (
        <span id={`${id}-note`} className={`text-xs font600 ${error ? "text-[#B42318]" : "text-[#667085]"}`}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}

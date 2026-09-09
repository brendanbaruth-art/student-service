"use client";

import { useLanguage, type EtudoLanguage } from "./LanguageProvider";

const options: Array<{ code: EtudoLanguage; label: string; short: string }> = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "cs", label: "Čeština", short: "CZ" },
];

export function LanguageSwitcher({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      data-no-translate="true"
      className={`items-center rounded-full border border-[var(--color-border)] bg-white/80 p-1 text-xs font900 shadow-sm ${className}`}
      aria-label="Language selector"
    >
      {options.map((option, index) => (
        <span key={option.code} className="inline-flex items-center">
          <button
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={language === option.code}
            className={`rounded-full px-2.5 py-1.5 transition ${
              language === option.code
                ? "bg-[var(--color-brand)] text-white"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-blue-soft)] hover:text-[var(--color-brand-dark)]"
            }`}
          >
            {compact ? option.short : option.label}
          </button>
          {index < options.length - 1 ? <span className="px-0.5 text-[var(--color-border-strong)]">|</span> : null}
        </span>
      ))}
    </div>
  );
}

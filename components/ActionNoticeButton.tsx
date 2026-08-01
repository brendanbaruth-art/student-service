"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "./Button";

type ActionNoticeButtonProps = {
  children: ReactNode;
  message: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function ActionNoticeButton({
  children,
  message,
  className = "",
  variant = "primary",
}: ActionNoticeButtonProps) {
  const [visible, setVisible] = useState(false);

  function showMessage() {
    setVisible(true);
    window.setTimeout(() => setVisible(false), 2600);
  }

  return (
    <div className={className}>
      <Button type="button" variant={variant} onClick={showMessage} className="w-full">
        {children}
      </Button>
      {visible ? (
        <p role="status" className="mt-3 rounded-md bg-[var(--color-success-soft)] px-3 py-2 text-sm font800 text-[var(--color-success)]">
          {message}
        </p>
      ) : null}
    </div>
  );
}

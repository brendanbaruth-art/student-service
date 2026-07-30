import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#172033]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

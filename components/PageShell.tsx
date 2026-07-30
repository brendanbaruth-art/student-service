import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

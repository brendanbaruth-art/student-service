import type { Metadata } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://etudo.com"),
  title: {
    default: "Etudo | Course mentors and student notes",
    template: "%s | Etudo",
  },
  description:
    "Etudo helps university students find verified course mentors and buy study notes from students who already took the same course.",
  openGraph: {
    title: "Etudo | Course mentors and student notes",
    description:
      "Find student mentors by course, professor, university, rating, price, and availability. Browse academic notes connected to the same courses.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etudo | Course mentors and student notes",
    description:
      "A university-specific academic marketplace for tutoring, mentoring, and student notes.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

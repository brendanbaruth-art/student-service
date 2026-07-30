import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://etudo.com"),
  title: {
    default: "Etudo | Student help in Paris",
    template: "%s | Etudo",
  },
  description:
    "Etudo connects students in Paris with verified peers for moving help, tutoring, errands, tech support, pet care, and everyday tasks.",
  openGraph: {
    title: "Etudo | Student help in Paris",
    description:
      "Find verified students in Paris for moving help, tutoring, errands, tech support, pet care, and everyday tasks.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etudo | Student help in Paris",
    description:
      "Find verified students in Paris for moving help, tutoring, errands, tech support, pet care, and everyday tasks.",
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
      <body
        className={`${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

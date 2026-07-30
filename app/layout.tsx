import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://campuslift.example"),
  title: {
    default: "CampusLift | Paris Student Services",
    template: "%s | CampusLift",
  },
  description:
    "A front-end MVP for a Paris student-to-student services marketplace with mock profiles, listings, verification, and booking.",
  openGraph: {
    title: "CampusLift | Paris Student Services",
    description:
      "Find verified university students in Paris for moving help, tutoring, errands, tech support, events, and more.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusLift | Paris Student Services",
    description:
      "Find verified university students in Paris for moving help, tutoring, errands, tech support, events, and more.",
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
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WedWyze — The Single Source of Truth for Your Wedding",
  description:
    "One source of truth for weddings: couples, guests, planners. RSVPs, schedules, travel, room blocks, reminders, and registries — all in one place.",
  openGraph: {
    title: "WedWyze — The Single Source of Truth for Your Wedding",
    description: "Weddings, simplified — one single pane of glass.",
    type: "website",
    url: "https://wedwyze.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

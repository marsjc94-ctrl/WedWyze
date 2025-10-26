import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WedWyze — one single pane of glass",
  description: "One source of truth for weddings: couples, guests, planners.",
  icons: { icon: "/favicon.svg" },
  themeColor: "#E11D48",
  openGraph: {
    title: "WedWyze",
    description: "Weddings, simplified — one single pane of glass.",
    images: ["/og.png"], // add later if you have it
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

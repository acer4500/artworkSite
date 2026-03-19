import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Studio",
  description: "An artist's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-stone-800 antialiased">
        <Nav />
        <main className="pt-20">{children}</main>
        <footer className="max-w-6xl mx-auto px-6 py-16 mt-24 border-t border-stone-100">
          <p className="text-xs text-stone-400 tracking-wide">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}

import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium tracking-widest uppercase text-stone-800 hover:text-stone-500 transition-colors"
        >
          Studio
        </Link>
        <Link
          href="/about"
          className="text-sm tracking-wide text-stone-500 hover:text-stone-800 transition-colors"
        >
          About
        </Link>
      </nav>
    </header>
  );
}

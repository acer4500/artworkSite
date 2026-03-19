import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Studio",
};

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-8">
            About
          </p>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p className="text-2xl font-light text-stone-800 leading-snug">
              I make paintings and drawings that sit in the space between
              observation and imagination.
            </p>
            <p>
              Based between London and the countryside, my work is rooted in
              close attention to light, material, and place. I am drawn to the
              overlooked — a doorway, a field after rain, the geometry of
              afternoon shadows — and to finding in these things something that
              resists easy explanation.
            </p>
            <p>
              I studied at the Slade School of Fine Art and have shown work in
              group and solo exhibitions across the UK and Europe. I also take
              on a small number of commissions each year.
            </p>
            <p>
              If you are interested in a work, a commission, or simply want to
              talk about painting, I would love to hear from you.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-100">
            <a
              href="mailto:hello@studio.com"
              className="text-sm text-stone-800 hover:text-stone-400 transition-colors underline underline-offset-4"
            >
              hello@studio.com
            </a>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4">
              Education
            </h2>
            <ul className="space-y-2 text-sm text-stone-600">
              <li className="flex justify-between">
                <span>Slade School of Fine Art, MFA</span>
                <span className="text-stone-400">2018</span>
              </li>
              <li className="flex justify-between">
                <span>Edinburgh College of Art, BA (Hons)</span>
                <span className="text-stone-400">2016</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4">
              Selected Exhibitions
            </h2>
            <ul className="space-y-2 text-sm text-stone-600">
              <li className="flex justify-between gap-4">
                <span>New Paintings, Fold Gallery, London</span>
                <span className="text-stone-400 shrink-0">2023</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Material Evidence, group show, Edinburgh</span>
                <span className="text-stone-400 shrink-0">2022</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Degrees of Attention, Kunsthalle, Berlin</span>
                <span className="text-stone-400 shrink-0">2021</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Summer Exhibition, Royal Academy, London</span>
                <span className="text-stone-400 shrink-0">2020</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4">
              Collections
            </h2>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>Private collections, UK, Germany, and USA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

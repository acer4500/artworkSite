import type { Metadata } from "next";
import { getAboutContent } from "@/lib/about";
import { TinaRichText } from "@/components/TinaRichText";

export const metadata: Metadata = {
  title: "About — Studio",
};

export default function About() {
  const about = getAboutContent();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-8">
            About
          </p>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p className="text-2xl font-light text-stone-800 leading-snug">
              {about.headline}
            </p>
            <TinaRichText content={about.bio} />
          </div>
          <div className="mt-12 pt-8 border-t border-stone-100">
            <a
              href={`mailto:${about.contactEmail}`}
              className="text-sm text-stone-800 hover:text-stone-400 transition-colors underline underline-offset-4"
            >
              {about.contactEmail}
            </a>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4">
              Education
            </h2>
            <ul className="space-y-2 text-sm text-stone-600">
              {about.education.map((entry, i) => (
                <li key={i} className="flex justify-between">
                  <span>{entry.description}</span>
                  <span className="text-stone-400">{entry.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4">
              Selected Exhibitions
            </h2>
            <ul className="space-y-2 text-sm text-stone-600">
              {about.exhibitions.map((entry, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span>{entry.description}</span>
                  <span className="text-stone-400 shrink-0">{entry.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs tracking-widest uppercase text-stone-400 mb-4">
              Collections
            </h2>
            <ul className="space-y-2 text-sm text-stone-600">
              {about.collections.map((entry, i) => (
                <li key={i}>{entry.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

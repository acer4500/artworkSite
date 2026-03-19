import { getAllArtworks, getArtworkBySlug } from "@/lib/artwork";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const artworks = await getAllArtworks();
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) return {};
  return { title: `${artwork.title} — Studio` };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) notFound();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="inline-block text-xs tracking-widest uppercase text-stone-400 hover:text-stone-800 transition-colors mb-12"
      >
        ← All works
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="lg:sticky lg:top-28 space-y-10">
          <div>
            <h1 className="text-3xl font-light text-stone-800 mb-1">
              {artwork.title}
            </h1>
            <p className="text-sm text-stone-400">{artwork.year}</p>
          </div>

          <p className="text-stone-600 leading-relaxed">{artwork.description}</p>

          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex gap-4">
              <span className="text-xs tracking-widest uppercase text-stone-400 w-24 shrink-0 pt-0.5">
                Medium
              </span>
              <span className="text-sm text-stone-600">{artwork.medium}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-xs tracking-widest uppercase text-stone-400 w-24 shrink-0 pt-0.5">
                Dimensions
              </span>
              <span className="text-sm text-stone-600">{artwork.dimensions}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-xs tracking-widest uppercase text-stone-400 w-24 shrink-0 pt-0.5">
                Year
              </span>
              <span className="text-sm text-stone-600">{artwork.year}</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="mailto:hello@studio.com"
              className="inline-block text-sm border border-stone-800 text-stone-800 px-6 py-3 hover:bg-stone-800 hover:text-white transition-colors"
            >
              Enquire about this work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

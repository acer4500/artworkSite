import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/artwork";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link href={`/artwork/${artwork.slug}`} className="group block">
      <div className="aspect-[4/5] bg-stone-100 overflow-hidden mb-4 relative">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-0.5">
        <h2 className="text-sm font-medium text-stone-800 group-hover:text-stone-500 transition-colors">
          {artwork.title}
        </h2>
        <p className="text-xs text-stone-400">
          {artwork.medium}, {artwork.year}
        </p>
      </div>
    </Link>
  );
}

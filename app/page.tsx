import { getAllArtworks } from "@/lib/artwork";
import ArtworkGrid from "@/components/ArtworkGrid";

export default async function Home() {
  const artworks = await getAllArtworks();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className="text-xs tracking-widest uppercase text-stone-400 mb-2">
          Works
        </h1>
        <p className="text-3xl font-light text-stone-800 max-w-md leading-snug">
          Selected paintings and drawings, 2021–2023
        </p>
      </div>
      <ArtworkGrid artworks={artworks} />
    </div>
  );
}

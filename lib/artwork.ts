import artworksData from "@/data/artworks.json";

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
};

// Data access layer — swap these two functions to use a database instead of local JSON.
// Pages import only from this file, never from data/ directly.

export async function getAllArtworks(): Promise<Artwork[]> {
  return artworksData as Artwork[];
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const artworks = artworksData as Artwork[];
  return artworks.find((a) => a.slug === slug) ?? null;
}

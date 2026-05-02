import fs from "fs";
import path from "path";

export type Artwork = {
  slug: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
};

// Data access layer — reads from content/artworks/*.json
// Pages import only from this file, never from content/ directly.

export async function getAllArtworks(): Promise<Artwork[]> {
  const dir = path.join(process.cwd(), "content/artworks");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  const artworks = files.map((file) => {
    const slug = file.replace(".json", "");
    const raw = JSON.parse(
      fs.readFileSync(path.join(dir, file), "utf-8")
    );
    return { ...raw, slug } as Artwork;
  });

  return artworks.sort((a, b) => b.year - a.year);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const filePath = path.join(
    process.cwd(),
    "content/artworks",
    `${slug}.json`
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return { ...raw, slug } as Artwork;
}

import fs from "fs";
import path from "path";

export type EducationEntry = {
  year: string;
  description: string;
};

export type ExhibitionEntry = {
  year: string;
  description: string;
};

export type CollectionEntry = {
  name: string;
};

export type AboutContent = {
  headline: string;
  bio: object;
  education: EducationEntry[];
  exhibitions: ExhibitionEntry[];
  collections: CollectionEntry[];
  contactEmail: string;
};

// Data access layer — reads from content/about/index.json
export function getAboutContent(): AboutContent {
  const filePath = path.join(process.cwd(), "content/about/index.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as AboutContent;
}

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

/** Character codes for an address, so the plain string is not written into HTML. */
export function encodeContactEmail(email: string): string {
  return Array.from(email, (char) => String(char.charCodeAt(0))).join(",");
}

// Data access layer — reads from content/about/index.json
export function getAboutContent(): AboutContent {
  const filePath = path.join(process.cwd(), "content/about/index.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as AboutContent;
}

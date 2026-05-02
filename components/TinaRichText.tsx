"use client";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function TinaRichText({ content }: { content: object }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TinaMarkdown content={content as any} />;
}

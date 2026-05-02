# TinaCMS Integration Spec

## Overview

This document specifies the integration of TinaCMS into the artist portfolio site. The goal is to give the artist a browser-based editing interface to manage artworks, biography, CV sections, and contact information — without touching code.

TinaCMS is Git-native: all edits are committed to the GitHub repository, which triggers a Vercel rebuild. There is no separate database.

---

## Configuration

| Concern | Decision |
|---|---|
| Hosting | Vercel |
| CMS backend | TinaCloud (free tier) |
| CMS access | `localhost:3000/admin` (local dev) and `yourdomain.com/admin` (production) |
| Media | Git-based — images uploaded via CMS are committed to `public/artwork/` |
| Artwork CRUD | Full create, edit, delete |

---

## Content Model

### Artworks (`content/artworks/*.json`)

One file per artwork. The filename (without `.json`) is the URL slug.

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required. Shown in card and detail page. |
| `year` | number | Displayed on card and detail page. |
| `medium` | string | e.g. "Oil on linen" |
| `dimensions` | string | e.g. "100 × 100 cm" |
| `description` | string | Paragraph shown on detail page. |
| `image` | image | Path to file in `public/artwork/`. |

Artworks are sorted newest-first (by `year`) in the gallery.

**Slug is the filename** — renaming a file changes the URL. Slugs rarely change; this is acceptable for an artist portfolio.

### About (`content/about/index.json`)

Single document. Edited as a singleton in the CMS.

| Field | Type | Notes |
|---|---|---|
| `headline` | string | Large opening statement at the top of the About page. |
| `bio` | rich-text | Body paragraphs. Supports bold, italic, links. |
| `education` | list of `{ year, description }` | e.g. year: "2018", description: "Slade School of Fine Art, MFA" |
| `exhibitions` | list of `{ year, description }` | e.g. year: "2023", description: "New Paintings, Fold Gallery, London" |
| `collections` | list of `{ name }` | e.g. "Private collections, UK, Germany, and USA" |
| `contactEmail` | string | Shown as a mailto link on the About page and in artwork enquiry buttons. |

---

## File Changes

### New Files

| Path | Purpose |
|---|---|
| `tina/config.ts` | TinaCMS schema + connection config |
| `content/artworks/*.json` | 6 artwork files (migrated from `data/artworks.json`) |
| `content/about/index.json` | About page content (extracted from hardcoded JSX) |
| `lib/about.ts` | Server-side data access for about content |
| `components/TinaRichText.tsx` | Client component wrapper for rendering TinaCMS rich-text |
| `app/admin/[[...segments]]/page.tsx` | CMS admin UI route |

### Modified Files

| Path | Change |
|---|---|
| `lib/artwork.ts` | Read from `content/artworks/*.json` instead of `data/artworks.json` |
| `app/about/page.tsx` | Load content from `lib/about.ts`; render via `TinaRichText` |
| `app/artwork/[slug]/page.tsx` | Load `contactEmail` from `lib/about.ts` for enquiry button |
| `package.json` | Add dev/build scripts; `tinacms` and `@tinacms/cli` dependencies |
| `.gitignore` | Ignore `tina/__generated__/` and `public/admin/` |

### Deleted Files

| Path | Reason |
|---|---|
| `data/artworks.json` | Replaced by individual files in `content/artworks/` |

---

## Admin Access

**Local development:**

```bash
npm run dev
# Starts tinacms dev server + Next.js dev server
# Visit http://localhost:3000/admin
# No login required — runs in local mode
```

**Production (Vercel):**

1. Create a free account at [tina.io](https://tina.io)
2. Create a new project and connect it to the GitHub repo
3. Copy the `Client ID` and `Token` from the TinaCloud dashboard
4. Add to Vercel environment variables:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = your client ID
   - `TINA_TOKEN` = your token
5. Deploy — visit `yourdomain.com/admin` and log in with your TinaCloud account

---

## Package Scripts

```json
"scripts": {
  "dev": "tinacms dev -c \"next dev --webpack\"",
  "build": "tinacms build && next build",
  "start": "next start"
}
```

---

## Environment Variables

```bash
# .env.local — for local development (do not commit)
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
```

These are also required in Vercel project settings.

For purely local editing (no TinaCloud), both vars can be left empty — TinaCMS falls back to local mode automatically.

---

## Image Uploads

Images are stored in `public/artwork/`. When the artist uploads an image through the CMS:

- **Local dev**: the file is written directly to `public/artwork/`
- **Production via TinaCloud**: the file is committed to the repo via the GitHub integration, which triggers a Vercel rebuild

Supported formats: JPG, PNG, WebP, GIF.

---

## Verification

After setup, verify the integration works:

1. `npm run dev` → visit `localhost:3000/admin` → confirm CMS loads
2. Edit an artwork title → confirm change appears on `localhost:3000`
3. Add a new artwork entry → confirm new page at `/artwork/[slug]`
4. Delete an artwork → confirm 404 at its old URL
5. Upload an image through the CMS → confirm file appears in `public/artwork/`
6. Edit the About page bio → confirm change on `/about`
7. Add an exhibition entry → confirm it appears in the CV section
8. Edit `contactEmail` → confirm updated in About page mailto link
9. **TinaCloud production**: deploy to Vercel → visit `/admin` → confirm login and that edits trigger rebuilds via GitHub commit

import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ??
    process.env.VERCEL_GIT_COMMIT_REF ??
    process.env.HEAD ??
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "artwork",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "artwork",
        label: "Artworks",
        path: "content/artworks",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "year",
            label: "Year",
          },
          {
            type: "string",
            name: "medium",
            label: "Medium",
          },
          {
            type: "string",
            name: "dimensions",
            label: "Dimensions",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
        ],
      },
      {
        name: "about",
        label: "About",
        path: "content/about",
        format: "json",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "headline",
            label: "Opening Statement",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
          },
          {
            type: "object",
            name: "education",
            label: "Education",
            list: true,
            fields: [
              {
                type: "string",
                name: "year",
                label: "Year",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
              },
            ],
            ui: {
              itemProps: (item) => ({
                label: item.description
                  ? `${item.year} — ${item.description}`
                  : item.year,
              }),
            },
          },
          {
            type: "object",
            name: "exhibitions",
            label: "Selected Exhibitions",
            list: true,
            fields: [
              {
                type: "string",
                name: "year",
                label: "Year",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
              },
            ],
            ui: {
              itemProps: (item) => ({
                label: item.description
                  ? `${item.year} — ${item.description}`
                  : item.year,
              }),
            },
          },
          {
            type: "object",
            name: "collections",
            label: "Collections",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Collection",
              },
            ],
            ui: {
              itemProps: (item) => ({ label: item.name }),
            },
          },
          {
            type: "string",
            name: "contactEmail",
            label: "Contact Email",
          },
        ],
      },
    ],
  },
});

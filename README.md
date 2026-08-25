# Portfolio

Personal portfolio site: a landing page, an about page, and a projects
section where each project has its own page with a writeup, images, and a
link to its GitHub repo.

## Stack

Built with [Astro](https://astro.build), outputting static HTML/CSS with no
client-side JS runtime. Projects live as markdown files in a
[content collection](https://docs.astro.build/en/guides/content-collections/)
(`src/content/projects/`), each rendered to its own page via a dynamic route
(`src/pages/projects/[slug].astro`) — adding a project means adding a
markdown file, not copy-pasting a page.

Hosted on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/)
using its static assets feature, deployed automatically from this repo via
the Cloudflare Workers Builds GitHub integration. There is no server-side
Worker code — `wrangler.jsonc` just points at the Astro build output
(`dist/`) and Cloudflare serves it as static assets.

## Project structure

```
├── astro.config.mjs      # Astro config (site domain intentionally left unset)
├── wrangler.jsonc         # Cloudflare Workers static assets config
├── src/
│   ├── content/
│   │   ├── config.ts             # schema for the `projects` collection
│   │   └── projects/*.md         # one markdown file per project
│   ├── layouts/BaseLayout.astro  # shared page shell (header/nav/footer)
│   ├── pages/
│   │   ├── index.astro           # landing page
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   └── projects/
│   │       ├── index.astro       # projects listing
│   │       └── [slug].astro      # one route per project, from the collection
│   └── styles/global.css
└── public/images/         # static assets (project images, etc.)
```

## Running locally

Requires Node.js 18.20.8+ (any Astro 5–supported LTS; tested on 24.x).

```bash
npm install
npm run dev
```

This starts a dev server (default `http://localhost:4321`) with hot reload.

Other scripts:

```bash
npm run build    # build to dist/
npm run preview  # serve the dist/ build locally
npm run check    # type-check .astro files
```

## Adding a project

Add a new markdown file to `src/content/projects/`, e.g.
`src/content/projects/my-project.md`:

```markdown
---
title: "My Project"
description: "One-sentence summary."
date: 2026-01-15
githubUrl: "https://github.com/your-username/my-project"
coverImage: "/images/my-project/cover.png"
tags: ["hardware", "firmware"]
---

Writeup content in markdown.
```

Drop any images under `public/images/<project-slug>/` and reference them
with an absolute path (`/images/<project-slug>/...`). The page is generated
automatically at `/projects/my-project`; it appears on the `/projects`
listing once `draft` is unset or `false`.

## Deploying

Deploys run through **Cloudflare Workers Builds**: pushing to the connected
branch triggers Cloudflare to run `npx wrangler deploy`, which builds the
Astro site and uploads `dist/` as static assets to the Worker named in
`wrangler.jsonc`.

To deploy manually from a local machine instead:

```bash
npm run build
npx wrangler deploy
```

The first deploy requires `wrangler` to be authenticated
(`npx wrangler login`) — Cloudflare Workers Builds handles this
automatically for CI-driven deploys, so this is only needed for manual
deploys.

A custom domain is not configured in code — it's attached later via the
Cloudflare dashboard (Workers & Pages → your Worker → Domains & Routes).

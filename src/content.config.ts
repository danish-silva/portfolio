import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { PROJECT_TAGS } from './data/tags';

const link = z.object({
  label: z.string(),
  // Either an absolute URL, or a path starting with / for a file this site
  // hosts itself, such as a datasheet in public/.
  url: z
    .string()
    .refine((value) => value.startsWith('/') || z.string().url().safeParse(value).success, {
      message: 'must be an absolute URL or a site path starting with /',
    }),
});

// One folder per project: src/content/projects/<slug>/index.md with any
// images sitting beside it so `image()` can optimise them at build time.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        // One line shown on the card. Required once draft is false.
        summary: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        ongoing: z.boolean().default(false),
        tags: z.array(z.enum(PROJECT_TAGS)).default([]),
        tools: z.array(z.string()).default([]),
        links: z.array(link).default([]),
        cover: z
          .object({
            src: image(),
            alt: z.string(),
          })
          .optional(),
        // A slide is either a still or a clip, and the two interleave, because
        // the order that explains a project is not the order that separates
        // images from video.
        //
        // Stills sit beside index.md so image() can optimise them at build
        // time. Astro does not process video, so clips live under
        // public/media/<slug>/ and are referenced by absolute path. Keep them
        // under Cloudflare's 25 MiB per file asset limit or the deploy fails.
        gallery: z
          .array(
            z.union([
              z.object({
                src: image(),
                alt: z.string(),
                caption: z.string().optional(),
              }),
              z.object({
                video: z.string().startsWith('/media/'),
                poster: image().optional(),
                alt: z.string(),
                caption: z.string().optional(),
              }),
            ]),
          )
          .default([]),
        // Tie breaker only. The grid sorts newest first on the dates above;
        // this decides between two projects that ran over the same period.
        order: z.number().int().default(100),
        // Drafts are excluded from the grid, the popup and the standalone
        // page, so an unfinished writeup can never ship by accident.
        draft: z.boolean().default(true),
      })
      .superRefine((data, ctx) => {
        if (data.draft) return;
        const missing: string[] = [];
        if (!data.summary) missing.push('summary');
        if (!data.startDate) missing.push('startDate');
        if (!data.endDate && !data.ongoing) missing.push('endDate (or ongoing: true)');
        if (data.tags.length === 0) missing.push('tags');
        if (missing.length > 0) {
          ctx.addIssue({
            code: 'custom',
            message: `"${data.title}" is not a draft but is missing: ${missing.join(', ')}`,
          });
        }
        if (data.endDate && data.startDate && data.endDate < data.startDate) {
          ctx.addIssue({ code: 'custom', message: `"${data.title}" ends before it starts` });
        }
      }),
});

// LinkedIn shaped experience entries. Bullets go in the markdown body.
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    // Set when the work was delivered for a client of the employer.
    client: z.string().optional(),
    employmentType: z
      .enum(['Internship', 'Full-time', 'Part-time', 'Casual', 'Contract', 'Freelance'])
      .optional(),
    location: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    current: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // Project ids (folder names) this role links to, if any.
    relatedProjects: z.array(z.string()).default([]),
    order: z.number().int().default(100),
  }),
});

// Writeups. The collection exists so a post can be added at any time; the
// route and nav link are only added once there is at least one post.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects, experience, posts };

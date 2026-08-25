import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    githubUrl: z.url(),
    // Path relative to /public, e.g. "/images/my-project/cover.png".
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Set true to hide a draft project from listings/build.
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };

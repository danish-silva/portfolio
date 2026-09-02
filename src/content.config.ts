import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Minimal placeholder kept only so the build stays green during the wipe.
// Replaced with the real schemas in the content model step.
const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects };

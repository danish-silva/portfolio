import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  // Absolute base for canonical and Open Graph URLs. The custom domain is
  // still attached to the Worker via the Cloudflare dashboard, not here.
  site: 'https://danishsilva.com',
  output: 'static',
  // React is here for one thing only: the WebGL gradient background
  // (src/components/ShaderBackground.tsx). Everything else on the site is
  // plain Astro and ships no JavaScript.
  integrations: [react()],
  redirects: {
    // The projects listing lives on the home page.
    '/projects': '/#projects',
  },
});

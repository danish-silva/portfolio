import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// `site` is intentionally left unset: no domain is hardcoded here.
// A custom domain is attached later via the Cloudflare dashboard.
export default defineConfig({
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

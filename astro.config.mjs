import { defineConfig } from 'astro/config';

// `site` is intentionally left unset: no domain is hardcoded here.
// A custom domain is attached later via the Cloudflare dashboard.
export default defineConfig({
  output: 'static',
  redirects: {
    // The projects listing lives on the home page.
    '/projects': '/#projects',
  },
});

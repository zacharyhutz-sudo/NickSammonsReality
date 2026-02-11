import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://zacharyhutz-sudo.github.io',
  base: '/NickSammonsReality',
  integrations: [tailwind()],

  vite: {
    plugins: [tailwindcss()],
  },
});
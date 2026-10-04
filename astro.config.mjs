// @ts-check

import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [solidJs({ devtools: true })],

	vite: {
		plugins: [tailwindcss()],
	},

	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Inter",
			cssVariable: "--font-inter",
			weights: [700, 300],
			fallbacks: ["system-ui", "sans-serif"],
		},
	],
});

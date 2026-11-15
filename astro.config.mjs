// @ts-check

import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import solidSvg from "vite-plugin-solid-svg";

// https://astro.build/config
export default defineConfig({
	server: {
		port: 3030,
	},

	integrations: [solidJs({ devtools: true })],

	vite: {
		plugins: [
			tailwindcss(),
			solidSvg({
				svgo: {
					enabled: true,
				},
			}),
		],
	},

	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Geist",
			cssVariable: "--font-geist",
			weights: [400, 500, 600],
			fallbacks: ["system-ui", "sans-serif"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Geist Mono",
			cssVariable: "--font-geist-mono",
			weights: [400],
			fallbacks: ["ui-monospace", "monospace"],
		},
	],
});

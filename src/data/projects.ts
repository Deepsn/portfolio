import HomerNightmaresLogo from "../assets/logos/homer-nightmares.webp";

export interface Project {
	title: string;
	type: "oss" | "personal" | "game" | "study";
	description: string;
	tags: string[];
	logo?: string;
	links: { label: string; href: string }[];
}

export const projects: Project[] = [
	{
		title: "Charm devtools",
		type: "oss",
		description: "Devtools for debugging and inspecting Charm states",
		tags: ["typescript", "roblox", "charm"],
		links: [{ label: "github", href: "https://github.com/Deepsn/charm-devtools" }],
	},
	{
		title: "Homer Nightmares",
		type: "game",
		description: "Roblox horror game made with Roblox-TS and Flamework",
		tags: ["game", "typescript", "roblox", "roblox-ts", "flamework"],
		logo: HomerNightmaresLogo.src,
		links: [{ label: "roblox", href: "https://www.roblox.com/games/74154038755975/" }],
	},
	{
		title: "Roblox Sourcemap Downloader",
		type: "oss",
		description:
			"Utility to download sourcemaps from Roblox website and convert them to a readable format. Also commits to a git repository",
		tags: ["typescript", "crawler", "sourcemap"],
		links: [
			{ label: "github", href: "https://github.com/Deepsn/roblox_sourcemap_downloader" },
			{ label: "sourcemap", href: "https://github.com/Deepsn/roblox_sourcemap" },
		],
	},
	{
		title: "Roblox Mod loader",
		type: "oss",
		description: "Mod loader for Roblox. I help with ideas, testing and some code contributions",
		tags: ["oss", "contributor"],
		logo: "https://github.com/revolutionxk/rml-launcher/blob/develop/public/icons/logo.png?raw=true",
		links: [
			{ label: "github", href: "https://github.com/revolutionxk/rml-launcher" },
			{ label: "website", href: "https://robloxmodloader.com" },
		],
	},
	{
		title: "Roblox Extra",
		type: "oss",
		description: "Chrome/Firefox extension that adds more features to the roblox website",
		tags: ["typescript", "roblox", "browser extension", "wxt", "rust"],
		links: [{ label: "github", href: "https://github.com/Deepsn/roblox_extra" }],
	},
	{
		title: "rbxts-tracer",
		type: "oss",
		description: "Raycast wrapper built with roblox-ts",
		tags: ["typescript", "roblox", "roblox-ts", "library"],
		links: [
			{ label: "github", href: "https://github.com/Deepsn/rbxts-tracer" },
			{ label: "npm", href: "https://npmjs.com/package/@rbxts/tracer" },
		],
	},
	{
		title: "BlackBoard Work",
		type: "personal",
		description: "tauri app that shows a list of activities from Cruzeiro do Sul blackboard",
		tags: ["typescript", "rust", "tauri"],
		links: [{ label: "github", href: "https://github.com/bb-work-org/bb-work" }],
	},
	{
		title: "Anime Infinity X",
		type: "personal",
		description: "open source roblox-ts anime game",
		tags: ["typescript", "roblox", "roblox-ts", "flamework"],
		links: [{ label: "github", href: "https://github.com/JamDevHead/anime-infinity-x" }],
	},
	{
		title: "Vemkac Project",
		type: "study",
		description: "college project of a supermarket website",
		tags: ["javascript"],
		links: [{ label: "github", href: "https://github.com/Deepsn/vemkac-project" }],
	},
];

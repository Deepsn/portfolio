export const beganYear = 2018;

export const experienceYears = new Date().getFullYear() - beganYear;

export interface StackItem {
	name: string;
	link?: string;
}

export interface StackGroup {
	title: string;
	items: StackItem[];
}

export const stack: StackGroup[] = [
	{
		title: "languages",
		items: [
			{ name: "TypeScript", link: "https://www.typescriptlang.org/" },
			{ name: "Luau", link: "https://luau.org/" },
			{ name: "Go", link: "https://go.dev/" },
			{ name: "Python", link: "https://www.python.org/" },
			{ name: "Dart", link: "https://dart.dev/" },
			{ name: "Rust", link: "https://www.rust-lang.org/" },
		],
	},
	{
		title: "frameworks",
		items: [
			{ name: "Astro", link: "https://astro.build/" },
			{ name: "Next.js", link: "https://nextjs.org/" },
			{ name: "Flamework", link: "https://flamework.fireboltofdeath.dev/" },
		],
	},
	{
		title: "tooling",
		items: [
			{ name: "RobloxTS", link: "https://roblox-ts.com/" },
			{ name: "Rojo", link: "https://rojo.space/" },
			{ name: "Lune", link: "https://lune-org.github.io/docs" },
			{ name: "Biome", link: "https://biomejs.dev/" },
			{ name: "ESLint", link: "https://eslint.org/" },
			{ name: "Prettier", link: "https://prettier.io/" },
			{ name: "Git", link: "https://git-scm.com/" },
		],
	},
	{
		title: "libraries",
		items: [
			{ name: "Charm", link: "https://github.com/littensy/charm" },
			{ name: "React", link: "https://react.dev/" },
			{ name: "Vide", link: "https://centau.github.io/vide/" },
		],
	},
];

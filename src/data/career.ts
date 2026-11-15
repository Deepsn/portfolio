import RobloxLogo from "@/assets/logos/roblox.webp";

export interface Career {
	period: {
		start: string;
		end?: string;
		current?: boolean;
	};
	title: string;
	employer?: string;
	responsibilities?: string[];
	logo?: string;
	link?: string;
}

export const career: Career[] = [
	{
		period: {
			start: "2025",
			current: true,
		},
		title: "Programmer / Game Developer",
		employer: "Galorys",
		responsibilities: ["Developed games on Roblox platform", "Resolving problems and implementing new features"],
		link: "https://www.galorys.com/",
	},
	{
		period: {
			start: "2020",
		},
		employer: "Guarulhos RP",
		title: "Programmer",
		logo: RobloxLogo.src,
		responsibilities: [
			"Developed major gameplay systems for the game, including a vehicle system, weapon system, cellphone system and more",
			"Created robberies systems and ideas for the Roleplay game",
			"Hosted events and competitions for the community, including a racing competition and a Battle Royale event",
		],
	},
	{
		period: {
			start: "2024",
			end: "2025",
		},
		employer: "Axolutions",
		title: "Web Developer",
		responsibilities: [
			"Developed and maintained websites using React and Next.js",
			"Implemented responsive designs and optimized website performance",
			"Collaborated with designers and other developers to create user-friendly interfaces",
		],
		link: "https://axolutions.com.br/",
	},
].toSorted((a, b) => {
	const aStart = parseInt(a.period.start, 10);
	const bStart = parseInt(b.period.start, 10);

	if (aStart !== bStart) {
		return bStart - aStart;
	}

	const aEnd = a.period.end ? parseInt(a.period.end, 10) : Number.MAX_SAFE_INTEGER;
	const bEnd = b.period.end ? parseInt(b.period.end, 10) : Number.MAX_SAFE_INTEGER;

	return bEnd - aEnd;
});

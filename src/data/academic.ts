import CruzeiroDoSulLogo from "@/assets/logos/cruzeiro-do-sul.jpg";
import type { Career } from "@/data/career";

export type Academic = Career;

export const academic: Academic[] = [
	{
		period: {
			start: "2021",
			end: "2022",
		},
		title: "Technical High School in I.T.",
		employer: "Colégio Cruzeiro do Sul",
		link: "https://www.cruzeirodosul.edu.br/",
		logo: CruzeiroDoSulLogo.src,
	},
	{
		period: {
			start: "2022",
			end: "2026",
		},
		title: "Computer Science (Bachelor's degree)",
		employer: "Universidade Cruzeiro do Sul",
		link: "https://www.cruzeirodosul.edu.br/",
		logo: CruzeiroDoSulLogo.src,
	},
];

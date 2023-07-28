<script lang="ts">
	import Popup from "@/components/Popup.svelte";

	let languages = [
		"lua",
		"typescript",
		"javascript",
		"nodejs",
		"nextjs-original",
		"react-original",
		"svelte",
		"tailwindcss",
		"webpack"
	];
</script>

<div class="absolute top-[50%] translate-y-[-50%] w-full">
	<div class="mx-auto w-max">
		<h1 class="text-6xl">Hi👋</h1>
		<p>My name is Speed</p>
		<p>and i program stuff</p>
	</div>
</div>

<div class="absolute bottom-[3%] w-full">
	<div class="mx-auto w-max">
		<p class="text-[13px]">skill book:</p>
		<div
			class="flex mx-auto bg-neutral-900 shadow-md rounded-full w-max p-2 px-3 gap-2 justify-evenly"
		>
			{#each languages as languageName}
				<Popup iconName={languageName.replaceAll(/\-.+/g, "")}>
					<i
						class="flex justify-center devicon-{languageName.match('-')
							? languageName
							: languageName + '-plain'}"
					/>
				</Popup>
			{/each}
			<Popup iconName="currently learning">
				<i class="flex justify-center material-symbols-outlined pointer-events-none select-none"
					>add</i
				>
			</Popup>
		</div>
	</div>
</div>

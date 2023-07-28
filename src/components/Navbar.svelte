<script lang="ts">
	import { onMount } from "svelte";

	let menuButton: HTMLButtonElement;
	let sideNav: HTMLDivElement;
	let links = ["/", "/random", "/about"];

	onMount(() => {
		const menuButtonClick = () => {
			sideNav.style.transform = "translate(0, 0)";
			addEventListener("mouseup", mouseUp);
		};
		const mouseUp = () => {
			if (!sideNav?.matches(":hover")) {
				sideNav.style.transform = "translate(-100%, 0)";
				removeEventListener("mouseup", mouseUp);
			}
		};

		menuButton.addEventListener("click", menuButtonClick);

		return () => {
			removeEventListener("mouseup", mouseUp);
			menuButton?.removeEventListener("click", menuButtonClick);
		};
	});
</script>

<div
	bind:this={sideNav}
	style="transform: translate(-100%, 0);"
	class="transition-all fixed flex flex-col z-10 h-full w-1/3 p-3 bg-neutral-800 rounded-r-2xl"
>
	{#each links as link}
		<a href={link}>~{link}</a>
	{/each}
</div>

<nav class="flex w-full my-7 justify-between">
	<ul class="flex w-[45%] justify-evenly items-center">
		<button bind:this={menuButton} id="menu" class="hidden"
			><i class="material-symbols-outlined">menu</i></button
		>
		{#each links as link}
			<a href={link}>~{link}</a>
		{/each}
	</ul>

	<ul class="flex w-[45%] justify-evenly items-center">
		<a href="https://github.com/Deepsn/portfolio">~/source</a>
		<p id="made-with">
			Made with
			<a href="https://svelte.dev">
				<i class="devicon-svelte-plain" />
			</a>
		</p>

		<a id="made-with-simple" class="hidden" href="https://svelte.dev">
			<i class="devicon-svelte-plain" />
		</a>
	</ul>
</nav>

<style>
	a {
		text-decoration: underline transparent;
		transition: text-decoration-color 200ms;
	}

	a:hover {
		text-decoration-color: white;
	}

	@media screen and (max-width: 655px) {
		#made-with {
			display: none;
		}

		#made-with-simple {
			display: block;
		}

		#menu {
			display: block;
		}

		nav > ul:nth-child(1) {
			width: 20%;
		}

		nav > ul:nth-child(1) > a {
			display: none;
		}
	}
</style>

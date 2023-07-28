<script>
	import "@/app.css";
	import GameCanvas from "@/components/GameCanvas.svelte";
	import Navbar from "@/components/Navbar.svelte";
</script>

<Navbar />
<GameCanvas />
<slot />

<style lang="postcss">
	:global(i) {
		pointer-events: none;
		user-select: none;
	}
	:global(body) {
		background-color: theme(colors.neutral.950);
	}
	:global(body),
	:global(html) {
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	:global(*) {
		color: white;
		font-family: "Source Code Pro", sans-serif;
	}
</style>

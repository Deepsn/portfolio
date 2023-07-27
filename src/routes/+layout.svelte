<script>
	import "@/app.css";
	import GameCanvas from "@/components/GameCanvas.svelte";
	import Navbar from "@/components/Navbar.svelte";
</script>

<Navbar />
<GameCanvas />
<slot />

<style lang="postcss">
	:global(body) {
		background-color: theme(colors.neutral.950);
	}
	:global(*) {
		color: white;
		font-family: "Source Code Pro", sans-serif;
	}
</style>

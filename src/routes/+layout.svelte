<script>
	import "@/app.css";
</script>

<slot />

<style lang="postcss">
	:global(body) {
		background-color: theme(colors.neutral.950);
	}
	:global(html),
	:global(body) {
		overflow: hidden;
	}
</style>

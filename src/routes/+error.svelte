<script>
	import { page } from "$app/stores";
</script>

{#if $page.error}
	<div style="display: grid; justify-items: center;">
		<p style="font-size: xxx-large">{$page.status}</p>
		<p style="font-size: xx-large">{$page.error.message}</p>
	</div>
{/if}

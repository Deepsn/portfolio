<script lang="ts">
	export let iconName: string;
	let enabled = false;

	function handleMouseEnter() {
		enabled = true;
	}

	function handleMouseLeave() {
		enabled = false;
	}
</script>

<div class="h-[16px]" aria-hidden on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
	<slot />
</div>

<div
	class="{enabled
		? 'bg-neutral-800'
		: 'bg-transparent'} absolute inline transition-all translate-y-[-45px] p-1 rounded-full"
>
	<p class="{enabled ? '' : 'text-transparent'} select-none transition-all">{iconName}</p>
</div>

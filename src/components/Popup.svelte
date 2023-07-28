<script lang="ts">
	export let iconName: string;
	let enabled = false;
	let popupX: number;

	function handleMouseEnter({ x }: MouseEvent) {
		popupX = x;
		enabled = true;
	}

	function handleMouseLeave() {
		enabled = false;
	}
</script>

<div aria-hidden on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
	<slot />
</div>

<div
	style="transform: translate({popupX}px, -35px);"
	class="{enabled ? 'inline' : 'hidden'} absolute left-0 bg-neutral-800 p-1 rounded-full"
>
	<p>{iconName}</p>
</div>

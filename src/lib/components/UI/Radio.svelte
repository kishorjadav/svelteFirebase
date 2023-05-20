<script>
	export let group = '',
		options = [];
</script>

{#each options as { value, label }}
	<div>
		<input type="radio" bind:group {value} class="accent-orange-600 w-6 h-6 rounded" />
		<label for={label} class="leading-7 mb-2 text-md text-gray-600 text-left font-bold capitalize">
			{label}
		</label>
	</div>
{/each}

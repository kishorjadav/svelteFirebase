<script>
	export let checkboxes = [];
	export let group = [];
</script>

<div class="relative text-left">
	{#each checkboxes as checkbox}
		<label
			for={checkbox}
			class="leading-8 mb-2 text-md text-gray-600 text-left font-bold capitalize"
		>
			{checkbox}
		</label>
		<input
			type="checkbox"
			bind:group
			value={checkbox}
			class="accent-orange-500 w-9 h-9 rounded outline-none "
		/>
	{/each}
</div>

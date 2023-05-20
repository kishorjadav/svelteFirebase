<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let items: [];
	export let activeItem: [];
</script>

<div class="py-4">
	<ul
		class="border-b  border-[#E7E7E7] flex justify-start space-x-4 md:space-x-2 lg:space-x-8 sm:pl-3 lg:pl-8"
	>
		{#each items as item}
			<!-- svelte-ignore a11y-click-events-have-key-events #737373 -->
			<li
				on:click={() => dispatch('tabChange', item)}
				class="mx-4 text-[#737373] cursor-pointer hover:text-[#ff6e00]"
			>
				<div
					class:active={item === activeItem}
					class="font-semibold text-[15.9px] sm:text-[16px]  md:text-[16.5px] lg:px-[1px] lg:text-[20px]"
				>
					{item.label}
					{#if item.count}
						<span class="text-[15.9px] sm:text-[16px] md:text-[16.5px] lg:px-[1px] lg:text-[20px]"
							>({item.count})</span
						>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.active {
		color: #ff6e00;
		border-bottom: 4px solid;
		padding-bottom: 8px;
	}
</style>

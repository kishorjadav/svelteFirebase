<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ArrowLeft from '../icons/arrows/arrowLeft.svelte';
	const dispatch = createEventDispatcher();
	export let items: [];
	export let activeItem: [];
</script>

<div
	class="w-[20vh] md:w-[21vh] lg:w-48 xl:w-56 -m-6 bg-gray-backdrop min-h-screen fixed top-[221px] lg:top-[218px] md:left-[280px]"
>
	<div class="py-8 lg:py-[44px]">
		<div class=" gap-y-8 flex flex-col items-center justify-center  lg:gap-y-[44px] ">
			{#each items as option}
				<button
					on:click={() => dispatch('tabChange', option)}
					class="button-strip flex group/section  w-[90%] items-center justify-between"
				>
					<div
						class={` pl-2 tracking-wide group-hover/section:text-orange-focus urbanist-500  button-strip text-[13px] sm:text-[13.5px] md:text-[14px] lg:text-[16px] hover:cursor-pointer text-left  ${
							activeItem === option ? 'text-orange-focus' : 'text-gray-dark'
						} `}
					>
						{option.label}
					</div>
					<div
						class={`text-lg group-hover/section:text-orange-focus  ${
							activeItem === option ? 'text-orange-focus' : 'text-gray-dark'
						} `}
					>
						<ArrowLeft width={100} height={600} />
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

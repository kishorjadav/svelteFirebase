<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ArrowDown from '../icons/arrows/arrowDown.svelte';
	const dispatch = createEventDispatcher();
	export let value = '',
		labelText = '',
		name = '',
		error = '',
		datas: [] = [];
	export let required: boolean = false;
	export let all = '';
	export let search = false;
	export let disabled = false;
	let open: boolean = false;
	let container: any;
	let nam: string = '';
	function onWindowClick(e: any) {
		if (container.contains(e.target) == false) open = false;
	}
	const setSelect = (val: string) => {
		nam = val.name;
		value = val.id;
		open = false;
		dispatch('selectClick', {
			val: value
		});
	};
	const clear = (val: string) => {
		nam = val;
		open = false;
		dispatch('clear');
		dispatch('selectClick', {
			val: nam
		});
	};
</script>

<!-- <div class="relative">
	<label class="label" for={name}>
		{labelText}
		{#if required}<span class="text-orange-pmk">*</span> {/if}
	</label><br />
	<select
		{name}
		bind:value
		on:select={abc}
		{...$$restProps}
		onfocus="this.size=2;"
		onblur="this.size=0;"
		onchange="this.size=1; this.blur();"
		class={`w-full absolute ${
			focus ? 'z-10' : ''
		} rounded-lg border px-2 py-2.5 text-gray-700 font-medium bg-white border-gray-300 focus:border-orange-pmk focus:outline-none focus:ring-0 cursor-pointer`}
	>
		{#each datas as color (color)}
			<option
				class="hover:text-orange-pmk  hover:bg-orange-50 hover:font-semibold  py-2.5 pl-8 rounded bg-white"
				>{color}</option
			>
		{/each}
	</select>
	<div class="text-left">
		{#if error && arr}
			<p class="text-error text-sm">{error[label]}</p>
		{:else if error}
			<p class="text-error text-sm">{error}</p>
		{/if}
	</div>
</div> -->
<svelte:window on:click={onWindowClick} />
<main
	bind:this={container}
	class={`flex w-full items-center justify-center ${error ? '-mt-6' : ''} `}
>
	<!-- component -->
	<div class="relative w-full">
		{#if labelText}
			<label class={`label ${search ? 'text-xs' : ''}`} for={name}>
				{labelText}
				{#if required}<span class="text-orange-pmk">*</span> {/if}
			</label>
		{/if}
		<!-- trigger button -->
		<button
			type="button"
			on:click={() => (open = !open)}
			class={`${
				open ? 'ring-orange-400' : 'ring-gray-200'
			} flex w-full items-center   justify-between rounded-lg ${
				disabled ? 'bg-[#E7E7E7] text-[#3E3E3E]' : 'bg-white'
			} ${search ? 'p-2' : 'p-3'} ring-1`}
			{disabled}
		>
			<span class="capitalize truncate text-sm">
				{#if value === ''}
					{#if all}
						all
					{:else}
						-Select-
					{/if}
				{:else if value.name}
					{value.name}
				{:else}
					{nam}
				{/if}
			</span>
			<input type="text" bind:value on:blur hidden />
			<span class="text-2xl w-5 h-5 grid place-content-center">
				<ArrowDown width={22} space={true} />
			</span>
		</button>

		<!-- list items -->
		{#if open}
			<ul
				class="z-20 h-auto max-h-[300px] scroll overflow-y-auto absolute mt-1 w-full rounded border bg-white"
			>
				{#if all}
					<li
						class="group cursor-pointer select-none py-2 px-1 hover:bg-orange-50 hover:rounded-md"
					>
						<button
							on:click={() => clear(all)}
							class={`w-full text-left group-hover:text-orange-pmk hover:font-semibold capitalize ${
								value === all ? 'text-orange-pmk font-semibold' : ''
							} `}>{all}</button
						>
					</li>
				{/if}
				{#each datas as data (data)}
					<div class="">
						<li
							class="cursor-pointer group h-10   select-none py-2  px-1 hover:bg-orange-50 hover:rounded-md"
						>
							<button
								on:click={() => setSelect(data)}
								class={`w-full text-[14px]  button-strip  text-gray text-left group-hover:text-orange-pmk  capitalize ${
									value === data ? 'text-orange-pmk font-semibold' : ''
								} `}>{data.name}</button
							>
						</li>
					</div>
				{/each}
			</ul>
		{/if}
		{#if error && !open}
			<div class="text-left relative sm:absolute w-full mb-2">
				<p class="text-error text-sm">{error}</p>
			</div>
		{/if}
	</div>
</main>

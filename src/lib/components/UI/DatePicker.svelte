<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import Calendar from '../icons/generic/calendar.svelte';
	export let typeUI: string = 'withIcon' || '';
	export let label: string = '';
	export let value: any;
	export let required: boolean;
	export let disabled: boolean = false;
	export let placeholder: string = 'dd-mm-yyyy';
	export let className: string = '';
	export let error: string = '';
</script>

{#if typeUI === 'withIcon'}
	<div class={`${className} form-control w-full`}>
		{#if label !== null}
			<label class="label" for={label}>
				{label}
				{#if required}<span class="text-orange-pmk">*</span> {/if}
			</label>
		{/if}
		<div class="relative w-full">
			<SveltyPicker
				format="dd-mm-yyyy"
				inputClasses="form-input {disabled ? 'text-gray-300' : 'text-gray-600'}"
				{placeholder}
				bind:value
				on:change
				on:blur
				{disabled}
			/>
			<div class="absolute top-[10px] right-[11px] ">
				<Calendar width={18} />
			</div>
		</div>
		<div class="text-left">
			{#if error}
				<p class="text-error text-sm">{error}</p>
			{/if}
		</div>
	</div>
{:else}
	<div class={`${className} form-control w-full`}>
		{#if label !== null}
			<label class="label" for={label}>
				{label}
				{#if required}<span class="text-orange-pmk">*</span> {/if}
			</label>
		{/if}
		<!-- inputClasses="w-full p-3 border rounded-lg border-gray-200 focus:border-orange-pmk focus:outline-none focus:ring-0 h-12" -->
		<SveltyPicker
			format="dd-mm-yyyy"
			inputClasses="form-input"
			{placeholder}
			bind:value
			on:change
			on:blur
		/>
		<div class="text-left">
			{#if error}
				<p class="text-error text-sm">{error}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global(.sdt-today-btn) {
		background-color: #3e3e3e !important;
		border: 1px solid #3e3e3e !important;
	}
	:global(.sdt-today-btn:hover) {
		background-color: #232323 !important;
		border: 1px solid #232323 !important;
	}

	:global(.sdt-clear-btn) {
		border: #ff8206 1px solid !important;
		background-color: transparent;
		color: #ff8206 !important ;
	}
	:global(.sdt-clear-btn:hover) {
		border: #ff8206 !important;
		background-color: #ff8206 !important;
		color: #ffff !important;
	}
</style>

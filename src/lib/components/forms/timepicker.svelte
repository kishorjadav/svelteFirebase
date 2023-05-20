<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import Clock from '../icons/generic/clock.svelte';
	export let label: string = '';
	export let value: any;
	export let placeholder: string = '00:00 am';
	export let required: boolean = false;
	export let error: string = '';
</script>

<div class=" flex flex-col w-full">
	{#if label}
		<label for="" class="label"
			>{label}
			{#if required}<span class="text-orange-pmk">*</span> {/if}</label
		>
	{/if}
	<div class="relative w-full ">
		<SveltyPicker
			{placeholder}
			bind:value
			on:change
			on:blur
			inputClasses="form-input "
			clearBtn={true}
			format="H:i p"
		/>
		<div class="absolute top-[10.5px] right-2 ">
			<Clock />
		</div>
	</div>
	<div class="text-left">
		{#if error}
			<p class="text-error text-sm">{error}</p>
		{/if}
	</div>
</div>

<style>
	/* clock */
	:global(.sdt-clock) {
		margin: auto;
		position: relative;
		width: 260px;
		height: 260px;
		background-color: #efeeee !important;
		border-radius: 10% !important;
		transition: background-color 0.3s;
		overflow: hidden;
		font-size: 22px !important;
		font-family: 'Urbanist', sans-serif !important;
		color: #232323 !important;
	}

	/* text on top */
	:global(.sdt-time-btn) {
		border: 0;
		background: transparent;
		text-align: center;
		border-radius: 4px;
		cursor: pointer;
		padding: 0 0.375rem;
		font-weight: 400 !important;
		font-size: 22px !important;
		font-family: 'Urbanist', sans-serif !important;
		color: #595959 !important;
	}

	/* ticker */
	:global(.sdt-calendar-colors) {
		--sdt-primary: #232323 !important;
	}
</style>

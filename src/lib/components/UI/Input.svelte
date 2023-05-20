<script lang="ts">
	import EyeClosed from '$lib/components/icons/eye/closedEye.svelte';
	import Eye from '$lib/components/icons/eye/openEye.svelte';
	export let label: string = '',
		name: string = '',
		value: any = '',
		arr: boolean = false,
		htmlType: string = '',
		error: string = '';
	let show: boolean = false;

	export let required: boolean = false;
	// const togglePassword = () => {
	// 	show_password = !show_password;
	// 	if (show_password) $$restProps.type = 'text';
	// 	else $$restProps.type = 'password';
	// };
</script>

<div class="relative text-left">
	<label for={label} class="label">
		{label}
		{#if required}<span class="text-orange-pmk">*</span> {/if}
	</label><br />
	{#if htmlType === 'password'}
		<div class="relative">
			<input
				on:input
				on:change
				on:blur
				{name}
				{...$$restProps}
				type={show ? 'text' : 'password'}
				autocomplete="off"
				class={` ${error ? `form-password-error` : `form-password`} `}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button
				type="button"
				class="absolute cursor-pointer"
				style="right: 1.25rem; top: 50%; transform: translateY(-50%);"
				on:click={() => (show = !show)}
			>
				{#if show}<Eye />{:else}<EyeClosed />{/if}
			</button>
		</div>
	{:else}
		<input
			bind:value
			on:change
			on:blur
			{name}
			{...$$restProps}
			autocomplete="off"
			class={` ${error ? `form-input-error` : `form-input`} `}
		/>
	{/if}
	<div class="text-left">
		{#if error && arr}
			<p class="text-error">{error[label]}</p>
		{:else if error}
			<p class="text-error">{error}</p>
		{/if}
	</div>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
</style>

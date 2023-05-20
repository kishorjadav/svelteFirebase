<script lang="ts">
	import Switch from 'svelte-switch';
	export let disabled: boolean = false;
	export let checked: boolean = false;
	export let name: string;
	export let label: boolean = true;
	export let labelText: string = 'text';
	export let Changes: any;
	export let typeUi: string = 'labelLeft';
	export let width: number = 44;
	export let height: number = 24;
</script>

{#if typeUi === 'labelLeft'}
	<div class="flex items-center gap-[14px] w-fit">
		{#if label}
			<label for={name} class="label-sm lg:label inline-block gap-[14px]">{labelText}</label>
		{/if}
		<Switch
			{name}
			bind:checked
			on:change={Changes}
			onColor="#00B000"
			offColor="#E5E7EB"
			handleDiameter={18}
			{width}
			{height}
			{disabled}
		>
			<span slot="checkedIcon" />
			<span slot="unCheckedIcon" />
		</Switch>
	</div>
{:else if typeUi === 'labelTop'}
	<div class="flex items-center  flex-col gap-[6px] w-fit ">
		{#if label}
			<label for={name} class="label-sm lg:label inline-block ">{labelText}</label>
		{/if}
		<Switch
			{name}
			bind:checked
			on:change={Changes}
			onColor="#00B000"
			offColor="#E5E7EB"
			handleDiameter={18}
			width="44"
			height="24"
			{disabled}
		>
			<span slot="checkedIcon" />
			<span slot="unCheckedIcon" />
		</Switch>
	</div>
{:else if typeUi === 'noLabel'}
	<Switch
		{name}
		bind:checked
		on:change={Changes}
		onColor="#00B000"
		offColor="#E5E7EB"
		handleDiameter={18}
		width="44"
		height="24"
		{disabled}
	>
		<span slot="checkedIcon" />
		<span slot="unCheckedIcon" />
	</Switch>
{/if}

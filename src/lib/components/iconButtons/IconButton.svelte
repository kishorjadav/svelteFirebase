<script lang="ts">
	import Filter from '$lib/components/icons/filter.svelte';
	import Export from '$lib/components/icons/export.svelte';
	export let typeUi: string = '';
	export let text: string = 'text';
	export let active: boolean=false;
	export let disabled = false;

</script>

{#if typeUi == 'filter'}
	<button {disabled} on:click class="group focus:border-none focus:ring-0 focus:outline-none focus:ring-offset-0">
		<div class="flex  items-center urbanist-500 group-hover:text-gray-focus">
			<Filter
				className={` ${
					active ? 'text-orange-focus' : 'text-gray-label'
				} group-hover:text-gray-focus`}
				width={18}
				height={18}
				space={true}
			/>
			<span
				class={`${
					active ? 'text-orange-focus' : 'text-gray-label'
				} inline-block group-hover:text-gray-focus  text-[14px] `}>Filter</span
			>
		</div>
	</button>
{:else if typeUi == 'export'}
	<button {disabled} on:click class="group focus:border-none focus:ring-0 focus:outline-none focus:ring-offset-0">
		<div class="flex items-center urbanist-600 group-hover:text-gray-focus ">
			<Export
				className={`${
					active ? 'text-orange-focus' : 'text-gray-label'
				}  group-hover:text-gray-focus`}
				width={29}
				height={29}
				space={true}
			/>
			<span
				class={`${
					active ? 'text-orange-focus' : 'text-gray-label'
				} inline-block group-hover:text-gray-focus  text-[14px] `}>Export</span
			>
		</div>
	</button>
{:else if typeUi == 'custom'}
	<button {disabled} class="flex items-center focus:border-none focus:ring-0 focus:outline-none focus:ring-offset-0">
		<slot title="icon" />
		<span
			class={`${
				active ? 'text-orange-focus' : 'text-gray-label'
			} inline-block group-hover:text-gray-focus  text-[14px] `}>{text}</span
		>
	</button>
{/if}

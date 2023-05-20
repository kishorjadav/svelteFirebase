<script lang="ts">
	import Loading from '$lib/components/loading.svelte';
	export let typeUi: string = '';
	export let name: string = '';
	export let width: number = 48;
	export let height: number = 48;
	export let big: boolean = false;

	export let loading: boolean=false;
</script>

{#if typeUi === 'loading'}
	<div
		class={`flex items-center w-[100px] h-[100px]  md:w-[70px] md:h-[70px] justify-center  capitalize  shadow-inner  bg-gray-backdrop rounded-full `}
	>
		<Loading {loading} typeUi={'tiny'} />
	</div>

{:else}
<div
	style={`width:${width}px;height:${height}px;`}
	class={`flex ${
		big ? 'text-[25px] lg:text-[38px]' : 'text-[20px] lg:text-[25px]'
	} items-center justify-center  capitalize text-white  bg-green-pmk rounded-full `}
>
	<p>{name[0] || ''}</p>
</div>
{/if}
<script lang="ts">
	export let data: any, value: any, error: string;
</script>

<input
	bind:value
	class:hide={String(data).length == 6}
	type="text"
	class={`  w-full h-[46px] border border-[#D9D9D94A] button-strip here bg-[#D9D9D94A] rounded-[8px] text-center text-[20px] font-semibold`}
	onKeyPress="if(this.value.length==6) return false;"
	name=""
	id=""
/>
{#if error}
	<p class="text-error text-sm">{error}</p>
{/if}

<style>
	.here {
		letter-spacing: 2vw;
	}
	.hide {
		caret-color: transparent;
	}
</style>

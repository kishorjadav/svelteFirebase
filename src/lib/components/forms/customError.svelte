<script lang="ts">
	export let errorMsg: string;
	export let check: boolean;
</script>

{#if check}
	<p class="text-error text-sm my-1">{errorMsg}</p>
{/if}

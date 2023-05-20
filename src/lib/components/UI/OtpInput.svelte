<script>
	export let count = 4;
	export let value = '';
	import Pincode from 'svelte-pincode/src/unstyled/Pincode.svelte';
	import PincodeInput from 'svelte-pincode/src/unstyled/PincodeInput.svelte';
	let code = [];
</script>

<Pincode bind:code bind:value>
	{#each { length: count } as _, i}
		<PincodeInput />
	{/each}
</Pincode>

<style>
	/** PincodeInput */
	:global([data-pincode]) {
		display: inline-flex;
	}
	:global([data-pincode] input) {
		width: 100%;
		padding: 0.5rem 1rem;
		border: 1px solid #cfcfcf;
		text-align: center;
	}

	:global([data-pincode] input):focus {
		outline-color: #ff8300;
		outline-style: auto;
	}
</style>

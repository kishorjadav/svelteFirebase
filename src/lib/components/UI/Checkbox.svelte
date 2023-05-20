<script lang="ts">
	export let checked = '',
		label = '',
		name = '';
</script>

<div class="relative text-left">
	<label for={label} class="label">
		{label}
	</label><br />
	<input type="checkbox" {...$$restProps} bind:checked on:change {name} class="form-checkbox" />
</div>

<script lang="ts">
	export let label: boolean = true;
	export let labelText: string = 'label';
	export let name: string;
	export let value: any;
	export let formType: string;
	export let required: boolean;
	export let placeholder: string = '';
	export let className: string = '',
		classNameSelect: string = '';
	export let icon: any = '';
	export let props: any = '';
	export let iconClass: string = '';
	export let iconClick: any = null;

	// general
	export let error: string | null = null;

	export let withCountryPrefix: boolean = false;
	export let country_code: string = '';
	export let country_code_label: string = '';

	import countriesCode from '../../../constant/countries.json';

	function getKeyByValue(object: Record<string, string>, value: string) {
		return Object.keys(object).find((key) => object[key] === value);
	}

	$: if (!country_code_label && country_code) {
		country_code_label = getKeyByValue(countriesCode, country_code) || 'SG';
	}

	const handelKey = async (event) => {
		if (event) {
			value = event.target.value.replace(/\,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		} else {
			value = event.target.value;
		}
	};
	let searchTerm: string = '';
	$: searchTel = Object.entries(countriesCode).filter((tel) => {
		if (searchTerm) return tel.includes(searchTerm) || tel.includes(searchTerm.toUpperCase());
		else return tel;
	});
	$: if (searchTel.length === 1) {
		country_code = searchTel[0][0];
		country_code_label = searchTel[0][1];
	}
</script>

<div>
	{#if label}
		<label class="label" for={name}>
			{labelText}
			{#if required}<span class="text-orange-pmk">*</span> {/if}
		</label>
	{/if}

	{#if withCountryPrefix}
		<input
			type="text"
			class="form-input"
			placeholder="Search Country Eg: 65 OR SG"
			bind:value={searchTerm}
		/>
		<div class="flex items-center gap-2 mt-2">
			<select
				class={`form-input w-[110px] ${classNameSelect}`}
				value={country_code + '|' + country_code_label}
				on:change={(e) => {
					const val = e.target.value;
					country_code = val.split('|')[0];
					country_code_label = val.split('|')[1];
				}}
			>
				{#each searchTel as [country, code]}
					<option value={code + '|' + country}>{code.charAt(0) === '+' ? code : `+${code}`}</option>
				{/each}
				<!-- {code.charAt(0) === '+' ? code : `+${code}`} -->
			</select>
			<input
				{...$$restProps}
				type="text"
				class={`w-full form-input ${className} placeholder:text-gray-placeholder placeholder:font-[310] placeholder:text-[16px]`}
				{placeholder}
				{name}
				id=""
				bind:value
				on:change
				on:blur
			/>
		</div>
	{:else if formType === 'withICon'}
		<div class="relative z-0">
			<input
				{...$$restProps}
				type="text"
				{placeholder}
				{name}
				id=""
				bind:value
				on:change
				on:blur
				class={`form-input ${className}`}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class={`absolute top-2.5 ${iconClass !== '' ? iconClass : 'right-[36px]'}`}
				on:click={iconClick}
			>
				<svelte:component this={icon} {...props} />
			</div>
		</div>
	{:else if formType === 'textarea'}
		<textarea
			{...$$restProps}
			class={`w-full form-textarea ${className} `}
			{placeholder}
			{name}
			id=""
			bind:value
			on:change
			on:blur
		/>
	{:else if formType === 'priceInput'}
		<input
			{...$$restProps}
			class={`w-full form-input ${className} placeholder:text-gray-placeholder placeholder:font-[310] placeholder:text-[16px]`}
			type="text"
			{placeholder}
			{name}
			id=""
			bind:value
			on:change
			on:blur
			on:keyup={handelKey}
		/>
	{:else}
		<input
			{...$$restProps}
			type="text"
			class={`w-full form-input ${className} placeholder:text-gray-placeholder placeholder:font-[310] placeholder:text-[16px]`}
			{placeholder}
			{name}
			id=""
			bind:value
			on:change
			on:blur
		/>
	{/if}
	<div class="text-left">
		{#if error}
			<p class="text-error text-sm">{error}</p>
		{/if}
	</div>
</div>

<script lang="ts">
	import ArrowDown from './../icons/arrows/arrowDown.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { selectDetails } from 'src/types/common.type';
	export let placeholder: string = '';
	export let DefaultSelectkey: string = '';
	export let searchVals: any = {};
	export let selectDetails: selectDetails;
	let menu: HTMLDivElement;
	let elm: HTMLInputElement;
	$: selected = '';
	let searchValue: number | string;
	let dispatch = createEventDispatcher();
	let log = console.log;

	$: showSeachDrop = false;

	// click away logic
	onMount(() => {
		const handleOutsideClick = (event: any) => {
			if (showSeachDrop && !menu.contains(event.target)) {
				showSeachDrop = false;
			}
		};
		const handleEscape = (event: any) => {
			if (showSeachDrop && event.key === 'Escape') {
				showSeachDrop = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});

	// set default with key
	$: if (selectDetails.DefaultSelectkey && Object.keys(searchVals).length) {
		searchVals.forEach((ele: any) => {
			if (ele[selectDetails.selectKey] === selectDetails.DefaultSelectkey) {
				selected = ele[selectDetails.selectDisplay];
			}
		});
	} else if (selectDetails.DefaultSelectVal) {
		// set default with value
		selected = selectDetails.DefaultSelectVal;
	}

	// returns selected value and key
	$: passValue = (val: string | number, key: any) => {
		if (val || key) {
			selected = val;
			dispatch('select', {
				selected: val,
				key: key
			});
		}
		showSeachDrop = false;
	};
</script>

<div bind:this={menu} class="w-full">
	<button
		on:click={() => (showSeachDrop = true)}
		on:blur={() => {
			showSeachDrop = false;
		}}
		class="group flex w-full text-[13px]  h-[43px] relative lg:text-[14px]"
	>
		<input
			{placeholder}
			readonly
			bind:this={elm}
			type="input"
			class="w-full  group-input text-gray  border border-gray-light focus:outline-none focus:ring-0 focus:border-orange-pmk  urbanist-400    focus:ring-offset-0 placeholder:text-gray-placeholder  px-2 text-[14px] h-full   rounded-[8px] "
			name=""
			id="myInput"
			bind:value={selected}
		/>
		<div class="absolute   top-2.5 right-0 text-gray ">
			<ArrowDown width={22} space={true} />
		</div>

		{#if showSeachDrop && selectDetails}
			<div
				class="absolute z-10 urbanist-500 pr-[0.5] py-[1px]   w-full h-fit top-[43px] bg-white   rounded-[6px] border border-gray-light overflow-hidden"
			>
				<div class="max-h-[290px] overflow-y-auto scroll">
					<ul class=" text-left capitalize  text-[14px]  text-gray-label">
						{#each Object.values(searchVals) as val}
							<button
								class="w-full capitalize text-left focus:border-0 focus:ring-0 focus:outline-none"
								on:click={() =>
									passValue(val[selectDetails.selectDisplay], val[selectDetails.selectKey])}
							>
								<li
									class={`first:h-[36px] hover:text-orange-focus  first:py-[8px] last:h-[36px] last:py-[8px]  h-[33px] py-[8px] px-[12px] md:px-[14px] lg:px-[17px] ${
										selected === val[selectDetails.selectDisplay]
											? 'bg-gray-backdrop text-orange-pmk'
											: ''
									} `}
									value="stuff"
								>
									{val[selectDetails.selectDisplay]}
								</li>
							</button>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</button>
</div>

<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import ArrowDown from './../icons/arrows/arrowUp.svelte';
	import type { selectDetails } from 'src/types/common.type';

	export let selectDetails: selectDetails;
	export let data: any[] = [];
	export let placeholder: string;
	export let all: boolean = false;

	// default selected
	export let defaultSelected: any[] = [];
	let defaultSelectedDisplay: any[] = [];

	// toggle
	let showOptions: boolean = false;

	// dispatch values
	export let selected: any[] = [];
	export let selectedDisplay: any[] = [];
	export let obj: { [key: string]: any } = {};

	// temp array for all selected
	let selectedAll = ['all'];
	let selectedDisplayAll = ['All'];

	let menu: HTMLDivElement;
	let elm: HTMLInputElement;

	let dispatch = createEventDispatcher();

	// click away logic
	onMount(() => {
		// default selected
		if (defaultSelected.length >= 1) {
			data.forEach((m: any) => {
				for (let ele of defaultSelected) {
					if (m[selectDetails.selectKey] === ele) {
						defaultSelectedDisplay = [...defaultSelectedDisplay, m[selectDetails.selectDisplay]];
						obj[ele as keyof typeof obj] = m[selectDetails.selectDisplay];
					}
				}
			});
			selected = [...defaultSelected];
			selectedDisplay = [...defaultSelectedDisplay];
			

			if (defaultSelected.includes('all' || 'All')) {
				selectedDisplay = ['All', ...defaultSelectedDisplay];
			}

			dispatch('deafult', {
				selected: selected,
				selectedDisplay: selectedDisplay,
				obj: obj
			});
		}

		const handleOutsideClick = (event: any) => {
			if (showOptions && !menu.contains(event.target)) {
				showOptions = false;
			}
		};
		const handleEscape = (event: any) => {
			if (showOptions && event.key === 'Escape') {
				showOptions = false;
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

	$: if (obj) {
		// console.log(obj)
		let tempSelected: any[] = [];
		let tempselectedDisplay: any[] = [];

		for (let [key, value] of Object.entries(obj)) {
			tempSelected = [...tempSelected, key];
			tempselectedDisplay = [...tempselectedDisplay, value];
		}
		
		selected = [...tempSelected];
		selectedDisplay = [...tempselectedDisplay];
	}

	// temp.obj
	let clickIt = (id: string, display: string) => {
		if (selected.includes(id)) {
			// remove
			selected = selected.filter((m: any) => m !== id);
			selectedDisplay = selectedDisplay.filter((m: any) => m !== display);
			delete obj[id as keyof typeof obj];
		} else {
			// add
			selected = [...selected, id];
			selectedDisplay = [...selectedDisplay, display];
			// to object
			obj[id as keyof typeof obj] = display;
		}

		dispatch('selected', {
			selected: selected.includes('all') ? selectedAll : selected,
			selectedDisplay: selectedDisplay.includes('All') ? selectedDisplayAll : selectedDisplay,
			obj: obj
		});
	};

	// $: console.log(selected, '<----selected', selectedDisplay, '<---selectedDisplay');
</script>

<div bind:this={menu} class="w-full relative">
	<button
		on:click={() => (showOptions = !showOptions)}
		class="group button-strip flex w-full text-[13px]  h-[43px] relative lg:text-[14px]"
	>
		<!-- value={selectedDisplay.includes('All') ? selectedDisplayAll : selectedDisplay} -->
		<input
			name="multiselect"
			bind:this={elm}
			{placeholder}
			readonly
			class="w-full  group-input text-gray  border border-gray-light focus:outline-none focus:ring-0 focus:border-orange-pmk  urbanist-400 relative z-10  focus:ring-offset-0 placeholder:text-gray-placeholder  px-2 text-[14px] h-full   rounded-[8px]"
			type="text"
		/>
		<div
			class="absolute flex justify-center items-center z-10 h-10 bg-white top-[1.1px] rounded-[8px] right-[1.1px] text-gray  "
		>
			<ArrowDown width={20} height={20} space={true} />
		</div>
	</button>
	{#if showOptions}
		<div class="z-10 absolute pr-[2px]  overflow-hidden w-full bg-gray-backdrop rounded-[8px]">
			<div class=" max-h-[333px]  overflow-y-auto scroll w-full ">
				{#if all}
					<button
						class={`py-2 text-[14px] w-full text-left p-4 hover:bg-[#FF6E004D]/10 hover:text-orange-pmk ${
							selected.includes('all') ? 'text-orange-pmk' : 'text-gray'
						}`}
						on:click={() => clickIt('all', 'All')}
					>
						All
					</button>
				{/if}
				{#each Object.values(data) as dat, i}
					<button
						disabled={selected.includes('all')}
						class={`py-2 text-[14px] disabled:text-[#B1B1B1] disabled:hover:bg-gray-backdrop w-full text-left p-4 hover:bg-[#FF6E004D]/10 hover:text-orange-pmk ${
							selected.includes(dat[selectDetails.selectKey]) ? 'text-orange-pmk' : 'text-gray'
						}`}
						on:click={() => clickIt(dat[selectDetails.selectKey], dat[selectDetails.selectDisplay])}
					>
						{dat[selectDetails.selectDisplay]}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

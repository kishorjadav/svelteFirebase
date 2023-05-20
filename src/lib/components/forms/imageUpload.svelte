<script lang="ts">
	import { useAxios } from '../../../services/useAxios';
	import DefaultImage from '$lib/components/iconButtons/defaultImage.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { createEventDispatcher } from 'svelte';
	import { useToast } from '../../../utils/toast';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	const fetch = useAxios();
	const toast = useToast();

	export let photo: string, name: string;
	export let hasImage: boolean = false;
	let fileinput: any;
	$: loading = false;
	$: imageUrl = '';

	onMount(() => {
		onFileSelected();
	});

	$: onFileSelected = async (e?: any) => {
		if (e) {
			loading = true;
			let file = e.target.files[0];
			try {
				let fd = new FormData();
				fd.append('upload', file);
				const res = await fetch.put(`/auth/image/upload/pushNotification`, fd);
				imageUrl = res.data;

				loading = false;

				console.log('new');
				console.log(imageUrl, 'imageUrl');
				dispatch('imageAdded', {
					imageUrl: imageUrl,
				});
			} catch (e: any) {
				loading = false;
				let error = e.response;
				if (error.status >= 400 && error.status <= 599) {
					toast.error('Something went wrong, please try again later!');
					console.log(error, 'error');
				}
			}
		} else if (!e) {
			console.log('old');
			imageUrl = photo;
			dispatch('imageAdded', {
				imageUrl: imageUrl,
			});
		}
	};
</script>

<div class="flex gap-4  w-full flex-col md:flex-row justify-center  md:justify-start items-center">
	{#if (imageUrl || photo) && !loading}
		<img
			src={imageUrl || photo}
			class="w-[104px] object-cover h-[104px] md:w-[64px] md:h-[64px] rounded-full "
			alt=""
		/>
	{:else if loading}
		<DefaultImage typeUi={'loading'} {loading}/>
	{:else}
		<DefaultImage
			big={true}
			width={screen.width > 768 ? 100 : 70}
			height={screen.width > 768 ? 100 : 70}
			{name}
		/>
	{/if}
	<button
		on:click={() => {
			fileinput.click();
		}}
		type="button"
		class=" text-orange-pmk hover:text-orange-focus focus:border-none focus:outline-0 focus:ring-0 font-medium text-[14px] capitalize"
	>
		<slot /></button
	>
	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileinput}
	/>
</div>

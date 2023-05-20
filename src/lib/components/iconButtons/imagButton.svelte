<script lang="ts">
	export let img: string;
	export let text: string;
	export let className: string = '';
	export let typeUi: string = '';
</script>

{#if typeUi === 'needSlot'}
	<span class="inline-flex  items-center space-x-[14px] md:space-x-[20px]">
		<div>
			{#if img}
				<img
					src={img}
					class="w-[45px] h-[45px] lg:w-[48px] lg:h-[48px] object-cover  rounded-full "
					alt="profile"
				/>
			{:else}
				<span class="inline-flex items-center space-x-[14px] md:space-x-[20px]">
					<div
						class="flex items-center w-[45px] h-[45px] lg:w-[48px] lg:h-[48px] justify-center text-[20px] lg:text-[25px] capitalize text-white  bg-green-pmk rounded-full "
					>
						<p>{text[0]}</p>
					</div>
				</span>
			{/if}
		</div>
		<div class="flex flex-col text-left lg:flex-row gap-1">
			<p
				class={`${className} urbanist-600 capitalize text-gray text-[20px]  md:text-[25px] xl:text-[32px]`}
			>
				{text}
			</p>
			<slot />
		</div>
	</span>
{:else if typeUi === 'withDefault'}
	<span class="inline-flex items-center space-x-[14px] md:space-x-[20px]">
		{#if img}
			<img
				src={img}
				class="w-[45px] h-[45px] lg:w-[48px] lg:h-[48px] object-cover  rounded-full "
				alt="profile"
			/>
		{:else}
			<span class="inline-flex items-center space-x-[14px] md:space-x-[20px]">
				<div
					class="flex items-center w-[45px] h-[45px] lg:w-[48px] lg:h-[48px] justify-center text-[20px] lg:text-[25px] capitalize text-white  bg-green-pmk rounded-full "
				>
					<p>{text[0]}</p>
				</div>
			</span>
		{/if}
		<p
			class={`${className} urbanist-600 capitalize text-gray text-[20px]  md:text-[25px] lg:text-[32px]`}
		>
			{text}
		</p>
	</span>
{:else}
	<span class="inline-flex items-center space-x-[14px] md:space-x-[20px]">
		<img
			src={img}
			class="w-[45px] h-[45px] lg:w-[48px] lg:h-[48px] object-cover  rounded-full "
			alt="profile"
		/>

		<p
			class={`${className} urbanist-600 capitalize text-gray text-[20px]  md:text-[25px] lg:text-[32px]`}
		>
			{text}
		</p>
	</span>
{/if}

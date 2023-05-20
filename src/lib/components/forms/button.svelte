<script lang="ts">
  import Check from "../icons/generic/check.svelte";
  import CloseClircle from "../icons/generic/closeClircle.svelte";
  import Loading from "../icons/animated/loading.svelte";
  export let text = "";
  export let type = "";
  export let className = "";
  export let disabled = false;
  export let typeUi: string;
</script>

{#if typeUi === "confirm"}
  <!-- orange button width full -->
  <button
    on:click
    {type}
    {disabled}
    class="{className} button w-full py-3 px-2"
  >
    {text}
  </button>
{:else if typeUi === "success"}
  <!-- green button width full , with icon-->
  <button
    on:click
    {type}
    {disabled}
    class="{className} gap-[12.4px] button-success w-full py-2 flex items-center justify-center px-2"
  >
    <Check width={15} height={11} />
    {text}
  </button>
{:else if typeUi === "loading"}
  <!-- orange button width full , with icon-->
  <button
    on:click
    {type}
    {disabled}
    class="{className} gap-[10px] button w-full py-2 flex items-center justify-center px-2"
  >
    <Loading space={true} width={27} height={27} />

    {text}
  </button>
{:else if typeUi === "error"}
  <!-- red button width full, with icon-->
  <button
    on:click
    {type}
    {disabled}
    class="{className} gap-[12.4px] button-error w-full py-2 flex items-center justify-center px-2"
  >
    <CloseClircle width={16} height={17} />
    {text}
  </button>
{:else if typeUi === "add"}
  <button
    on:click
    {type}
    {disabled}
    class="{className} 
		button w-[123px] h-[36px] text-[14px]"
  >
    {text}
  </button>
{:else if typeUi === "save"}
  <button
    on:click
    {type}
    {disabled}
    class="{className} button w-[104px] h-[36px] text-[14px]"
  >
    {text}
  </button>
{:else if typeUi === "hollow"}
  <button
    on:click
    {type}
    {disabled}
    class="{className} button-hollow w-[104px] h-[36px] text-[14px]"
  >
    {text}
  </button>
{:else if typeUi === "textButton"}
  <!-- orange text button with underline -->
  <button on:click {type} {disabled} class="text-button-orange">
    {text}
  </button>
{:else if typeUi === "textButtonGray"}
  <!-- gray text button with underline -->
  <button on:click {type} {disabled} class="text-button-gray">
    {text}
  </button>
{/if}

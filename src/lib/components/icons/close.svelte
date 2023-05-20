<script lang="ts">
  export let width = 24;
  export let height = 24;
  export let className: string = "";
  export let space: boolean = false;
</script>

<span class={`${space ? "inline-block mt-2" : ""} ${className}`}>
  <svg
    {width}
    {height}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2.1"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</span>

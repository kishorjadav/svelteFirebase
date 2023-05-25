<script lang="ts">
  import { getCookie, removeCookie, setCookie } from "../cookies/useCookies";
  import {
    AUTH_COOKIE_NAME,
    AUTH_REFRESH_COOKIE_NAME,
    THEME_COOKIE_NAME,
  } from "../cookies/cookieName";
  import { onMount } from "svelte";
  import { reload } from "firebase/auth";
  import { setModeStore } from "../store";

  export let accessToComp: string = "";

  $: mode = getCookie(THEME_COOKIE_NAME);

  // fecth data on load
  onMount(async () => {});

  let logout = async () => {
    try {
      removeCookie(AUTH_COOKIE_NAME);
      removeCookie(AUTH_REFRESH_COOKIE_NAME);
      window.location.href = "/signin";
    } catch (e) {
      console.error("error", e);
    }
  };

  const toggleTheme = async () => {
    try {
      if (mode === "light") {
        setModeStore.update((curr) => {
          return { ...curr, theme: "dark" };
        });
        setCookie(THEME_COOKIE_NAME, "dark");
        location.reload();
      } else {
        setModeStore.update((curr) => {
          return { ...curr, theme: "light" };
        });
        setCookie(THEME_COOKIE_NAME, "light");
        location.reload();
        console.log("dark cond", mode);
      }
    } catch (e) {
      console.error("error", e);
    }
  };
</script>

{#if accessToComp}
  <header class={mode === "light" ? "light" : "dark"}>
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-4"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <!-- <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt=""
          /> -->
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="/" class="text-sm font-semibold leading-6 text-white"
          >Dashboard</a
        >
        <a href="/myprofile" class="text-sm font-semibold leading-6 text-white"
          >My Profile</a
        >
        <a href="/customer" class="text-sm font-semibold leading-6 text-white"
          >Customers</a
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end mr-8">
        {#if mode === "light"}
          <svg
            on:click={toggleTheme}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        {:else}
          <svg
            on:click={toggleTheme}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        {/if}
      </div>
      <div class="">
        <button
          on:click={() => logout()}
          class="text-sm font-semibold leading-6 text-white"
          >Log out<span aria-hidden="true">&rarr;</span></button
        >
      </div>
    </nav>

    <!-- <div class="lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-10" />
      <div
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt=""
            />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-400">
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/25">
            <div class="space-y-2 py-6">
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >Product</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >Features</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >Marketplace</a
              >
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >Company</a
              >
            </div>
            <div class="py-6">
              <button
                on:click={() => logout()}
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >Log out</button
              >
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </header>

  <!-- <div
    class="fixed top-0 z-30 inset-0 lg:h-[80px] h-[60px] md:ml-64 px-[16px] pt-[9px] lg:px-[48px] lg:pt-[16px] pb-1 bg-gray-backdrop "
  >
    <div class="flex justify-between w-full">
      <div class="">navBar</div>
      <div class="">
        <button on:click={() => logout()}>logout</button>
      </div>
    </div>
  </div> -->
{/if}

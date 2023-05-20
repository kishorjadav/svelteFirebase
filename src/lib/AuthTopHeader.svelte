<script lang="ts">
  import { getCookie, removeCookie } from "../cookies/useCookies";
  import {
    AUTH_COOKIE_NAME,
    AUTH_REFRESH_COOKIE_NAME,
  } from "../cookies/cookieName";

  export let accessToComp: string = "";

  let logout = async () => {
    try {
      removeCookie(AUTH_COOKIE_NAME);
      removeCookie(AUTH_REFRESH_COOKIE_NAME);
      window.location.href = "/signin";
    } catch (e) {
      console.error("error", e);
    }
  };
</script>

{#if accessToComp}
  <header class="bg-gray-800">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-4"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt=""
          />
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
        <a href="#" class="text-sm font-semibold leading-6 text-white"
          >Product</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-white"
          >Features</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-white"
          >Marketplace</a
        >
        <a href="#" class="text-sm font-semibold leading-6 text-white"
          >Company</a
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <button
          on:click={() => logout()}
          class="text-sm font-semibold leading-6 text-white"
          >Log out<span aria-hidden="true">&rarr;</span></button
        >
        <a href="/myprofile">
          <img
            class="inline-block h-14 w-14 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </a>
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

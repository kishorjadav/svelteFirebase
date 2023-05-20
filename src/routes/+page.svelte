<script lang="ts">
  import { onMount } from "svelte";
  import { getCookie, removeCookie } from "../cookies/useCookies";
  import {
    AUTH_COOKIE_NAME,
    AUTH_REFRESH_COOKIE_NAME,
  } from "../cookies/cookieName";

  let accessToken: any;
  let refreshToken: any;

  onMount(() => {
    checkForAccess();
  });

  let checkForAccess = async () => {
    accessToken = getCookie(AUTH_COOKIE_NAME);
    refreshToken = getCookie(AUTH_REFRESH_COOKIE_NAME);
  };
</script>

<section class="bg-red-200">
  ihujk
  <!-- <h1 class="text-red-500 text-xl">accessToken:{accessToken}</h1>
  <h1 class="text-red-500 text-xl">refreshToken:{refreshToken}</h1> -->
</section>

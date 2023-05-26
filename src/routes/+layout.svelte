<script lang="ts">
  //pacakage
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import { accessStore, userRefreshStore } from "../cookies/cookieStore";
  import { authUserStore } from "../store";

  import { auth } from "../lib/firebase/firebase.client";
  import axios from "axios";

  //components
  import "../app.css";
  import AuthSidebar from "../lib/AuthSidebar.svelte";
  import AuthTopHeader from "../lib/AuthTopHeader.svelte";
  import SignIn from "./signin/+page.svelte";

  let slotWithToken = false;
  let result: any;

  let fields = {
    email: "",
    localId: "",
    photo: "",
  };

  onMount(() => {
    checkForAccess();
    console.log("tokens--->", $accessStore, $userRefreshStore);
  });

  let checkForAccess = async () => {
    // checking with store
    if ($accessStore || $userRefreshStore) {
      slotWithToken = true;
      fetchData();
    } else {
      goto("/signin");
    }
  };

  let fetchData = async () => {
    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDK0R6x-4ai29YULdMaXOL78DeJP5iPwtA",
        {
          idToken: $accessStore,
        }
      );
      result = res.data.users;

      fields.email = result.map((item) => item.email);
      fields.localId = result.map((item) => item.localId);
      authUserStore.update((curr) => {
        return { ...curr, isLoading: false, currentUser: fields.localId };
      });

      console.log("fleids checking", $authUserStore);
    } catch (e) {
      // let error = e.response;
      // if (error.status >= 400 && error.status <= 499) {
      //   if (error.status === 403) {
      //     hasPermission = false;
      //   }
      //   toast.error(
      //     error.data.message || "Something wrong when fetching admin lists"
      //   );
      // }
    }
  };
</script>

{#if $accessStore && $userRefreshStore && slotWithToken}
  <main>
    <!-- desktop devices -->
    <div class="overflow-hidden">
      <section class="sr-only md:not-sr-only h-screen">
        <AuthSidebar accessToComp={$accessStore}>
          <div class="overflow-hidden">
            <AuthTopHeader accessToComp={$accessStore} />
          </div>
          <div
            class={` ${
              $accessStore ? "  overflow-y-auto h-screen p-2" : ""
            }   h-full `}
          >
            <slot />
            <!-- {$authUserStore.currentUser} -->
          </div>
        </AuthSidebar>
      </section>
    </div>

    <!-- mobile devices -->
    <div class="md:sr-only not-sr-only">
      <!-- <section>
        <AuthSidebar accessToComp={$accessStore} />
      </section> -->
      <section class="overflow-hidden">
        <AuthTopHeader accessToComp={$accessStore} />
      </section>
      <div
        class={` ${$accessStore ? "  overflow-y-auto h-screen" : ""}   h-full `}
      >
        <slot />
      </div>
    </div>
  </main>
{:else}
  <!-- <SignIn /> -->

  <slot />
{/if}

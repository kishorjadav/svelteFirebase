<script lang="ts">
  import { onMount } from "svelte";
  import { getCookie } from "../../cookies/useCookies";

  import { useToast } from "../../lib/toastify/toastify";
  import { useAxios } from "../../services/useAxios";
  import { createForm } from "svelte-forms-lib";
  import { ResetPasswordSchema } from "../../schemas/customValidation";
  import PasswordReset from "./PasswordReset.svelte";
  import EmailUpdate from "./EmailUpdate.svelte";

  import axios from "axios";

  import { accessStore } from "../../cookies/cookieStore";
  import { reload } from "firebase/auth";

  const toast = useToast();
  // const fetch = useAxios();

  let result: any;

  let fields = {
    email: "",
    localId: "",
    photo: "",
    userAgent: "",
    vendor: "",
    platform: "",
    language: "",
  };

  // fecth data on load
  onMount(async () => {
    if ($accessStore) {
      fetchData();
      fields.userAgent = navigator.userAgent;
      fields.vendor = navigator.vendor;
      fields.platform = navigator.platform;
      fields.language = navigator.language;
    }
  });

  // fetch data
  $: fetchData = async () => {
    try {
      // location.reload();
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDK0R6x-4ai29YULdMaXOL78DeJP5iPwtA",
        {
          idToken: $accessStore,
        }
      );
      result = res.data.users;

      fields.email = result.map((item) => item.email);
      fields.localId = "103.5.132.29";
      console.log("fleids checkinf", fields.email);
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

<main class="mb-40">
  <section class="mx-5 my-10 bg-gray-100 rounded-lg p-5">
    <div class="space-y-10 divide-y">
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <form
          class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div class="col-span-full">
                <label
                  for="photo"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Photo</label
                >
                <div class="mt-2 flex items-center gap-x-3">
                  <svg
                    class="h-12 w-12 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >First Name</label
                >
                <div class="mt-2">
                  <input
                    readonly
                    type="text"
                    name="firstname"
                    id="firstname"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Last Name</label
                >
                <div class="mt-2">
                  <input
                    readonly
                    type="text"
                    name="lastname"
                    id="lastname"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email</label
                >
                <div class="mt-2">
                  <input
                    readonly
                    type="email"
                    name="email"
                    id="email"
                    bind:value={fields.email}
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >IP Address</label
                >
                <div class="mt-2">
                  <input
                    readonly
                    type="type"
                    name="email"
                    id="email"
                    bind:value={fields.localId}
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >User Agent</label
                >
                <div class="mt-2">
                  {fields.userAgent}
                </div>
              </div>

              <div class="sm:col-span-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Vendor</label
                >
                <div class="mt-2">
                  {fields.vendor}
                </div>
              </div>

              <div class="sm:col-span-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Platform</label
                >
                <div class="mt-2">
                  {fields.platform}
                </div>
              </div>

              <div class="sm:col-span-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Language</label
                >
                <div class="mt-2">
                  {fields.language}
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
          >
            <!-- <div class="">
              <button
                type="button"
                class="text-sm font-semibold leading-6 text-gray-900"
                >Cancel</button
              >
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Save</button
              >
            </div> -->
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- Email section -->
  <EmailUpdate />
  <!-- <section class="mx-5 my-10 bg-gray-100 rounded-lg p-5">
    <div class="space-y-10 divide-y">
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Email Section
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <form
          class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div class="sm:col-span-full">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email</label
                >
                <div class="mt-2">
                  <input
                    readonly
                    type="email"
                    name="email"
                    id="email"
                    bind:value={fields.email}
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
          >
            <div class="">
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Update Email</button
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </section> -->

  <PasswordReset />
</main>
<!-- <section class="my-10 sr-only">sdjgwyfewyguih</section> -->

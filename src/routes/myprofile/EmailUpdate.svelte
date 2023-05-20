<script lang="ts">
  import { onMount } from "svelte";
  import { getCookie, removeCookie } from "../../cookies/useCookies";
  import {
    AUTH_COOKIE_NAME,
    AUTH_REFRESH_COOKIE_NAME,
  } from "../../cookies/cookieName";

  import { useToast } from "../../lib/toastify/toastify";
  import { useAxios } from "../../services/useAxios";
  import { createForm } from "svelte-forms-lib";
  import { forgotSchema } from "../../schemas/customValidation";
  import PasswordReset from "./PasswordReset.svelte";

  import axios from "axios";

  import { accessStore } from "../../cookies/cookieStore";

  const toast = useToast();
  // const fetch = useAxios();

  let result: any;
  // pop ups

  $: popUpEmail = false;

  let resetfields = {
    email: "",
  };

  onMount(async () => {
    fetchData();
  });

  // fetch data
  $: fetchData = async () => {
    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDK0R6x-4ai29YULdMaXOL78DeJP5iPwtA",
        {
          idToken: $accessStore,
        }
      );
      result = res.data.users;

      resetfields.email = result.map((item) => item.email);
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

  const updatePopup = async () => {
    popUpEmail = true;
    console.log(popUpEmail);
  };

  // close popUp from dispacth
  let closePopup = (event: any) => {
    popUpEmail = false;
  };

  const { form, errors, state, handleChange, handleSubmit, handleReset } =
    createForm({
      initialValues: resetfields,
      validationSchema: forgotSchema,
      onSubmit: async (values) => {
        try {
          console.log(values);

          const res = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDK0R6x-4ai29YULdMaXOL78DeJP5iPwtA",
            {
              email: values.email,
              idToken: $accessStore,
              returnSecureToken: true,
            }
          );
          result = res.data;
          console.log("res", result);

          if (res.status === 200) {
            popUpEmail = false;
            logout();

            toast.error("Email updates successfully");
          }
        } catch (e) {
          toast.error(e.response.data.error.message);
          console.log("error", e.response.data.error.message);
        }
      },
    });

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

<!-- password section -->
<section class="mx-5 my-10 bg-gray-100 rounded-lg p-5">
  <div class="space-y-10 divide-y">
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div class="px-4 sm:px-0">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Email Section
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          (Note: System will logout automatically once new email is sets.)
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
                >Email Address</label
              >
              <div class="mt-2">
                <input
                  readonly
                  type="email"
                  name="email"
                  id="email"
                  bind:value={resetfields.email}
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
              type="button"
              on:click={updatePopup}
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Update Email</button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</section>

{#if popUpEmail}
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3
                  class="text-base font-semibold leading-6 text-red-600"
                  id="modal-title"
                >
                  Update Email Address
                </h3>

                <div class="mt-2">
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Enter your new e-mail id</label
                    >
                    <p
                      class="mt-2 text-sm text-gray-500"
                      id="email-description"
                    >
                      (Note: System will logout automatically once new email is
                      sets.)
                    </p>
                    <div class="relative mt-2 rounded-md shadow-sm">
                      <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"
                          />
                          <path
                            d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        bind:value={$form.email}
                        on:change={handleChange}
                        on:blur={handleChange}
                        class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="you@example.com"
                      />
                      {#if $errors.email}
                        <small class="text-red-600">{$errors.email}</small>
                      {/if}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              on:click={handleSubmit}
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >Update Me</button
            >
            <button
              on:click={closePopup}
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >Cancel</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

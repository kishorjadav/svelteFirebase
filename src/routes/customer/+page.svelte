<script lang="ts">
  import { db } from "../../lib/firebase/firebase.client";
  import {
    collection,
    query,
    where,
    onSnapshot,
    getDocs,
  } from "firebase/firestore";
  import { browser } from "$app/environment";

  import { onMount } from "svelte";
  import { getCookie, removeCookie } from "../../cookies/useCookies";
  import {
    AUTH_COOKIE_NAME,
    AUTH_REFRESH_COOKIE_NAME,
  } from "../../cookies/cookieName";

  import { useToast } from "../../lib/toastify/toastify";
  import { useAxios } from "../../services/useAxios";
  import { createForm } from "svelte-forms-lib";
  import { customerSchema } from "../../schemas/customValidation";

  import axios from "axios";

  import { accessStore } from "../../cookies/cookieStore";

  const toast = useToast();
  const fetch = useAxios();
  // let cors = require("cors");

  let result: any;
  // pop ups

  $: addCustomerPopup = false;

  let fields = {
    email: "",
    firstName: "",
  };

  let arrLists = [];

  onMount(async () => {
    fetchData();
  });
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
    },
  };
  // fetch data
  $: fetchData = async () => {
    try {
      const res = await axios.post(
        "https://api.ipify.org/?format=json",
        {
          idToken: $accessStore,
        },
        config
      );
      result = res;
      console.log("sfsffs", result);

      // https://api.ipify.org/?format=json

      // https://sveltekit-auth-39155-default-rtdb.firebaseio.com/
      // console.log("reat", result);

      // const querySnapshots = await collection(db, "customers");
      // const colRef = collection(db, "customers");
      // const docsSnap = await getDocs(colRef);
      // console.log("customers", docsSnap);
    } catch (e) {
      console.log("error");
    }
  };
  //to add new customer
  const { form, errors, state, handleChange, handleSubmit, handleReset } =
    createForm({
      initialValues: fields,
      validationSchema: customerSchema,
      onSubmit: async (values) => {
        try {
          // Add a new document with a generated id
          console.log("auth", db);

          // later...
          console.log(values);
        } catch (e) {
          toast.error("error");
          console.log("error", e.response.data.error.message);
        }
      },
    });

  const addCustomer = async () => {
    addCustomerPopup = true;
    console.log(addCustomerPopup);
  };

  // close popUp from dispacth
  let closePopup = (event: any) => {
    addCustomerPopup = false;
  };
</script>

<main>
  <div class="bg-gray-800 rounded-lg">
    <div class=" max-w-full">
      <div class="bg-gray-800 rounded-lg py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex justify-between w-full p-5">
            <div class="sm:flex">
              <h1 class="text-base font-semibold leading-6 text-white">
                Customers
              </h1>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                on:click={addCustomer}
                type="button"
                class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >Add customer</button
              >
            </div>
          </div>
          <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block w-full py-2 align-middle sm:px-6 lg:px-5"
              >
                <table class="w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >Name</th
                      >
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >Title</th
                      >
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >Email</th
                      >
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >Role</th
                      >
                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    <tr>
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                        >Lindsay Walton</td
                      >
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                        >Front-end Developer</td
                      >
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                        >lindsay.walton@example.com</td
                      >
                      <td
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                        >Member</td
                      >
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                      >
                        <a
                          href="#"
                          class="text-indigo-400 hover:text-indigo-300"
                          >Edit<span class="sr-only">, Lindsay Walton</span></a
                        >
                      </td>
                    </tr>

                    <!-- More people... -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {#if addCustomerPopup}
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
            <form on:submit={handleSubmit}>
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full"
                  >
                    <h3
                      class="text-base font-semibold leading-6 text-red-600"
                      id="modal-title"
                    >
                      Add Customer
                    </h3>

                    <div class="mt-2">
                      <div>
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Enter customer e-mail</label
                        >

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
                      <div class="mt-2">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >First Name</label
                        >
                        <div class="mt-2">
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            bind:value={$form.firstName}
                            on:change={handleChange}
                            on:blur={handleChange}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="firstName"
                          />
                          {#if $errors.firstName}
                            <small class="text-red-600"
                              >{$errors.firstName}</small
                            >
                          {/if}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  on:click={handleSubmit}
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >Add Me</button
                >
                <button
                  on:click={closePopup}
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >Cancel</button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

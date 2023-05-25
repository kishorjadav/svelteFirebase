<script lang="ts">
  import { db } from "../../lib/firebase/firebase.client";
  import {
    collection,
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    getDocs,
    deleteDoc,
    deleteField,
    updateDoc,
  } from "firebase/firestore";

  import { getDatabase, ref, set, onValue } from "firebase/database";
  import { authUserStore } from "../../store";

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
  import Select from "svelte-select";
  import CountyCode from "./countryCode.json";
  import SveltyPicker from "svelty-picker";
  import Tags from "../../lib/components/forms/tags.svelte";

  // import DatePicker from "../../lib/components/UI/DatePicker.svelte";

  import axios from "axios";

  import { accessStore } from "../../cookies/cookieStore";

  import ColorPicker from "svelte-awesome-color-picker";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

  const toast = useToast();
  const fetch = useAxios();
  // let cors = require("cors");

  let result: any;
  let users: any = [];
  // pop ups

  $: addCustomerPopup = false;
  $: editCustomerPopup = false;

  let fields = {
    email: "",
    firstName: "",
    color: "",
    photo: "",
    pdf: "",
    country_code: "+65",
    country_code_label: "",
    phone: "",
    sdate: "",
    edate: "",
    tags: [],
  };
  let collectionss = CountyCode;

  let hex; // or hsv or hex

  let arrLists = [];

  let files = {
    accepted: [],
    rejected: [],
  };

  let pdffiles = {
    accepted: [],
    rejected: [],
  };

  let temp = "";
  let selectedImage = null;
  let selectedPdf = null;
  let value;
  let getAllCustomers = [];

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
      const docRef = doc(
        db,
        "customerCollection",
        $authUserStore.currentUser[0]
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        getAllCustomers = docSnap.data().customers;
        console.log("Document datassss:", getAllCustomers);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      // const res = await axios.post(
      //   "https://api.ipify.org/?format=json",
      //   {
      //     idToken: $accessStore,
      //   },
      //   config
      // );

      // result = res;
      // console.log("sfsffs", result);
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

  const addCustomer = async () => {
    addCustomerPopup = true;
    console.log(addCustomerPopup);
  };

  // close popUp from dispacth
  let closePopup = (event: any) => {
    addCustomerPopup = false;
    editCustomerPopup = false;
  };

  // Image picker with size calculator
  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    if (files.accepted && files.accepted[0].size > 2000000) {
      console.log("failed", files.accepted[0].size);
      handleRemoveAll();
      toast.error("image size should be less than 2MB");
    } else {
      console.log("success", e);
      e.preventDefault();
      const imgfile = e.detail.acceptedFiles[0];
      const reader = new FileReader();
      console.log("path", imgfile);

      reader.onload = () => {
        selectedImage = reader.result;
      };

      if (imgfile) {
        reader.readAsDataURL(imgfile);
      }
    }

    // const file = e.target.files[0];
    console.log(e);

    const reader = new FileReader();

    reader.onload = () => {
      selectedImage = files.accepted[0].path;
    };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    console.log("files.accepted ", files.accepted);
  }
  console.log("files.accepted ", files.accepted);

  // Checking for file size
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  $: bytesCkeck = (el: any) => {
    if (el.innerHTML.length) {
      let x = el.innerHTML;
      let l = 0,
        n = parseInt(x, 10) || 0;

      while (n >= 1024 && ++l) {
        n = n / 1024;
      }
      el.innerHTML = n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
    }
  };

  function handleDragOver(event) {
    event.preventDefault();
  }

  // dropzone allow to remove the uploaded file
  function handleRemoveAll() {
    if ($form.photo) $form.photo = "";
    files.accepted = [];
  }
  function handleRemovePdf() {
    console.log("remoiv");

    if ($form.pdf) $form.pdf = "";
    pdffiles.accepted = [];
  }

  // pdf uploader

  function handlePdfFiles(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    pdffiles.accepted = [...files.accepted, ...acceptedFiles];
    pdffiles.rejected = [...files.rejected, ...fileRejections];
    selectedPdf = pdffiles.accepted[0].path;
    // console.log("pdffiles.accepted", pdffiles.accepted[0].path);
    if (pdffiles.accepted && pdffiles.accepted[0].size > 2000000) {
      handleRemoveAll();
      toast.error("pdf size should be less than 2MB");
    }
  }

  //to add new customer
  const { form, errors, state, handleChange, handleSubmit, handleReset } =
    createForm({
      initialValues: fields,
      validationSchema: customerSchema,
      //customerSchema
      onSubmit: async (values) => {
        try {
          // Add a new document with a generated id
          // Add a new document with a generated id
          console.log("testß", values, $authUserStore.currentUser[0]);

          await setDoc(
            doc(db, "customerCollection", $authUserStore.currentUser[0]),
            {
              customers: [
                {
                  email: values.email,
                  firstName: values.firstName,
                  color: hex,
                  photo: selectedImage,
                  pdf: selectedPdf,
                  country_code: values.country_code,
                  phone: values.phone,
                  sdate: values.sdate,
                  edate: values.edate,
                  userId: $authUserStore.currentUser[0],
                  custId: Math.floor(Math.random() * 100 + 1),
                },
              ],
              // tags: ["sellping", "eating"],
            }
          );
          addCustomerPopup = false;
          editCustomerPopup = false;
          fetchData();
          toast.error("Successfully Added");
        } catch (e) {
          toast.error("Error");

          // console.log("auth", values);
          // toast.error("error");
          // console.log("error", e.response.data.error.message);
        }
      },
    });

  const deleteCustomer = async (custId) => {
    try {
      console.log("delete", custId);

      const custRef = doc(
        db,
        "customerCollection",
        $authUserStore.currentUser[0]
      );

      // Remove the 'capital' field from the document
      await updateDoc(custRef, {
        customers: deleteField(custId),
      });

      fetchData();
      toast.error("Successfully deleted");
    } catch {
      toast.error("Error");
    }
  };

  const editCustomer = async (custId) => {
    try {
      console.log("edit", custId, getAllCustomers[0].custId);

      editCustomerPopup = true;
      fields.email = getAllCustomers[0].email;
      fields.firstName = getAllCustomers[0].firstName;
      fields.color = getAllCustomers[0].color;
      fields.photo = getAllCustomers[0].photo;
      fields.pdf = getAllCustomers[0].pdf;
      fields.country_code = getAllCustomers[0].country_code;
      fields.country_code_label = getAllCustomers[0].country_code_label;
      fields.phone = getAllCustomers[0].phone;
      fields.sdate = getAllCustomers[0].sdate;
      fields.edate = getAllCustomers[0].edate;
    } catch {
      toast.error("Error");
    }
  };

  const handleEditSubmit = async (custId) => {
    try {
      console.log("edit", custId, getAllCustomers[0].custId);
      const updateRef = doc(db, "customerCollection", getAllCustomers[0]);

      // Set the "capital" field of the city 'DC'
      console.log("ugyhgh", updateRef);

      await updateDoc(updateRef, {
        email: fields.email,
      });
    } catch {
      toast.error("Error");
    }
  };
</script>

<main>
  <div class="bg-gray-100 rounded-lg">
    <div class=" max-w-full">
      <div class="bg-gray-100 rounded-lg py-10 border border-gray-800">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex justify-between w-full p-5">
            <div class="sm:flex">
              <h1 class="text-base font-semibold leading-6 text-gray-800">
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
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-800 sm:pl-0"
                        >Name</th
                      >

                      <th
                        scope="col"
                        class="px-0 py-3.5 text-left text-sm font-semibold text-gray-800"
                        >Email</th
                      >
                      <th
                        scope="col"
                        class="px-0 py-3.5 text-left text-sm font-semibold text-gray-800"
                        >Phone</th
                      >
                      <th
                        scope="col"
                        class="px-0 py-3.5 text-left text-sm font-semibold text-gray-800"
                        >color</th
                      >
                      <th
                        scope="col"
                        class="px-0 py-3.5 text-left text-sm font-semibold text-gray-800"
                        >Start Date</th
                      >
                      <th
                        scope="col"
                        class="px-0 py-3.5 text-left text-sm font-semibold text-gray-800"
                        >End Date</th
                      >
                      <!-- <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-800"
                        >Pdf</th
                      > -->
                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-800">
                    {#if getAllCustomers}
                      {#each Object.entries(getAllCustomers) as [key, users]}
                        <tr>
                          <td>
                            {users.firstName}
                          </td>
                          <td>
                            {users.email}
                          </td>
                          <td>
                            {users.country_code}
                            {users.phone}
                          </td>
                          <td>
                            {users.color}
                          </td>
                          <td>
                            {users.sdate}
                          </td>
                          <td>
                            {users.edate}
                          </td>

                          <td>
                            <div class="" on:click={editCustomer(users.custId)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 text-indigo-500"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </div>
                          </td>

                          <td>
                            <div
                              class=""
                              on:click={deleteCustomer(users.custId)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 text-red-500"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </td>
                        </tr>
                      {/each}
                    {/if}
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
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Profile Image</label
                      >
                      {#if files.accepted.length === 0}
                        <Dropzone
                          on:drop={handleFilesSelect}
                          on:dragover={handleDragOver}
                          accept="image/png,image/jpg,image/jpeg"
                          bind:input={temp.file}
                        />
                      {:else}
                        <div class="dropzone">
                          <div class="flex flex-col justify-center my-2 w-full">
                            <div
                              class="flex w-full items-center justify-between space-x-2"
                            >
                              <div
                                class="flex flex-col w-full space-y-1 justify-center"
                              >
                                <img
                                  src={selectedImage}
                                  class="lg:w-[81px] rounded-full object-cover lg:h-[81px] w-[64px] h-[64px]"
                                  alt=""
                                />
                              </div>
                              <button
                                class="text-red-700 no-underline button-strip"
                                on:click={handleRemoveAll}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      {/if}
                      <ol class="text-indigo-500 text-sm">
                        {#if files.accepted[0]}
                          <div class="flex m-1 w-full text-xs text-gray-400">
                            <ol>
                              <li>File Name: {files.accepted[0].name}</li>
                              <li>
                                File Size: (<span
                                  class="inline-block"
                                  use:bytesCkeck>{files.accepted[0].size}</span
                                >)
                              </li>
                              <li>File Type: {files.accepted[0].type}</li>
                            </ol>
                          </div>
                          <!-- {#each files.accepted as item}
                              <li>name:{item.name}</li>
                              <li>size:{item.size.toFixed(2) / 1024}</li>
                              <li>type:{item.type}</li>
                            {/each} -->
                        {/if}
                      </ol>
                    </div>

                    <div class="mt-2">
                      <div>
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Enter customer e-mail</label
                        >

                        <div class="relative mt-2 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute mt-2 left-0 flex items-center pl-3"
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

                      <div class="mt-2">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Choose your favourite color</label
                        >
                        <ColorPicker bind:hex label="" />{hex}
                      </div>

                      <div class="mt-2">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900 mb-4"
                          >Hobbies</label
                        >
                        <Tags id="lang" value={["ES", "RU"]}>
                          <option value="cooking">Cooking</option>
                          <option value="reading">Reading</option>
                          <option value="sleeping">Sleeping</option>
                          <option value="watching">Watching Tv</option>
                        </Tags>
                      </div>

                      <div class="flex justify-between">
                        <div class="mt-4 w-full mx-1">
                          <label for="mobile" class="label">
                            Start Date <span class="text-orange-pmk">*</span>
                          </label><br />
                          <SveltyPicker
                            inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            format="dd-mm-yyyy"
                            bind:value={$form.sdate}
                            name="sdate"
                          />
                          {#if $errors.sdate}
                            <small class="text-red-600">{$errors.sdate}</small>
                          {/if}
                        </div>
                        <div class="mt-4 w-full mx-1">
                          <label for="mobile" class="label">
                            End Date <span class="text-orange-pmk">*</span>
                          </label><br />
                          <SveltyPicker
                            inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            format="dd-mm-yyyy"
                            bind:value={$form.edate}
                            name="edate"
                          />
                          {#if $errors.edate}
                            <small class="text-red-600">{$errors.edate}</small>
                          {/if}
                        </div>
                      </div>

                      <section class="mt-2">
                        <label for="mobile" class="label">
                          Mobile Number <span class="text-orange-pmk">*</span>
                        </label><br />
                        <div class="flex gap-2">
                          <div class="w-40">
                            <Select
                              class="country-code"
                              items={collectionss}
                              value={$form.country_code}
                              on:change={(e) => {
                                $form.country_code = e.detail.value;
                                $form.country_code_label = e.detail.iso;
                              }}
                            />
                          </div>
                          <div class="w-full">
                            <input
                              type="text"
                              class={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                              placeholder="Enter your number"
                              name="phone"
                              id="phone"
                              bind:value={$form.phone}
                              on:change={handleChange}
                              on:blur={handleChange}
                            />
                            {#if $errors.phone}
                              <small class="text-red-600">{$errors.phone}</small
                              >
                            {/if}
                          </div>
                        </div>
                      </section>

                      <!-- pdf upload -->
                      <div class="mt-2">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Resume Upload (only pdf)</label
                        >
                        {#if pdffiles.accepted.length === 0}
                          <Dropzone
                            on:drop={handlePdfFiles}
                            accept="application/pdf"
                          />
                        {:else}
                          <ol>
                            {#each pdffiles.accepted as items}
                              <li class="flex justify-between">
                                <div class="text-sm text-indigo-600">
                                  {items.name}
                                </div>
                                <div class="">
                                  <button
                                    class="text-red-700 no-underline button-strip"
                                    on:click={handleRemovePdf}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </li>
                            {/each}
                          </ol>
                        {/if}
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

  {#if editCustomerPopup}
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
                      Update Customer
                    </h3>

                    <div class="mt-2">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Profile Image</label
                      >
                      {#if files.accepted.length === 0}
                        <Dropzone
                          on:drop={handleFilesSelect}
                          on:dragover={handleDragOver}
                          accept="image/png,image/jpg,image/jpeg"
                          bind:input={temp.file}
                        />
                      {:else}
                        <div class="dropzone">
                          <div class="flex flex-col justify-center my-2 w-full">
                            <div
                              class="flex w-full items-center justify-between space-x-2"
                            >
                              <div
                                class="flex flex-col w-full space-y-1 justify-center"
                              >
                                <img
                                  src={selectedImage}
                                  class="lg:w-[81px] rounded-full object-cover lg:h-[81px] w-[64px] h-[64px]"
                                  alt=""
                                />
                              </div>
                              <button
                                class="text-red-700 no-underline button-strip"
                                on:click={handleRemoveAll}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      {/if}
                      <ol class="text-indigo-500 text-sm">
                        {#if files.accepted[0]}
                          <div class="flex m-1 w-full text-xs text-gray-400">
                            <ol>
                              <li>File Name: {files.accepted[0].name}</li>
                              <li>
                                File Size: (<span
                                  class="inline-block"
                                  use:bytesCkeck>{files.accepted[0].size}</span
                                >)
                              </li>
                              <li>File Type: {files.accepted[0].type}</li>
                            </ol>
                          </div>
                          <!-- {#each files.accepted as item}
                              <li>name:{item.name}</li>
                              <li>size:{item.size.toFixed(2) / 1024}</li>
                              <li>type:{item.type}</li>
                            {/each} -->
                        {/if}
                      </ol>
                    </div>

                    <div class="mt-2">
                      <div>
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Enter customer e-mail</label
                        >

                        <div class="relative mt-2 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute mt-2 left-0 flex items-center pl-3"
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
                            bind:value={fields.email}
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
                            bind:value={fields.firstName}
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

                      <div class="mt-2">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Choose your favourite color</label
                        >
                        <ColorPicker bind:value={hex} label="" />{hex}
                      </div>

                      <div class="mt-2">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900 mb-4"
                          >Hobbies</label
                        >
                        <Tags id="lang" value={["ES", "RU"]}>
                          <option value="cooking">Cooking</option>
                          <option value="reading">Reading</option>
                          <option value="sleeping">Sleeping</option>
                          <option value="watching">Watching Tv</option>
                        </Tags>
                      </div>

                      <div class="flex justify-between">
                        <div class="mt-4 w-full mx-1">
                          <label for="mobile" class="label">
                            Start Date <span class="text-orange-pmk">*</span>
                          </label><br />
                          <SveltyPicker
                            inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            format="dd-mm-yyyy"
                            bind:value={fields.sdate}
                            name="sdate"
                          />
                          {#if $errors.sdate}
                            <small class="text-red-600">{$errors.sdate}</small>
                          {/if}
                        </div>
                        <div class="mt-4 w-full mx-1">
                          <label for="mobile" class="label">
                            End Date <span class="text-orange-pmk">*</span>
                          </label><br />
                          <SveltyPicker
                            inputClasses="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            format="dd-mm-yyyy"
                            bind:value={fields.edate}
                            name="edate"
                          />
                          {#if $errors.edate}
                            <small class="text-red-600">{$errors.edate}</small>
                          {/if}
                        </div>
                      </div>

                      <section class="mt-2">
                        <label for="mobile" class="label">
                          Mobile Number <span class="text-orange-pmk">*</span>
                        </label><br />
                        <div class="flex gap-2">
                          <div class="w-40">
                            <Select
                              class="country-code"
                              items={collectionss}
                              value={fields.country_code}
                              on:change={(e) => {
                                $form.country_code = e.detail.value;
                                $form.country_code_label = e.detail.iso;
                              }}
                            />
                          </div>
                          <div class="w-full">
                            <input
                              type="text"
                              class={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                              placeholder="Enter your number"
                              name="phone"
                              id="phone"
                              bind:value={fields.phone}
                              on:change={handleChange}
                              on:blur={handleChange}
                            />
                            {#if $errors.phone}
                              <small class="text-red-600">{$errors.phone}</small
                              >
                            {/if}
                          </div>
                        </div>
                      </section>

                      <!-- pdf upload -->
                      <div class="mt-2">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Resume Upload (only pdf)</label
                        >
                        {#if pdffiles.accepted.length === 0}
                          <Dropzone
                            on:drop={handlePdfFiles}
                            accept="application/pdf"
                          />
                        {:else}
                          <ol>
                            {#each pdffiles.accepted as items}
                              <li class="flex justify-between">
                                <div class="text-sm text-indigo-600">
                                  {items.name}
                                </div>
                                <div class="">
                                  <button
                                    class="text-red-700 no-underline button-strip"
                                    on:click={handleRemovePdf}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </li>
                            {/each}
                          </ol>
                        {/if}
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
                  >Update Me</button
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

<style>
  :global(.label.svelte-2ybi8r) {
    /* display: flex !important; */
    align-items: start !important;
    gap: 0px !important;
    cursor: pointer !important;
    border-radius: 3px !important;
    /* margin: 4px !important; */
  }

  :global(.container.svelte-2ybi8r) {
    position: relative !important;
    display: block !important;
    display: flex !important;
    align-items: start !important;
    /* justify-content: center; */
  }
</style>

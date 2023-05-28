<script lang="ts">
  import { db, storage } from "../../../lib/firebase/firebase.client";
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
    addDoc,
    arrayUnion,
  } from "firebase/firestore";

  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

  import { authUserStore } from "../../../store";

  import { onMount } from "svelte";

  import { useToast } from "../../../lib/toastify/toastify";
  import { useAxios } from "../../../services/useAxios";
  import { createForm } from "svelte-forms-lib";
  import { customerSchema } from "../../../schemas/customValidation";
  import Select from "svelte-select";
  import CountyCode from "../countryCode.json";
  import SveltyPicker from "svelty-picker";
  import Tags from "../../../lib/components/forms/tags.svelte";

  // import DatePicker from "../../lib/components/UI/DatePicker.svelte";

  import axios from "axios";

  import { accessStore } from "../../../cookies/cookieStore";

  import ColorPicker from "svelte-awesome-color-picker";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { set } from "firebase/database";
  import { goto } from "$app/navigation";

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
    lastName: "",
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
  let imgurl;
  let pdfurl;

  let temp = "";
  let selectedImage = null;
  let selectedPdf = null;
  let value;
  let getAllCustomers = [];

  onMount(async () => {
    fetchData();
  });

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
      imgurl = imgfile;
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
  }

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
    pdfurl = pdffiles.accepted[0];
    console.log("pdffiles.accepted", pdffiles.accepted[0]);
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

          //   await setDoc(
          //     doc(db, "customerCollection", $authUserStore.currentUser[0]),
          //     {
          //       customers: [
          //         {
          //           email: values.email,
          //           firstName: values.firstName,
          //           color: hex,
          //           photo: selectedImage,
          //           pdf: selectedPdf,
          //           country_code: values.country_code,
          //           phone: values.phone,
          //           sdate: values.sdate,
          //           edate: values.edate,
          //           userId: $authUserStore.currentUser[0],
          //           custId: Math.floor(Math.random() * 100 + 1),
          //         },
          //         { merge: true },
          //       ],
          //       // tags: ["sellping", "eating"],
          //     }
          //   );

          const storage = getStorage();
          const imgRef = ref(storage, $authUserStore.currentUser[0]);
          const pdfRef = ref(storage, $authUserStore.currentUser[0] + "pdf");

          // 'file' comes from the Blob or File API
          let files = uploadBytes(imgRef, imgurl).then((snapshot) => {
            console.log("Uploaded a blob or file!", imgurl, snapshot, imgRef);
          });
          let pdffiles = uploadBytes(pdfRef, pdfurl).then((snapshot) => {
            console.log("Uploaded a blob or file!", pdfurl, snapshot, imgRef);
          });
          // Upload completed successfully, now we can get the download URL
          //   getDownloadURL(files).then((downloadURL) => {
          //     console.log("File available at", downloadURL);
          //   });

          await updateDoc(
            doc(db, "customerCollection", $authUserStore.currentUser[0]),
            {
              customers: [
                {
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  color: hex,
                  photo: `https://firebasestorage.googleapis.com/v0/b/sveltekit-auth-39155.appspot.com/o/${$authUserStore.currentUser[0]}?alt=media&token=bb73397c-94d6-49c1-a862-6c6ea9fa204d`,
                  pdf: `https://firebasestorage.googleapis.com/v0/b/sveltekit-auth-39155.appspot.com/o/${$authUserStore.currentUser[0]}pdf?alt=media&token=2b0de916-1f28-4d1f-9a83-4dec6701f58f`,
                  country_code: values.country_code,
                  phone: values.phone,
                  sdate: values.sdate,
                  edate: values.edate,
                  userId: $authUserStore.currentUser[0],
                  custId: Math.floor(Math.random() * 100 + 1),
                },
              ],
            }
          );
          goto("/customer");
          addCustomerPopup = false;
          editCustomerPopup = false;
          fetchData();
          toast.error("Successfully Added");
        } catch (e) {
          toast.error("Error");
        }
      },
    });
</script>

<main>
  <div class="space-y-10 divide-y divide-gray-900/10 p-10 mb-20">
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div class="px-4 sm:px-0">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Update Customer
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          This information will not be displayed publicy.
        </p>
      </div>

      <form
        on:submit={handleSubmit}
        class="bg-white shadow-sm border border-gray-200 ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div class="px-4 py-6 sm:p-8">
          <div
            class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div class="sm:col-span-3">
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
                  <small class="text-red-600">{$errors.firstName}</small>
                {/if}
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Last Name</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  bind:value={$form.lastName}
                  on:change={handleChange}
                  on:blur={handleChange}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="firstName"
                />
                {#if $errors.lastName}
                  <small class="text-red-600">{$errors.lastName}</small>
                {/if}
              </div>
            </div>

            <div class="sm:col-span-6">
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

            <div class="mt-2 sm:col-span-6">
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
                        File Size: (<span class="inline-block" use:bytesCkeck
                          >{files.accepted[0].size}</span
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

            <div class="mt-2 sm:col-span-6">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Choose your favourite color</label
              >
              <ColorPicker bind:hex label="" />{hex}
            </div>

            <div class="mt-2 sm:col-span-6">
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

            <div class=" w-full mx-1 sm:col-span-3">
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

            <div class=" w-full mx-1 sm:col-span-3">
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

            <section class=" sm:col-span-6">
              <label for="mobile" class="label">
                Mobile Number <span class="text-orange-pmk">*</span>
              </label><br />
              <div class="flex gap-2">
                <div class="w-60">
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
                    class={`block w-full rounded-md border-0 h-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    placeholder="Enter your number"
                    name="phone"
                    id="phone"
                    bind:value={$form.phone}
                    on:change={handleChange}
                    on:blur={handleChange}
                  />
                  {#if $errors.phone}
                    <small class="text-red-600">{$errors.phone}</small>
                  {/if}
                </div>
              </div>
            </section>

            <!-- pdf upload -->
            <div class="sm:col-span-6">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Resume Upload (only pdf)</label
              >
              {#if pdffiles.accepted.length === 0}
                <Dropzone on:drop={handlePdfFiles} accept="application/pdf" />
              {:else}
                <ol>
                  {#if pdffiles.accepted[1].path || pdffiles.accepted[0].path}
                    {pdffiles.accepted[1].path}
                  {/if}
                  <!-- {#each pdffiles.accepted as itemss}
                    <li class="flex justify-between">
                      <div class="text-sm text-indigo-600">
                        {itemss.name}
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
                  {/each} -->
                </ol>
              {/if}
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
        >
          <button
            on:click={closePopup}
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900">Cancel</button
          >
          <button
            type="submit"
            on:click={handleSubmit}
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Update</button
          >
        </div>
      </form>
    </div>
  </div>
</main>

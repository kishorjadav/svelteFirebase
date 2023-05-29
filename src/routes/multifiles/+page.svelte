<script lang="ts">
  import { onMount } from "svelte";
  import { authUserStore } from "../../store";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { useToast } from "../../lib/toastify/toastify";
  import axios from "axios";

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

  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { reload } from "firebase/auth";
  import { goto } from "$app/navigation";

  const toast = useToast();

  let files = {
    accepted: [],
    rejected: [],
  };

  let listOfFiles;
  let urlAll = [];

  onMount(async () => {
    fetchData();
  });

  // fetch data
  $: fetchData = async () => {
    try {
      if ($authUserStore) {
        const allstorage = getStorage();
        const storageRef = ref(allstorage, $authUserStore.currentUser[0]);
        listOfFiles = await list(storageRef, { maxResults: 100 });
        listOfFiles = listOfFiles.items;

        console.log("gett all from firebae", listOfFiles, listOfFiles);

        // const res = await axios.get(
        //   "https://firebasestorage.googleapis.com/v0/b/sveltekit-auth-39155.appspot.com/o/zjmhcavTFfRUCQ3KbMmSGmUjf4k1"
        // );
        // url = res.data;
        // result = res.data.users;
        // console.log("geeeeeet from api imagesss", url);

        //

        // Find all the prefixes and items.
        listAll(storageRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
            });
            res.items.forEach((itemRef) => {
              // All the items under listRef.
              getDownloadURL(itemRef).then((url) => {
                urlAll.push(url);
                urlAll = [...urlAll];
                console.log("urllllll", urlAll);
              });
            });
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      }
    } catch (e) {
      console.log("error");
    }
  };

  $: handledeleteClick = async (e) => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, `$authUserStore.currentUser[0]/1pro.jpeg`);
    console.log("deleted", storage);
  };

  function displayImage(imageRef) {
    imageRef
      .getDownloadURL()
      .then(function (url) {
        // TODO: Display the image on the UI
        console.log("urllll", url);
      })
      .catch(function (error) {
        // Handle any errors
      });
  }

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    console.log("file selected", files.accepted);
  }

  const handleSubmit = async (e) => {
    files.accepted = e;
    console.log("sub", files.accepted);
    try {
      // Add a new document with a generated id
      // Add a new document with a generated id
      files.accepted = e;
      console.log("sub", files.accepted, e.length);
      //Get files
      for (let i = 0; i < e.length; i++) {
        let imageFile = e[i];
        console.log("loop fiel", imageFile);

        uploadImageAsPromise(imageFile);
      }
      goto("/myprofile");
      toast.error("Successfully Added");
    } catch (e) {
      toast.error("Error");
    }
  };

  //Handle waiting to upload each file using promise
  function uploadImageAsPromise(imageFile) {
    return new Promise(function (resolve, reject) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        $authUserStore.currentUser[0] + "/" + imageFile.name
      );
      // 'file' comes from the Blob or File API

      console.log("imageFileimageFile", imageFile);

      let files = uploadBytes(storageRef, imageFile).then((snapshot) => {
        console.log(
          "Uploaded a blob or file!",
          imageFile,
          snapshot,
          storageRef
        );
        fetchData();
      });
    });
  }
</script>

<div class="div w-1/2 m-5">
  <Dropzone on:drop={handleFilesSelect} />
  <ol>
    {#each files.accepted as item}
      <li>{item.name}</li>
    {/each}
  </ol>
  <button
    type="button"
    on:click={handleSubmit(files.accepted)}
    class="inline-flex w-full my-5 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
    >Add Me</button
  >
</div>

<!-- <a href={urlAll}>pdf</a> -->
{#if urlAll}
  <div class="flex justify-between w-full">
    {#each urlAll as urllll, i}
      <div class="flex my-24">
        <img
          class="rounded-full w-24 h-24 border border-black"
          src=" {urllll}"
        />
        <!-- <span on:click={() => handledeleteClick(i)}>
          {i}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </span> -->
      </div>
    {/each}
  </div>

  <!-- {#each Object.entries(urlAll) as [key, value]}
    {value}
  {/each} -->
{/if}

<!-- {#if urlAll}
  {#each urlAll as items}
    {items}
    <img src={items} />
    {items}
    <a
      href="https://firebasestorage.googleapis.com/v0/b/sveltekit-auth-39155.appspot.com/o/zjmhcavTFfRUCQ3KbMmSGmUjf4k1%2F1pro.jpeg?alt=media&token=58309c87-9d67-42c8-ad97-c938d9c5c89b"
      >pdf</a
    ><br />
  {/each}
{/if} -->

<!-- 
refrence urll
https://firebasestorage.googleapis.com/v0/b/[projectID].appspot.com/o/[folderName]%2F[fileName]


Working urllll
https://firebasestorage.googleapis.com/v0/b/sveltekit-auth-39155.appspot.com/o/zjmhcavTFfRUCQ3KbMmSGmUjf4k1%2F1pro.jpeg?alt=media&token=58309c87-9d67-42c8-ad97-c938d9c5c89b -->

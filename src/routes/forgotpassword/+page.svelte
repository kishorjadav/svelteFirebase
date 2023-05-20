<script>
  //pacakage
  import { onMount } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import { goto } from "$app/navigation";
  import { useAxios } from "../../services/useAxios";
  import { forgotSchema } from "../../schemas/customValidation";
  import { useToast } from "../../lib/toastify/toastify";

  import axios from "axios";

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const toast = useToast();
  const fetch = useAxios();

  //component
  let result;

  $: fields = {
    email: "",
  };

  const { form, errors, state, handleChange, handleSubmit, handleReset } =
    createForm({
      initialValues: fields,
      validationSchema: forgotSchema,
      onSubmit: async (values) => {
        try {
          const res = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDK0R6x-4ai29YULdMaXOL78DeJP5iPwtA",
            {
              clientType: "CLIENT_TYPE_WEB",
              email: values.email,
              requestType: "PASSWORD_RESET",
            }
          );

          result = res.data;
          console.log("res", result);

          if (res.status === 200) {
            toast.error("Reset Link Sent to Mail");
            // window.location.href = "/";
          }
          //goto("/");
        } catch (e) {
          toast.error(e.response.data.error.message);
          console.log("error", e.response.data.error.message);
          // window.location.href = "/signin";
        }
      },
    });
</script>

<div
  class="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-800 lg:px-8"
>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="w-auto h-10 mx-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
      alt="Your Company"
    />
    <h2
      class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-white"
    >
      Forgot Password
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form on:submit={handleSubmit}>
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-white"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            bind:value={$form.email}
            on:change={handleChange}
            on:blur={handleChange}
            placeholder="Email"
            autocomplete="email"
            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
          {#if $errors.email}
            <small class="text-red-600">{$errors.email}</small>
          {/if}
        </div>
      </div>

      <div class="mt-5">
        <button
          type="submit"
          on:click={handleSubmit}
          class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >Send
        </button>
      </div>
    </form>
    <div class="mt-10 text-sm text-center text-gray-400">
      Already have an account?
      <a
        href="/signin"
        class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
      >
        Log In
      </a>
    </div>
  </div>
</div>

<script lang="ts">
  import IconClose from "../icons/close.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let text: String,
    showPopUp: boolean,
    smallPop: boolean = false,
    success: boolean = false,
    successCloseHeader: boolean = false,
    successCloseHeaderWithText: boolean = false;

  export let successWidth: string,
    successHeight: string,
    successHeaderClass: string = "";

  export let popupWidth: string = "";
  let close = () => {
    dispatch("close", {
      showPopUp: false,
    });
  };

  $: console.log(showPopUp, "showPopUp");
</script>

{#if showPopUp && smallPop}
  <div class="relative z-50" role="dialog" aria-modal="true">
    <!-- opacity -->
    <div
      class="fixed inset-0 bg-black-pmk opacity-40 transition-opacity block"
    />

    <div
      class="fixed inset-0 z-10 rouned-[20px] overflow-hidden overflow-y-auto"
    >
      <div
        class="flex min-h-full justify-center text-center items-center px-2 lg:px-4"
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden md:inline-block md:h-screen md:align-middle"
          aria-hidden="true">&#8203;</span
        >

        <div
          class="flex flex-col w-full transform text-left text-base transition my-4 md:my-8 px-4 {popupWidth
            ? popupWidth
            : 'max-w-[456px]'}"
        >
          <div
            class="relative box rounded-[16px] md:rounded-[10px] flex flex-col w-full items-center bg-white shadow-2xl"
          >
            <!-- header -->
            {#if text}
              <div
                class={` z-10 bg-black-pmk h-[78px] p-[30px]   rounded-t-[16px] md:rounded-t-[10px] w-full items-center flex  justify-between`}
              >
                <h1
                  class="text-white text-[20px] lg:text-[24px] font-[500] capitalize"
                >
                  {text}
                </h1>

                <button on:click={() => close()}>
                  <IconClose
                    space={true}
                    width={30}
                    height={30}
                    className="text-white   "
                  />
                </button>
              </div>
            {/if}
            <div class=" w-full h-full">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if showPopUp && !smallPop && !success}
  <div class="relative z-50" role="dialog" aria-modal="true">
    <!-- opacity -->
    <div
      class="fixed inset-0 bg-black-pmk opacity-40 transition-opacity block"
    />

    <div
      class="fixed inset-0 z-10 rouned-[20px] overflow-hidden overflow-y-auto"
    >
      <div
        class="flex min-h-full justify-center text-center items-center px-2 lg:px-4"
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden md:inline-block md:h-screen md:align-middle"
          aria-hidden="true">&#8203;</span
        >

        <div
          class="flex flex-col w-full transform text-left text-base transition my-4 md:my-8 md:max-w-2xl px-4 lg:max-w-4xl"
        >
          <div
            class="relative box rounded-[16px] md:rounded-[10px] flex flex-col w-full items-center bg-white pb-1 shadow-2xl"
          >
            <!-- header -->
            <div
              class={` z-10 bg-black-pmk h-[74px] p-[40px]  lg:h-[96px]  rounded-t-[16px] md:rounded-t-[10px] w-full items-center flex  justify-between`}
            >
              <h1
                class="text-white text-[24px] lg:text-[26px] font-[500] capitalize"
              >
                {text}
              </h1>

              <button on:click={() => close()}>
                <IconClose
                  space={true}
                  width={40}
                  height={32}
                  className="text-white "
                />
              </button>
            </div>
            <div class=" w-full h-full">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if success && showPopUp}
  <div class="relative z-50" role="dialog" aria-modal="true">
    <!-- opacity -->
    <div
      class="fixed inset-0 bg-black-pmk opacity-40 transition-opacity block"
    />

    <div
      class="fixed inset-0 z-10 rouned-[20px] overflow-hidden overflow-y-auto"
    >
      <div
        class="flex min-h-full justify-center text-center items-center px-2 lg:px-4"
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden md:inline-block md:h-screen md:align-middle"
          aria-hidden="true">&#8203;</span
        >

        <div
          class={`flex flex-col w-full  transform text-left text-base transition  my-4 md:my-8  px-4  ${
            successWidth ? successWidth : "max-w-[400px] lg:max-w-[429px]"
          }  `}
        >
          <div
            class="relative box rounded-[16px] flex flex-col w-full items-center bg-white pb-1 shadow-2xl"
          >
            <div
              class={` w-full ${successHeight ? successHeight : "h-[300px]"} `}
            >
              {#if successCloseHeader}
                <div
                  class={` z-10 ${
                    successHeaderClass ? successHeaderClass : ""
                  } text-gray justify-end  px-[30px] pt-[30px] rounded-t-[16px] md:rounded-t-[10px] w-full items-center flex  `}
                >
                  <button on:click={() => close()}>
                    <IconClose
                      space={true}
                      width={30}
                      height={30}
                      className=""
                    />
                  </button>
                </div>
              {:else if successCloseHeaderWithText}
                <div
                  class={` z-10 ${
                    successHeaderClass ? successHeaderClass : " text-gray "
                  } justify-between  px-[30px] pt-[30px] rounded-t-[16px] md:rounded-t-[10px] w-full items-center flex  `}
                >
                  <h1 class="">{text}</h1>
                  <button on:click={() => close()}>
                    <IconClose
                      space={true}
                      width={30}
                      height={30}
                      className=""
                    />
                  </button>
                </div>
              {/if}
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* scroll  class*/

  /* width */
  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 20px;
    margin-top: 100px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #f1f1f1;
    border-radius: 20px;
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import { getCookie, removeCookie } from "../cookies/useCookies";
  import {
    AUTH_COOKIE_NAME,
    AUTH_REFRESH_COOKIE_NAME,
  } from "../cookies/cookieName";

  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  import { Bar, Line } from "svelte-chartjs";
  import ChartDataLabels from "chartjs-plugin-datalabels";
  import Pie from "../charts/Pie.svelte";
  import Linesss from "../charts/Liness.svelte";
  import Donut from "../charts/Donut.svelte";

  let accessToken: any;
  let refreshToken: any;

  $: chartValues = [46, 56, 34, 23];
  let chartLabels = ["TATA", "TOYOTA", "KIA", "FORD"];

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ChartDataLabels
  );
  // Charts

  $: data = {
    labels: chartLabels,
    datasets: [
      {
        categoryPercentage: 1,
        label: "",
        data: chartValues,
        backgroundColor: ["#38C976", "#2AB0FC", "#FCC132", "#FF8206"],
        borderRadius: 6,
        barPercentage: 0.16,
      },
    ],
  };

  $: options = {
    responsive: true,
    lineWidth: 2,
    maintainAspectRatio: true,

    plugins: {
      legend: false,
      datalabels: {
        color: "#6B7280",
        anchor: "end",
        align: "top",
        formatter: function (value: any) {
          if (Number(value)) {
            return `${value}`;
          } else if (Number(value) === 0) {
            return "";
          }
        },

        labels: {
          title: {
            font: {
              size: 13,
              weight: 500,
              family: "urbanist",
            },
          },
        },
      },
      tooltip: {
        enabled: true, // <-- this option disables tooltips
      },
    },
    scales: {
      x: {
        offset: true,
        border: {
          color: "#F3F4F6",
        },
        grid: {
          offset: false,
          tickColor: "#9CA3AF",
          display: true,
          drawOnChartArea: false,
          tickLength: 10,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 13.4,
            family: "urbanist",
          },
        },
      },
      y: {
        type: "linear",
        grace: "90%",
        border: {
          color: "#F3F4F6",
        },
        grid: {
          tickLength: 6,
          tickColor: "#9CA3AF",
          display: true,
          drawOnChartArea: false,
        },
        color: "#6B7280",
        font: {
          size: 13.4,
          family: "urbanist",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 13.4,
            family: "urbanist",
          },
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 0,
      },
    },
  };

  onMount(() => {
    checkForAccess();
  });

  let checkForAccess = async () => {
    accessToken = getCookie(AUTH_COOKIE_NAME);
    refreshToken = getCookie(AUTH_REFRESH_COOKIE_NAME);
    fetchData();
  };

  $: fetchData = async () => {
    try {
    } catch (e) {
      console.log("error");
    }
  };
</script>

<section class="mb-40">
  <div class="grid grid-cols-2">
    <div
      class="bg-gray-50 md:w-[90%] rounded-xl border p-4 mx-6 mt-10 md:mt-16 mb-0 md:mb-8"
    >
      <div class="text-2xl font-semibold pl-2 pt-2 text-[#3E3E3E]">Sales</div>
      <div class="w-full h-full"><Bar {data} id="myChart" {options} /></div>
    </div>

    <div
      class="bg-gray-50 md:w-[90%] rounded-xl border p-4 mx-6 mt-10 md:mt-16 mb-0 md:mb-8"
    >
      <div class="text-2xl font-semibold pl-2 pt-2 text-[#3E3E3E]">Sales</div>
      <div class="w-full h-full"><Linesss /></div>
    </div>

    <div
      class="bg-gray-50 md:w-[90%] rounded-xl border p-4 mx-6 mt-10 md:mt-16 mb-0 md:mb-8"
    >
      <div class="text-2xl font-semibold pl-2 pt-2 text-[#3E3E3E]">Sales</div>
      <div class="w-full h-full"><Pie /></div>
    </div>

    <div
      class="bg-gray-50 md:w-[90%] rounded-xl border p-4 mx-6 mt-10 md:mt-16 mb-0 md:mb-8"
    >
      <div class="text-2xl font-semibold pl-2 pt-2 text-[#3E3E3E]">Sales</div>
      <div class="w-full h-full"><Donut /></div>
    </div>
  </div>
</section>

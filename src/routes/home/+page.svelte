<script lang="ts">
  import { useAxios } from "../../services/useAxios";
  import { onMount } from "svelte";

  const fetch = useAxios();

  let data;
  // fecth data on load
  onMount(async () => {
    fetchData();
  });

  let fetchData = async () => {
    try {
      const res = await fetch.get(`/api-admin/getMyProfile`);
      data = res?.data;
      console.log(data, "<----data");
    } catch (e) {
      console.log("Something wrong when fetching admin lists");
    }
  };
</script>

<section>home screen</section>

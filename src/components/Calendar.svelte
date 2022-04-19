<script lang="ts">
  import { sub } from "date-fns";
  import SvelteHeatmap from "svelte-heatmap";

  import { walletConnected, commitments } from "$lib/stores.js";
</script>

<div
  class="px-6
   pb-8 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
  data-test="calendar"
>
  <SvelteHeatmap
    allowOverflow={true}
    cellGap={5}
    cellRadius={2}
    endDate={new Date()}
    colors={["#a1dab4", "#42b6c4", "#2c7fb9", "#263494"]}
    data={$commitments}
    emptyColor={"#ecedf0"}
    monthGap={20}
    startDate={sub(new Date(), { years: 1 })}
    view={"yearly"}
  />
</div>

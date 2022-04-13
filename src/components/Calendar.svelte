<script lang="ts">
  import { sub } from "date-fns";
  import SvelteHeatmap from "svelte-heatmap";

  import { walletConnected, commitments } from "$lib/stores.js";
</script>

<div
  class="px-6 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
  data-test="calendar"
>
  <SvelteHeatmap
    allowOverflow={true}
    cellGap={5}
    cellRadius={1}
    endDate={new Date()}
    colors={["#a1dab4", "#42b6c4", "#2c7fb9", "#263494"]}
    data={$commitments}
    dayLabelWidth={0}
    emptyColor={"#ecedf0"}
    monthGap={20}
    monthLabelHeight={0}
    startDate={$walletConnected && $commitments.length > 0
      ? sub($commitments[0].date, { days: 1 })
      : sub(new Date(), { days: 1 })}
    view={"monthly"}
  />
</div>

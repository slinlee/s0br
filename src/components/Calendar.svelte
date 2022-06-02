<script lang="ts">
  import { endOfMonth, startOfMonth, sub } from "date-fns";
  import SvelteHeatmap from "svelte-heatmap";

  import { walletConnected, commitments } from "$lib/stores.js";

  $: startDate =
    $walletConnected && $commitments.length > 0
      ? startOfMonth(sub($commitments[0].date, { days: 1 }))
      : startOfMonth(sub(new Date(), { days: 1 }));
  $: endDate =
    $walletConnected && $commitments.length > 0
      ? new Date()
      : endOfMonth(new Date());
</script>

<div
  class="px-6 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
  data-test="calendar"
>
  <SvelteHeatmap
    allowOverflow={false}
    cellGap={5}
    cellRadius={1}
    colors={["#b1baec", "#42b6c4", "#2c7fb9", "#263494"]}
    data={$commitments}
    dayLabelWidth={0}
    emptyColor={"#ecedf0"}
    monthGap={20}
    monthLabelHeight={0}
    {startDate}
    {endDate}
    view={"monthly"}
  />
</div>

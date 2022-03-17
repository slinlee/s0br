<script>
  import { add, sub, isBefore } from 'date-fns'
  import SvelteHeatmap from "svelte-heatmap";

  // Generate a random number
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate dummy data for a heatmap
  function generateFakeData() {
    const data = [];
    const now = new Date();
    let date = sub(now, { years: 1 });

    while (isBefore(date, now)) {
      data.push({
        date,
        value: rand(0, 1),
      });

      date = add(date, { days: 1 });
    }

    return data;
  }

  const fakeData = generateFakeData();
</script>

<div
  class="px-6 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
  data-test="calendar"
>
  <SvelteHeatmap
    allowOverflow={true}
    cellGap={5}
    cellRadius={1}
    colors={["#a1dab4", "#42b6c4", "#2c7fb9", "#263494"]}
    data={fakeData}
    dayLabelWidth={0}
    emptyColor={"#ecedf0"}
    endDate={new Date()}
    monthGap={20}
    monthLabelHeight={0}
    startDate={sub(new Date(), {weeks: 1})}
    view={"monthly"}
  />
</div>

<script>
  import moment from "moment";
  import SvelteHeatmap from "svelte-heatmap";

  // Generate a random number
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Generate dummy data for a heatmap
  function generateFakeData() {
    const data = [];
    const date = moment().subtract(1, "year");
    const now = moment();

    while (date.isBefore(now)) {
      data.push({
        date: date.toDate(),
        value: rand(0, 1),
      });

      date.add(1, "day");
    }

    return data;
  }

  const fakeData = generateFakeData();
</script>

<div
  class="mx-auto sm:w-96 sm:max-w-16 md:max-w-96 md:w-2/5"
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
    endDate={moment().toDate()}
    monthGap={20}
    monthLabelHeight={0}
    startDate={moment().subtract(1, "week").toDate()}
    view={"monthly"}
  />
</div>

<script lang="ts">
  import { toDate, add, sub, isBefore } from "date-fns";
  import SvelteHeatmap from "svelte-heatmap";

  import { BigNumber, ethers } from "ethers";
  import S0brGame from "../routes/contracts/S0brGame.sol/S0brGame.json";

  let cleanedData = [];

  async function getCommitments() {
    const gameAddress = "0xD4Cc23e2fBE876ef5122bA97a4e8840D92CA3a81";
    const gameContract = S0brGame;

    let data = [];

    if (typeof window?.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        gameAddress,
        gameContract.abi,
        signer
      );
      data = await contract.getCommitments(account);
      console.table(data); // debug
      data.forEach((item) => {
        console.log(item); // debug
        if (item !== 0) {
          cleanedData = [
            ...cleanedData,
            { date: toDate(item.toNumber() * 1000), value: 1 },
          ];
        }
      });
      console.table(cleanedData); // debug
    }
    return cleanedData;
  }

  // const data = getCommitments();

  // // Generate a random number
  // function rand(min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // Generate dummy data for a heatmap
  // function generateFakeData() {
  //   const data = [];
  //   const now = new Date();
  //   let date = sub(now, { years: 1 });

  //   while (isBefore(date, now)) {
  //     data.push({
  //       date,
  //       value: rand(0, 1),
  //     });

  //     date = add(date, { days: 1 });
  //   }

  //   return data;
  // }

  // const fakeData = generateFakeData();
  // console.table(fakeData); // debug
</script>

<div on:click={getCommitments}>load</div>

<div
  class="px-6 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
  data-test="calendar"
>
  <SvelteHeatmap
    allowOverflow={true}
    cellGap={5}
    cellRadius={1}
    colors={["#a1dab4", "#42b6c4", "#2c7fb9", "#263494"]}
    data={[]}
    dayLabelWidth={0}
    emptyColor={"#ecedf0"}
    monthGap={20}
    monthLabelHeight={0}
    startDate={sub(new Date(), { years: 1 })}
    view={"monthly"}
  />
</div>

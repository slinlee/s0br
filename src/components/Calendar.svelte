<script lang="ts">
  import { toDate, add, sub, isBefore } from "date-fns";
  import SvelteHeatmap from "svelte-heatmap";
  import { browser } from "$app/env";

  import { ethers } from "ethers";
  import S0brGame from "../routes/contracts/S0brGame.sol/S0brGame.json";

  let cleanedData = [];

  async function getCommitments() {
    const gameAddress = "0x28D4aAc8Dc916bAd9778313df9334334A7e04A6A";
    const gameContract = S0brGame;

    let data = [];

    if (browser && typeof window.ethereum !== "undefined") {
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
      data.forEach((item) => {
        cleanedData = [
          ...cleanedData,
          { date: toDate(item.toNumber() * 1000), value: 1 },
        ];
      });
    }
    return cleanedData;
  }

  if (browser) {
    getCommitments();
  }
</script>

<div
  class="px-6 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
  data-test="calendar"
>
  <SvelteHeatmap
    allowOverflow={false}
    cellGap={5}
    cellRadius={1}
    endDate={new Date()}
    colors={["#a1dab4", "#42b6c4", "#2c7fb9", "#263494"]}
    data={cleanedData}
    dayLabelWidth={0}
    emptyColor={"#ecedf0"}
    monthGap={20}
    monthLabelHeight={0}
    startDate={sub(new Date(), { months: 1 })}
    view={"monthly"}
  />
</div>

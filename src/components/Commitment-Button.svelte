<script lang="ts">
  import { ethers } from "ethers";
  import S0brGame from "../routes/contracts/S0brGame.sol/S0brGame.json";
  import { walletConnected, account, errorMsg } from "$lib/stores.js";

  async function commit() {
    const gameAddress = "0x28D4aAc8Dc916bAd9778313df9334334A7e04A6A";
    const gameContract = S0brGame;

    if ($walletConnected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        gameAddress,
        gameContract.abi,
        signer
      );
      errorMsg.set(null);
      await contract.faucet($account).catch((error) => {
        errorMsg.set(
          `There was an issue adding your commit: "${error?.data?.message}"`
        );
        console.log("Error adding commit: ", error.data.message);
      });
    }
  }
</script>

<button
  on:click={commit}
  data-test="commitment-btn"
  class="rounded
    shadow-lg
    hover:shadow-2xl
    transition
    duration-75
    bg-gray-300
    active:shadow
    text-gray-800
    font-bold
    py-2
    px-8
  "
>
  I am not drinking today
</button>

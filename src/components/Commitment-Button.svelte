<script lang="ts">
  import { ethers } from "ethers";
  import S0brGame from "../routes/contracts/S0brGame.sol/S0brGame.json";
  import { getData } from "$lib/s0br.js";
  import { walletConnected, account, errorMsg } from "$lib/stores.js";

  let submitting = false;
  let success = false;

  async function commit() {
    submitting = true;
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
      try {
        let tx = await contract.faucet($account);

        // Wait for it to be mined
        await tx.wait();
        success = true;
      } catch (error) {
        handleError(error);
      }
      submitting = false;
      getData();
    } else {
      // Wallet not connected. Try to connect
      getData();
    }
  }

  function handleError(error) {
    // TODO; reset button status

    errorMsg.set(
      `There was an issue adding your commit: "${error?.data?.message}"`
    );
    console.log("Error adding commit: ", error.data.message);
    submitting = false;
    success = false;
  }
</script>

<button
  on:click={commit}
  disabled={submitting}
  data-test="commitment-btn"
  class="
    rounded
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
    disabled:opacity-25"
>
  {#if success}✔️{/if}
  {#if submitting}💬{/if}
  {#if $walletConnected}I am not drinking today{:else}Connect MetaMask{/if}
</button>

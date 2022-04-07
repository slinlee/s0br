<script>
  import { ethers } from "ethers";
  import S0brGame from "../routes/contracts/S0brGame.sol/S0brGame.json";

  async function commit() {
    const gameAddress = "0xD4Cc23e2fBE876ef5122bA97a4e8840D92CA3a81";
    const gameContract = S0brGame;

    if (typeof window.ethereum !== "undefined") {
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
      const tx = await contract.faucet(account);
      console.log(tx); // debug
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

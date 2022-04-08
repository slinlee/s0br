<script>
  import Calendar from "../components/Calendar.svelte";
  import Footer from "../components/Footer.svelte";
  import Wallet from "../components/Wallet.svelte";
  import CommitmentButton from "../components/Commitment-Button.svelte";

  import S0brToken from "../routes/contracts/S0brToken.sol/S0brToken.json";
  import S0brGame from "../routes/contracts/S0brGame.sol/S0brGame.json";

  import { browser } from "$app/env";
  import { ethers } from "ethers";

  const gameAddress = "0x28D4aAc8Dc916bAd9778313df9334334A7e04A6A";
  const tokenAddress = "0x139159c21171aB09c46A027503aFD6b91E3A0851";
  let walletConnected = false;
  let account;
  let balance;
  let network;
  let commitments;

  // // Collect contracts here
  // const Token = S0brToken;
  // const Game = S0brGame; // TODO: needed?

  // detect if in the browser
  // detect if metamask is available
  async function setup() {
    if (browser && typeof window.ethereum !== "undefined") {
      // Set up the contracts
      [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        gameAddress,
        S0brGame.abi,
        signer
      );
      const tokenContract = new ethers.Contract(
        tokenAddress,
        S0brToken.abi,
        signer
      );
      walletConnected = true;

      // Get balance
      let bal = await tokenContract.balanceOf(account);
      balance = ethers.utils.formatEther(bal);

      // Get network
      let net = await provider.getNetwork();
      network = network.name;
    } else {
      // Show user 'Connect to Metamask'
    }
  }

  setup();
</script>

<head>
  <title>S0BR</title>
</head>
<div class="grid grid-cols-1 md:grid-cols-12">
  <Wallet tokenContract />
  <h1 class="col-span-12 text-3xl py-20 place-self-center">Welcome to S0BR</h1>

  <Calendar />

  <div class="place-self-center col-span-12">
    <CommitmentButton />
  </div>

  <Footer />
</div>

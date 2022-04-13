<script>
  import { browser } from "$app/env";
  import Calendar from "../components/Calendar.svelte";
  import Footer from "../components/Footer.svelte";
  import Wallet from "../components/Wallet.svelte";
  import CommitmentButton from "../components/Commitment-Button.svelte";

  import {
    balance,
    walletConnected,
    account,
    network,
    commitments,
  } from "$lib/stores.js";

  import { getData } from "$lib/s0br.js";

  if (browser && $walletConnected) {
    getData();
  }

  // account.subscribe(()=> {console.log("getting data - account changed");
  // getData();
  // })
  // network.subscribe(()=> {console.log("getting data - network changed");
  // getData();
  // })
</script>

<head>
  <title>S0BR</title>
</head>
<div class="grid grid-cols-1 md:grid-cols-12">
  <Wallet />
  <h1 class="col-span-12 text-3xl py-20 place-self-center">Welcome to S0BR</h1>

  <Calendar />

  <div class="place-self-center col-span-12">
    <CommitmentButton />
  </div>

  <Footer />
</div>

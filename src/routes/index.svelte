<script>
  import Calendar from "../components/Calendar.svelte";
  import Footer from "../components/Footer.svelte";
  import Wallet from "../components/Wallet.svelte";
  import CommitmentButton from "../components/Commitment-Button.svelte";
  import S0brToken from "../routes/contracts/S0brToken.sol/S0brToken.json";

  const Token = S0brToken;
</script>

<div class="grid grid-cols-1 md:grid-cols-12">
  <Wallet tokenContract={Token} />
  <h1 class="col-span-12 text-3xl py-20 place-self-center">Welcome to S0BR</h1>

  <Calendar />

  <div class="place-self-center col-span-12">
    <CommitmentButton />
  </div>

  <Footer />
</div>

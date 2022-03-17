<script>
  import Calendar from "../components/Calendar.svelte";
  import Footer from "../components/Footer.svelte";
  import Wallet from "../components/Wallet.svelte";
  import CommitmentButton from "../components/Commitment-Button.svelte";
</script>

<div class="grid grid-cols-1 md:grid-cols-12">

  <Wallet />
  <h1 class="col-span-12 text-3xl py-20 place-self-center">Welcome to S0BR</h1>

  <Calendar />

  <div class="place-self-center col-span-12">
    <CommitmentButton />
  </div>

  <Footer />

</div>

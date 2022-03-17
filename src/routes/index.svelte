<script>
  import Calendar from "../components/Calendar.svelte";
  import Wallet from "../components/Wallet.svelte";
  import CommitmentButton from "../components/Commitment-Button.svelte";
</script>

<div class="grid">

  <Wallet />
  <h1 class="text-3xl py-20 place-self-center">Welcome to S0BR</h1>

  <Calendar />

  <div class="place-self-center">
    <CommitmentButton />
  </div>
</div>

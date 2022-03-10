<script>
  import Calendar from "../components/Calendar.svelte";
  import Wallet from "../components/Wallet.svelte";
  import CommitmentButton from "../components/Commitment-Button.svelte";
</script>

<h1 class="text-center text-3xl p-20">Welcome to S0BR</h1>

<Wallet />
<Calendar />

<div class="flex justify-center">
  <CommitmentButton />
</div>

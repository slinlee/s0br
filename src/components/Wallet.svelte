<script>
  import { walletConnected } from "$lib/stores.js";
  import { getData } from "$lib/s0br.js";

  export let loading;

  function connectWallet() {
    getData();
  }
</script>

<div class="col-span-12 place-self-end p-8" data-test="wallet-info">
  {#if loading}
    Loading...
  {:else if !$walletConnected}
    <button class="button buttonMetaMask" on:click={connectWallet}>
      Connect MetaMask
    </button>
  {/if}
</div>

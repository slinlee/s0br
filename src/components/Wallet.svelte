<script>
  import { account, walletConnected, network, balance } from "$lib/stores.js";
  import { getData } from "$lib/s0br.js";
  import AddTokenButton from "./AddTokenButton.svelte";
  function connectWallet() {
    getData();
  }
</script>

<div class="col-span-12 place-self-end p-8" data-test="wallet-info">
  {#if $walletConnected}
    <div>
      Connected Account: {$account}
    </div>
    <div>Balance: {$balance}</div>
    <div>Network: {$network}</div>
    <AddTokenButton />
  {:else}
    <button class="button buttonMetaMask" on:click={connectWallet}>
      Connect MetaMask
    </button>
  {/if}
</div>

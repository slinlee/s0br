<script>
  import { network, walletConnected } from "$lib/stores.js";
  import { addToken } from "$lib/s0br.js";
</script>

<div
  class="px-6 py-8  md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
>
  <div class="py-4">
    <h2 class="font-bold font-lg">What is S0BR?</h2>
    <p>It's a commitment to yourself.</p>
  </div>

  <div class="py-4">
    <h2 class="font-bold font-lg">Get started</h2>
    <ol class="list-outside">
      <li>
        {#if $walletConnected}☑️{:else}🔲{/if} Connect Metamask
      </li>
      <li>
        {#if $network === "matic"}☑️{:else}🔲{/if} Switch to Polygon Network
      </li>
      <li>
        🔲 <a href="javascript:void(0)" on:click={addToken}
          >Add Token to Metamask.</a
        > (We can't tell if you've done this yet)
      </li>
    </ol>
  </div>
</div>

<script>
  import { network, walletConnected } from "$lib/stores.js";
  import { addToken, getData } from "$lib/s0br.js";
</script>

<div
  class="px-6 py-8  md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
>
  <div class="prose py-4">
    <h2 class="font-bold font-lg">What is S0BR?</h2>

    <p>It's a commitment to yourself.</p>
    <p>
      Each morning, you make a decision, "I am not drinking today". And just by
      committing to that in the morning, it's easier the rest of the day when
      you get to make a choice. A friend offers you a beer at a picnic, "No
      thanks, I'm not drinking today." Somehow it's easier if you're already
      made the decision.
    </p>
    <p>
      S0BR helps you track each day and displays it in a beautiful calendar that
      visualizes your progress and how each day builds into something much
      bigger.
    </p>
    <p>
      Along the way, each day you use S0BR, you'll get a S0BR Token, and at
      personal milestones you'll be rewarded with S0BR NFT.
    </p>
    <p>So come back to S0BR each day and choose.</p>
  </div>

  <div class="prose py-4">
    <h2 class="font-bold font-lg">Get started</h2>
    <ol class="list-outside">
      <li>
        {#if $walletConnected}☑️{:else}🔲{/if}
        <a href="javascript:void(0)" on:click={getData}>Connect Metamask</a>
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

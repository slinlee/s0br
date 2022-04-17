<script>
  import AddTokenButton from "./AddTokenButton.svelte";
</script>

<div
  class="px-6 py-8  md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
>
  <h2 class="font-bold font-lg">What is S0BR?</h2>
  <p>It's a commitment to yourself.</p>
</div>

<div
  class="px-6 py-8  md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10"
>
  <h2 class="font-bold font-lg">Get started</h2>
  <ol class="list-decimal list-inside">
    <li>Connect Metamask</li>
    <li>Switch to Polygon Network</li>
    <li>Add Token to Metamask.<br /><AddTokenButton /></li>
  </ol>
</div>

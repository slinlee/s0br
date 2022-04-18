<script>
  import { errorMsg } from "$lib/stores.js";
</script>

{#if $errorMsg}
  <div
    class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
    role="alert"
  >
    {$errorMsg}
  </div>
{/if}
